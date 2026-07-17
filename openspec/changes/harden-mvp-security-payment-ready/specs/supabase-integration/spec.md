## ADDED Requirements

### Requirement: Edge Functions use least privilege and ownership checks
Supabase Edge Functions that read or mutate user bookings SHALL authenticate the caller JWT, authorize ownership (or an explicit ops role when introduced), and SHALL keep `SUPABASE_SERVICE_ROLE_KEY` usage limited to privileged steps that cannot be done under RLS.

#### Scenario: Service role is not used to skip ownership
- **WHEN** `send-booking-confirmation` loads a booking for email delivery
- **THEN** it only proceeds if the JWT user owns the booking (or an equivalent authorized role check)

### Requirement: Sensitive RPC execute grants exclude anon
The Supabase project SHALL ensure booking mutation RPCs are executable by `authenticated` users as designed and not by the `anon` role. Migrations in the repo SHALL encode these grants so remote state can be reproduced.

#### Scenario: Migration encodes revoke-from-anon
- **WHEN** the security hardening migration is applied
- **THEN** `anon` no longer has execute privilege on `create_booking` and `cancel_booking`

### Requirement: Profiles schema is versioned in the repository
The `public.profiles` table, trigger, and RLS policies SHALL be represented by a versioned migration in the repository so local and remote environments do not rely on undocumented Dashboard-only setup.

#### Scenario: Fresh migrate creates profiles safely
- **WHEN** migrations are applied to an empty or existing project
- **THEN** `profiles` exists with RLS enabling users to read/update only their own row, without failing if the object already exists

## MODIFIED Requirements

### Requirement: Supabase client is configured for the frontend
The application SHALL initialize a single Supabase client using `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` environment variables and SHALL fail fast at startup if either variable is missing in a build that includes auth routes. The frontend SHALL NOT be configured with the service role key or other server-only secrets.

#### Scenario: Client loads with valid env
- **WHEN** the app starts with both Supabase env vars set
- **THEN** `lib/supabase.ts` exports a usable Supabase client singleton

#### Scenario: Missing env in development
- **WHEN** a developer runs the app without Supabase env vars
- **THEN** the auth module surfaces a clear configuration error rather than silent failure

#### Scenario: Service role absent from client env
- **WHEN** the frontend environment and Vite config are reviewed
- **THEN** no service-role or Resend secret is required or injected for the browser build
