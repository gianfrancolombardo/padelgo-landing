## Context

VoleaBox es una startup de entrenamiento de pádel con hardware + software. El repo actual es principalmente landings (B2C waitlist, B2B clubes, partners Slinger/Pascal Box/lockers/lanzadoras) y una carpeta `docs/` desalineada con la realidad:

| Archivo actual | Estado vs realidad |
|---|---|
| `IDEA.md` | Modelo **locker autónomo**; el go-to-market activo es **piloto concierge** |
| `clubs_b2b_analysis.md` | Auditoría de landing de lockers; el deal clubes actual es espacio + promo, sin operación del club |
| `BRANDBOOK.md` | Útil pero parcialmente desfasado (tipografía Inter, énfasis waitlist) |
| `analisis-estrategico-tenniix.md` | Análisis de borrador contractual; el deal ya avanzó (máquina comprada) — conservar como archive + actualizar estado |
| `emails.md` | Histórico de negociación — archive |
| PDFs Tenniix | Artefactos de partner — `docs/partners/tenniix/` |

**Stakeholders:** Gian (tecnología/producto), Carlos (operación/partners/legal).  
**Constraint:** documentación mínima, canónica, AI-readable; sin essays innecesarios.  
**Momento:** pre-piloto; secuencia ops de Carlos: test máquina → acuerdo escrito “Powered by Tenniix” → partner presurizadora → clubes.

## Goals / Non-Goals

**Goals:**

- Una taxonomía `docs/` con índice único (`docs/README.md`) como puerta de entrada.
- Documentos canónicos actualizados: Lean Canvas, brand, partners, piloto concierge, foundation AI-native.
- Separar **active** vs **archive** sin perder historia.
- Capturar requisitos del piloto (web reservas/pago, email+tutorial, legal/seguro) como specs de negocio, no como código.
- Hacer el corpus usable por humanos y por agentes AI.

**Non-Goals:**

- Implementar reservas, pagos, emails o vídeo tutorial.
- Rediseñar landings o cambiar el código de producto.
- Redactar términos legales definitivos (Carlos los prepara; docs solo listan obligaciones y estado).
- Resolver alta de autónomo / PSP de pagos (documentar opciones y decisión pendiente).

## Decisions

### D1 — Estructura de carpetas (active vs archive)

**Elección:** 

```
docs/
  README.md                 # índice + mapa de decisiones
  strategy/
    lean-canvas.md
    roadmap.md
  brand/
    brandbook.md
    voice-and-imagery.md
  partners/
    overview.md
    tenniix.md
    pressurizer.md
    clubs.md
  pilot/
    concierge-playbook.md
    customer-journey.md
    launch-checklist.md
  ops/
    team-and-roles.md
    ai-native-principles.md
    decision-log.md
  archive/                  # histórico, no source of truth
    ...
```

**Alternativas:** (A) todo flat en `docs/` — rechazado: no escala; (B) Notion externo — rechazado: el objetivo es repo AI-native.  
**Rationale:** una carpeta = un job; archive evita borrar contexto contractual/estratégico.

### D2 — Qué archivar vs reescribir

| Origen | Destino |
|---|---|
| `IDEA.md` | `archive/idea-locker-model-2025.md` + extractos útiles al Lean Canvas |
| `clubs_b2b_analysis.md` | `archive/` + insights vigentes a `partners/clubs.md` |
| `analisis-estrategico-tenniix.md` | `archive/` + estado actual en `partners/tenniix.md` |
| `emails.md` + PDFs | `archive/tenniix/` o `partners/tenniix/assets/` |
| `BRANDBOOK.md` | Reescribir en `brand/` (no solo mover) |

### D3 — Modelo de negocio documentado en dos horizontes

**Elección:** Lean Canvas y roadmap con **H0 Piloto concierge** (ahora) y **H1 Hub autónomo** (visión landings/IDEA).  
**Alternativa:** documentar solo el estado final autónomo — rechazado: confunde al equipo y a la AI en la fase actual.  
**Rationale:** el piloto valida demanda; la automatización (lockers, app) es hipótesis post-validación.

### D4 — Partners: tres playbooks separados

**Elección:** Tenniix / Presurizadora / Clubes como docs independientes + `overview.md`.  
**Rationale:** secuencia de Carlos es serial; cada partner tiene estado, next actions y owners distintos.

### D5 — Requisitos de producto del piloto viven en docs, no en código aún

**Elección:** `pilot/concierge-playbook.md` + `customer-journey.md` capturan: QR → web → reserva → pago → email+tutorial → sesión concierge.  
**Rationale:** próximo change de implementación (`/opsx:propose` de booking) partirá de estos docs.

### D6 — Idioma de docs

**Elección:** docs de negocio/estrategia en **español** (equipo y stakeholders); identificadores de archivos y headings técnicos en inglés kebab-case donde ayude a agentes. Contenido principal en español para Carlos/Gian.  
**Rationale:** alinea con regla de comunicación del repo; código sigue en inglés.

### D7 — Criterio de “solo lo necesario”

Cada doc active MUST:

1. Tener un owner (Gian / Carlos / shared).
2. Tener “última actualización” y “estado” (draft / active / superseded).
3. No duplicar: si algo está en Lean Canvas, los demás enlazan.
4. Caber en lectura &lt;10 min salvo playbooks operativos.

## Risks / Trade-offs

- **[Risk] Over-documentation** → Mitigation: tope de archivos active listado en design; rechazar docs “nice to have” en tasks.
- **[Risk] Borrar contexto legal/partner útil** → Mitigation: archive obligatorio antes de delete; PDFs nunca se pierden.
- **[Risk] Docs y landings divergen** → Mitigation: `docs/README.md` marca landings como marketing hypothesis; truth operativa = `pilot/` + `strategy/`.
- **[Risk] Scope creep a producto** → Mitigation: Non-Goals explícitos; requisitos de booking solo como checklist.
- **[Trade-off] Español en docs vs inglés en specs OpenSpec** → Specs del change en inglés normativo (SHALL); docs de producto en español.

## Migration Plan

1. Crear nueva estructura de carpetas (vacía) + `docs/README.md`.
2. Mover archivos legacy a `docs/archive/` (git mv para conservar historial).
3. Redactar docs canónicos active desde contexto actual + extractos archive + landings.
4. Actualizar README del repo con enlace al índice.
5. Verificación: un agente/humano puede responder “¿qué hacemos ahora?” solo con `docs/README.md` + `pilot/`.

**Rollback:** revertir el commit de reestructura; archive no destruye contenido.

## Open Questions

1. **Pagos en piloto:** ¿Stripe/SumUp/etc. con alta de autónomo de Carlos, o solución temporal sin autónomo? (documentar opciones; decisión de Carlos+Gian).
2. **Nombre comercial en clubes:** ¿VoleaBox + “Powered by Tenniix” confirmado por escrito? (bloqueante ops).
3. **Partner presurizadora:** ¿Pascal Box sigue siendo el target o hay alternativas? (landings asumen Pascal Box).
4. **¿Conservar landings Slinger/lockers públicas** mientras el piloto es concierge? (fuera de este change; anotar en decision-log).
