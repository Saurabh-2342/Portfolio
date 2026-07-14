# Saurabh Singh — Portfolio

A fast, mobile-responsive React portfolio. Rebuilt from a single 5.9 MB
self-unpacking HTML bundle (which shipped React + Three.js + GSAP + a 4 MB
inline PDF and transformed JSX in the browser at runtime) into a proper
Vite + React app with a real build step.

## Develop

```bash
npm install
npm run dev       # local dev server (http://localhost:5173)
npm run build     # production build → dist/
npm run preview   # preview the production build
```

## Stack

- **Vite + React 18** — minified, code-split output; no runtime Babel.
- **Three.js** — the hero "AI core", dynamically imported into its own chunk
  so it never blocks first paint. Skipped on touch devices and when the user
  prefers reduced motion.
- **IntersectionObserver** — scroll reveals and the timeline fill (replaces the
  old GSAP + ScrollTrigger + Lenis stack).
- **CSS custom properties** — four accent palettes (Ember is default); switch
  live with the dots in the nav.

## Structure

```
src/
  App.jsx            theme + pointer detection, section composition
  data.js            all content (projects, experience, skills, contact)
  index.css          design system + responsive breakpoints
  hooks/             useReveal, usePointerFX (cursor/tilt/magnetic)
  components/        one file per section + Background/Cursor/Nav/AICore
public/
  Saurabh_Singh_Resume.pdf   served as a static file (was inlined before)
```

## Performance

| | Before | After |
|---|---|---|
| Initial HTML | 5.9 MB | ~1 KB |
| Blocking JS | React+3 libs, in-browser JSX transform | 53 KB gzip |
| Three.js | eager | lazy chunk (172 KB gz), desktop/tablet only |
| Résumé | 4 MB inline base64 | static PDF, loaded on click |
| Mobile | not responsive | full breakpoints, touch-aware |
