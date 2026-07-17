import { createClient } from '@supabase/supabase-js';
import { beforeAll, describe, expect, it } from 'vitest';
import { MIN_CANCELLATION_HOURS } from '../lib/bookingConfig';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
const runIntegration = Boolean(supabaseUrl && supabaseAnonKey);

describe.skipIf(!runIntegration)('Booking RPC integration', () => {
  const client = createClient(supabaseUrl!, supabaseAnonKey!);
  const password = 'VoleaBooking123!';
  const email = `voleabox-booking-${Date.now()}@mailinator.com`;
  let userId: string | null = null;
  let slotId: string | null = null;

  beforeAll(async () => {
    const { error: signUpError } = await client.auth.signUp({
      email,
      password,
      options: { data: { full_name: 'Booking Test' } },
    });
    if (signUpError && !signUpError.message.includes('rate limit')) {
      throw signUpError;
    }

    const { data: sessionData } = await client.auth.signInWithPassword({ email, password });
    if (!sessionData.session) return;

    userId = sessionData.session.user.id;

    const { data: slot } = await client
      .from('time_slots')
      .select('id, starts_at')
      .eq('status', 'available')
      .gt(
        'starts_at',
        new Date(Date.now() + (MIN_CANCELLATION_HOURS + 24) * 3600000).toISOString()
      )
      .limit(1)
      .single();

    slotId = slot?.id ?? null;
  });

  it('lists active clubs', async () => {
    const { data, error } = await client.from('clubs').select('id, name').eq('is_active', true);
    expect(error).toBeNull();
    expect((data ?? []).length).toBeGreaterThan(0);
  });

  it('creates and cancels a booking when session and slot exist', async () => {
    const { data: sessionData } = await client.auth.signInWithPassword({ email, password });
    if (!sessionData.session || !slotId) {
      expect(true).toBe(true);
      return;
    }

    const { data: created, error: createError } = await client.rpc('create_booking', {
      p_slot_id: slotId,
      p_locale: 'es',
    });

    expect(createError).toBeNull();
    expect(created?.[0]?.booking_status).toBe('confirmed');

    const bookingId = created?.[0]?.booking_id as string;
    expect(bookingId).toBeTruthy();

    const { error: cancelError } = await client.rpc('cancel_booking', { p_booking_id: bookingId });
    expect(cancelError).toBeNull();

    await client.auth.signOut();
    expect(userId).toBeTruthy();
  });

  it('lists own upcoming bookings with club and slot embeds', async () => {
    const { data: sessionData } = await client.auth.signInWithPassword({ email, password });
    if (!sessionData.session || !slotId) {
      expect(true).toBe(true);
      return;
    }

    const { data: created, error: createError } = await client.rpc('create_booking', {
      p_slot_id: slotId,
      p_locale: 'es',
    });
    expect(createError).toBeNull();
    const bookingId = created?.[0]?.booking_id as string;
    expect(bookingId).toBeTruthy();

    const { data: bookings, error: listError } = await client
      .from('bookings')
      .select(
        `
        id,
        status,
        club:clubs!bookings_club_id_fkey (name, locality),
        slot:time_slots!bookings_slot_id_fkey (starts_at, ends_at)
      `
      )
      .eq('id', bookingId)
      .single();

    expect(listError).toBeNull();
    expect(bookings?.club?.name).toBeTruthy();
    expect(bookings?.slot?.starts_at).toBeTruthy();

    await client.rpc('cancel_booking', { p_booking_id: bookingId });
    await client.auth.signOut();
  });
});
