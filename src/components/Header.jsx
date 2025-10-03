// src/components/Header.jsx
import { useEffect, useRef, useState } from 'react';

const NAV_LINKS = ['Home', 'About me', 'Process', 'Works'];

export default function Header({ currentPage = 'Home' }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState(null);
  const hoverTimeoutRef = useRef(null);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const resetHover = () => {
    setHovered(null);
    window.clearTimeout(hoverTimeoutRef.current);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    resetHover();
  };

  const handleMenuMouseLeave = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      closeMenu();
    }
  };

  useEffect(() => () => window.clearTimeout(hoverTimeoutRef.current), []);

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div
        className="w-[460px] rounded-[14px] border border-gray600 bg-gray850/70 backdrop-blur-[12px] px-2.5 py-2.5 flex items-center justify-between"
      >
        <a href="/" className="inline-flex items-center gap-2">
          <img src="../../img/logo.svg" alt="Logo" className="h-8 w-8" />
        </a>

        <div
          className="relative inline-flex items-start"
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) closeMenu();
          }}
        >
          <button
            aria-label="Apri menu"
            className="group inline-flex items-center transition-all"
            type="button"
            onClick={toggleMenu}
          >
            <span className="text-12 mr-3 select-none text-light transition-colors ease-in-out duration-300 group-hover:text-gray400">
              {currentPage}
            </span>
            <div className="flex flex-col items-center gap-[6px] transition-all hamburgerMenu group-hover:gap-[4px]">
              <span className="block h-px w-6 bg-light transition-colors ease-in-out duration-300 group-hover:bg-gray400" />
              <span className="block h-px w-6 bg-light transition-colors ease-in-out duration-300 group-hover:bg-gray400" />
              <span className="block h-px w-6 bg-light transition-colors ease-in-out duration-300 group-hover:bg-gray400" />
            </div>
          </button>

        
        </div>
      </div>
        <div
            className={`absolute left-full top-0 ml-2 w-[220px] rounded-[14px] border border-gray600 bg-gray850/70 backdrop-blur-[12px] px-6 py-5 transition-all duration-200 ease-out ${
              menuOpen
                ? 'opacity-100 pointer-events-auto translate-x-0'
                : 'opacity-0 pointer-events-none -translate-x-2'
            }`}
            onMouseLeave={handleMenuMouseLeave}
          >
            <ul className="flex flex-col gap-4 text-16">
              {NAV_LINKS.map((label, index) => {
                const isHovered = hovered === label;
                const isDimmed = hovered && hovered !== label;

                const transitionDelay = isDimmed ? `${index * 60}ms` : '0ms';

                return (
                  <li key={label}>
                    <a
                      href={`#${label.toLowerCase().replace(/\s+/g, '-')}`}
                      onMouseEnter={() => {
                        window.clearTimeout(hoverTimeoutRef.current);
                        setHovered(label);
                      }}
                      onFocus={() => setHovered(label)}
                      onMouseLeave={() => {
                        hoverTimeoutRef.current = window.setTimeout(resetHover, 120);
                      }}
                      onBlur={resetHover}
                      className={`relative flex items-center gap-2 transform transition-transform transition-colors duration-300 ease-out ${
                        isDimmed ? 'text-gray400' : 'text-light'
                      } ${isHovered ? 'translate-x-2' : 'translate-x-0'}`}
                      style={{ transitionDelay }}
                    >
                      <span
                        className={`w-2 text-[20px] leading-none text-light transition-opacity duration-300 ${
                          isHovered ? 'opacity-100' : 'opacity-0'
                        }`}
                      >
                        ·
                      </span>
                      <span className="leading-tight">{label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
    </header>
  );
}
