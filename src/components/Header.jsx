// src/components/Header.jsx
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../img/logo.svg';
import useCursorGlow from '../hooks/useCursorGlow.js';

const NAV_LINKS = ['Home', 'Works', 'About me', 'Process',];

export default function Header({ currentPage = 'Home' }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState(null);
  const hoverTimeoutRef = useRef(null);
  const { handlers: glowHandlers, glowStyle } = useCursorGlow({ glowSize: 400 });

  const resolvePath = (label) => {
    if (label === 'Home') return '/';
    if (label === 'Works') return '/works';
    const anchor = `#${label.toLowerCase().replace(/\s+/g, '-')}`;
    return currentPage === 'Home' ? anchor : `/${anchor}`;
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const resetHover = () => {
    setHovered(null);
    window.clearTimeout(hoverTimeoutRef.current);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    resetHover();
  };

  useEffect(() => () => window.clearTimeout(hoverTimeoutRef.current), []);

  return (
    <header className="fixed top-4 left-4 w-[calc(100vw-32px)] z-50 hover:scale-[1] transition-transform duration-300 ease-quad md:top-6 md:left-1/2 md:w-auto md:origin-center md:scale-[0.98] md:-translate-x-1/2">
      <div
        className="relative overflow-hidden w-full rounded-[14px] border border-gray600 bg-gray850/70 backdrop-blur-[12px] px-2.5 py-2.5 flex items-center justify-between md:w-[460px]"
        {...glowHandlers}
      >
        <div style={glowStyle} aria-hidden="true" />
        <Link to="/" className="inline-flex items-center gap-2 relative z-10">
          <img src={logo} alt="Logo" className="h-10 w-10 md:h-8 md:w-8" />
        </Link>

        <div className="relative inline-flex items-start z-10">
          <button
            aria-label="Apri menu"
            className="group inline-flex items-center transition-all"
            type="button"
            onClick={toggleMenu}
          >
            <span className="text-14 md:text-12 mr-3 select-none text-light transition-colors ease-in-out duration-300 group-hover:text-gray400">
              {currentPage}
            </span>
            <div className="flex flex-col items-center gap-[8px] md:gap-[6px] transition-all hamburgerMenu group-hover:gap-[4px] text-16">
              <span className="block h-px w-8 md:w-6 bg-light transition-colors ease-in-out duration-300 group-hover:bg-gray400" />
              <span className="block h-px w-8 md:w-6 bg-light transition-colors ease-in-out duration-300 group-hover:bg-gray400" />
              <span className="block h-px w-8 md:w-6 bg-light transition-colors ease-in-out duration-300 group-hover:bg-gray400" />
            </div>
          </button>


        </div>
      </div>
      <div
        className={`absolute right-0 lg:left-full top-[68px] lg:top-0 ml-2 w-[220px] rounded-[14px] border border-gray600 bg-gray850/70 backdrop-blur-[12px] px-6 py-5 transition-all duration-200 ease-out ${menuOpen
          ? 'opacity-100 pointer-events-auto translate-x-0'
          : 'opacity-0 pointer-events-none -translate-x-2'
          }`}
        onMouseEnter={() => window.clearTimeout(hoverTimeoutRef.current)}
        onMouseLeave={closeMenu}
      >
        <ul className="flex flex-col gap-4 text-16">
          {NAV_LINKS.map((label, index) => {
            const isHovered = hovered === label;
            const isDimmed = hovered && hovered !== label;

            const transitionDelay = isDimmed ? `${index * 60}ms` : '0ms';
            const path = resolvePath(label);
            const isAnchor = path.startsWith('#');

            return (
              <li key={label}>
                {isAnchor ? (
                  <a
                    href={path}
                    onMouseEnter={() => {
                      window.clearTimeout(hoverTimeoutRef.current);
                      setHovered(label);
                    }}
                    onFocus={() => setHovered(label)}
                    onMouseLeave={() => {
                      hoverTimeoutRef.current = window.setTimeout(resetHover, 120);
                    }}
                    onBlur={resetHover}
                    className={`relative flex items-center gap-2 transform transition-transform transition-colors duration-300 ease-out ${isDimmed ? 'text-gray400' : 'text-light'
                      } ${isHovered ? 'translate-x-2' : 'translate-x-0'}`}
                    style={{ transitionDelay }}
                  >
                    <span
                      className={`w-2 text-[20px] leading-none text-light transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                      ·
                    </span>
                    <span className="leading-tight">{label}</span>
                  </a>
                ) : (
                  <Link
                    to={path}
                    onMouseEnter={() => {
                      window.clearTimeout(hoverTimeoutRef.current);
                      setHovered(label);
                    }}
                    onFocus={() => setHovered(label)}
                    onMouseLeave={() => {
                      hoverTimeoutRef.current = window.setTimeout(resetHover, 120);
                    }}
                    onBlur={resetHover}
                    className={`relative flex items-center gap-2 transform transition-transform transition-colors duration-300 ease-out ${isDimmed ? 'text-gray400' : 'text-light'
                      } ${isHovered ? 'translate-x-2' : 'translate-x-0'}`}
                    style={{ transitionDelay }}
                  >
                    <span
                      className={`w-2 text-[20px] leading-none text-light transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                      ·
                    </span>
                    <span className="leading-tight">{label}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}