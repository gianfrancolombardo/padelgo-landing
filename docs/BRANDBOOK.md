# VoleaBox Brand Book

Este documento define la identidad visual y el lenguaje de diseño de VoleaBox, diseñado para transmitir una experiencia **Premium, Futurista y de Alta Tecnología**.

---

## 1. Personalidad de Marca
VoleaBox no es solo una máquina; es la democratización del entrenamiento de élite. La marca debe sentirse:
- **Exclusiva**: Pero accesible mediante tecnología.
- **Dinámica**: Enfocada en el rendimiento y la mejora continua.
- **Minimalista**: Sin ruido visual, directa y eficiente.

---

## 2. Paleta de Colores
La marca utiliza un esquema de contraste extremo para resaltar la tecnología sobre un entorno oscuro y cinemático.

| Nombre | HEX / Valor | Aplicación |
| :--- | :--- | :--- |
| **Volea Green** (Primario) | `#3BFF76` | CTAs, acentos, iconos activos, estados de éxito. |
| **Deep Void** (Fondo) | `#050505` | Fondo principal, secciones profundas. |
| **Carbon Dark** | `#1A1D1A` | Tarjetas de contenido, secciones secundarias. |
| **Pure White** | `#FAFAFA` | Texto principal, títulos destacados. |
| **Silver Mist** | `#D1D5DB` | Texto secundario o descriptivo. |
| **Accent Red** | `#EF4444` | Etiquetas "STOP" o estados de error. |

---

## 3. Tipografía
Utilizamos dos familias tipográficas de Google Fonts para diferenciar entre jerarquía visual e información legible.

### Display: **Bebas Neue**
- **Uso**: Títulos principales (H1, H2), Títulos de tarjetas (Header).
- **Características**: Mayúsculas, tracking expandido (`0.05em`), peso robusto.
- **Propósito**: Transmitir agresividad deportiva y autoridad.

### Sans: **Inter**
- **Uso**: Cuerpo de texto, micro-copy, enlaces de navegación.
- **Características**: Pesos 300 (Light) y 400 (Regular).
- **Propósito**: Facilitar la lectura y añadir el toque "Tech/Saas".

---

## 4. Elementos de Interfaz (UI)

### Glassmorphism
El uso de capas translúcidas es clave para el look futurista.
- **Background**: `rgba(255, 255, 255, 0.03)`
- **Blur**: `backdrop-filter: blur(10px)`
- **Border**: `1px solid rgba(255, 255, 255, 0.05)`

### Botones (Waitlist CTA)
- **Principal**: Fondo `Volea Green`, Texto `Carbon Dark`, Rounding `Full`.
- **Efecto Glow**: Sombra externa suave con color verde neón (`rgba(59, 255, 118, 0.2)`).
- **Animación**: Hover scale `1.05` y aumento de intensidad del glow.

---

## 5. Iconografía
Se utiliza la librería **Lucide React**.
- **Estilo**: Líneas finas (`strokeWidth: 1.5`).
- **Color**: Blanco por defecto, Volea Green para resaltar áreas clave o interactividad.
- **Propósito**: Simplicidad y claridad funcional.

---

## 6. Fotografía e Imagery
Las imágenes deben seguir un estilo cinemático de bajo brillo (Low Key).
- **Entorno**: Canchas de pádel modernas, ambientes nocturnos o interiores de clubes premium.
- **Estilo**: Grano fino, alto contraste, iluminación focalizada (spotlights).
- **Overlay**: Todas las imágenes deben tener un overlay negro con gradiente hacia abajo para integrarse con el fondo de la página.

---

## 7. Animaciones y Movimiento
El movimiento en VoleaBox es suave y deliberado, nunca caótico.
- **Ken Burns (Hero)**: Un zoom lento y constante en la imagen principal para profundidad.
- **Staggered Entry**: Los elementos de la interfaz deben entrar con un ligero delay secuencial (Header -> Títulos -> Contenido).
- **Float**: Los elementos destacados pueden tener un movimiento de flotación vertical muy sutil.

---

## 8. Layout Invisible
Aunque el diseño se siente organizado, el contenedor debe ser **invisible**.
- **Constraint**: `max-width: 1440px`.
- **Align**: Contenido centrado, pero los fondos y bordes de sección deben extenderse a todo el ancho de la pantalla (Full-Bleed).
