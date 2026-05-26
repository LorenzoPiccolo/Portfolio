# Contesto progetto per Claude

Questo file contiene il contesto accumulato su questo progetto. Incollalo all'inizio di una nuova conversazione con Claude per riprendere da dove ci siamo fermati.

---

## Chi sono

Mi chiamo Lorenzo Piccolo, sono un designer e sviluppatore front-end italiano. Preferisco comunicare in italiano.

Lavoro principalmente su web design, UI/UX, e sviluppo React + GSAP per animazioni.

---

## Il progetto: portfolio2025

**Repository:** https://github.com/LorenzoPiccolo/Portfolio  
**Cartella locale:** `portfolio2025`

**Stack:** React 18, React Router v7, Vite, Tailwind CSS 3, GSAP 3.13, Lenis (@studio-freight/lenis), Lucide React

### Struttura

- `src/pages/home` — pagina principale con Hero (canvas frame animation), SecondSection, ThirdSection (skills), FourthSection, FifthSection, Footer
- `src/pages/works` — galleria dei lavori
- `src/pages/case-history` — pagine singole dei progetti (Alidays, Atalus, BuildZero, PortfolioWebsite, RediWebsite, Romaji, Reborn)
- `src/components` — CustomCursor, Header, Footer, Navbar (inutilizzato), IntroLoader, PageTransition, DynamicMarquee, DynamicButton, GlassCard, EdgeBlur, TransitionLink
- `src/hooks` — useFadeInUp, useViewportHeight, useResizeObserver, useResizeTick, useCursorGlow, useAttentionTitle, useIntersectionObserver
- `src/context/TransitionContext` — sistema di transizioni tra pagine
- `src/utils/gsapConfig.js` — setup GSAP + ScrollTrigger

---

## Bug risolti (maggio 2026)

### 1. `CustomCursor.jsx` — violazione Rules of Hooks
Gli hook venivano chiamati dopo un `return null` condizionale. Risolto spostando il return condizionale dopo tutti gli hook.

### 2. `renderApp.jsx` — scroll jank su Safari desktop
`isTouchDevice()` disabilitava Lenis su Safari desktop perché `navigator.maxTouchPoints > 0` su macOS. Senza Lenis, il scroll nativo + GSAP scrub causava jank.  
**Fix:** rimosso `maxTouchPoints` dalla detection, si usano solo CSS media queries `pointer`/`hover` + UA string.  
**Regola da mantenere:** non usare mai `maxTouchPoints` da solo per rilevare dispositivi touch.

### 3. `index.css` — proprietà deprecata
Rimosso `-webkit-overflow-scrolling: touch` (causa problemi su Safari iOS 15+).

### 4. `Footer.jsx` — riferimento morto
`gradientRef` puntava a un elemento commentato. Rimosso `gradientRef`, `useLayoutEffect` relativo e import `gradientOverlay`.

---

## Preferenze di sviluppo

- Componenti React riutilizzabili e facilmente modificabili
- Risponde in italiano
