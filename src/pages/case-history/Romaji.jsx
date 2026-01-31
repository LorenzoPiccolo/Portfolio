// src/pages/case-history/Romaji.jsx
import CaseHistoryPage from './CaseHistoryPage.jsx';

import heroImage from '../../../img/image-footer-03.jpg';
import image1 from '../../../img/image-footer-04.jpg';
import image2 from '../../../img/gradient.png';

const romaji = {
    name: 'Romaji',
    category: 'MAGAZINE',
    year: '2024',
    heroImage: heroImage,
    description: 'An editorial design project exploring the intersection of Japanese culture and contemporary typography. Each spread balances tradition with modern aesthetics.',
    images: [
        { src: image1, alt: 'Editorial spreads', rounded: true },
        { src: image2, alt: 'Typography details', rounded: false },
    ],
    sections: [
        {
            type: 'text',
            layout: 'right',
            content: 'The magazine format allowed for experimentation with layout and visual hierarchy, creating a reading experience that feels both curated and immersive.',
        },
    ],
};

export default function Romaji() {
    return <CaseHistoryPage project={romaji} />;
}
