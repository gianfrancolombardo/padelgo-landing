import { describe, expect, it } from 'vitest';
import { buildBookingConfirmationEmail } from './email/templates/bookingConfirmation';

describe('buildBookingConfirmationEmail', () => {
  const base = {
    clubName: 'Club Piloto Barcelona',
    locality: 'Barcelona',
    startsAt: '2026-07-20T09:00:00+02:00',
    endsAt: '2026-07-20T10:00:00+02:00',
    accountUrl: 'https://voleabox.com/account',
  };

  it('builds Spanish confirmed email', () => {
    const email = buildBookingConfirmationEmail({ ...base, locale: 'es', status: 'confirmed' });
    expect(email.subject).toContain('confirmada');
    expect(email.html).toContain('Club Piloto Barcelona');
    expect(email.html).toContain('#3BFF76');
  });

  it('builds English pending confirmation email', () => {
    const email = buildBookingConfirmationEmail({
      ...base,
      locale: 'en',
      status: 'pending_confirmation',
    });
    expect(email.subject).toContain('request');
    expect(email.html).toContain('Request received');
  });

  it('includes tutorial link when provided', () => {
    const email = buildBookingConfirmationEmail({
      ...base,
      locale: 'es',
      status: 'confirmed',
      tutorialUrl: 'https://voleabox.com/tutorial',
    });
    expect(email.html).toContain('https://voleabox.com/tutorial');
  });
});
