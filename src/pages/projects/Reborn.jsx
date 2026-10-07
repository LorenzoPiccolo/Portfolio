// src/pages/projects/Reborn.jsx
import ProjectPage from './ProjectPage.jsx';
import heroImage     from '../../../img/reborn/reborn-01.jpg';
import nextHeroImage from '../../../img/build-zero-2026/card.webp';
import imgCoverArt from '../../../img/reborn/reborn-02.jpg';
import imgTitle    from '../../../img/reborn/reborn-03.jpg';
import imgOpen     from '../../../img/reborn/reborn-04.jpg';
import imgBack     from '../../../img/reborn/reborn-05.jpg';
import imgVinyl    from '../../../img/reborn/reborn-06.jpg';

const reborn = {
    name: 'Reborn',
    category: 'VINYL',
    year: '2023',
    theme: 'reborn',
    hue: '#D9C7A0',
    heroImage,
    heroAlt: 'Reborn records and sleeves floating',

    overview: {
        title: 'A photo coming back into focus.',
        lede: 'Cover, back and label for Reborn, an album by Sonik Trapz. A blurred wheat field, a figure seen from behind and a title emerging from the noise.',
        specs: [['Client', 'Personal project'], ['Year', '2023'], ['Role', 'Artwork & packaging'], ['Deliverables', 'Cover, back, label']],
    },

    sections: [
        { type: 'chapter', id: 'record', nav: 'Record', eyebrow: 'The record', title: 'Pull it out.', lede: 'Scroll and the vinyl slides out of its sleeve.' },
        { type: 'sleeve', src: imgCoverArt, alt: 'The Reborn cover', label: { title: 'REBORN', artist: 'SONIK TRAPZ', year: '2023' } },
        {
            type: 'highlights',
            items: [
                { src: imgOpen,  alt: 'The open packaging with the vinyl', strong: 'Open.', text: 'Back, front and vinyl, in a row.' },
                { src: imgTitle, alt: 'The Reborn title over the blurred field', strong: 'The title.', text: 'Letters that seem to come out of the noise.' },
                { src: imgVinyl, alt: 'The cream vinyl', fit: 'contain', bg: '#F2EED8', strong: 'The vinyl.', text: 'Cream, with a black label.' },
            ],
        },
        { type: 'chapter', id: 'back', nav: 'Back', eyebrow: 'The back', title: 'Take a closer look.', lede: 'Hover the back cover to read it up close.' },
        {
            type: 'backcover', src: imgBack, alt: 'Back and front of Reborn side by side, with the tracklist',
            sides: [
                { name: 'Side A', start: 1, tracks: ['Dazzling Light', 'In-Door', 'Reborn', 'Wheat Field'] },
                { name: 'Side B', start: 5, tracks: ['Who R U?', 'Wolves', 'Into H.', 'Flying'] },
            ],
        },
    ],

    nextProject: {
        name: 'Build Zero',
        path: '/works/build-zero',
        heroImage: nextHeroImage,
    },
};

export default function Reborn() {
    return <ProjectPage project={reborn} />;
}
