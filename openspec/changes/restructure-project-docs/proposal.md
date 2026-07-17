## Why

La documentación en `docs/` mezcla análisis históricos (lockers autónomos, Slinger, borradores de contrato Tenniix) con decisiones ya superadas, y no refleja el estado real del negocio: equipo de 2 (Gian tech / Carlos ops), partnership con Tenniix, 1 máquina con IA comprada, y un piloto **concierge** para validar la idea antes de automatizar. Sin una base documental limpia y actualizada, no se puede escalar como startup AI-native ni alinear producto, partners y operaciones.

## What Changes

- **Audit y triage** de todo `docs/` (y contexto útil de landings): qué conservar, qué actualizar, qué archivar o eliminar.
- **Nueva arquitectura documental** mínima y accionable (estructura de carpetas + índice + reglas de mantenimiento).
- **Documentos canónicos nuevos/actualizados**:
  - Lean Canvas del negocio actual (piloto concierge → hub autónomo a medio plazo).
  - Brand book / voz de marca / directrices de imagen (alineado con landings y diseño real).
  - Estrategia y playbooks de partners (Tenniix, presurizadora, clubes).
  - Plan estratégico del proyecto y del piloto concierge (flujo cliente, deal clubes, secuencia de Carlos).
  - Decision log / contexto AI-native (roles, stack de decisiones, qué automatizar después de validar).
- **Archivo de material histórico** (análisis locker, emails de negociación, informes legales/estratégicos previos) sin borrarlo a ciegas: separado del “source of truth” operativo.
- **BREAKING (documental)**: `IDEA.md`, `clubs_b2b_analysis.md` y partes del brand/partner docs dejan de ser la verdad operativa del modelo actual; se reemplazan o se marcan como legacy.
- **Fuera de alcance de este change**: implementar la web de reservas/pagos, emails transaccionales o alta de pagos — eso se documentará como requisitos del piloto, no se construye aquí.

## Capabilities

### New Capabilities

- `docs-architecture`: Taxonomía, índice, reglas de qué vive en `docs/`, naming, archive vs active, y criterio “solo lo necesario”.
- `lean-canvas`: Lienzo lean canónico del negocio VoleaBox en fase piloto concierge y visión de producto.
- `brand-system`: Identidad visual, tipografía, color, imagery y voz de marca como fuente única para producto y marketing.
- `partner-strategy`: Análisis y plan de partners (Tenniix, presurizadora, clubes) alineado al deal y secuencia de go-to-market actual.
- `concierge-pilot`: Operating model del piloto (flujo cliente, deal con clubes, checklist pre-lanzamiento, requisitos de web/reservas/pagos/email tutorial).
- `ai-native-foundation`: Roles del equipo, principios AI-native, decision log y mapa de documentación para que agentes/humanos escalen sin ambigüedad.

### Modified Capabilities

- _(ninguna — no existen specs previas en `openspec/specs/`)_

## Impact

- **Afecta**: carpeta `docs/` (reestructura, renombres, archive), posible `README.md` del repo (enlace al índice de docs), landings solo como **fuente de contexto** (no rediseño en este change).
- **No afecta**: código de producto, APIs, dependencias npm, despliegue.
- **Consumidores**: Gian (tech/producto), Carlos (ops/partners/legal), futuros agentes AI que lean el repo para implementar reservas, pagos, emails y expansión a clubes.
- **Riesgo principal**: perder contexto histórico útil; mitigado con carpeta `docs/archive/` y referencias cruzadas desde el índice.
