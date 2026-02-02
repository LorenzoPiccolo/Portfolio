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

function ScrollToTop() {
  const { pathname } = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    // Only scroll to top on PUSH (new page) or REPLACE
    // On POP (back/forward), keep current position (browser restoration)
    if (navType !== 'POP') {
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [pathname, navType]);

  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
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
