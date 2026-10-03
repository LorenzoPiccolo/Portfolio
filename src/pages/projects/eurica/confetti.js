// src/pages/projects/eurica/confetti.js
// Coriandoli nei colori delle categorie di Eurica, dal centro di `host` (che deve avere position: relative).
// Stessa animazione della landing e dell'app.
import { gsap } from '../../../utils/gsapConfig.js';

const COLORS = ['#8FCBF0', '#C6BDFB', '#D5EE6E', '#F6A98C', '#F3C969', '#6A5AC7'];

export function confetti(host) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    for (let i = 0; i < 14; i++) {
        const bit = document.createElement('i');
        bit.className = 'bit';
        bit.style.background = COLORS[i % COLORS.length];
        host.appendChild(bit);
        const a = (i / 14) * Math.PI * 2, d = gsap.utils.random(34, 72);
        gsap.timeline({ onComplete: () => bit.remove() })
            .fromTo(bit, { x: 0, y: 0, scale: 1, rotation: 0 }, { x: Math.cos(a) * d, y: Math.sin(a) * d - 18, rotation: gsap.utils.random(-200, 200), duration: 0.9, ease: 'expo.out' })
            .to(bit, { autoAlpha: 0, scale: 0.4, duration: 0.35 }, 0.45);
    }
}
