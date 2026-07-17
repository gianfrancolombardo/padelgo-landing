import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { buildBookingConfirmationEmail } from '../_shared/email/templates/bookingConfirmation.ts';
import { EMAIL_BRAND } from '../_shared/email/brand.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { bookingId } = await req.json();
    if (!bookingId) {
      return new Response(JSON.stringify({ error: 'bookingId required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { data: booking, error } = await supabase
      .from('bookings')
      .select(
        `
        id, status, locale,
        club:clubs (name, locality, contact_email),
        slot:time_slots (starts_at, ends_at),
        user_id
      `
      )
      .eq('id', bookingId)
      .single();

    if (error || !booking) {
      return new Response(JSON.stringify({ error: 'Booking not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { data: userData } = await supabase.auth.admin.getUserById(booking.user_id);
    const toEmail = userData.user?.email;
    if (!toEmail) {
      return new Response(JSON.stringify({ error: 'User email not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const locale = booking.locale === 'en' ? 'en' : 'es';
    const club = booking.club as { name: string; locality: string; contact_email: string | null };
    const slot = booking.slot as { starts_at: string; ends_at: string };
    const siteUrl = Deno.env.get('SITE_URL') ?? 'https://voleabox.com';
    const tutorialUrl = Deno.env.get('BOOKING_TUTORIAL_URL') ?? undefined;

    const email = buildBookingConfirmationEmail({
      locale,
      status: booking.status,
      clubName: club.name,
      locality: club.locality,
      startsAt: slot.starts_at,
      endsAt: slot.ends_at,
      tutorialUrl,
      accountUrl: `${siteUrl}/account`,
    });

    const resendKey = Deno.env.get('RESEND_API_KEY');
    if (!resendKey) {
      console.error('RESEND_API_KEY missing');
      return new Response(JSON.stringify({ ok: false, skipped: true }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const from = Deno.env.get('RESEND_FROM') ?? EMAIL_BRAND.fromDefault;
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [toEmail],
        subject: email.subject,
        html: email.html,
      }),
    });

    if (!resendRes.ok) {
      const body = await resendRes.text();
      console.error('Resend error', body);
      return new Response(JSON.stringify({ error: 'Resend failed' }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Internal error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
