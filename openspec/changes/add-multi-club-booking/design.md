## Context

**Stack:** Vite 6 + React 19 + TypeScript, routing por `pathname` (`i18n/routes.ts`), auth Supabase ya en producción de código (`AuthContext`, `/login`, `/register`, `/account`). Proyecto Supabase `voleabox` (`dqrbnqmizvvaztoniagf`).

**Producto:** piloto concierge multiclub — el jugador elige centro, día y hora; Carlos opera in situ. Pago online sigue **decisión abierta** (checklist #5). Email de confirmación + tutorial (checklist #6) es parte de este change; el asset de vídeo puede ser placeholder URL.

**Constraints:** mobile-first; brand dark + `#3BFF76`; i18n ES/EN; sin secretos en cliente; RLS obligatorio; no overbuild H1 (lockers/dashboard club).

**Stakeholders:** Gian (implementación), Carlos (ops / disponibilidad real), jugadores piloto.

## Goals / Non-Goals

**Goals:**

- Flujo de reserva autenticado: **club → día → hora → confirmación**, mobile-first, UX excelente.
- Persistencia fiable en Postgres (Supabase) con prevención de doble booking.
- Configuración por club (horario apertura/cierre, duración slot 1 h, email contacto).
- Estados de reserva extensibles (`confirmed` por defecto; `pending_confirmation` preparado; camino a `pending_payment`).
- Email de confirmación vía **Resend** (decisión cerrada para MVP).
- Política de cancelación centralizada (mínimo horas en un solo módulo).
- **Tests automatizados** para capa datos, negocio, UI y notificaciones.
- Landing y header/CTA orientados a conversión “Reservar”.
- Account con próximas reservas y cancelación básica.
- Docs de piloto actualizados al nuevo journey (reserva sin exigir pago aún).

**Non-Goals:**

- Cobro Stripe/PSP, facturación, autónomo.
- Panel admin web completo (seed/SQL o script mínimo para clubs/slots basta en MVP).
- Multi-pista compleja por club (1 recurso máquina/sesión por club en piloto).
- Recordatorios D-1 / SMS / WhatsApp.
- OAuth social, app nativa, landings B2B.

## Decisions

### D1 — Modelo de disponibilidad: slots pregenerados desde config de club

**Elección:** tablas `clubs` + `time_slots` + `bookings`.

**`clubs`** incluye configuración operativa:

| Campo | Tipo | Default | Uso |
|---|---|---|---|
| `opening_time` | `time` | ej. `09:00` | Hora inicio operación |
| `closing_time` | `time` | ej. `22:00` | Hora fin operación |
| `slot_duration_minutes` | `int` | `60` | Duración de cada slot |
| `contact_email` | `text` | — | Email del club para notificaciones ops |
| `requires_confirmation` | `boolean` | `false` | Si `true`, reserva → `pending_confirmation` |

Los slots se generan (seed/script) respetando `opening_time`–`closing_time` y `slot_duration_minutes` del club. Ejemplo: 09:00–22:00 con 60 min → slots 09:00, 10:00, …, 21:00.

```text
clubs (config horario + contacto) ──< time_slots ──?< bookings
```

Un slot `available` pasa a `booked` en la misma transacción que inserta el booking (RPC).

**Alternativas:** (B) Reglas semanales on-the-fly — diferir post-piloto. (C) Calendario externo — rechazada.

### D2 — Estados de reserva (extensibles, sin pago aún)

**Elección:** enum `bookings.status`:

| Estado | MVP | Descripción |
|---|---|---|
| `confirmed` | **Default** | Reserva válida; slot ocupado |
| `pending_confirmation` | Preparado | Club debe validar (`clubs.requires_confirmation = true`) |
| `cancelled` | Sí | Usuario/ops canceló; slot liberado |
| `pending_payment` | **Reservado** | Para fase PSP; no se usa en create aún |

**Default en `create_booking`:** `confirmed` (todos los clubes con `requires_confirmation = false` en piloto).

Si en el futuro `requires_confirmation = true`: booking → `pending_confirmation`, email al jugador (“solicitud recibida”) y opcionalmente al `contact_email` del club.

**Pago futuro:** transición `pending_payment` → `confirmed` tras webhook PSP; unique index de slot activo debe incluir `confirmed` y `pending_confirmation` (y luego `pending_payment`).

Copy UI/email MVP: “Reserva confirmada”.

### D3 — Flujo UI: wizard a pantalla completa en `/book`

**Elección:** ruta protegida `/book` (y `/en/book` si aplica) con stepper vertical mobile-first:

1. Lista de clubes (nombre, ciudad, chip distancia opcional luego).
2. Calendario/días con slots disponibles (solo días con huecos).
3. Grid de horas táctiles.
4. Resumen + CTA confirmar.
5. Pantalla éxito + “ver en mi cuenta”.

Un paso visible a la vez en mobile; breadcrumb/stepper compacto. Sin cards decorativas en hero de booking; composición limpia brand.

**Alternativas:** (A) Single-page all-visible — saturado en móvil. (B) Modal desde landing — malo para deep-link y auth redirect.

### D4 — Auth gate y redirect

**Elección:** `/book` detrás de `AuthGuard`. CTAs “Reservar” → `/book` si hay sesión; si no → `/login?next=/book` (o `/register?next=/book`). Tras login/registro exitoso, honorar `next`.

**Alternativas:** (A) Permitir elegir club anónimo y pedir auth al confirmar — más conversión percibida pero más estado huérfano; diferir si métricas lo piden.

### D5 — Email: Resend + Edge Function + plantillas de marca (decisión cerrada)

**Elección:** **Resend** como único proveedor en MVP. Edge Function `send-booking-confirmation` con JWT verificado.

**Sistema de plantillas (emails futuros):**

| Módulo | Rol |
|---|---|
| `lib/email/brand.ts` | Tokens de color/copy footer |
| `lib/email/layout.ts` | `renderVoleaEmail()` — shell HTML dark + volea-green |
| `lib/email/templates/*` | Contenido por tipo de email |
| `lib/email/registry.ts` | Catálogo live/planned |
| `supabase/functions/_shared/email/` | Copia desplegada (mantener en sync con `lib/email/`) |
| `docs/brand/email-templates.md` | Guía ops + roadmap de plantillas |

Plantillas **live:** confirmación y pending confirmation (misma función, distinto copy). **Planned:** cancelación, notificación club, tutorial, password reset.

Secrets en Supabase (no en cliente): `RESEND_API_KEY`, `RESEND_FROM`, `SITE_URL`, `BOOKING_TUTORIAL_URL`.

**Destinatarios:**
- Jugador: siempre en confirmación.
- Club (`contact_email`): preparado para `pending_confirmation` (plantilla planned).

**Alternativas descartadas:** HTML ad-hoc por email, Brevo, plantillas Supabase Auth para booking.

### D6 — Prevención de doble reserva

**Elección:**

1. `time_slots` con `status` check (`available` | `booked` | `blocked`).
2. Unique partial index: como máximo un booking activo (`confirmed`, `pending_confirmation`, y en futuro `pending_payment`) por `slot_id`.
3. RPC `create_booking(slot_id)` en Postgres: `UPDATE … WHERE status = 'available' RETURNING …` + `INSERT bookings`; falla limpio si race.

Cliente llama RPC vía `supabase.rpc('create_booking', { p_slot_id })`.

### D7 — Cancelación y config centralizada

**Elección:** módulo único `lib/bookingConfig.ts` (exporta p. ej. `DEFAULT_SLOT_DURATION_MINUTES = 60`, `MIN_CANCELLATION_HOURS = 12`). El cliente importa para UI (mostrar si cancelable, mensajes FAQ); la RPC `cancel_booking` lee el mismo valor vía constante SQL duplicada en migración **o** tabla `app_settings` con una fila — preferir **constante en TS + mismo literal documentado en RPC** con test que verifique paridad, o función SQL `get_min_cancellation_hours()` que lee `app_settings`.

**MVP pragmático:** `lib/bookingConfig.ts` como source of truth + RPC recibe el check con `interval '12 hours'` generado desde migración que referencia el mismo default; test de integración documenta que ambos deben cambiarse juntos. Alternativa más limpia: tabla `app_settings(key, value)` con seed `min_cancellation_hours = 12` — RPC y cliente leen de ahí (cliente vía RPC read-only o env `VITE_MIN_CANCELLATION_HOURS` sincronizado manualmente). **Elegir `app_settings` si queremos un solo lugar en DB; elegir `bookingConfig.ts` + test de paridad si queremos cero tabla extra.**

**Decisión final:** `lib/bookingConfig.ts` exporta `MIN_CANCELLATION_HOURS`; RPC usa el mismo número en SQL (comentario “keep in sync with bookingConfig.ts”); test unitario `bookingConfig.test.ts` + test RPC que valida ventana.

Cancelación: `bookings.status = cancelled` + slot → `available`. Email cancelación fuera de MVP estricto.

### D8 — Seed de datos

**Elección:** migración seed con 1–2 clubes piloto con `opening_time`, `closing_time`, `slot_duration_minutes = 60`, `contact_email`, `requires_confirmation = false`. Script SQL genera slots para 2–4 semanas dentro del horario del club.

### D9 — Landing conversion

**Elección:**

- Hero primary CTA → **Reservar sesión** (`/book` o login+next).
- Secondary → Cómo funciona / scroll, no “crear cuenta” como primario.
- Header CTA logged-out: Reservar (misma lógica next).
- Sustituir copy “próximamente reserva” en Account.
- Añadir sección corta **FAQ** (duración, qué incluye, cancelación) y reforzar **Cómo funciona** hacia el funnel reserva.
- Bottom CTA = Reservar.

Preservar brand: VoleaBox hero-level; un headline; un CTA group; mobile-first.

### D10 — i18n y rutas

Extender `ROUTES` con `book`. Strings ES/EN para wizard, errores, email subjects (Edge Function puede usar locale del perfil o `Accept-Language` / campo `locale` en booking).

### D11 — Observabilidad ops

Carlos necesita ver reservas: MVP = vista SQL en Dashboard Supabase o query guardada; no admin UI. Documentar en playbook “cómo listar reservas del día”. `clubs.contact_email` disponible para comunicación manual o emails futuros.

### D12 — Estrategia de tests

**Elección:** Vitest en todo el stack de booking:

| Capa | Qué testear |
|---|---|
| `lib/bookingConfig.ts` | Valores default, helper `canCancelBooking(startsAt, now)` |
| `lib/booking*.ts` | Helpers con Supabase mock: list clubs/slots, create, cancel, conflict |
| RPC (integración) | `create_booking` atómico, double-book, cancel dentro/fuera ventana, status default `confirmed` |
| `components/booking/*` | Wizard steps, empty/error, slot conflict, mobile stepper |
| `AccountPage` | Lista reservas, cancel elegible/no elegible, estados `pending_confirmation` |
| Edge Function | Unit test del handler con Resend mock; template ES/EN |
| `i18n/routes` | Ruta `/book` |
| Landing CTAs | Hero/header apuntan a booking funnel |

Objetivo: **≥95 % cobertura en código nuevo** de booking (alineado con reglas del proyecto).

## Risks / Trade-offs

| Riesgo | Mitigación |
|---|---|
| Race double-book | RPC atómica + unique index |
| Email free tier / dominio | Resend sandbox en dev; verificar dominio antes de tráfico real; fallback UI “reserva OK aunque email falle” + log |
| Disponibilidad desactualizada vs realidad ops | Seed + proceso claro Carlos↔Gian; status `blocked` en slots |
| Conversión sin pago = no-shows | Política cancelación/no-show (checklist legal); ventana cancelación; métrica show-up |
| Overbuild calendario | Solo días con slots; no full calendar library si un date strip basta |
| Auth redirect loops | Tests de `next` param; AuthGuard único |

## Migration Plan

1. Migración schema: `clubs`, `time_slots`, `bookings` + RLS + RPC `create_booking` / `cancel_booking`.
2. Seed clubs + slots piloto.
3. Edge Function + secret `RESEND_API_KEY` + (opcional) webhook DB.
4. Deploy UI `/book` + CTAs landing + Account.
5. Smoke test: register → book → email llega → cancel.
6. Rollback: feature-flag por ruta o revert deploy UI; DB migrations forward-only (marcar slots `blocked` si hace falta pausar).

## Open Questions

1. ¿Nombres/direcciones reales de clubes piloto, horarios y `contact_email`? (Carlos)
2. ¿Algún club piloto requerirá `requires_confirmation = true` desde día 1?
3. ¿Email de cancelación en MVP o solo confirmación?
4. ¿Dominio de envío Resend (`hola@voleabox.com` u otro) y DNS listo?
5. Tras decisión PSP: flujo `pending_payment` → `confirmed` y si el pago reemplaza o precede confirmación de club.
