// src/pages/case-history/Reborn.jsx
import CaseHistoryPage from './CaseHistoryPage.jsx';

import heroImage from '../../../img/gradient.png';
import image1 from '../../../img/image-footer-05.jpg';
import image2 from '../../../img/image-footer-02.jpg';
import image3 from '../../../img/footer-image.jpg';
import image4 from '../../../img/image-footer-03.jpg';
import image5 from '../../../img/image-footer-04.jpg';

const reborn = {
    name: 'Reborn',
    category: 'VINYL',
    year: '2023',
    heroImage: heroImage,
    description: 'A vinyl record design that captures the essence of rebirth and transformation through bold visual storytelling and tactile design elements.',
    images: [
        { src: image1, alt: 'Cover artwork' },
        { src: image2, alt: 'Packaging details' },
        { src: image3, alt: 'Inner sleeve' },
        { src: image4, alt: 'Vinyl label' },
        { src: image5, alt: 'Complete package' },
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
