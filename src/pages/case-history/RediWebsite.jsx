// src/pages/case-history/RediWebsite.jsx
import CaseHistoryPage from './CaseHistoryPage.jsx';

import heroImage from '../../../img/image-footer-05.jpg';
import image1 from '../../../img/project-03.jpg';
import image2 from '../../../img/image-footer-02.jpg';
import image3 from '../../../img/footer-image.jpg';
import image4 from '../../../img/image-footer-03.jpg';
import image5 from '../../../img/image-footer-04.jpg';

const rediWebsite = {
    name: 'Redi Website',
    category: 'WEB DEVELOPMENT',
    year: '2025',
    heroImage: heroImage,
    description: 'A modern web platform built with performance and accessibility in mind. Clean code meets beautiful design to create a seamless user experience.',
    images: [
        { src: image1, alt: 'Development process' },
        { src: image2, alt: 'Final result' },
        { src: image3, alt: 'Performance metrics' },
        { src: image4, alt: 'Responsive design' },
        { src: image5, alt: 'Code architecture' },
    ],
    sections: [
        {
            type: 'text',
            layout: 'right',
            content: 'The development focused on optimization and best practices, ensuring fast load times and smooth interactions across all devices and browsers.',
        },
    ],
};

export default function RediWebsite() {
    return <CaseHistoryPage project={rediWebsite} />;
}
