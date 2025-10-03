// src/App.jsx
import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Header from './components/Header.jsx';
import Hero from './sections/Hero.jsx';
import SecondSection from './sections/SecondSection.jsx'; // 👈 importa la seconda sezione
import ThirdSection from './sections/ThirdSection.jsx';
import FourthSection from './sections/FourthSection.jsx';
import FifthSection from './sections/FifthSection.jsx';

export default function App() {
  useEffect(() => {
    let timeoutId = null;

    const handleResize = () => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => { 
        ScrollTrigger.refresh();
      }, 150);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      
      {/* Header in alto */}
      <Header currentPage="Home" />

      {/* Hero come prima sezione del sito */}
      <Hero />

      <SecondSection /> 
        
      <ThirdSection /> 
      
      <FourthSection />

      <FifthSection />
      
    </div>
  );
}
