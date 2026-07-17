# Decision log

| Campo | Valor |
|---|---|
| **Owner** | shared |
| **Última actualización** | 2026-07-17 |
| **Estado** | `active` |

Formato: fecha · contexto · opciones · elección · owner.

---

### 2026-07 — Piloto concierge-first

- **Contexto:** Validar demanda antes de invertir en hubs/lockers autónomos.
- **Opciones:** (A) Lanzar modelo locker desde día 1 · (B) Concierge con 1 máquina · (C) Solo venta de hardware.
- **Elección:** **B** — concierge piloto (H0); H1 hub autónomo queda como visión.
- **Owner:** Carlos + Gian.

### 2026-07 — Partner hardware Tenniix

- **Contexto:** Necesidad de máquina con IA para diferenciar el entrenamiento.
- **Opciones:** Fabricantes legacy / Tenniix / solo marca propia.
- **Elección:** Partnership con **Tenniix**; 1 unidad adquirida para prueba.
- **Owner:** Carlos.

### 2026-07 — Split de roles (2 personas)

- **Contexto:** Equipo mínimo.
- **Elección:** Gian = tech; Carlos = ops (partners, clubes, concierge, legal/seguro).
- **Owner:** shared.

### 2026-07 — Pagos / autónomo (PENDIENTE)

- **Contexto:** Carlos en paro; hace falta cobro online para el journey ideal.
- **Opciones:** Alta autónomo + PSP · retrasar cobro online · entidad alternativa si existe.
- **Elección:** *Sin decidir.* Ver [`../pilot/launch-checklist.md`](../pilot/launch-checklist.md).
- **Owner:** Carlos + Gian.

### 2026-07-17 — Email transaccional de reservas (Resend)

- **Contexto:** Confirmación de booking en piloto; opciones gratis/freemium evaluadas.
- **Opciones:** Resend free tier · Brevo · EmailJS / SMTP.
- **Elección:** **Resend** vía Supabase Edge Function `send-booking-confirmation`; secrets en dashboard (no en cliente).
- **Owner:** Gian.
