// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- Lenis setup ---
const lenis = new Lenis({
  duration: 1.1,
  easing: (t) => 1 - Math.pow(1 - t, 3), // cubic-out
  smoothWheel: true,
  smoothTouch: false,
  wheelMultiplier: 1.0,
});

// 1) usa il TICKER di GSAP per guidare Lenis (così l’ordine è coerente)
gsap.ticker.add((time) => {
  // gsap.ticker time è in secondi → Lenis vuole ms
  lenis.raf(time * 1000);
});

// 2) ogni scroll di Lenis → aggiorna ScrollTrigger
lenis.on('scroll', () => {
  ScrollTrigger.update();
});

// 3) quando ScrollTrigger fa refresh (per pin, misure, ecc.) → aggiorna Lenis
ScrollTrigger.addEventListener('refresh', () => lenis.update());

// 4) dopo che i font sono pronti (cambiano le misure), fai un refresh generale
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(() => {
    ScrollTrigger.refresh();
  });
} else {
  // fallback
  setTimeout(() => ScrollTrigger.refresh(), 100);
}

gsap.ticker.lagSmoothing(0); // (opzionale) massima reattività

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
