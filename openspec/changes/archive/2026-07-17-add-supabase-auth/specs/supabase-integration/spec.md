## ADDED Requirements

### Requirement: Supabase client is configured for the frontend
The application SHALL initialize a single Supabase client using `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` environment variables and SHALL fail fast at startup if either variable is missing in a build that includes auth routes.

#### Scenario: Client loads with valid env
- **WHEN** the app starts with both Supabase env vars set
- **THEN** `lib/supabase.ts` exports a usable Supabase client singleton

#### Scenario: Missing env in development
- **WHEN** a developer runs the app without Supabase env vars
- **THEN** the auth module surfaces a clear configuration error rather than silent failure

### Requirement: Auth session persists across page reloads
The application SHALL subscribe to Supabase `onAuthStateChange` and SHALL restore the user session from persisted storage on initial load.

#### Scenario: Session survives refresh
- **WHEN** a logged-in user reloads the page
- **THEN** the user remains authenticated without logging in again

#### Scenario: Logout clears session
- **WHEN** a user signs out
- **THEN** local session state is cleared and protected routes redirect to login

### Requirement: Profiles table extends auth users
The Supabase project SHALL provide a `public.profiles` table keyed to `auth.users` with RLS policies allowing users to read and update only their own row, and SHALL auto-create a profile row on user signup.

#### Scenario: New user gets profile row
- **WHEN** a user completes registration
- **THEN** a corresponding `profiles` row exists with the user's id

#### Scenario: User cannot read other profiles
- **WHEN** an authenticated user queries `profiles`
- **THEN** only their own profile row is returned

### Requirement: Supabase project auth URLs are configured
Supabase Auth SHALL have Site URL and redirect URLs configured for local development (`http://localhost:5173`) and production deployment targets documented in `.env.example`.

#### Scenario: Password reset redirect works locally
- **WHEN** a user requests password reset in local dev
- **THEN** the reset email link redirects to an allowed URL on localhost
