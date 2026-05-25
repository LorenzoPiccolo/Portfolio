// src/pages/home/sections/ContactCTA.jsx
import { useRef } from 'react';
import { useFadeInUp } from '../../../hooks/useFadeInUp.js';

export default function ContactCTA() {
  const sectionRef = useRef(null);
  useFadeInUp(sectionRef, { trigger: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative z-10 bg-dark w-screen px-6 py-24 md:py-40 flex flex-col items-center justify-center text-center gap-8"
    >
      <p className="text-14 font-spaceg tracking-[0.22em] uppercase text-light/50">
        Available for new projects
      </p>

      <a
        href="mailto:lorenzopikkolo@gmail.com"
        className="fade-in-up group inline-block"
        aria-label="Send an email to Lorenzo Piccolo"
      >
        <span
          className="
            block font-urbanist font-normal leading-none tracking-tight
            text-[clamp(2.5rem,8vw,7rem)]
            text-light transition-colors duration-300 ease-out
            group-hover:text-primary
          "
        >
          Let's work together.
        </span>
      </a>

      <p className="fade-in-up text-16 text-light/40 font-normal">
        lorenzopikkolo@gmail.com
      </p>
    </section>
  );
}
