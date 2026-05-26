// src/pages/projects/RediWebsite.jsx
import ProjectPage from './ProjectPage.jsx';

import heroImage     from '../../../img/image-footer-05.jpg';
import nextHeroImage from '../../../img/romaji/romaji-01.jpg';
import image1 from '../../../img/project-03.jpg';
import image2 from '../../../img/image-footer-02.jpg';
import image3 from '../../../img/footer-image.jpg';
import image4 from '../../../img/image-footer-03.jpg';
import image5 from '../../../img/image-footer-04.jpg';

const rediWebsite = {
    name: 'Redi Website',
    category: 'WEB DESIGN',
    year: '2025',
    heroImage,
    description: 'A modern web platform built with performance and accessibility in mind. Clean code meets beautiful design to create a seamless user experience.',
    keyInfo: {
        client: 'Redi',
        timeSpan: '2025',
        typeOfWork: 'Web Design',
        kpi: 'Performance',
    },
    sections: [
        // 1. Immagine subito dopo le key information
        { type: 'desktop', src: image1, alt: 'Homepage design' },

        // 2. Colour palette + typography — aggiungi le immagini quando pronte
        // { type: 'palette', paletteImage: { src: paletteImg, alt: 'Color palette' }, typographyImage: { src: typographyImg, alt: 'Typography' } },

        // 3. Testo narrativo
        {
            type: 'text',
            layout: 'right',
            content: 'The development focused on optimization and best practices, ensuring fast load times and smooth interactions across all devices and browsers.',
        },

        // 4. iPhone mockups — sostituisci src con i tuoi PNG reali
        {
            type: 'iphone-row',
            images: [
                { src: 'https://placehold.co/390x844/111111/444444?text=Mobile+Home', alt: 'Mobile homepage' },
                { src: 'https://placehold.co/390x844/111111/444444?text=Mobile+Article', alt: 'Mobile article' },
                { src: 'https://placehold.co/390x844/111111/444444?text=Mobile+Contact', alt: 'Mobile contact' },
            ],
        },

        // 5. Gallery
        {
            type: 'gallery',
            images: [
                { src: image2, alt: 'Final result',      aspect: 'landscape' },
                { src: image3, alt: 'Detail view',       aspect: 'landscape' },
                { src: image4, alt: 'Responsive design', aspect: 'landscape' },
                { src: image5, alt: 'Code architecture', aspect: 'landscape' },
            ],
        },
    ],
    nextProject: {
        name: 'Romaji',
        path: '/works/romaji',
        heroImage: nextHeroImage,
    },
};

export default function RediWebsite() {
    return <ProjectPage project={rediWebsite} />;
}
