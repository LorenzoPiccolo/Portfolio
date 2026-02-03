// src/pages/case-history/Romaji.jsx
import CaseHistoryPage from './CaseHistoryPage.jsx';

import heroImage from '../../../img/romaji/romaji-01.jpg';
import image2 from '../../../img/romaji/romaji-02.jpg';
import image3 from '../../../img/romaji/romaji-03.jpg';
import image4 from '../../../img/romaji/romaji-04.jpg';
import image5 from '../../../img/romaji/romaji-05.jpg';
import image6 from '../../../img/romaji/romaji-06.jpg';

const romaji = {
    name: 'Romaji',
    category: 'MAGAZINE',
    year: '2024',
    heroImage: heroImage,
    description: 'An editorial design project exploring the intersection of Japanese culture and contemporary typography. Each spread balances tradition with modern aesthetics.',
    images: [
        { src: image2, alt: 'Typography details' },
        { src: image3, alt: 'Cover design' },
        { src: image4, alt: 'Layout system' },
        { src: image5, alt: 'Print finish' },
        { src: image6, alt: 'Detail view' },

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
