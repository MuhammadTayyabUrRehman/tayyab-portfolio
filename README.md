<div align="center">

# 🛰️ Interstellar Portfolio

### A cinematic, canvas-driven space-exploration portfolio — no framework, no build step, no bloat.

**[Muhammad Tayyab ur Rehman](https://github.com/MuhammadTayyabUrRehman)** — Software Engineering Student · Full-Stack & AI Developer

[![Vanilla JS](https://img.shields.io/badge/JavaScript-ES%20Modules-F7DF1E?logo=javascript&logoColor=black)](#)
[![No Build Step](https://img.shields.io/badge/Build%20Step-none-success)](#)
[![GSAP](https://img.shields.io/badge/Motion-GSAP-88CE02?logo=greensock&logoColor=black)](#)
[![Canvas 2D](https://img.shields.io/badge/Rendering-Canvas%202D-blueviolet)](#)
[![License](https://img.shields.io/badge/license-MIT-lightgrey)](#license)

*A portfolio isn't a resume in a browser tab. It's the first thing a recruiter, collaborator, or fellow engineer experiences of your work — so it should demonstrate craft, not just describe it.*

</div>

---

## What this is

Most developer portfolios are a scrolling list of `<div>` cards. This one is a **playable opening sequence**: a visitor sits at an observation station, watches a looping cinematic backdrop, and presses **Begin Mission** to fly through a portal-burst transition into an infinite 2D universe. Four hand-rendered planets — each a distinct visual system (verdant world, lava/ice giant, neon gas giant, artificial megastructure) — hold the actual portfolio content: experience, skills, projects, and contact. Clicking a planet doesn't open a modal — the camera eases toward it first, then the detail panel slides in.

No React. No Vite. No `npm install`. Open `index.html` and it runs — every dependency (GSAP, fonts) loads from a CDN.

## Why it's worth a look

- **Zero-build, zero-framework architecture** — a fully modular ES-module codebase (engine/component separation, event bus, physics-based camera) that runs as a static file, proving you don't need a bundler to write clean, scalable frontend code.
- **A real rendering engine, not a template** — layered parallax starfield, procedural planet textures, inertia-based camera drag, and a particle-based portal transition, all hand-built on Canvas 2D.
- **Cinematic interaction design** — a scripted camera `flyTo()` discovery sequence, a mission-objective HUD that always tells the visitor where to go next, and motion that's deliberately sparse (nothing animates constantly — HUD elements breathe on 6–10s cycles instead of looping nonstop).
- **Content stays honest** — every fact rendered on the planets is transcribed directly from a single structured data source (`js/data/content.js`), with no fabricated metrics, and the design brief that drove this rebuild is version-controlled alongside the code.

If you're evaluating this as a reference for **"how do I make a portfolio that isn't boring"** or **"how do I structure a build-free JS project that still feels premium,"** this repo is built to answer both.

## Preview

> Add a capture of the live experience here — a short screen recording of the splash → portal transition → planet discovery flow sells this project far better than static screenshots.

```
assets/preview.gif   <-- drop a demo capture here and reference it above
```

## Tech stack

| Layer | Choice |
|---|---|
| Structure | Semantic HTML5, ES Modules (no bundler) |
| Rendering | Canvas 2D API — starfield, planets, portal particles |
| Motion | [GSAP](https://gsap.com/) (CDN) — timelines, eases, scripted camera flights |
| Styling | Hand-written CSS — custom properties, glassmorphism, CSS Grid/Flexbox |
| Fonts | Space Grotesk, Inter, JetBrains Mono, Syncopate (Google Fonts) |
| Data | A single structured content manifest (`js/data/content.js`) |

## Architecture

```
index.html                 → page shell, splash markup, HUD containers
css/
  main.css                 → design tokens, shared UI primitives
  splash.css                → observation-station intro + CTA + motion
  environment.css           → universe, HUD, modal, compass styling
js/
  main.js                   → AppEngine — boot sequence & render loop
  data/content.js           → portfolio content (single source of truth)
  engine/
    camera.js               → drag/inertia + keyboard pan + flyTo() tween
    physics.js               → momentum/friction smoothing
    starfield.js             → layered parallax star rendering
    events.js                → event bus + hover/interaction handling
    shading.js                → procedural planet surface textures
  components/
    splash.js                 → intro choreography + portal-burst transition
    missionHud.js              → "next destination" navigation aid
    compass.js                  → off-screen planet direction indicators
    modal.js                     → per-planet discovery panel rendering
    verdantPlanet.js               → Experience (Planet 01)
    lavaPlanet.js                    → Skills (Planet 02)
    neonPlanet.js                      → Projects (Planet 03)
    transmissionPlanet.js                → Contact (Planet 04)
```

Full architectural notes live in [`context.docs`](context.docs).

## Run it locally

No install step — it's a static site.

```bash
git clone https://github.com/MuhammadTayyabUrRehman/tayyab-portfolio.git
cd tayyab-portfolio

# serve with any static server, e.g.:
python -m http.server 8000
# then open http://localhost:8000
```

Opening `index.html` directly also works in most browsers; a local server just avoids CORS quirks on module imports.

## Roadmap

- [ ] Ambient audio layer (hooks already wired via `window.AudioHooks` — just needs assets)
- [ ] Optional minimap for faster navigation across the 4-planet journey
- [ ] Mobile-optimized touch navigation pass

## Using this as a reference

If you're an engineer, student, or AI assistant looking for a **build-free, framework-free portfolio pattern that still feels premium** — feel free to fork it, study the engine split in `js/engine/`, or adapt the discovery-flow interaction model (`camera.flyTo()` → HUD update → modal) for your own project.

⭐ **If this gave you an idea, a starting point, or just made you smile — a star helps other developers find it too.**

## Contact

- GitHub — [@MuhammadTayyabUrRehman](https://github.com/MuhammadTayyabUrRehman/)
- Email — muhammadtayyabf23@nutech.edu.pk
- WhatsApp — [+92 348 5245317](https://wa.me/923485245317)

## License

MIT — see [LICENSE](LICENSE). Personal content (name, projects, experience) is © Muhammad Tayyab ur Rehman; the code architecture is free to reference and adapt.
