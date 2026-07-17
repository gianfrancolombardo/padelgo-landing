import { getSupabaseClient } from './supabase';
import type { BookingRow, Club, CreateBookingResult, TimeSlot } from './bookingTypes';

export type BookingErrorCode =
  | 'not_authenticated'
  | 'slot_not_available'
  | 'slot_not_found'
  | 'club_not_found'
  | 'booking_not_found'
  | 'cancellation_closed'
  | 'cannot_cancel'
  | 'unknown';

export class BookingError extends Error {
  constructor(
    message: string,
    readonly code: BookingErrorCode
  ) {
    super(message);
    this.name = 'BookingError';
  }
}

function mapRpcMessage(message: string): BookingErrorCode {
  const lower = message.toLowerCase();
  if (lower.includes('not authenticated')) return 'not_authenticated';
  if (lower.includes('slot not available')) return 'slot_not_available';
  if (lower.includes('slot not found')) return 'slot_not_found';
  if (lower.includes('club not found')) return 'club_not_found';
  if (lower.includes('booking not found')) return 'booking_not_found';
  if (lower.includes('cancellation window')) return 'cancellation_closed';
  if (lower.includes('cannot be cancelled')) return 'cannot_cancel';
  return 'unknown';
}

export async function listActiveClubs(): Promise<Club[]> {
  const { data, error } = await getSupabaseClient()
    .from('clubs')
    .select(
      'id, name, locality, address, opening_time, closing_time, slot_duration_minutes, contact_email, requires_confirmation'
    )
    .eq('is_active', true)
    .order('name');

  if (error) throw new BookingError(error.message, 'unknown');
  return (data ?? []) as Club[];
}

export async function listAvailableSlotsForClub(clubId: string): Promise<TimeSlot[]> {
  const { data, error } = await getSupabaseClient()
    .from('time_slots')
    .select('id, club_id, starts_at, ends_at, status')
    .eq('club_id', clubId)
    .eq('status', 'available')
    .gt('starts_at', new Date().toISOString())
    .order('starts_at');

  if (error) throw new BookingError(error.message, 'unknown');
  return (data ?? []) as TimeSlot[];
}

export async function createBooking(slotId: string, locale: string): Promise<CreateBookingResult> {
  const { data, error } = await getSupabaseClient().rpc('create_booking', {
    p_slot_id: slotId,
    p_locale: locale,
  });

  if (error) {
    throw new BookingError(error.message, mapRpcMessage(error.message));
  }

  const row = Array.isArray(data) ? data[0] : data;
  if (!row?.booking_id) {
    throw new BookingError('Invalid booking response', 'unknown');
  }

  return {
    bookingId: row.booking_id as string,
    status: row.booking_status as CreateBookingResult['status'],
  };
}

export async function cancelBooking(bookingId: string): Promise<void> {
  const { error } = await getSupabaseClient().rpc('cancel_booking', {
    p_booking_id: bookingId,
  });

  if (error) {
    throw new BookingError(error.message, mapRpcMessage(error.message));
  }
}

function mapRpcBookingRows(data: Record<string, unknown>[] | null): BookingRow[] {
  return (data ?? []).map((row) => ({
    id: row.id as string,
    status: row.status as BookingRow['status'],
    created_at: row.created_at as string,
    locale: row.locale as string,
    club: {
      id: row.club_id as string,
      name: row.club_name as string,
      locality: row.club_locality as string,
      address: (row.club_address as string | null) ?? null,
      contact_email: (row.club_contact_email as string | null) ?? null,
    },
    slot: {
      id: row.slot_id as string,
      starts_at: row.slot_starts_at as string,
      ends_at: row.slot_ends_at as string,
      status: row.slot_status as BookingRow['slot']['status'],
    },
  }));
}

async function listMyUpcomingBookingsFallback(): Promise<BookingRow[]> {
  const nowIso = new Date().toISOString();
  const { data, error } = await getSupabaseClient()
    .from('bookings')
    .select(
      `
      id,
      status,
      created_at,
      locale,
      club:clubs (id, name, locality, address, contact_email),
      slot:time_slots (id, starts_at, ends_at, status)
    `
    )
    .in('status', ['confirmed', 'pending_confirmation'])
    .order('created_at', { ascending: true });

  if (error) throw new BookingError(error.message, 'unknown');

  return (data ?? [])
    .filter((row): row is BookingRow => {
      const booking = row as BookingRow;
      return Boolean(booking.slot?.starts_at && booking.club?.name);
    })
    .filter((row) => new Date(row.slot.starts_at).getTime() > Date.parse(nowIso))
    .sort((a, b) => new Date(a.slot.starts_at).getTime() - new Date(b.slot.starts_at).getTime());
}

export async function listMyUpcomingBookings(): Promise<BookingRow[]> {
  const { data, error } = await getSupabaseClient().rpc('list_my_upcoming_bookings');

  if (!error) {
    return mapRpcBookingRows((data ?? []) as Record<string, unknown>[]);
  }

  const missingRpc =
    error.message.includes('list_my_upcoming_bookings') ||
    error.code === '42883' ||
    error.code === 'PGRST202';

  if (missingRpc) {
    return listMyUpcomingBookingsFallback();
  }

  throw new BookingError(error.message, 'unknown');
}

export async function requestBookingConfirmationEmail(bookingId: string): Promise<void> {
  const { error } = await getSupabaseClient().functions.invoke('send-booking-confirmation', {
    body: { bookingId },
  });

  if (error) {
    console.error('[booking] confirmation email failed', error);
  }
}

/** @internal Test helper */
export { mapRpcMessage };
