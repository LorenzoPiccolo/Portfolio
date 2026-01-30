// src/utils/gsapConfig.js
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Global defaults for smoother animations
gsap.defaults({
    ease: 'power2.out',
    duration: 0.6,
});

// Configure ScrollTrigger for smoother performance
ScrollTrigger.config({
    ignoreMobileResize: true, // Prevents jumps on mobile address bar show/hide
});

// Force 3D transforms for better GPU acceleration
gsap.config({
    force3D: true,
});

export { gsap, ScrollTrigger };
