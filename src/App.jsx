// src/App.jsx
import { Routes, Route, useLocation, useNavigationType } from 'react-router-dom';
import { useEffect } from 'react';

// Pages
import Home from './pages/home/Home.jsx';
import WorksApp from './pages/works/WorksApp.jsx';
import ExampleProject from './pages/case-history/ExampleProject.jsx';
import Alidays from './pages/case-history/Alidays.jsx';
import Atalus from './pages/case-history/Atalus.jsx';
import BuildZero from './pages/case-history/BuildZero.jsx';
import PortfolioWebsite from './pages/case-history/PortfolioWebsite.jsx';
import RediWebsite from './pages/case-history/RediWebsite.jsx';
import Romaji from './pages/case-history/Romaji.jsx';
import Reborn from './pages/case-history/Reborn.jsx';
import CustomCursor from './components/CustomCursor.jsx';

function ScrollToTop() {
  const { pathname, key } = useLocation();
  const navType = useNavigationType();

  // Manual scroll restoration
  useEffect(() => {
    // Disable browser's default scroll restoration to avoid conflicts
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Save scroll position on scroll
    const handleScroll = () => {
      const pos = window.scrollY;
      sessionStorage.setItem(`scroll-pos-${key}`, pos);
    };

    // Debounce slightly if needed, but direct is usually fine for this
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [key]);

  // Restore or reset scroll on navigation
  useEffect(() => {
    if (navType === 'POP') {
      const saved = sessionStorage.getItem(`scroll-pos-${key}`);
      if (saved) {
        const y = parseInt(saved, 10);

        // Immediate restore
        window.scrollTo(0, y);
        if (window.lenis) {
          window.lenis.scrollTo(y, { immediate: true });
        }

        // Retry after small delay in case of layout shifts
        setTimeout(() => {
          window.scrollTo(0, y);
          if (window.lenis) window.lenis.scrollTo(y, { immediate: true });
        }, 100);
      }
    } else {
      // PUSH or REPLACE - scroll to top
      window.scrollTo(0, 0);
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true });
      }
    }
  }, [pathname, navType, key]);

  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <CustomCursor />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/works" element={<WorksApp />} />

        {/* Case History Routes */}
        <Route path="/case-history" element={<ExampleProject />} />
        <Route path="/case-history/alidays" element={<Alidays />} />
        <Route path="/case-history/atalus" element={<Atalus />} />
        <Route path="/case-history/build-zero" element={<BuildZero />} />
        <Route path="/case-history/portfolio-website" element={<PortfolioWebsite />} />
        <Route path="/case-history/redi" element={<RediWebsite />} />
        <Route path="/case-history/romaji" element={<Romaji />} />
        <Route path="/case-history/reborn" element={<Reborn />} />
      </Routes>
    </>
  );
}
