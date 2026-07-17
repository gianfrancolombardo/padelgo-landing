# Email transaccionales — VoleaBox

| Campo | Valor |
|---|---|
| **Owner** | Gian |
| **Última actualización** | 2026-07-17 |
| **Estado** | `active` |

Voz general: [`voice-and-imagery.md`](voice-and-imagery.md) · Tokens: [`brandbook.md`](brandbook.md).

## Arquitectura

| Capa | Ubicación | Uso |
|---|---|---|
| **Layout + tokens** | `lib/email/` | Fuente de verdad; tests Vitest |
| **Edge runtime** | `supabase/functions/_shared/email/` | Copia desplegada con las Edge Functions (mantener en sync) |
| **Catálogo** | `lib/email/registry.ts` | IDs de plantillas live / planned |

Toda plantilla nueva **debe** usar `renderVoleaEmail()` para conservar imagen de marca (fondo dark, acento `#3BFF76`, tipografía email-safe).

## Plantillas

| ID | Estado | Audiencia | Trigger |
|---|---|---|---|
| `booking_confirmation` | live | Jugador | Reserva `confirmed` |
| `booking_pending_confirmation` | live | Jugador | Reserva `pending_confirmation` |
| `booking_cancelled` | planned | Jugador | Cancelación usuario |
| `club_booking_request` | planned | Club (`contact_email`) | Nueva solicitud pendiente |
| `welcome_tutorial` | planned | Jugador | Post-confirmación con URL vídeo |
| `password_reset` | planned | Jugador | Auth (si migramos de Supabase template) |

## Secrets (Supabase Edge)

| Secret | Uso |
|---|---|
| `RESEND_API_KEY` | API Resend — **solo** en Edge Functions |
| `RESEND_FROM` | Remitente (sandbox: `VoleaBox <onboarding@resend.dev>`) |
| `SITE_URL` | Links a `/account` en emails |
| `BOOKING_TUTORIAL_URL` | CTA tutorial cuando exista asset |

## Reglas de copy

- Beneficio concreto; sin hype vacío ni promesas locker/H1 en piloto concierge.
- ES/EN según `locale` de la reserva o del usuario.
- Preheader útil (preview en cliente de correo).
- CTA único principal por email.
