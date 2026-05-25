// src/App.jsx
import { Routes, Route, useLocation, useNavigationType } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';

// Pages
import Home from './pages/home/Home.jsx';
import WorksApp from './pages/works/WorksApp.jsx';
import ExampleProject from './pages/projects/ExampleProject.jsx';
import Alidays from './pages/projects/Alidays.jsx';
import Atalus from './pages/projects/Atalus.jsx';
import BuildZero from './pages/projects/BuildZero.jsx';
import PortfolioWebsite from './pages/projects/PortfolioWebsite.jsx';
import RediWebsite from './pages/projects/RediWebsite.jsx';
import Romaji from './pages/projects/Romaji.jsx';
import Reborn from './pages/projects/Reborn.jsx';
import CustomCursor from './components/CustomCursor.jsx';
import EdgeBlur from './components/EdgeBlur.jsx';
import PageTransition from './components/PageTransition.jsx';
import IntroLoader from './components/IntroLoader.jsx';
import { TransitionProvider } from './context/TransitionContext.jsx';

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
    window.addEventListener('scroll', handleScroll, { passive: true });
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
  const [showLoader, setShowLoader] = useState(true);

  return (
    <TransitionProvider>
      <Analytics />
      {showLoader && <IntroLoader onComplete={() => setShowLoader(false)} />}
      <ScrollToTop />
      <CustomCursor />
      <EdgeBlur />
      <PageTransition />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/works" element={<WorksApp />} />
        {/* Works Routes */}
        <Route path="/works/alidays" element={<Alidays />} />
        <Route path="/works/atalus" element={<Atalus />} />
        <Route path="/works/build-zero" element={<BuildZero />} />
        <Route path="/works/portfolio-website" element={<PortfolioWebsite />} />
        <Route path="/works/redi" element={<RediWebsite />} />
        <Route path="/works/romaji" element={<Romaji />} />
        <Route path="/works/reborn" element={<Reborn />} />
      </Routes>
    </TransitionProvider>
  );
}

