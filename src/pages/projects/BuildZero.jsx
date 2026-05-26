// src/pages/projects/BuildZero.jsx
import ProjectPage from './ProjectPage.jsx';

import heroImage     from '../../../img/build-zero/build-zero-01.jpg';
import nextHeroImage from '../../../img/portfolio/portfolio-01.jpg';
import image2 from '../../../img/build-zero/build-zero-02.jpg';
import image3 from '../../../img/build-zero/build-zero-03.jpg';
import image4 from '../../../img/build-zero/build-zero-04.jpg';
import image5 from '../../../img/build-zero/build-zero-05.jpg';
import image6 from '../../../img/build-zero/build-zero-06.jpg';

const buildZero = {
    name: 'Build Zero',
    category: 'UX/UI DESIGN',
    year: '2024',
    heroImage,
    description: 'A comprehensive UX/UI design project focused on creating intuitive user experiences. Every interaction was crafted to feel natural and purposeful.',
    keyInfo: {
        client: 'Build Zero',
        timeSpan: '2024',
        typeOfWork: 'UX/UI Design',
        kpi: 'User Experience',
    },
    sections: [
        // 1. Immagine subito dopo le key information
        { type: 'desktop', src: image2, alt: 'App overview' },

        // 2. Colour palette + typography — aggiungi le immagini quando pronte
        // { type: 'palette', paletteImage: { src: paletteImg, alt: 'Color palette' }, typographyImage: { src: typographyImg, alt: 'Typography' } },

        // 3. Testo narrativo
        {
            type: 'text',
            layout: 'right',
            content: 'The design process emphasized user research and iterative prototyping. We conducted extensive testing to ensure every touchpoint aligned with user expectations.',
        },

        // 4. iPhone mockups — sostituisci src con i tuoi PNG reali
        {
            type: 'iphone-row',
            images: [
                { src: 'https://placehold.co/390x844/111111/444444?text=Screen+1', alt: 'Home screen' },
                { src: 'https://placehold.co/390x844/111111/444444?text=Screen+2', alt: 'Detail screen' },
                { src: 'https://placehold.co/390x844/111111/444444?text=Screen+3', alt: 'Settings screen' },
            ],
        },

        // 5. Gallery
        {
            type: 'gallery',
            images: [
                { src: image3, alt: 'Wireframes',          aspect: 'landscape' },
                { src: image4, alt: 'Prototype screens',   aspect: 'portrait'  },
                { src: image5, alt: 'Final UI',            aspect: 'portrait'  },
                { src: image6, alt: 'Design system',       aspect: 'landscape' },
            ],
        },
    ],
    nextProject: {
        name: 'Portfolio Website',
        path: '/works/portfolio-website',
        heroImage: nextHeroImage,
    },
};

export default function BuildZero() {
    return <ProjectPage project={buildZero} />;
}
