// src/pages/works/WorksApp.jsx
import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Header from '../../components/Header.jsx';
import useResizeTick from '../../hooks/useResizeTick.js';
import Footer from '../../components/Footer.jsx';
import WorksHeroSection from './sections/Hero.jsx';
import WorksSecondSection from './sections/SecondSection.jsx';
import WorksThirdSection from './sections/ThirdSection.jsx';

export default function WorksApp() {
  const resizeTick = useResizeTick();

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [resizeTick]);

  return (
    <div className="min-h-screen bg-dark text-light">
      <Header currentPage="Works" />

      <main className="flex flex-col gap-32">
        <WorksHeroSection resizeTick={resizeTick} />
        <WorksSecondSection resizeTick={resizeTick} />
        <WorksThirdSection />
      </main>
      <Footer resizeTick={resizeTick} />
    </div>
  );
}
