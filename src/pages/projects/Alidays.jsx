// src/pages/projects/Alidays.jsx
import ProjectPage from './ProjectPage.jsx';

import heroImage     from '../../../img/footer-image.jpg';
import nextHeroImage from '../../../img/atalus/atalus-01.jpg';
import image1 from '../../../img/image-footer-03.jpg';
import image2 from '../../../img/image-footer-04.jpg';
import image3 from '../../../img/image-footer-02.jpg';
import image4 from '../../../img/image-footer-05.jpg';
import image5 from '../../../img/project-03.jpg';

const alidays = {
    name: 'Alidays',
    category: 'BRAND IDENTITY',
    year: '2024',
    heroImage,
    description: 'A complete brand identity system designed to capture the essence of travel and discovery. From logo to touchpoints, every element tells a cohesive story.',
    keyInfo: {
        client: 'Alidays',
        timeSpan: '2024',
        typeOfWork: 'Brand Identity',
        kpi: 'Visual System',
    },
    sections: [
        // 1. Immagine subito dopo le key information
        { type: 'full-image', src: image1, alt: 'Brand elements', aspect: 'landscape' },

        // 2. Colour palette + typography — aggiungi le immagini quando pronte
        // { type: 'palette', paletteImage: { src: paletteImg, alt: 'Color palette' }, typographyImage: { src: typographyImg, alt: 'Typography' } },

        // 3. Testo narrativo aggiuntivo
        {
            type: 'text',
            layout: 'right',
            content: 'The brand strategy was developed through deep market analysis and collaborative workshops, resulting in a distinctive visual language that resonates with travelers.',
        },

        // 4. Gallery
        {
            type: 'gallery',
            images: [
                { src: image2, alt: 'Applications',       aspect: 'landscape' },
                { src: image3, alt: 'Visual system',      aspect: 'landscape' },
                { src: image4, alt: 'Brand touchpoints',  aspect: 'landscape' },
                { src: image5, alt: 'Final deliverables', aspect: 'landscape' },
            ],
        },
    ],
    nextProject: {
        name: 'Atalus',
        path: '/works/atalus',
        heroImage: nextHeroImage,
    },
};

export default function Alidays() {
    return <ProjectPage project={alidays} />;
}
