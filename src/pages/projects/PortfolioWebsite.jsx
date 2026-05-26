// src/pages/projects/PortfolioWebsite.jsx
import ProjectPage from './ProjectPage.jsx';

import heroImage     from '../../../img/portfolio/portfolio-01.jpg';
import nextHeroImage from '../../../img/image-footer-05.jpg';
import image2 from '../../../img/portfolio/portfolio-02.jpg';
import image3 from '../../../img/portfolio/portfolio-03.jpg';
import image4 from '../../../img/portfolio/portfolio-04.jpg';
import image5 from '../../../img/portfolio/portfolio-05.jpg';
import image6 from '../../../img/portfolio/portfolio-06.jpg';
import image7 from '../../../img/portfolio/portfolio-07.jpg';

const portfolioWebsite = {
    name: 'Portfolio Website',
    category: 'WEB DESIGN',
    year: '2025',
    heroImage,
    description: 'A personal portfolio website designed to showcase creative work through immersive animations and thoughtful typography. Every detail reflects a commitment to craft.',
    keyInfo: {
        client: 'Personal Project',
        timeSpan: '2025',
        typeOfWork: 'Web Design',
        kpi: 'Interactive Experience',
    },
    sections: [
        // 1. Immagine subito dopo le key information
        { type: 'desktop', src: image2, alt: 'Homepage design' },

        // 2. Colour palette + typography — aggiungi le immagini quando pronte
        // { type: 'palette', paletteImage: { src: paletteImg, alt: 'Color palette' }, typographyImage: { src: typographyImg, alt: 'Typography' } },

        // 3. Testo narrativo
        {
            type: 'text',
            layout: 'right',
            content: 'The website combines smooth scroll animations with scroll-triggered effects to create an engaging browsing experience that keeps visitors exploring.',
        },

        // 4. iPhone mockups — sostituisci src con i tuoi PNG reali
        {
            type: 'iphone-row',
            images: [
                { src: 'https://placehold.co/390x844/111111/444444?text=Mobile+Home', alt: 'Mobile home' },
                { src: 'https://placehold.co/390x844/111111/444444?text=Mobile+Works', alt: 'Mobile works' },
                { src: 'https://placehold.co/390x844/111111/444444?text=Mobile+Project', alt: 'Mobile project' },
            ],
        },

        // 5. Gallery
        {
            type: 'gallery',
            images: [
                { src: image3, alt: 'Navigation system',  aspect: 'landscape' },
                { src: image4, alt: 'Mobile responsive',  aspect: 'portrait'  },
                { src: image5, alt: 'Animation details',  aspect: 'landscape' },
                { src: image6, alt: 'Detail view',        aspect: 'landscape' },
                { src: image7, alt: 'Additional view',    aspect: 'landscape' },
            ],
        },
    ],
    nextProject: {
        name: 'Redi Website',
        path: '/works/redi',
        heroImage: nextHeroImage,
    },
};

export default function PortfolioWebsite() {
    return <ProjectPage project={portfolioWebsite} />;
}
