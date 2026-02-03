// src/pages/case-history/PortfolioWebsite.jsx
import CaseHistoryPage from './CaseHistoryPage.jsx';

import heroImage from '../../../img/portfolio/portfolio-01.jpg';
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
    heroImage: heroImage,
    description: 'A personal portfolio website designed to showcase creative work through immersive animations and thoughtful typography. Every detail reflects a commitment to craft.',
    images: [
        { src: image2, alt: 'Project showcase' },
        { src: image3, alt: 'Navigation system' },
        { src: image4, alt: 'Mobile responsive' },
        { src: image5, alt: 'Animation details' },
        { src: image6, alt: 'Detail view' },
        { src: image7, alt: 'Additional view' },
    ],
    sections: [
        {
            type: 'text',
            layout: 'right',
            content: 'The website combines smooth scroll animations with scroll-triggered effects to create an engaging browsing experience that keeps visitors exploring.',
        },
    ],
};

export default function PortfolioWebsite() {
    return <CaseHistoryPage project={portfolioWebsite} />;
}
