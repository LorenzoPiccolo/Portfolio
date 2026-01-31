// src/pages/case-history/Reborn.jsx
import CaseHistoryPage from './CaseHistoryPage.jsx';

import heroImage from '../../../img/gradient.png';
import image1 from '../../../img/image-footer-05.jpg';
import image2 from '../../../img/image-footer-02.jpg';

const reborn = {
    name: 'Reborn',
    category: 'VINYL',
    year: '2023',
    heroImage: heroImage,
    description: 'A vinyl record design that captures the essence of rebirth and transformation through bold visual storytelling and tactile design elements.',
    images: [
        { src: image1, alt: 'Cover artwork', rounded: true },
        { src: image2, alt: 'Packaging details', rounded: false },
    ],
    sections: [
        {
            type: 'text',
            layout: 'right',
            content: 'The design embraces the physical nature of vinyl, using special printing techniques and materials to create a collector-worthy piece of art.',
        },
    ],
};

export default function Reborn() {
    return <CaseHistoryPage project={reborn} />;
}
