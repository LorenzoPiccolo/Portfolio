// src/data/works.js
// Homepage featured works (cards with video)
import project01Video from '../../video/project-01.mp4';
import project02Video from '../../video/project-02.mp4';
import footerImage from '../../img/footer-image.jpg';
import imageFooter02 from '../../img/image-footer-02.jpg';
import project03Poster from '../../img/project-03.jpg';
import imageFooter05 from '../../img/image-footer-05.jpg';

export const WORKS = [
  {
    id: 'build-zero',
    title: 'Build Zero',
    subtitle: 'UX/UI Design',
    videoSrc: project01Video,
    poster: project03Poster,
    year: '2024',
    href: '/case-history/build-zero',
  },
  {
    id: 'portfolio-website',
    title: 'Portfolio Website',
    subtitle: 'Web Design',
    videoSrc: project02Video,
    poster: imageFooter02,
    year: '2025',
    href: '/case-history/portfolio-website',
  },
  {
    id: 'alidays',
    title: 'Alidays',
    subtitle: 'Brand Identity',
    videoSrc: project01Video,
    poster: footerImage,
    year: '2024',
    href: '/case-history/alidays',
  },
  {
    id: 'redi-website',
    title: 'Redi Website',
    subtitle: 'Web Development',
    videoSrc: project02Video,
    poster: imageFooter05,
    year: '2025',
    href: '/case-history/redi',
  },
];
