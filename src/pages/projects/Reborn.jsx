// src/pages/projects/Reborn.jsx
import ProjectPage from './ProjectPage.jsx';

import heroImage     from '../../../img/reborn/reborn-01.jpg';
import nextHeroImage from '../../../img/footer-image.jpg';
import image2 from '../../../img/reborn/reborn-02.jpg';
import image3 from '../../../img/reborn/reborn-03.jpg';
import image4 from '../../../img/reborn/reborn-04.jpg';
import image5 from '../../../img/reborn/reborn-05.jpg';
import image6 from '../../../img/reborn/reborn-06.jpg';

const reborn = {
    name: 'Reborn',
    category: 'VINYL',
    year: '2023',
    heroImage,
    description: 'A vinyl record design that captures the essence of rebirth and transformation through bold visual storytelling and tactile design elements.',
    keyInfo: {
        client: 'Personal Project',
        timeSpan: '2023',
        typeOfWork: 'Packaging Design',
        kpi: 'Vinyl Artwork',
    },
    sections: [
        // 1. Immagine subito dopo le key information
        { type: 'full-image', src: image2, alt: 'Packaging details', aspect: 'landscape' },

        // 2. Colour palette + typography — aggiungi le immagini quando pronte
        // { type: 'palette', paletteImage: { src: paletteImg, alt: 'Color palette' }, typographyImage: { src: typographyImg, alt: 'Typography' } },

        // 3. Testo narrativo
        {
            type: 'text',
            layout: 'right',
            content: 'The design embraces the physical nature of vinyl, using special printing techniques and materials to create a collector-worthy piece of art.',
        },

        // 4. Gallery
        {
            type: 'gallery',
            images: [
                { src: image3, alt: 'Inner sleeve',     aspect: 'landscape' },
                { src: image4, alt: 'Vinyl label',      aspect: 'square'    },
                { src: image5, alt: 'Complete package', aspect: 'landscape' },
                { src: image6, alt: 'Detail view',      aspect: 'landscape' },
            ],
        },
    ],
    nextProject: {
        name: 'Alidays',
        path: '/works/alidays',
        heroImage: nextHeroImage,
    },
};

export default function Reborn() {
    return <ProjectPage project={reborn} />;
}
