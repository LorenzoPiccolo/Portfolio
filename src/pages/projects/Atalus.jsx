// src/pages/projects/Atalus.jsx
import ProjectPage from './ProjectPage.jsx';
import heroImage     from '../../../img/atalus/atalus-01.jpg';
import nextHeroImage from '../../../img/reborn/reborn-01.jpg';
import imgShelter  from '../../../img/atalus/atalus-02.jpg';
import imgCards    from '../../../img/atalus/atalus-03.jpg';
import imgTotem    from '../../../img/atalus/atalus-04.jpg';
import imgManual   from '../../../img/atalus/atalus-05.jpg';
import imgSocial   from '../../../img/atalus/atalus-06.jpg';

const atalus = {
    name: 'Atalus',
    category: 'BRAND IDENTITY',
    year: '2025',
    theme: 'atalus',
    hue: '#B48CFF',
    heroImage,
    heroAlt: 'The Atalus mark on violet ribbons',

    overview: {
        title: 'One A that carries everything.',
        lede: 'Atalus is business software by Portico Digitale. The mark had to work at every size, from the app icon to the totem.',
        specs: [['Client', 'Atalus, Portico Digitale'], ['Year', '2025'], ['Role', 'Brand identity'], ['Deliverables', 'Mark, colours, applications']],
    },

    highlights: [
        { src: imgManual,  alt: 'A page of the brand guidelines', strong: 'The guidelines.', text: 'Icon, variants and palette on one board, including the sister brand Laworo.' },
        { src: imgCards,   alt: 'Atalus business cards', strong: 'On paper.', text: 'Violet business cards with the mark in white.' },
        { src: imgShelter, alt: 'Atalus poster in a bus shelter at night', position: '50% 60%', strong: 'On the street.', text: 'A bus-shelter poster, at night.' },
        { src: imgSocial,  alt: 'The Atalus Instagram profile', position: '50% 30%', strong: 'On social.', text: 'The Instagram profile, all in violet.' },
    ],

    sections: [
        { type: 'chapter', id: 'colour', nav: 'Colour', eyebrow: 'Colour', title: 'One violet, five shades.', lede: <>From almost black to lilac. The middle shade is called <strong>Forgotten Purple</strong>.</> },
        // Valori campionati dalle immagini del progetto: da sostituire con quelli del manuale.
        {
            type: 'bands',
            colors: [
                { name: 'Lilac',            hex: '#E8E4ED', ink: '#110B29' },
                { name: 'Forgotten Purple', hex: '#A970FF', ink: '#110B29' },
                { name: 'Mid violet',       hex: '#67549E', ink: '#fff' },
                { name: 'Night violet',     hex: '#2A1B57', ink: '#fff' },
                { name: 'Almost black',     hex: '#110B29', ink: '#fff', border: true },
            ],
        },

        { type: 'chapter', id: 'world', nav: 'In the world', eyebrow: 'In the world', title: 'Three words, everywhere.', lede: 'The payoff, in the client’s own words: organise, simplify, accelerate.' },
        { type: 'shrink', src: imgTotem, alt: 'Atalus totem with the payoff', words: ['Organizza.', 'Semplifica.', 'Accelera.'], deep: '#0F0824', accent: '#A970FF' },
    ],

    nextProject: {
        name: 'Reborn',
        path: '/works/reborn',
        heroImage: nextHeroImage,
    },
};

export default function Atalus() {
    return <ProjectPage project={atalus} />;
}
