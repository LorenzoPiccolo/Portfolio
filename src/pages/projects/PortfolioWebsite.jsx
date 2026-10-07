// src/pages/projects/PortfolioWebsite.jsx
// Il portfolio racconta sé stesso: poche parole, molta immagine. Le tavole (componenti, carattere, colore,
// card, wireframe della home, mappa delle animazioni) sono composte apposta, in stile scheda di design system,
// con font, colori e asset veri del sito; l'apertura e le foto dei dispositivi sono quelle di prima.
// Le sezioni su misura (identità, testo che si accende, fascia col marquee) sono in ./portfolio/.
import ProjectPage from './ProjectPage.jsx';
import DynamicButton from '../../components/DynamicButton.jsx';

import nextHeroImage from '../../../img/image-footer-05.jpg';
import logo from '../../../img/logo.svg';
import iconWeb from '../../../img/icona-01.svg';
import iconUx  from '../../../img/icona-02.svg';
import iconAi  from '../../../img/icona-03.svg';

import components from '../../../img/portfolio-2026/components.webp';
import type       from '../../../img/portfolio-2026/type.webp';
import colour     from '../../../img/portfolio-2026/colour.webp';
import card       from '../../../img/portfolio-2026/card.webp';
import layout     from '../../../img/portfolio-2026/layout.webp';
import motion     from '../../../img/portfolio-2026/motion.webp';
import heroStrip  from '../../../img/portfolio-2026/hero-strip.webp';
import bzCover    from '../../../img/build-zero-2026/cover.webp';
import atalusImg  from '../../../img/atalus/atalus-01.jpg';
import euricaImg  from '../../../img/eurica/eurica-cover.webp';
import romajiImg  from '../../../img/romaji/romaji-01.jpg';

// Foto dei dispositivi
import laptop  from '../../../img/portfolio/portfolio-01.jpg';
import tablet  from '../../../img/portfolio/portfolio-04.jpg';
import inHand  from '../../../img/portfolio/portfolio-03.jpg';
import button  from '../../../img/portfolio/portfolio-06.jpg';

const D = { width: 2880, height: 1800 };

const portfolioWebsite = {
    name: 'Portfolio Website',
    category: 'WEB DESIGN · DEVELOPMENT',
    theme: 'portfolio',
    year: '2025 — 2026',
    heroImage: laptop,
    heroAlt: 'The portfolio on a laptop, resting on a wave of black and white lines',

    overview: {
        eyebrow: 'Portfolio website',
        title: 'Design that lasts quietly.',
        lede: <>My own site, designed and built from the first pixel. <strong>Orange, black and a lot of air.</strong></>,
        specs: [['Role', 'Design & development'], ['Year', '2025 — 2026'], ['Stack', 'React · GSAP · Lenis'], ['Type', 'Personal project']],
    },

    highlights: [
        { src: type,   ...D, alt: 'Typography sheet: Urbanist and the type scale', strong: 'One typeface.', text: 'Urbanist from display to body, Space Grotesk for the small things.' },
        { src: colour, ...D, alt: 'Colour sheet: how much of each colour, and the contrast ratios', strong: 'Measured, not guessed.', text: 'Dark, light and one orange, across the whole home.' },
        { src: card,   ...D, alt: 'Anatomy of a project card', strong: 'The project card.', text: 'Year, cover, title, one button.' },
        { src: layout, ...D, alt: 'The home page as seven wireframes', strong: 'Seven sections.', text: 'From the orange hero to the footer, one scroll.' },
        { src: motion, ...D, alt: 'Map of the scroll animations on the home page', strong: 'What moves, and when.', text: 'Pinned, scrubbed, stacked. Nothing moves without a reason.' },
    ],

    sections: [
        { type: 'chapter', id: 'identity', nav: 'Identity', eyebrow: 'Identity', title: 'One orange. The rest is space.' },
        {
            type: 'pf-identity',
            logo,
            palette: [
                { name: 'Dark',     hex: '#181818', ink: '#f4f4f4', ring: true },
                { name: 'Orange',   hex: '#EF4E16', ink: '#181818' },
                { name: 'Light',    hex: '#F4F4F4', ink: '#181818' },
                { name: 'Gray 800', hex: '#1E1E1E', ink: '#ADADAD', ring: true },
                { name: 'Gray 600', hex: '#484848', ink: '#f4f4f4' },
                { name: 'Gray 400', hex: '#7F7F7F', ink: '#181818' },
            ],
            typeface: { label: 'Urbanist · Space Grotesk', specimen: 'Web · UI/UX · AI visual', mono: 'Space Grotesk for labels, years and small details' },
            icons: { label: 'Design focus', items: [{ src: iconWeb, label: 'Web design' }, { src: iconUx, label: 'UX/UI design' }, { src: iconAi, label: 'AI visual' }] },
        },

        { type: 'chapter', id: 'components', nav: 'Components', eyebrow: 'Components', title: 'Small parts, same voice.' },
        { type: 'pf-image', src: components, ...D, alt: 'The components of the site: header, buttons, section bar, filters, navigation, carousel, mark and accent' },

        { type: 'chapter', id: 'motion', nav: 'Motion', eyebrow: 'Motion', title: 'It moves when you do.' },
        {
            type: 'pf-motion',
            slides: [
                { key: 'hero',    strong: 'The hero.', text: '207 frames that your scroll plays. Here they loop.' },
                { key: 'menu',    strong: 'The menu.', text: 'One glass pill that opens in place.' },
                { key: 'buttons', strong: 'The buttons.', text: 'Magnetic, with an orange fill. Try them.' },
                { key: 'stack',   strong: 'Selected works.', text: 'Each card slides over the one before.' },
                { key: 'tools',   strong: 'The tools.', text: 'The row at the middle of the screen lights up.' },
                { key: 'preview', strong: 'Works.', text: 'A preview follows the cursor along the table.' },
            ],
            data: {
                strip: heroStrip,
                logo,
                card: euricaImg,
                buttons: <><DynamicButton label="Discover more" /><DynamicButton label="Get in touch" /></>,
                cards: [
                    { title: 'Build Zero', year: '2024', src: bzCover },
                    { title: 'Portfolio Website', year: '2025', src: laptop },
                    { title: 'Atalus', year: '2025', src: atalusImg },
                    { title: 'Eurica', year: '2025', src: euricaImg },
                ],
                tools: ['Gsap', 'HTML', 'Figma', 'Photoshop', 'Webflow', 'React', 'Claude', 'Vercel'],
                rows: [
                    { title: 'Build Zero', type: 'UX/UI', year: '2024', src: bzCover },
                    { title: 'Portfolio Website', type: 'Web', year: '2025', src: laptop },
                    { title: 'Atalus', type: 'Branding', year: '2025', src: atalusImg },
                    { title: 'Eurica', type: 'UX/UI', year: '2025', src: euricaImg },
                    { title: 'Romaji', type: 'Branding', year: '2024', src: romajiImg },
                ],
            },
        },
        { type: 'pf-reveal', text: 'Design, for me, is not about what appears first. It’s about what lasts quietly.', accent: ['quietly.'] },

        { type: 'chapter', id: 'screens', nav: 'Screens', eyebrow: 'Every screen', title: 'Same care, any size.' },
        {
            type: 'brandgrid',
            images: [
                { src: tablet, alt: 'The statement of the portfolio on a tablet' },
                { src: inHand, alt: 'The portfolio on a phone, in a hand', caption: 'In the hand', note: 'iPhone' },
                { src: button, alt: 'Close-up of the Discover more button', caption: 'The details', note: 'Buttons' },
            ],
        },

        { type: 'quote', lines: ['Full-time', 'perfection seeker.'], caption: 'Love minimalism, Japan, space and Ferrari.' },
        { type: 'outro', title: 'You’re already inside it.', lede: 'This page is part of the site it describes.' },
    ],

    nextProject: {
        name: 'Redi Website',
        path: '/works/redi',
        heroImage: nextHeroImage,
    },
};

export default function PortfolioWebsite() {
    return <ProjectPage project={portfolioWebsite} />;
}
