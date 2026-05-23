# Blueprint Spatial Demo

Blueprint is an AI engineering workspace concept for FIRST Tech Challenge teams. This repository contains an interactive product presentation/demo that shows the expected MVP capability: ingesting official FTC materials and team constraints, then producing strategy, rules citations, REV-first BOMs, mechanism math, conceptual CAD, FTC SDK Java starter code, build guidance, grant support, and driver-log optimization.

## Run Locally

```bash
npm install
npm run dev
```

The Vite app runs at `http://localhost:5173/` and the local demo API runs at `http://localhost:8787/`.

## Build

```bash
npm run build
```

For GitHub Pages project hosting, build with a path base:

```bash
VITE_BASE_PATH=/blueprint-spatial-demo/ npm run build
```

## Demo Inputs

The static build includes the attached PDFs under `public/docs`:

- `blueprint-mvp-writeup.pdf`
- `decode-competition-manual-tu32.pdf`
- `metal-magic-mvp-marketing-presentation.pdf`

## Stack

- React, TypeScript, Vite
- GSAP ScrollTrigger
- React Three Fiber and Three.js
- ShaderGradient
- Paper Design shaders
- Liquid glass UI treatment
