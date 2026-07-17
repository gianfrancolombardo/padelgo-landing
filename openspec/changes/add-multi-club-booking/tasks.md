## 0. Booking config (single source)

- [x] 0.1 Create `lib/bookingConfig.ts` with `DEFAULT_SLOT_DURATION_MINUTES`, `MIN_CANCELLATION_HOURS`, and `canCancelBooking()`
- [x] 0.2 Add `lib/bookingConfig.test.ts` covering cut-off edge cases
- [x] 0.3 Document RPC SQL constant sync comment (“keep in sync with bookingConfig.ts”)

## 1. Data model & Supabase

- [x] 1.1 Create migration: `clubs` with `opening_time`, `closing_time`, `slot_duration_minutes` (default 60), `contact_email`, `requires_confirmation` (default false)
- [x] 1.2 Create migration: `time_slots`, `bookings` with status enum (`confirmed`, `pending_confirmation`, `cancelled`; reserve `pending_payment`)
- [x] 1.3 Enable RLS policies for clubs, slots, bookings
- [x] 1.4 Implement RPC `create_booking`: default `confirmed`; `pending_confirmation` when `requires_confirmation`; atomic slot claim
- [x] 1.5 Implement RPC `cancel_booking` using `MIN_CANCELLATION_HOURS` from config (synced constant)
- [x] 1.6 Seed pilot clubs with hours, contact_email, `requires_confirmation = false`; generate slots from club config
- [x] 1.7 Apply migration to `voleabox` and verify with smoke SQL
- [x] 1.8 Add integration tests for RPCs (create, double-book, cancel in/out of window, pending_confirmation path)

## 2. Client data layer

- [x] 2.1 Add typed helpers in `lib/` for clubs, slots, bookings (create, cancel, list mine)
- [x] 2.2 Add unit tests for all helpers (mock Supabase): success, conflict, status handling
- [x] 2.3 Extend `i18n/routes.ts` with `book` and route tests

## 3. Booking UI (mobile-first)

- [x] 3.1 Build `/book` wizard (club → day → time → confirm → success) behind `AuthGuard`
- [x] 3.2 Club step: empty/loading/error states
- [x] 3.3 Day + time steps from available inventory (respecting club hours)
- [x] 3.4 Confirmation summary + submit via `create_booking`
- [x] 3.5 Success screen: `confirmed` vs `pending_confirmation` copy
- [x] 3.6 ES/EN translations for booking strings and statuses
- [x] 3.7 Component tests: happy path, slot conflict, empty clubs, back navigation, i18n toggle

## 4. Notifications (Resend)

- [x] 4.1 Configurar secrets en Supabase (`RESEND_API_KEY`, `RESEND_FROM`, `SITE_URL`)
- [x] 4.2 Implement Edge Function `send-booking-confirmation` con plantillas de marca (`lib/email/`)
- [x] 4.2b Crear `lib/email/` (layout, brand, registry, booking template) + `docs/brand/email-templates.md`
- [x] 4.1b Deploy Edge Function: `send-booking-confirmation` v1 ACTIVE en `dqrbnqmizvvaztoniagf`
- [x] 4.3 Wire trigger after successful booking (client invoke post-RPC; includes `contact_email` in payload)
- [x] 4.5 UI success path resilient if Resend fails; log errors
- [x] 4.6 Unit tests for Edge Function handler with Resend mock (`lib/bookingEmailContent.test.ts`)
- [x] 4.7 Document Resend setup in `.env.example` / ops note

## 5. Account & auth redirects

- [x] 5.1 Account: upcoming bookings with status badges (`confirmed`, `pending_confirmation`)
- [x] 5.2 Cancel action using `canCancelBooking()` + confirm dialog
- [x] 5.3 `next=/book` on login/register from booking CTAs
- [x] 5.4 Tests: bookings list, empty state, cancel eligible/ineligible, `next` redirect, status badges

## 6. Landing conversion

- [x] 6.1 Hero + header + bottom CTA → booking funnel (auth+next when logged out)
- [x] 6.2 How-it-works + FAQ (include `MIN_CANCELLATION_HOURS` from config in FAQ copy)
- [x] 6.3 ES/EN translations
- [x] 6.4 Component/smoke tests for CTA hrefs and logged-in vs logged-out behavior

## 7. Docs & pilot alignment

- [x] 7.1 Update `customer-journey.md`: club config, booking states, Resend email, payment follow-up
- [x] 7.2 Update `launch-checklist.md` items #4/#6
- [x] 7.3 Decision-log entry: Resend adopted for transactional email
- [x] 7.4 Concierge playbook: list today's bookings + `contact_email` usage note

## 8. Verification

- [x] 8.1 Run unit/component tests and fix failures
- [ ] 8.2 Manual E2E: register → book (confirmed) → Resend email → account → cancel
- [ ] 8.3 Verify RLS: user A cannot read/cancel user B bookings
- [ ] 8.4 Optional smoke: club with `requires_confirmation = true` → `pending_confirmation` flow
