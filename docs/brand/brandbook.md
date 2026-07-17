# Brand Book — VoleaBox

| Campo | Valor |
|---|---|
| **Owner** | Gian |
| **Última actualización** | 2026-07-17 |
| **Estado** | `active` |

Voz e imagery de campaña: [`voice-and-imagery.md`](voice-and-imagery.md).

## 1. Personalidad

Premium, futurista, alta tecnología. Democratizar entrenamiento de élite:
- Exclusiva pero accesible vía tech.
- Dinámica (rendimiento, mejora).
- Minimalista (sin ruido visual).

## 2. Paleta

| Nombre | HEX | Uso |
|---|---|---|
| Volea Green (primario) | `#3BFF76` | CTAs, acentos, éxito |
| Deep Void | `#050505` | Fondo principal |
| Near-black (landings) | `#020202` | Variante de fondo app shell |
| Carbon Dark | `#1A1D1A` | Superficies secundarias |
| Pure White | `#FAFAFA` | Texto principal |
| Silver Mist | `#D1D5DB` | Texto secundario |
| Accent Red | `#EF4444` | Error / STOP |

Token CSS/Tailwind en código: `volea-green` → `#3BFF76`.

## 3. Tipografía

### Display: Bebas Neue
Títulos H1/H2, mayúsculas, tracking ~`0.05em`. Autoridad deportiva.

### Sans (cuerpo)
**Estado actual en landings:** Inter (pesos 300/400/700) — implementado en `index.html`.

**Regla para trabajo nuevo:** evitar Inter como default “AI/SaaS genérico” en superficies nuevas de marca fuerte; si se cambia el stack, documentar la decisión aquí y actualizar `index.html` en el mismo cambio. Hasta entonces, Inter permanece como tipografía de cuerpo **legacy-compatible** con las landings existentes.

## 4. UI

### Glass
- Background: `rgba(255, 255, 255, 0.03)`
- Blur: `backdrop-filter: blur(10px)`
- Border: `1px solid rgba(255, 255, 255, 0.05)`

### CTA primario
- Fondo Volea Green, texto Carbon Dark / black, `rounded-full`
- Glow: `rgba(59, 255, 118, 0.2)`
- Hover: scale ~1.05 + glow más intenso

## 5. Iconografía

Lucide React, `strokeWidth: 1.5`. Blanco por defecto; Volea Green para acento.

## 6. Fotografía

Low key cinematográfico: pistas modernas, indoor/nocturno, grano fino, spotlights. Overlay negro en gradiente hacia abajo para integrar con fondo dark.

## 7. Motion

Suave y deliberado: Ken Burns en hero, staggered entry (header → títulos → contenido), float sutil opcional.

## 8. Layout

`max-width: 1440px`, contenido centrado, fondos full-bleed.

## Deprecated / no reiniciar

| Antiguo | Regla actual |
|---|---|
| Tratar Inter como “toque Tech/SaaS” aspiracional | Solo compatibilidad legacy; no justificar Inter como identidad premium en docs nuevos |
| Modelo locker como mensaje de marca principal | GTM actual = piloto concierge; H1 es visión (ver Lean Canvas) |
| Ruta `docs/BRANDBOOK.md` | Redirige a este archivo |
