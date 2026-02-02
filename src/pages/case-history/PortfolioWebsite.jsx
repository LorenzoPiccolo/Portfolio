// src/pages/case-history/PortfolioWebsite.jsx
import CaseHistoryPage from './CaseHistoryPage.jsx';

import heroImage from '../../../img/image-footer-02.jpg';
import image1 from '../../../img/image-footer-05.jpg';
import image2 from '../../../img/footer-image.jpg';
import image3 from '../../../img/image-footer-03.jpg';
import image4 from '../../../img/image-footer-04.jpg';
import image5 from '../../../img/project-03.jpg';

const portfolioWebsite = {
    name: 'Portfolio Website',
    category: 'WEB DESIGN',
    year: '2025',
    heroImage: heroImage,
    description: 'A personal portfolio website designed to showcase creative work through immersive animations and thoughtful typography. Every detail reflects a commitment to craft.',
    images: [
        { src: image1, alt: 'Homepage design' },
        { src: image2, alt: 'Project showcase' },
        { src: image3, alt: 'Navigation system' },
        { src: image4, alt: 'Mobile responsive' },
        { src: image5, alt: 'Animation details' },
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
