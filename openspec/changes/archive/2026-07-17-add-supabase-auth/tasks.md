## 1. Supabase project configuration (MCP / dashboard)

- [x] 1.1 Configure `plugin-supabase-supabase` MCP server in Cursor (org `main`)
- [x] 1.2 Create project `voleabox` (ref `dqrbnqmizvvaztoniagf`, eu-west-3) and fetch publishable anon key
- [x] 1.3 Configure Auth Site URL and redirect URLs in Supabase dashboard (`http://localhost:3000/**` + production domain)
- [x] 1.4 Apply migration `create_profiles_table` via MCP (profiles, RLS, `on_auth_user_created` trigger)
- [x] 1.5 Email confirmation: document dev toggle in README (disable in dashboard for fast local testing)

## 2. Frontend dependencies and environment

- [x] 2.1 Add `@supabase/supabase-js` to `package.json`
- [x] 2.2 Create `.env.example` with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- [x] 2.3 Create local `.env.local` (gitignored) with real values from step 1.2
- [x] 2.4 Verify `.gitignore` excludes `.env.local` (`*.local`)

## 3. Supabase client and auth context

- [x] 3.1 Create `lib/supabase.ts` singleton client with env validation
- [x] 3.2 Create `contexts/AuthContext.tsx` with session state, `onAuthStateChange`, sign-in/out helpers
- [x] 3.3 Wrap `App` with `AuthProvider` inside `LanguageProvider`

## 4. Routing

- [x] 4.1 Extend `i18n/routes.ts` with `login`, `register`, `account` routes and `AppRoute` type
- [x] 4.2 Update `App.tsx` to render auth pages and wire route resolution
- [x] 4.3 Create `components/auth/AuthGuard.tsx` for protected routes

## 5. Auth UI components

- [x] 5.1 Create `components/auth/LoginPage.tsx` (email/password, errors, loading)
- [x] 5.2 Create `components/auth/RegisterPage.tsx` (email, password, optional full_name, confirmation messaging)
- [x] 5.3 Create `components/auth/AccountPage.tsx` (user email, logout)
- [x] 5.4 Create shared `components/auth/AuthLayout.tsx` matching brandbook (dark + volea-green)
- [x] 5.5 Add password reset flow (`resetPasswordForEmail`) in LoginPage

## 6. i18n and header integration

- [x] 6.1 Add auth strings to `i18n/translations.ts` (ES + EN): labels, errors, success messages
- [x] 6.2 Update `components/Header.tsx` with login/register links (logged out) and account/logout (logged in)
- [x] 6.3 Map Supabase auth error codes to user-friendly i18n messages (`lib/authErrors.ts`)

## 7. Documentation and pilot alignment

- [x] 7.1 Update `docs/pilot/customer-journey.md` to include user account step before booking
- [x] 7.2 Add auth setup notes to root `README.md` (env vars, Supabase project, local dev)

## 8. Verification

- [x] 8.1 Manual test: register → (confirm email if enabled) → login → account → logout
- [x] 8.2 Manual test: protected route redirects when logged out
- [x] 8.3 Manual test: waitlist form still works on home hero
- [x] 8.4 Run `pnpm run build` and fix any TypeScript or env issues
