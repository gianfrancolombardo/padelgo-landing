# Launch checklist — piloto

| Campo | Valor |
|---|---|
| **Owner** | shared |
| **Última actualización** | 2026-07-17 |
| **Estado** | `active` |

Secuencia: [`../strategy/roadmap.md`](../strategy/roadmap.md).

## Blockers antes de clubes

| # | Item | Owner | Estado | Bloquea clubes |
|---|---|---|---|---|
| 1 | Test completo de la máquina | Carlos | Pendiente | Sí |
| 2 | Acuerdo escrito *Powered by Tenniix* | Carlos | Pendiente | Sí |
| 3 | Partner presurizadora cerrado | Carlos | Pendiente | Sí |

## Producto (puede ir en paralelo)

| # | Item | Owner | Estado | Nota |
|---|---|---|---|---|
| 4 | Web reservas multiclub + email Resend | Gian | En progreso | `/book` + Edge Function |
| 5 | **Pagos / autónomo — decisión abierta** | Carlos + Gian | Pendiente | Ver abajo |
| 6 | Email confirmación + tutorial vídeo | Gian (+ assets Leo) | En progreso | Resend configurado en Supabase secrets |

## Legal / riesgo (pre-arranque)

| # | Item | Owner | Estado |
|---|---|---|---|
| 7 | Términos y condiciones | Carlos | Pendiente |
| 8 | Política cancelaciones / no-shows | Carlos | Pendiente |
| 9 | Seguro responsabilidad civil | Carlos | Pendiente |

## Decisión abierta: pagos

Carlos puede no estar de alta como autónomo aún. Opciones a evaluar (sin atajos ilegales):

1. **Alta de autónomo ahora** + PSP estándar (p.ej. Stripe) — más limpio cerca del lanzamiento.
2. **Retrasar cobro online** hasta alta (solo waitlist / reserva manual) — reduce riesgo, frena el journey ideal.
3. Otras vías legales de cobro vía entidad ya constituida — solo si existe y encaja.

**Owner de la decisión:** Carlos + Gian. Registrar el outcome en [`../ops/decision-log.md`](../ops/decision-log.md).
