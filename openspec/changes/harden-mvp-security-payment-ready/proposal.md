## Why

El piloto ya tiene auth + reservas en producción de código (Netlify + Supabase), pero un audit rápido revela huecos explotables a escala baja: la Edge Function de email no verifica ownership del booking, `anon` aún tiene `EXECUTE` en RPCs `SECURITY DEFINER`, faltan headers de seguridad en Netlify, y hay secretos/claves mal acotados (Web3Forms hardcodeada, riesgo de `GEMINI_API_KEY` en el bundle). Antes de tráfico real o de integrar un PSP, hay que dejar el MVP **seguro por defecto** sin overbuild de enterprise, y **preparar el modelo** para pagos (estado, columnas, webhook) sin implementar cobro aún.

## What Changes

- **Auditar y endurecer** la superficie de ataque del MVP (auth, RLS/grants, Edge Functions, secrets, headers Netlify) con el bar de “piloto con decenas/cientos de usuarios”, no “marketplace a escala”.
- Corregir **autorización de la Edge Function** `send-booking-confirmation`: el caller JWT DEBE ser el dueño del booking (no basta `verify_jwt` del gateway).
- **Revocar** `EXECUTE` de `anon`/`PUBLIC` en RPCs sensibles (`create_booking`, `cancel_booking`, `handle_new_user`) y alinear grants con el principio least-privilege.
- Activar **protección de contraseñas filtradas** (HaveIBeenPwned) en Supabase Auth y alinear `minLength` UI (≥ 8).
- Añadir **headers de seguridad mínimos** en Netlify (`netlify.toml` / `_headers`: HSTS, X-Frame-Options, Referrer-Policy, CSP pragmática para el stack actual).
- Higiene de **secrets**: `.env` en `.gitignore`; no inyectar API keys de terceros en el bundle Vite; mover/rotar access key de Web3Forms.
- Versionar en repo la migración de **`profiles`** si falta (evitar drift remoto vs código).
- **Preparar (no implementar) pagos**: documentar y, donde haga falta, extender el modelo (`pending_payment`, campos de amount/currency/provider ids, unique index que reserve slot en pending payment) y un contrato de webhook firmado para la fase PSP.
- Actualizar docs de piloto / decision log con la postura de seguridad MVP y el camino a cobro.

## Capabilities

### New Capabilities

- `mvp-security-baseline`: Baseline de seguridad del piloto Netlify + Supabase (RLS/grants, Edge Function authz, headers, secrets hygiene, password policy, checklist de verificación).
- `payment-integration-prep`: Preparación del dominio de reservas y ops para integrar un PSP (Stripe u otro) sin cobro en este change: modelo de datos, estados, idempotencia, webhook contract, non-goals claros.

### Modified Capabilities

- `supabase-integration`: Endurecer requisitos de client keys, grants RPC, Edge Functions con ownership check, y configuración Auth (leaked passwords / Site URL).
- `user-auth-ui`: Política de contraseña mínima alineada (≥ 8) y mensajes coherentes.
- `concierge-pilot`: Documentar postura de seguridad MVP y que el journey de pago queda “preparado / decisión abierta”, no implementado.

## Impact

- **Código:** `supabase/functions/send-booking-confirmation`, migraciones SQL (grants + posible profiles + payment prep columns), `components/auth/RegisterPage.tsx`, `vite.config.ts`, posible `netlify.toml` / `_headers`, `WaitlistForm` / env Web3Forms, `.gitignore`.
- **Supabase Dashboard:** Auth leaked-password protection; secrets de Edge Function (sin cambios de product secrets en cliente).
- **Netlify:** headers de respuesta; env vars de build sin keys secretas en `define`.
- **Docs:** `docs/pilot/*`, `docs/ops/decision-log.md` (seguridad MVP + prep pagos).
- **Tests:** ownership en Edge Function (o contrato), grants/RLS, password min length, headers config smoke si aplica.
- **Fuera de alcance:** implementar Stripe Checkout/webhooks en producción, rate limiting avanzado a escala, CSP estricta que elimine CDNs runtime, panel admin, OAuth social.
