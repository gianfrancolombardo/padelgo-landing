import type { BookingStatus } from '../../bookingTypes';
import type { EmailLocale } from '../brand';
import { renderVoleaEmail } from '../layout';

export interface BookingConfirmationEmailInput {
  locale: EmailLocale;
  status: BookingStatus;
  clubName: string;
  locality: string;
  startsAt: string;
  endsAt: string;
  tutorialUrl?: string;
  accountUrl?: string;
}

function formatDateTime(iso: string, locale: EmailLocale): string {
  return new Date(iso).toLocaleString(locale === 'es' ? 'es-ES' : 'en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

export function buildBookingConfirmationEmail(input: BookingConfirmationEmailInput): {
  subject: string;
  html: string;
} {
  const when = `${formatDateTime(input.startsAt, input.locale)} – ${formatDateTime(input.endsAt, input.locale)}`;
  const isPending = input.status === 'pending_confirmation';

  if (input.locale === 'es') {
    const subject = isPending
      ? `Solicitud de reserva — ${input.clubName}`
      : `Reserva confirmada — ${input.clubName}`;

    const html = renderVoleaEmail({
      locale: 'es',
      preheader: isPending
        ? 'Hemos recibido tu solicitud de reserva.'
        : 'Tu sesión está confirmada. Nos vemos en la pista.',
      headline: isPending ? 'Solicitud recibida' : 'Reserva confirmada',
      bodyParagraphs: isPending
        ? [
            `Hemos recibido tu solicitud en ${input.clubName} (${input.locality}).`,
            'El club validará la disponibilidad y te confirmaremos en breve.',
          ]
        : [
            `Tu sesión en ${input.clubName} (${input.locality}) está confirmada.`,
            'Llega con ropa cómoda. En el piloto, Carlos te hará un briefing rápido al llegar.',
          ],
      facts: [
        { label: 'Club', value: input.clubName },
        { label: 'Ciudad', value: input.locality },
        { label: 'Horario', value: when },
      ],
      cta: input.tutorialUrl
        ? { label: 'Ver tutorial de bienvenida', href: input.tutorialUrl }
        : input.accountUrl
          ? { label: 'Ver mis reservas', href: input.accountUrl }
          : undefined,
      secondaryNote: isPending
        ? 'Si necesitas cambiar la hora, cancela desde tu cuenta mientras esté dentro de la ventana permitida.'
        : 'Si necesitas cancelar, hazlo desde tu cuenta con la antelación indicada en la web.',
    });

    return { subject, html };
  }

  const subject = isPending
    ? `Booking request — ${input.clubName}`
    : `Booking confirmed — ${input.clubName}`;

  const html = renderVoleaEmail({
    locale: 'en',
    preheader: isPending
      ? 'We received your booking request.'
      : 'Your session is confirmed. See you on court.',
    headline: isPending ? 'Request received' : 'Booking confirmed',
    bodyParagraphs: isPending
      ? [
          `We received your request at ${input.clubName} (${input.locality}).`,
          'The club will validate availability and we will confirm shortly.',
        ]
      : [
          `Your session at ${input.clubName} (${input.locality}) is confirmed.`,
          'Arrive in comfortable gear. During the pilot, Carlos will give you a quick briefing on site.',
        ],
    facts: [
      { label: 'Club', value: input.clubName },
      { label: 'City', value: input.locality },
      { label: 'Time', value: when },
    ],
    cta: input.tutorialUrl
      ? { label: 'Watch welcome tutorial', href: input.tutorialUrl }
      : input.accountUrl
        ? { label: 'View my bookings', href: input.accountUrl }
        : undefined,
    secondaryNote: isPending
      ? 'To change your slot, cancel from your account while still inside the allowed window.'
      : 'To cancel, use your account before the notice window closes.',
  });

  return { subject, html };
}
