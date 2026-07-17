## Context

**Stack actual:** Vite 6 + React 19 + TypeScript, routing manual por `pathname` en `App.tsx` / `i18n/routes.ts`. La landing B2C (`/`) usa `WaitlistForm` con Web3Forms — sin backend ni identidad de usuario.

**Supabase:** proyecto `voleabox` en `https://dqrbnqmizvvaztoniagf.supabase.co` (ref `dqrbnqmizvvaztoniagf`). MCP `plugin-supabase-supabase` para migraciones, keys y gestión de proyecto.

**Stakeholders:** Gian (implementación), jugadores del piloto (usuarios finales). El customer journey (`docs/pilot/customer-journey.md`) asume web → slot → pago; la cuenta de usuario es el primer paso de producto tras la waitlist.

## Goals / Non-Goals

**Goals:**

- Cliente Supabase singleton con sesión persistente (`localStorage` por defecto del SDK).
- Registro e inicio de sesión con **email + contraseña** (Supabase Auth).
- Rutas `/login` y `/register` (y opcional `/account` post-login) en la landing B2C.
- UI coherente con brandbook (fondo `#020202`/`#050505`, acento `#3BFF76`, formularios rounded-full).
- i18n ES/EN para strings de auth.
- Configuración de Supabase documentada y aplicable vía MCP cuando el token esté disponible.
- Tabla `profiles` opcional (1:1 con `auth.users`) para nombre y metadata futura de reservas.

**Non-Goals:**

- OAuth social (Google, Apple).
- Magic link como flujo principal (puede añadirse después).
- Reservas, pagos, emails transaccionales.
- Auth en landings B2B (clubes, slinger, etc.).
- App móvil nativa.

## Decisions

### D1 — SDK y cliente

**Elección:** `@supabase/supabase-js` v2, cliente en `lib/supabase.ts`.

```ts
createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)
```

**Alternativas:** (A) `@supabase/ssr` — pensado para Next.js; rechazado. (B) REST manual — rechazado: más superficie de error.

### D2 — Estado de sesión

**Elección:** `AuthContext` React con `supabase.auth.onAuthStateChange` + `getSession()` al montar.

**Alternativas:** (A) Zustand/Redux — rechazado: overkill para una sola sesión. (B) Solo hooks locales — rechazado: múltiples componentes necesitan usuario.

### D3 — Routing

**Elección:** extender `i18n/routes.ts` con `login`, `register`, `account` (protegida). Sin react-router para mantener el patrón existente.

| Ruta | Acceso |
|---|---|
| `/login` | público; redirect a `/account` si ya hay sesión |
| `/register` | público; redirect a `/account` si ya hay sesión |
| `/account` | requiere sesión; redirect a `/login` si no |

**Alternativas:** (A) react-router-dom — rechazado: cambio de arquitectura innecesario.

### D4 — Método de autenticación

**Elección:** email + password con `signUp`, `signInWithPassword`, `signOut`, `resetPasswordForEmail`.

**Confirmación de email:** habilitar en Supabase según entorno; en dev puede desactivarse temporalmente. La UI debe mostrar mensaje “revisa tu email” cuando `signUp` devuelve usuario sin sesión activa.

### D5 — Perfiles (schema)

**Elección:** migración `profiles`:

```sql
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users read own profile"
  on public.profiles for select using (auth.uid() = id);

create policy "Users update own profile"
  on public.profiles for update using (auth.uid() = id);

create policy "Users insert own profile"
  on public.profiles for insert with check (auth.uid() = id);
```

Trigger `on_auth_user_created` para insertar fila en `profiles` con `full_name` desde `raw_user_meta_data`.

**Alternativas:** (A) solo `user_metadata` — rechazado: difícil de consultar para booking posterior.

### D6 — Variables de entorno

| Variable | Uso |
|---|---|
| `VITE_SUPABASE_URL` | `https://dqrbnqmizvvaztoniagf.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | clave publishable (segura en cliente con RLS) |

Añadir `.env.example`; `.env.local` en `.gitignore`. Fallar en build si faltan en CI/prod.

### D7 — Configuración Supabase (MCP / dashboard)

Pasos a ejecutar en implementación:

1. **MCP auth:** servidor `plugin-supabase-supabase` conectado a org `main`.
2. **`get_publishable_keys`** → anon key en `.env.local`.
3. **Auth → URL Configuration:**
   - Site URL: `http://localhost:3000` (dev) o URL de producción.
   - Redirect URLs: `http://localhost:3000/**`, dominio de producción.
4. **`apply_migration`** para `profiles` + trigger (si no existe).
5. **Email templates** (opcional fase 1): confirmación y reset en ES.

### D8 — Integración con waitlist existente

**Elección:** mantener `WaitlistForm` en hero por ahora; añadir CTA secundario “Iniciar sesión” / “Crear cuenta” en `Header`. No reemplazar waitlist en este change.

### D9 — Manejo de errores

Mapear códigos comunes de Supabase Auth a mensajes i18n user-friendly (`invalid_credentials`, `email_taken`, `weak_password`, `network_error`). No exponer stack traces.

## Risks / Trade-offs

| Riesgo | Mitigación |
|---|---|
| MCP sin token → no se pueden aplicar migraciones ni leer keys | Documentar pasos manuales en dashboard; `.env.example` con URL conocida |
| Anon key expuesta en cliente | RLS estricto en `profiles`; nunca usar service role en frontend |
| Email confirmation bloquea login en dev | Toggle en Supabase dashboard para dev; mensaje claro en UI |
| Routing manual sin guards centralizados | `AuthGuard` component reutilizable para rutas protegidas |
| Contraseñas débiles | Validación mínima en UI (8+ chars); Supabase policies adicionales en follow-up |

## Migration Plan

1. Configurar env vars y Supabase Auth URLs (dev primero).
2. Aplicar migración `profiles` vía MCP.
3. Desplegar frontend con nuevas rutas; waitlist sigue funcionando.
4. Verificar flujo: register → confirm (si aplica) → login → account → logout.
5. **Rollback:** revertir deploy frontend; tablas auth/profiles en Supabase son aditivas y no rompen waitlist.

## Open Questions

- ¿URL de producción definitiva para Site URL / redirects? (Vercel, Firebase Hosting, otro)
- ¿Confirmación de email obligatoria en piloto o solo en prod?
- ¿Recoger `full_name` en registro o solo email/password en v1?
