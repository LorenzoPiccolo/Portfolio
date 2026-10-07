// src/pages/projects/Romaji.jsx
import ProjectPage from './ProjectPage.jsx';
import heroImage     from '../../../img/romaji/romaji-01.jpg';
import nextHeroImage from '../../../img/atalus/atalus-01.jpg';
import imgVespa   from '../../../img/romaji/romaji-02.jpg';
import imgTorii   from '../../../img/romaji/romaji-03.jpg';
import imgCover   from '../../../img/romaji/romaji-04.jpg';
import imgArticle from '../../../img/romaji/romaji-05.jpg';
import imgPoster  from '../../../img/romaji/romaji-06.jpg';

const romaji = {
    name: 'Romaji',
    category: 'MAGAZINE',
    year: '2024',
    theme: 'romaji',
    hue: '#F0604F',
    heroImage,
    heroAlt: 'The Romaji magazine on a table',

    overview: {
        title: 'Japan, in Italian.',
        lede: 'Romaji is a quarterly magazine that tells Japan to Italian readers. I designed the masthead, the grid, the cover and the inside pages.',
        specs: [['Client', 'Personal project'], ['Year', '2024'], ['Role', 'Editorial design'], ['Format', 'Quarterly magazine']],
    },

    highlights: [
        { src: imgTorii,   alt: 'A tunnel of red torii', strong: 'The opener.', text: 'Red torii, across the full page.' },
        { src: imgArticle, alt: 'An article on personal space in Japanese life', strong: 'The articles.', text: 'Plenty of white paper around the text.' },
        { src: imgVespa,   alt: 'The Vespa Mod page', fit: 'contain', bg: '#fff', strong: 'Italy and Japan.', text: 'Vespa Mod, in light blue and white.' },
        { src: imgPoster,  alt: 'A poster reading 日本語', fit: 'contain', bg: '#fff', strong: 'The poster.', text: '日本語, in red and black.' },
    ],

    sections: [
        { type: 'chapter', id: 'cover', nav: 'Cover', eyebrow: 'The cover', title: 'The cover is the grid.', lede: 'Masthead, issue and price decide where everything else goes.' },
        { type: 'papercover', vertical: 'ローマ字雑誌', title: 'Romaji', text: 'A quarterly magazine between Italy and Japan.', folio: ['Quarterly', 'August 2023', '€8.99'], src: imgCover, alt: 'The Romaji cover with the red torii' },
        { type: 'bleed', src: imgTorii, alt: '', glyph: '間' },
        {
            type: 'quote', id: 'space', glyph: '間',
            lines: ['L’importanza dello', 'spazio personale nella', 'vita dei Giapponesi.'],
            caption: 'Article headline: “The importance of personal space in Japanese life” · 間, ma: the space between things',
        },
    ],

    nextProject: {
        name: 'Atalus',
        path: '/works/atalus',
        heroImage: nextHeroImage,
    },
};

export default function Romaji() {
    return <ProjectPage project={romaji} />;
}
