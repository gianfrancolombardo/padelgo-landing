## ADDED Requirements

### Requirement: Edge Functions authorize booking ownership
Booking-related Edge Functions that act on a `bookingId` SHALL verify that the authenticated caller (`auth.uid()` from the request JWT) owns that booking before sending email or performing privileged side effects. Gateway `verify_jwt` alone is NOT sufficient.

#### Scenario: Owner can trigger confirmation email
- **WHEN** an authenticated user invokes `send-booking-confirmation` with their own booking id
- **THEN** the function proceeds to send (or skip) the confirmation email according to Resend configuration

#### Scenario: Non-owner is rejected
- **WHEN** an authenticated user invokes `send-booking-confirmation` with another user's booking id
- **THEN** the function responds with HTTP 403 and does not send email

#### Scenario: Unauthenticated call is rejected
- **WHEN** a request without a valid user JWT invokes the function
- **THEN** the call is rejected (gateway and/or function) and no email is sent

### Requirement: Privileged RPCs are not executable by anon
Database functions that mutate bookings (`create_booking`, `cancel_booking`) and other sensitive `SECURITY DEFINER` helpers SHALL NOT grant `EXECUTE` to `anon` or `PUBLIC`. Only `authenticated` (or narrower roles) SHALL retain execute rights as required by the product.

#### Scenario: Anon cannot execute create_booking
- **WHEN** a client using only the anon key (no user session) calls `rpc('create_booking', …)`
- **THEN** the call is denied by privilege checks

#### Scenario: Authenticated user can execute create_booking
- **WHEN** a logged-in user calls `rpc('create_booking', …)` with a valid available slot
- **THEN** the RPC executes under existing business rules

### Requirement: Netlify serves baseline security headers
The Netlify deployment SHALL send baseline security headers including HSTS, `X-Content-Type-Options: nosniff`, a restrictive framing policy (`X-Frame-Options` or equivalent CSP `frame-ancestors`), and a sensible `Referrer-Policy`.

#### Scenario: Production response includes security headers
- **WHEN** a client fetches the production site root
- **THEN** the response includes the baseline security headers configured in `netlify.toml` or `_headers`

### Requirement: Client builds do not embed server secrets
The frontend build SHALL NOT inject secret API keys (service role, Resend, Gemini, or similar) into the browser bundle via Vite `define` or equivalent. Only intentionally public publishable keys (`VITE_SUPABASE_ANON_KEY`, public form keys) MAY appear in the client.

#### Scenario: Production bundle audit
- **WHEN** the production client bundle is inspected for known secret env names
- **THEN** no service-role, Resend, or other server-only secrets are present

### Requirement: Env files with secrets are gitignored
The repository `.gitignore` SHALL ignore `.env` and common local env variants so secret material is not committed by accident. Example env files without secrets MAY remain tracked.

#### Scenario: Accidental .env is ignored
- **WHEN** a developer creates a root `.env` with secrets
- **THEN** git status does not list it as an untracked file to commit

### Requirement: Password policy meets MVP baseline
Registration SHALL require passwords of at least 8 characters in the UI, and the Supabase project SHALL enable leaked-password protection for Auth. The ops checklist SHALL record that Dashboard setting.

#### Scenario: Short password rejected in UI
- **WHEN** a user tries to register with a password shorter than 8 characters
- **THEN** the form prevents submit and shows validation feedback

#### Scenario: Leaked password protection documented as enabled
- **WHEN** an operator follows the security checklist after deploy
- **THEN** leaked-password protection is listed as a required Auth Dashboard setting

### Requirement: Security checklist for Netlify plus Supabase MVP
Project docs SHALL include a short MVP security checklist covering: RLS on public tables, RPC grants, Edge Function ownership, Auth leaked passwords, Netlify headers, and no service-role in client env.

#### Scenario: Operator can verify posture before launch
- **WHEN** the team prepares a pilot launch
- **THEN** they can walk the checklist and mark each control verified
