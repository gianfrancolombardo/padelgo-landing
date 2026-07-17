# Playbook concierge

| Campo | Valor |
|---|---|
| **Owner** | Carlos |
| **Última actualización** | 2026-07-17 |
| **Estado** | `active` |

Journey del cliente: [`customer-journey.md`](customer-journey.md). Gates de lanzamiento: [`launch-checklist.md`](launch-checklist.md).

## Gates pre-lanzamiento (ops)

- [ ] Máquina testeada a fondo
- [ ] Seguro de responsabilidad civil contratado
- [ ] Términos y condiciones + política de cancelaciones / no-shows
- [ ] Partners listos (Tenniix escrito + presurizadora) — ver roadmap

## Día de sesión

1. **Setup** — máquina, pelotas, zona segura, checklist rápido de seguridad.
2. **Recepción** — cliente con reserva confirmada.
3. **Briefing ~5 min** — uso básico, seguridad, golpes a trabajar; asumir que ya vio el tutorial de bienvenida.
4. **Entrenamiento** — Carlos disponible para soporte; no sustituye a un coach de élite.
5. **Pack-down** — recoger, inventario pelotas, dejar el espacio como se encontró.
6. **Cierre** — nota rápida de incidencias / feedback (alimento de métricas del Lean Canvas).

## Reservas del día (Supabase)

Query guardada sugerida en el proyecto `voleabox`:

```sql
select b.id, b.status, c.name as club, c.contact_email, ts.starts_at, ts.ends_at, u.email
from bookings b
join clubs c on c.id = b.club_id
join time_slots ts on ts.id = b.slot_id
join auth.users u on u.id = b.user_id
where b.status in ('confirmed', 'pending_confirmation')
  and ts.starts_at::date = current_date
order by ts.starts_at;
```

`clubs.contact_email` se usa para notificaciones al club cuando `requires_confirmation = true` (futuro).

## Principios

- El club no opera la máquina.
- Seguridad > espectáculo.
- Documentar fallos de hardware para Leo/Tenniix y para iterar el producto.
