import { useEffect } from 'react';
import { ScrollTrigger } from '../../utils/gsapConfig.js';

import Header from '../../components/Header.jsx';
import Hero from './sections/Hero.jsx';
import SecondSection from './sections/SecondSection.jsx';
import ThirdSection from './sections/ThirdSection.jsx';
import FourthSection from './sections/FourthSection.jsx';
import FifthSection from './sections/FifthSection.jsx';
import Footer from '../../components/Footer.jsx';
import useResizeTick from '../../hooks/useResizeTick.js';
import useAttentionTitle from '../../hooks/useAttentionTitle.js';

export default function Home() {
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
