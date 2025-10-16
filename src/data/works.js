// src/data/works.js
import project01Video from '../../video/project-01.mp4';
import project02Video from '../../video/project-02.mp4';
import footerImage from '../../img/footer-image.jpg';
import imageFooter02 from '../../img/image-footer-02.jpg';
import project03Poster from '../../img/project-03.jpg';
import imageFooter05 from '../../img/image-footer-05.jpg';

export const WORKS = [
  {
    id: 'project-01',
    title: 'Project 01',
    subtitle: 'Art Direction',
    videoSrc: project01Video,
    poster: footerImage,
    year: '2025',
  },
  {
    id: 'project-02',
    title: 'Project 02',
    subtitle: 'Video Editing',
    videoSrc: project02Video,
    poster: imageFooter02,
    year: '2024',
  },
  {
    id: 'project-03',
    title: 'Project 03',
    subtitle: 'Interactive Design',
    videoSrc: project01Video,
    poster: project03Poster,
    year: '2025',
  },
  {
    id: 'project-04',
    title: 'Project 04',
    subtitle: 'Brand Experience',
    videoSrc: project02Video,
    poster: imageFooter05,
    year: '2025',
  },
];
