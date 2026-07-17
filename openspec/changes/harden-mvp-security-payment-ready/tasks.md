## 1. Secrets and repo hygiene

- [ ] 1.1 Ensure `.gitignore` ignores `.env` and common local env variants (keep `.env.example` tracked)
- [ ] 1.2 Remove or stop injecting secret keys into the Vite client bundle (`vite.config.ts` `define` / Gemini); confirm production build has no server-only secrets
- [ ] 1.3 Move Web3Forms access key to env (`VITE_WEB3FORMS_*`) and document rotation; rotate the previously hard-coded key if it was exposed in git history

## 2. Database grants and schema hardening

- [ ] 2.1 Add migration to `REVOKE` `EXECUTE` on `create_booking` / `cancel_booking` (and sensitive helpers) from `PUBLIC` and `anon`; keep `GRANT` to `authenticated`
- [ ] 2.2 Add idempotent migration for `profiles` (table + trigger + RLS) if missing from the repo so remote/local do not drift
- [ ] 2.3 Apply migrations to the linked Supabase project and verify privileges (advisor or `has_function_privilege`)

## 3. Edge Function authorization

- [ ] 3.1 Update `send-booking-confirmation` to resolve the caller JWT and require `booking.user_id === auth user id` before sending email (403 otherwise)
- [ ] 3.2 Keep service-role usage limited to privileged steps; prefer user-scoped read under RLS where possible
- [ ] 3.3 Add/adjust tests or a documented manual verification script for owner vs non-owner invoke
- [ ] 3.4 Redeploy the Edge Function to the Supabase project

## 4. Auth password baseline

- [ ] 4.1 Raise registration UI password `minLength` to 8 and align validation copy (ES/EN)
- [ ] 4.2 Update auth unit tests for the new minimum length
- [ ] 4.3 Enable Supabase Auth leaked-password protection in the Dashboard and record it in the ops checklist

## 5. Netlify security headers

- [ ] 5.1 Add `netlify.toml` or `public/_headers` with HSTS, `nosniff`, framing restriction, and `Referrer-Policy`
- [ ] 5.2 Choose a pragmatic CSP (report-only or permissive) compatible with current CDNs; document that strict CSP is a follow-up
- [ ] 5.3 Verify headers on a deploy preview or production with `curl -I` / browser tools

## 6. Payment integration prep (no live PSP)

- [ ] 6.1 Add forward-compatible nullable payment columns on `bookings` (`amount_cents`, `currency`, `payment_provider`, `payment_intent_id`, `paid_at`) via migration
- [ ] 6.2 Confirm unique active-slot index still includes `pending_payment`; document future `create_booking` → `pending_payment` transition without changing current default status
- [ ] 6.3 Document webhook contract (signature verify, idempotency on provider id, server-authoritative confirm, server-side price source) in design/docs — no live Stripe wiring

## 7. Docs and verification

- [ ] 7.1 Add MVP security checklist to pilot/ops docs (RLS, RPC grants, Edge ownership, Auth leaked passwords, Netlify headers, no service-role in client)
- [ ] 7.2 Update launch checklist / decision log: payments prepared vs not live; security baseline done
- [ ] 7.3 Run unit/integration tests relevant to auth, booking, and any new migration/function coverage
- [ ] 7.4 Walk the security checklist against the deployed Netlify + Supabase environment and mark gaps
