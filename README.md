# Pronave

Base de una web con Astro, Vue opcional, Tailwind CSS 4 y Bun 1.4.0.

## Comandos

```bash
bun install
bun run dev
bun run check
bun run build
```

## Convención de carpetas

Las piezas específicas de cada página se agrupan por nombre de página:

```text
src/
├─ components/
│  └─ home/
│     └─ partials/
├─ layouts/
├─ pages/
│  └─ index.astro
└─ styles/
public/
└─ images/
   └─ home/
```

Para una nueva página, crear su carpeta en `src/components/[pagina]/`, sus parciales en `src/components/[pagina]/partials/` y sus recursos en `public/images/[pagina]/`.

## Fuentes

Montserrat variable se carga desde Fontsource mediante `@fontsource-variable/montserrat`.
“Myriad Variable Concept” se carga manualmente desde `src/fonts/` en sus variantes Roman e Italic. “Myriad Pro” se carga desde `MyriadPro-Regular.otf`; se mantiene como fallback para textos que requieran esa familia.
