// src/pages/projects/Atalus.jsx
import ProjectPage from './ProjectPage.jsx';

import heroImage     from '../../../img/atalus/atalus-01.jpg';
import nextHeroImage from '../../../img/build-zero/build-zero-01.jpg';
import image2 from '../../../img/atalus/atalus-02.jpg';
import image3 from '../../../img/atalus/atalus-03.jpg';
import image4 from '../../../img/atalus/atalus-04.jpg';
import image5 from '../../../img/atalus/atalus-05.jpg';
import image6 from '../../../img/atalus/atalus-06.jpg';

const atalus = {
    name: 'Atalus',
    category: 'BRAND IDENTITY',
    year: '2025',
    heroImage,
    description: 'A sophisticated brand identity for a luxury service. Every element was designed to convey elegance, trust, and attention to detail.',
    keyInfo: {
        client: 'Atalus',
        timeSpan: '2025',
        typeOfWork: 'Brand Identity',
        kpi: 'Visual Restyling',
    },
    sections: [
        // 1. Immagine subito dopo le key information
        { type: 'full-image', src: image2, alt: 'Brand applications', aspect: 'landscape' },

        // 2. Colour palette + typography — aggiungi le immagini quando pronte
        // { type: 'palette', paletteImage: { src: paletteImg, alt: 'Color palette' }, typographyImage: { src: typographyImg, alt: 'Typography' } },

        // 3. Testo narrativo
        {
            type: 'text',
            layout: 'right',
            content: 'The identity system includes a refined color palette, custom typography selections, and a comprehensive set of brand guidelines for consistent application.',
        },

        // 4. Gallery
        {
            type: 'gallery',
            images: [
                { src: image3, alt: 'Visual identity',    aspect: 'landscape' },
                { src: image4, alt: 'Stationery design',  aspect: 'landscape' },
                { src: image5, alt: 'Final presentation', aspect: 'landscape' },
                { src: image6, alt: 'Detail view',        aspect: 'landscape' },
            ],
        },
    ],
    nextProject: {
        name: 'Build Zero',
        path: '/works/build-zero',
        heroImage: nextHeroImage,
    },
};

export default function Atalus() {
    return <ProjectPage project={atalus} />;
}
