// src/pages/projects/Romaji.jsx
import ProjectPage from './ProjectPage.jsx';

import heroImage     from '../../../img/romaji/romaji-01.jpg';
import nextHeroImage from '../../../img/reborn/reborn-01.jpg';
import image2 from '../../../img/romaji/romaji-02.jpg';
import image3 from '../../../img/romaji/romaji-03.jpg';
import image4 from '../../../img/romaji/romaji-04.jpg';
import image5 from '../../../img/romaji/romaji-05.jpg';
import image6 from '../../../img/romaji/romaji-06.jpg';

const romaji = {
    name: 'Romaji',
    category: 'MAGAZINE',
    year: '2024',
    heroImage,
    description: 'An editorial design project exploring the intersection of Japanese culture and contemporary typography. Each spread balances tradition with modern aesthetics.',
    keyInfo: {
        client: 'Personal Project',
        timeSpan: '2024',
        typeOfWork: 'Editorial Design',
        kpi: 'Magazine Layout',
    },
    sections: [
        // 1. Immagine subito dopo le key information
        { type: 'full-image', src: image2, alt: 'Typography details', aspect: 'landscape' },

        // 2. Colour palette + typography — aggiungi le immagini quando pronte
        // { type: 'palette', paletteImage: { src: paletteImg, alt: 'Color palette' }, typographyImage: { src: typographyImg, alt: 'Typography' } },

        // 3. Testo narrativo
        {
            type: 'text',
            layout: 'right',
            content: 'The magazine format allowed for experimentation with layout and visual hierarchy, creating a reading experience that feels both curated and immersive.',
        },

        // 4. Cover — portrait
        { type: 'full-image', src: image3, alt: 'Cover design', aspect: 'portrait' },

        // 5. Gallery
        {
            type: 'gallery',
            images: [
                { src: image4, alt: 'Layout system', aspect: 'landscape' },
                { src: image5, alt: 'Print finish',  aspect: 'landscape' },
                { src: image6, alt: 'Detail view',   aspect: 'square'    },
            ],
        },
    ],
    nextProject: {
        name: 'Reborn',
        path: '/works/reborn',
        heroImage: nextHeroImage,
    },
};

export default function Romaji() {
    return <ProjectPage project={romaji} />;
}
