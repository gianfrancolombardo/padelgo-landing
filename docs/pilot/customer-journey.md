# Customer journey — piloto

| Campo | Valor |
|---|---|
| **Owner** | Gian (producto) · Carlos (ops in situ) |
| **Última actualización** | 2026-07-17 |
| **Estado** | `active` |

## Flujo end-to-end

1. Ve **banner con QR** en el club o en sus redes.
2. Entra a la **web VoleaBox**.
3. **Crea cuenta o inicia sesión** (Supabase Auth).
4. **Reserva multiclub** (centro → día → hora → confirmación) en `/book`.
5. Recibe **email de confirmación** (Resend) + enlace al **tutorial** cuando exista.
6. **Pago online** — decisión pendiente (PSP/autónomo); la reserva queda confirmada sin cobro web en MVP.
7. Llega al club; Carlos tiene todo listo.
8. **Briefing ~5 min** → entrena → recogida.

## Requisitos de producto (MVP)

| Capacidad | Notas |
|---|---|
| Landing/booking simple y profesional | CTAs → `/book`; mobile-first |
| **Cuenta de usuario (login/registro)** | Supabase Auth — implementado |
| **Reserva multiclub** | Clubes con horario, slots 1 h, estados `confirmed` / `pending_confirmation` (preparado) |
| Pago online | Decisión autónomo/PSP — ver checklist; estado `pending_payment` reservado |
| Email transaccional al confirmar | **Resend** vía Edge Function |
| Vídeo tutorial | Assets: pedir a Leo máquina en acción + guion golpes |

## Fuera de este journey (ahora)

Lockers, app de acceso autónomo, dashboard del club. Eso es H1.
