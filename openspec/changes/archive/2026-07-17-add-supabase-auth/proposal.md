## Why

El piloto concierge requiere una web donde el jugador pueda identificarse antes de reservar y pagar (`docs/pilot/customer-journey.md`). Hoy la landing B2C solo captura emails vía Web3Forms (waitlist) sin cuentas de usuario ni backend propio. Supabase Auth permite login/registro con mínima infraestructura y escala hacia perfiles, reservas y pagos en fases posteriores.

**Por qué ahora:** el piloto concierge necesita identidad de usuario; se creó el proyecto Supabase dedicado **`voleabox`** (`dqrbnqmizvvaztoniagf`, eu-west-3) para aislar VoleaBox del resto de proyectos.

## What Changes

- Integrar **@supabase/supabase-js** en la landing B2C (Vite + React 19).
- Configurar variables de entorno (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) y cliente Supabase reutilizable.
- Añadir **rutas y UI** de login y registro alineadas con el brand system (dark + volea-green).
- Implementar **flujos de auth**: registro con email/contraseña, login, logout, recuperación de contraseña (mínimo viable).
- Envolver la app con **AuthProvider** para sesión persistente y estado global.
- Configurar en Supabase (vía MCP/CLI): redirect URLs del entorno local y producción, confirmación de email si aplica.
- Opcional en esta fase: tabla `profiles` enlazada a `auth.users` para nombre/display (preparación booking).
- **Fuera de alcance**: reservas, pagos, emails transaccionales, OAuth social (Google/Apple) — se documentan como follow-up.

## Capabilities

### New Capabilities

- `supabase-integration`: Cliente Supabase, configuración de proyecto, variables de entorno, sesión y políticas RLS mínimas para perfiles.
- `user-auth-ui`: Páginas/componentes de login, registro, logout y estados de error/loading en la landing B2C, con i18n ES/EN.

### Modified Capabilities

- `concierge-pilot`: El customer journey pasa de “web sin identidad” a “web con cuenta de usuario” como prerequisito del flujo de reserva; actualizar requisitos de producto MVP.

## Impact

- **Código**: `App.tsx`, `i18n/routes.ts`, nuevos componentes en `components/auth/`, `lib/supabase.ts`, posible `contexts/AuthContext.tsx`.
- **Dependencias**: `@supabase/supabase-js` (nueva).
- **Config**: `.env.example`, `.env.local` (gitignored), redirect URLs en dashboard Supabase.
- **Supabase:** proyecto `voleabox` (`dqrbnqmizvvaztoniagf`, eu-west-3); migración `profiles` aplicada; Auth URLs en dashboard.
- **MCP:** `plugin-supabase-supabase` conectado a org `main`.
- **No afecta**: landings B2B (clubes, slinger, lockers, etc.) salvo enlaces futuros desde la home B2C.
