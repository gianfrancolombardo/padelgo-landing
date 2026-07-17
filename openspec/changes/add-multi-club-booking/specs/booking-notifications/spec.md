## ADDED Requirements

### Requirement: Confirmation email is sent via Resend after successful booking
After a booking is successfully created, the system SHALL send a transactional email via **Resend** through a Supabase Edge Function to the authenticated user's email address, including at least: club name, date, start time, booking status (`confirmed` or `pending_confirmation`), and a short what-to-expect note. A welcome tutorial link MAY be included when configured.

#### Scenario: Confirmed booking email
- **WHEN** a booking is created with status `confirmed`
- **THEN** Resend delivers a confirmation email to the user with booking summary

#### Scenario: Pending confirmation email copy
- **WHEN** a booking is created with status `pending_confirmation`
- **THEN** the user email states that the request was received and awaits club validation (without promising a confirmed slot yet)

#### Scenario: Booking succeeds even if Resend fails
- **WHEN** Resend returns an error after the booking is persisted
- **THEN** the booking remains in its created status and the UI still shows success, while the failure is logged for ops

### Requirement: Resend is invoked only server-side
Email delivery SHALL use a Supabase Edge Function with the `RESEND_API_KEY` secret. The Resend API key SHALL NOT be exposed to the Vite client bundle.

#### Scenario: No Resend secret in client
- **WHEN** the frontend build is inspected
- **THEN** `RESEND_API_KEY` is absent from client env vars

#### Scenario: Edge Function sends via Resend
- **WHEN** a booking confirmation notification runs
- **THEN** the Edge Function calls the Resend API with the server secret

### Requirement: Club contact email is ready for future notifications
The notification layer SHALL read `clubs.contact_email` when present so club-facing emails (e.g. new `pending_confirmation` request) can be added without schema changes.

#### Scenario: Contact email available to notifier
- **WHEN** a booking is created on a club with `contact_email` set
- **THEN** the Edge Function or notification payload can include that address for optional club notification (implementation may defer sending in MVP)

### Requirement: Email copy is clear and brand-aligned
Confirmation emails SHALL use clear Spanish (and English when locale is English) copy consistent with VoleaBox voice, rendered via the shared email layout (`booking-email-templates` capability).

#### Scenario: Spanish confirmation content
- **WHEN** the user's locale is Spanish
- **THEN** the Resend email subject and body are in Spanish, use the brand layout, and reflect the booking status accurately
