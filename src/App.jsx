// src/App.jsx
import { useEffect } from 'react';
import { ScrollTrigger } from './utils/gsapConfig.js';

import Header from './components/Header.jsx';
import Hero from './pages/home/sections/Hero.jsx';
import SecondSection from './pages/home/sections/SecondSection.jsx'; // 👈 importa la seconda sezione
import ThirdSection from './pages/home/sections/ThirdSection.jsx';
import FourthSection from './pages/home/sections/FourthSection.jsx';
import FifthSection from './pages/home/sections/FifthSection.jsx';
import Footer from './components/Footer.jsx';
import useResizeTick from './hooks/useResizeTick.js';
import useAttentionTitle from './hooks/useAttentionTitle.js';

export default function App() {
  const resizeTick = useResizeTick();
  useAttentionTitle();

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [resizeTick]);

  return (
    <div className="min-h-screen bg-black text-white">
      
      {/* Header in alto */}
      <Header currentPage="Home" />

      {/* Hero come prima sezione del sito */}
      <Hero resizeTick={resizeTick} />

      <SecondSection resizeTick={resizeTick} /> 

      <ThirdSection resizeTick={resizeTick} /> 
      
      <FourthSection resizeTick={resizeTick} />

      <FifthSection resizeTick={resizeTick} />

      <Footer resizeTick={resizeTick} />
      
    </div>
  );
}
