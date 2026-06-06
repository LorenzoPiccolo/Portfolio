// src/components/Header.jsx
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import TransitionLink from './TransitionLink.jsx';
import logo from '../../img/logo.svg';
import cardImage from '../../img/build-zero/build-zero-01.jpg';
import useCursorGlow from '../hooks/useCursorGlow.js';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Works', path: '/works' },
  { label: 'Behance', path: 'https://www.behance.net/lorenzopiccolo9926', external: true },
];

// 🔧 Sostituisci gli href con i tuoi profili reali
const SOCIAL_LINKS = [
  { label: 'Behance', href: 'https://www.behance.net/lorenzopiccolo9926' },
  { label: 'LinkedIn', href: '#' },
  { label: 'Instagram', href: '#' },
];

// Larghezza del pannello aperto su desktop (step 1 dello scaling)
const OPEN_WIDTH_DESKTOP = 820;

export default function Header({ currentPage = 'Home' }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState(null);
  const { handlers: glowHandlers, glowStyle } = useCursorGlow({ glowSize: 400 });

  const headerRef = useRef(null);
  const panelRef = useRef(null);     // contenitore che scala (larghezza -> altezza)
  const contentRef = useRef(null);   // sezione rivelata
  const tlRef = useRef(null);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  // Costruisce la timeline GSAP (responsive via matchMedia)
  useEffect(() => {
    const panel = panelRef.current;
    const content = contentRef.current;
    if (!panel || !content) return;

    const buildTimeline = (openWidth) => {
      const items = content.querySelectorAll('[data-reveal]');

      // stato chiuso
      gsap.set(content, { height: 0, autoAlpha: 0, overflow: 'hidden' });
      gsap.set(items, { y: 18, autoAlpha: 0 });

      const tl = gsap.timeline({ paused: true });
      // STEP 1 — scala in larghezza
      tl.to(panel, { width: openWidth, duration: 0.45, ease: 'power3.inOut' });
      // STEP 2 — scala in altezza (rivela la sezione)
      tl.to(content, { height: 'auto', autoAlpha: 1, duration: 0.5, ease: 'power3.inOut' }, '>-0.08');
      // STEP 3 — compaiono le voci con stagger
      tl.to(items, { y: 0, autoAlpha: 1, duration: 0.4, stagger: 0.06, ease: 'power2.out' }, '>-0.25');
      return tl;
    };

    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      tlRef.current = buildTimeline(OPEN_WIDTH_DESKTOP);
      return () => tlRef.current?.kill();
    });

    mm.add('(max-width: 767px)', () => {
      // su mobile la barra è già a tutta larghezza: si espande solo in altezza
      tlRef.current = buildTimeline(panel.offsetWidth);
      return () => tlRef.current?.kill();
    });

    return () => mm.revert();
  }, []);

  // Play / reverse al cambio di stato
  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;
    if (menuOpen) tl.play();
    else tl.reverse();
  }, [menuOpen]);

  // Chiusura con Esc e con click esterno
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') closeMenu(); };
    const onClick = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) closeMenu();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [menuOpen]);

  const resetHover = () => setHovered(null);

  return (
    <header
      ref={headerRef}
      className="fixed left-4 w-[calc(100vw-32px)] z-50 hover:scale-[1] transition-transform duration-300 ease-quad md:left-1/2 md:w-auto md:origin-center md:scale-[0.98] md:-translate-x-1/2 cursor-auto"
      style={{ top: 'max(1rem, env(safe-area-inset-top, 1rem))' }}
    >
      <div
        ref={panelRef}
        className="relative overflow-hidden w-full rounded-[14px] border border-gray600 bg-gray850/70 backdrop-blur-[12px] px-2.5 py-2.5 flex flex-col md:w-[460px]"
        {...glowHandlers}
      >
        <div style={glowStyle} aria-hidden="true" />

        {/* RIGA SUPERIORE — uguale allo stato chiuso */}
        <div className="relative z-10 flex items-center justify-between">
          <TransitionLink to="/" onClick={closeMenu} className="inline-flex items-center gap-2">
            <img src={logo} alt="Logo" className="h-10 w-10 md:h-8 md:w-8" />
          </TransitionLink>

          <button
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="group inline-flex items-center transition-all"
            type="button"
            onClick={toggleMenu}
          >
            <span
              className={`text-14 md:text-12 mr-3 select-none text-light transition-all ease-in-out duration-300 group-hover:text-gray400 ${menuOpen ? 'opacity-0 -translate-x-1' : 'opacity-100 translate-x-0'}`}
            >
              {currentPage}
            </span>

            {/* Icona hamburger -> X */}
            <div className="relative h-4 w-8 md:h-3.5 md:w-6 text-16">
              <span
                className={`absolute left-0 block h-px w-full bg-light transition-all duration-300 ease-in-out group-hover:bg-gray400 ${menuOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0 group-hover:top-[3px]'}`}
              />
              <span
                className={`absolute left-0 top-1/2 -translate-y-1/2 block h-px w-full bg-light transition-all duration-300 ease-in-out group-hover:bg-gray400 ${menuOpen ? 'opacity-0 scale-x-0' : 'opacity-100'}`}
              />
              <span
                className={`absolute left-0 block h-px w-full bg-light transition-all duration-300 ease-in-out group-hover:bg-gray400 ${menuOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0 group-hover:bottom-[3px]'}`}
              />
            </div>
          </button>
        </div>

        {/* SEZIONE RIVELATA (step 2 + stagger) */}
        <div ref={contentRef} className="relative z-10 w-full">
          <div className="pt-3">
            <div className="border-t border-gray600 px-1 pb-1 pt-4">
              <div className="flex flex-col gap-5 md:flex-row md:gap-6">
                {/* Voci di menu */}
                <ul className="flex flex-1 flex-col">
                  {NAV_LINKS.map(({ label, path, external }, index) => {
                    const isHovered = hovered === label;
                    const isDimmed = hovered && hovered !== label;
                    const transitionDelay = isDimmed ? `${index * 60}ms` : '0ms';
                    const linkClass = `title-32 relative flex items-center gap-2 py-[6px] transform transition-transform transition-colors duration-300 ease-out ${isDimmed ? 'text-gray400' : 'text-light'} ${isHovered ? 'translate-x-2' : 'translate-x-0'}`;
                    const hoverProps = {
                      onMouseEnter: () => setHovered(label),
                      onFocus: () => setHovered(label),
                      onMouseLeave: resetHover,
                      onBlur: resetHover,
                      className: linkClass,
                      style: { transitionDelay },
                    };
                    const dot = (
                      <span className={`w-2 text-[28px] leading-none text-light transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>·</span>
                    );
                    return (
                      <li key={label} data-reveal>
                        {external ? (
                          <a href={path} target="_blank" rel="noopener noreferrer" onClick={closeMenu} {...hoverProps}>
                            {dot}<span className="leading-tight">{label}</span>
                          </a>
                        ) : (
                          <TransitionLink to={path} onClick={closeMenu} {...hoverProps}>
                            {dot}<span className="leading-tight">{label}</span>
                          </TransitionLink>
                        )}
                      </li>
                    );
                  })}
                </ul>

                {/* Card in evidenza */}
                <TransitionLink
                  to="/works"
                  onClick={closeMenu}
                  data-reveal
                  className="group/card relative block aspect-[4/3] w-full overflow-hidden rounded-[10px] md:w-[320px]"
                >
                  <img
                    src={cardImage}
                    alt="Lavoro in evidenza"
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover/card:scale-105"
                  />
                  <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-dark/80 px-3 py-1.5 text-12 text-light backdrop-blur-[6px]">
                    Esplora i lavori →
                  </span>
                </TransitionLink>
              </div>

              {/* Social */}
              <div data-reveal className="mt-5 flex gap-4 text-12 text-gray400">
                {SOCIAL_LINKS.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors duration-300 hover:text-light"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
