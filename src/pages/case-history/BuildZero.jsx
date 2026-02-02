// src/pages/case-history/BuildZero.jsx
import CaseHistoryPage from './CaseHistoryPage.jsx';

import heroImage from '../../../img/project-03.jpg';
import image1 from '../../../img/image-footer-02.jpg';
import image2 from '../../../img/image-footer-03.jpg';
import image3 from '../../../img/footer-image.jpg';
import image4 from '../../../img/image-footer-04.jpg';
import image5 from '../../../img/image-footer-05.jpg';

const buildZero = {
    name: 'Build Zero',
    category: 'UX/UI DESIGN',
    year: '2024',
    heroImage: heroImage,
    description: 'A comprehensive UX/UI design project focused on creating intuitive user experiences. Every interaction was crafted to feel natural and purposeful.',
    images: [
        { src: image1, alt: 'Interface design' },
        { src: image2, alt: 'User flow' },
        { src: image3, alt: 'Wireframes' },
        { src: image4, alt: 'Prototype screens' },
        { src: image5, alt: 'Final UI' },
    ],
    sections: [
        {
            type: 'text',
            layout: 'right',
            content: 'The design process emphasized user research and iterative prototyping. We conducted extensive testing to ensure every touchpoint aligned with user expectations.',
        },
    ],
};

export default function BuildZero() {
    return <CaseHistoryPage project={buildZero} />;
}
