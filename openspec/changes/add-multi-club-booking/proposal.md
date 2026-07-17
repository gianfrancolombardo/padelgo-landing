## Why

El customer journey del piloto (`docs/pilot/customer-journey.md`) ya tiene auth; el siguiente bloqueo de producto es **reservar un slot** (checklist #4: web reservas). Sin booking multiclub no hay conversión medible ni operación para Carlos. La waitlist y los CTA actuales (“crear cuenta”) no cierran el loop hacia una sesión confirmada.

**Por qué ahora:** auth está listo; el piloto necesita demanda real (reservas) antes de decidir pagos (#5 abierto). Un flujo mobile-first con persistencia y email de confirmación permite lanzar y medir show-up sin bloquearse en PSP.

## What Changes

- Añadir **flujo de reserva multiclub** para usuarios autenticados: centro → día → hora → confirmación.
- Persistir **clubes, slots y reservas** en Supabase con RLS (el usuario solo ve/crea las suyas; ops puede gestionar disponibilidad).
- Configuración por **club**: hora de inicio y fin de operación, duración de slot por defecto (**1 h**), y **email de contacto** del club (para notificaciones ops/futura confirmación manual).
- Modelo de reserva con estados **`confirmed`** (por defecto), **`pending_confirmation`** (preparado si el club debe validar disponibilidad) y **`cancelled`**; dejar preparado el camino hacia **`pending_payment`** cuando exista cobro web.
- Enviar **email de confirmación** al usuario vía **Resend** (free tier) + Edge Function; revisar alternativas solo si Resend no escala.
- **Política de cancelación** con mínimo de horas de antelación definido en **un único lugar** de configuración (constante compartida cliente + RPC).
- **Tests** para modelo, RPCs, helpers, UI del wizard, account, emails (mock) y política de cancelación.
- **Reorientar CTAs** de la landing B2C hacia “Reservar sesión” / conversión a booking (con gate de login/registro si no hay sesión).
- Mejorar **Account** para mostrar próximas reservas, historial mínimo y enlace a nueva reserva.
- UX/UI **mobile-first**, excelencia de flujo (pasos claros, feedback inmediato, estados vacíos/error, accesibilidad táctil).
- Secciones de soporte a conversión no listadas explícitamente pero necesarias en MVP:
  - **Mis reservas** (cuenta).
  - **Detalle post-confirmación** (club, dirección/cómo llegar, fecha/hora, qué llevar).
  - **Cancelación básica** alineada a política futura (al menos UI + regla de ventana).
  - **FAQ corto** en landing (duración, qué incluye, cancelación/no-show).
  - Placeholder/enlace a **tutorial de bienvenida** en el email (asset Leo cuando exista).
- **Fuera de alcance (esta fase):** pago online (decisión abierta en checklist), app nativa, dashboard club, lockers/H1, OAuth social, recordatorios multi-día avanzados.

## Capabilities

### New Capabilities

- `multi-club-booking`: Flujo UI/UX de reserva multiclub (club → día → hora → confirmación), gate de auth, mobile-first, estados de carga/error/vacío y pantalla de éxito.
- `booking-data-model`: Modelo de datos en Supabase (clubs con horario/duración/contacto, slots, bookings con estados), RLS, generación de slots, creación atómica y config centralizada de cancelación.
- `booking-notifications`: Email transaccional vía **Resend** + Edge Function con plantillas de marca compartidas.
- `booking-email-templates`: Layout y catálogo de plantillas (`lib/email/`) para consistencia en emails actuales y futuros.
- `booking-config`: Constantes de negocio compartidas (mínimo horas cancelación, duración slot por defecto) en un solo módulo.
- `landing-booking-conversion`: Reorientación de CTAs y secciones de la landing B2C hacia conversión a reserva; FAQ/apoyo mínimo al journey.

### Modified Capabilities

- `concierge-pilot`: El journey pasa de “elige horario (pendiente)” a “reserva online persistida + email de confirmación”; actualizar requisitos MVP y checklist de producto.
- `user-auth-ui`: La cuenta deja de ser “coming soon” y muestra reservas + CTA a reservar; post-login redirect preferente hacia booking cuando el origen sea un CTA de reserva.

## Impact

- **Código:** `App.tsx`, `i18n/routes.ts`, `i18n/translations.ts`, `components/HeroCta.tsx`, `components/sections/*`, `components/auth/AccountPage.tsx`, nuevos `components/booking/*`, `lib/` para API de reservas.
- **Supabase:** migraciones (clubs, slots/bookings), RLS, posible Edge Function + secrets para email.
- **Dependencias:** `resend` solo en Edge Function; sin secretos en el cliente.
- **Ops/docs:** `customer-journey.md`, `launch-checklist.md` (item #4/#6), decision log con adopción de Resend.
- **Tests:** vitest para lib, componentes, RPC policy helpers; mocks de Supabase/Resend; cobertura de flujos críticos.
- **No afecta:** landings B2B (clubes, slinger, etc.) salvo coherencia de marca en home B2C.
- **Pago:** no se implementa; columna/estado `pending_payment` documentado para fase PSP; por defecto las reservas quedan `confirmed`.
