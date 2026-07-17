# Principios AI-native

| Campo | Valor |
|---|---|
| **Owner** | Gian |
| **Última actualización** | 2026-07-17 |
| **Estado** | `active` |

## Reglas

1. **Docs active = source of truth.** Empezar en [`../README.md`](../README.md).
2. **OpenSpec** para cambios de producto/docs materiales (`/opsx:propose` → `/opsx:apply`).
3. **Automatizar después de validar** el piloto (H0); no construir H1 por inercia de las landings.
4. **Decisiones materiales** → [`decision-log.md`](decision-log.md).
5. **Secrets fuera del repo** (`.env`, claves PSP, datos personales de clientes).
6. **Archive no es verdad operativa** sin contrastar.
7. Código e identificadores en **inglés**; docs de negocio en **español**.

## Para agentes

Antes de proponer código de reservas/pagos/email: leer `pilot/customer-journey.md` + `pilot/launch-checklist.md` + roles.
