# VoleaBox



Entrenamiento de pádel con máquina + IA. Piloto actual: modelo **concierge** (reserva online, sesión in situ) en clubes; visión a medio plazo: hub autónomo.



**Equipo:** Gian (tecnología) · Carlos (operaciones).



## Documentación



Toda la verdad operativa del negocio está en **[`docs/README.md`](docs/README.md)** (Lean Canvas, brand, partners, piloto, decisiones).



## Run locally



**Prerequisites:** Node.js, pnpm



1. Install dependencies: `pnpm install`

2. Copy `.env.example` → `.env.local` and set Supabase keys (see below)

3. Run: `pnpm dev` (default port **3000**)
4. Run tests: `pnpm test` (unit + component; uses `.env.local` for Supabase integration tests)



### Supabase Auth



| Campo | Valor |

|---|---|

| Proyecto | `voleabox` |

| Project ref | `dqrbnqmizvvaztoniagf` |

| API URL | `https://dqrbnqmizvvaztoniagf.supabase.co` |



En [Supabase Dashboard](https://supabase.com/dashboard/project/dqrbnqmizvvaztoniagf/auth/url-configuration) configurar:



- **Site URL:** `http://localhost:3000` (dev) / URL de producción

- **Redirect URLs:** `http://localhost:3000/**` y dominio de prod



Para desarrollo rápido puedes desactivar *Confirm email* en Authentication → Providers → Email.



Rutas de auth en la landing: `/login`, `/register`, `/account`.



Landings (marketing / hipótesis H1) viven en este repo; no sustituyen el playbook del piloto en `docs/pilot/`.

