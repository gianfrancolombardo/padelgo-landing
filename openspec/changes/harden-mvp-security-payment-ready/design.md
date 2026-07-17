## Context

**Stack:** Vite 6 + React 19 SPA en **Netlify**; Auth + Postgres + Edge Functions en **Supabase** (`voleabox`). Booking multiclub ya modelado con RLS + RPCs `SECURITY DEFINER` (`create_booking` / `cancel_booking`) y email vía `send-booking-confirmation` + Resend.

**Estado actual (audit):**

- Bien: solo anon key en cliente; mutaciones de booking vía RPC; RLS en `clubs` / `time_slots` / `bookings` / `profiles`; secrets Resend fuera del bundle.
- Huecos: Edge Function no comprueba que el JWT sea dueño del `bookingId`; en remoto `anon` aún puede tener `EXECUTE` en RPCs; password UI `minLength=6` y leaked-password protection off; sin `netlify.toml` headers; Web3Forms key hardcodeada; riesgo de `GEMINI_API_KEY` en bundle vía `vite.config.ts`; migración `profiles` puede no estar versionada en repo; pago no implementado pero `pending_payment` ya en enum.

**Constraints:** MVP piloto (no miles de usuarios); no overbuild enterprise; payment integration **prep only** (checklist #5 sigue abierto); sin secretos en cliente; i18n ES/EN.

**Stakeholders:** Gian (impl), Carlos (ops / decisión autónomo+pagos).

## Goals / Non-Goals

**Goals:**

- Cerrar vulnerabilidades explotables con tráfico piloto real (email abuse, grants excesivos, secrets leakage, framing/XSS básico vía headers).
- Dejar Auth y DB en postura “least privilege razonable” para SPA + Supabase.
- Documentar y preparar el dominio de reservas para un PSP futuro (estado, columnas, webhook contract) sin cobrar aún.
- Checklist verificable post-deploy (Dashboard + Netlify + SQL).

**Non-Goals:**

- Implementar Stripe/Checkout/webhooks en producción.
- Rate limiting distribuido, WAF, bot management, SIEM.
- CSP estricta que elimine Tailwind CDN / importmap actuales (solo CSP pragmática o headers base).
- Revocar todos los grants default de tablas Supabase (mitigado por RLS; defensa profunda opcional post-piloto).
- OAuth social, 2FA, session binding estricto.

## Decisions

### D1 — Bar de seguridad: “piloto endurecido”, no enterprise

**Elección:** Priorizar fixes con impacto real en abuso (ownership Edge Function, REVOKE anon, passwords, secrets, headers mínimos). Diferir rate limits duros, CSP perfecta y revoke grants de tabla hasta abuso medible o fase pago.

**Alternativas:** (B) Full hardening CIS-style — coste alto, bloquea ship. (C) Solo docs — insuficiente con Edge Function abierta a spam.

### D2 — Edge Function: ownership check con user-scoped client

**Elección:** Tras `OPTIONS`, crear cliente con el JWT del `Authorization` header (anon key + user JWT), resolver `auth.getUser()`, cargar booking y exigir `booking.user_id === user.id` **antes** de usar service role (o usar solo user client + RLS para leer el booking y service role solo para `getUserById`/admin si hace falta). Responder `403` si no es dueño.

**Alternativas:** (B) Confiar solo en `verify_jwt` gateway — insuficiente (cualquier auth user dispara email ajeno). (C) Mover envío a trigger DB — más ops, diferir.

### D3 — Grants: REVOKE explícito + migración idempotente

**Elección:** Nueva migración que haga `REVOKE ALL … FROM PUBLIC, anon` en `create_booking`, `cancel_booking` y funciones trigger auxiliares expuestas; `GRANT EXECUTE … TO authenticated` solo donde corresponda. Verificar en remoto con advisor/`has_function_privilege`.

**Alternativas:** (B) Solo documentar revoke manual en Dashboard — drift. (C) Cambiar a SECURITY INVOKER — rompería el modelo atómico actual.

### D4 — Auth password policy

**Elección:** UI `minLength={8}` en register (y login coherente); activar **Leaked password protection** en Supabase Auth Dashboard; documentar en README/ops checklist.

**Alternativas:** (B) Solo UI — bypass vía API directa. (C) Complejidad zxcvbn custom — overkill MVP.

### D5 — Netlify security headers (mínimos)

**Elección:** Añadir `netlify.toml` (o `public/_headers`) con:

- `Strict-Transport-Security`
- `X-Frame-Options: DENY` (o `SAMEORIGIN`)
- `Referrer-Policy: strict-origin-when-cross-origin`
- `X-Content-Type-Options: nosniff`
- CSP **report-only o permisiva** alineada a CDNs actuales (Tailwind CDN, aistudiocdn) — no romper el build en este change.

**Alternativas:** (B) CSP enforce estricta ahora — rompe landing. (C) Confiar en defaults Netlify — insuficientes.

### D6 — Secrets hygiene

**Elección:**

1. Añadir `.env` (y variantes) a `.gitignore` si falta.
2. Dejar de inyectar `GEMINI_API_KEY` en el client bundle (`vite.config.ts` `define`) o eliminarlo si no se usa en producción.
3. Mover Web3Forms `access_key` a `VITE_WEB3FORMS_KEY` (sigue pública por diseño en client forms, pero rotatable sin redeploy de código) **o** documentar rotación + rate limit en Web3Forms; preferir env.

**Alternativas:** (B) Serverless proxy para waitlist — más infra; diferir si spam no es problema.

### D7 — Payment prep: schema + contract, sin PSP vivo

**Elección:** Preparar (migración y/o docs de diseño) para fase pagos:

| Pieza | MVP prep |
|---|---|
| `bookings.status = pending_payment` | Ya en enum; documentar transición futura |
| Columnas opcionales | `amount_cents`, `currency`, `payment_provider`, `payment_intent_id`, `paid_at` (nullable) |
| Unique index slot activo | Ya incluye `pending_payment` |
| Webhook | Contrato: Edge Function dedicada, firma PSP, idempotencia por `payment_intent_id`, solo service role confirma `pending_payment` → `confirmed` |
| Precio | Source of truth server-side (tabla `clubs.price_cents` o config) — **no** confiar en amount del cliente |
| Create flow futuro | `create_booking` → `pending_payment` + Checkout Session; hoy sigue `confirmed` |

No se cambia el flujo UI de cobro en este change.

**Alternativas:** (B) Implementar Stripe ya — bloqueado por decisión autónomo (#5). (C) Solo docs sin columnas — más churn al integrar.

### D8 — Profiles migration drift

**Elección:** Si `profiles` existe solo en remoto, añadir migración versionada en repo que sea **idempotente** (`create table if not exists` + policies) para que `supabase db push` / CI no dependan de estado manual.

## Risks / Trade-offs

| Risk | Mitigation |
|---|---|
| Ownership check rompe envío de email si el cliente no manda JWT | Tests + cliente ya envía `Authorization` vía `supabase.functions.invoke` |
| REVOKE anon rompe algún script anónimo | No hay flujo anónimo de booking; verificar post-migrate |
| Headers CSP permisiva da falsa sensación de seguridad | Documentar como “baseline”; CSP strict = follow-up |
| Columnas payment sin uso confunden ops | Nullable + comentario SQL + docs; create_booking no las toca |
| Web3Forms key en `VITE_*` sigue pública | Esperado en forms client-side; rotación fácil; spam = follow-up proxy |
| Activar leaked passwords frustra usuarios con passwords comunes | Copy claro en register; aceptable para piloto |

## Migration Plan

1. Merge código + migraciones SQL (grants, profiles si falta, payment columns opcionales).
2. Deploy Edge Function con ownership check.
3. Deploy Netlify (headers + env sin Gemini secret en define).
4. Dashboard: leaked password protection ON; rotar Web3Forms si estaba en git history.
5. Verificar: advisor grants, test manual “user A no dispara email de booking B”, headers con `curl -I`.
6. Rollback: redeploy función anterior; `down` migration solo si columnas payment no tienen datos (grants revoke es seguro revertir con GRANT).

## Open Questions

1. ¿PSP preferido cuando se cierre #5 (Stripe vs Redsys/Bizum vs otro)? → Afecta webhook signing, no el schema prep genérico.
2. ¿Precio fijo por sesión o por club? → Decide `clubs.price_cents` vs config global.
3. ¿Mantener waitlist Web3Forms en home o retirar tras booking vivo? → Impacta prioridad de rotación de key.
