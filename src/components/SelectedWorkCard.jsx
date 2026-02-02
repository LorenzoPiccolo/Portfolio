import { Link } from 'react-router-dom';

export default function SelectedWorkCard({ videoSrc, poster = undefined, title, subtitle, year, href }) {
  const isExternal = href?.startsWith('http') || href?.startsWith('mailto:') || href?.startsWith('#');

  let Wrapper = 'article';
  let wrapperProps = { className: "relative h-full w-full rounded-[24px] overflow-hidden bg-dark origin-top group" };

  if (href) {
    if (isExternal) {
      Wrapper = 'a';
      wrapperProps = { href, className: "block relative h-full w-full rounded-[24px] overflow-hidden bg-dark origin-top group" };
    } else {
      Wrapper = Link;
      wrapperProps = { to: href, className: "block relative h-full w-full rounded-[24px] overflow-hidden bg-dark origin-top group" };
    }
  }

  return (
    <Wrapper {...wrapperProps}>
      <video
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        src={videoSrc}
        poster={poster}
        autoPlay
        loop
        muted
        playsInline
        aria-label={`Video preview for ${title}`}
      />
      <div className="absolute top-4 left-4 bg-dark/70 backdrop-blur-lg rounded-full px-5 py-1.5 z-10">
        <h6 className="text-14 text-light">{year}</h6>
      </div>

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-4 text-center text-light">
        <h3 className="title-44 md:title-64 font-normal leading-none">{title}</h3>
        <p className="text-20 md:text-16 font-normal leading-tight opacity-90">{subtitle}</p>
      </div>

      <div className="absolute inset-0 bg-dark/20 transition-opacity duration-300 " aria-hidden="true" />
    </Wrapper>
  );
}
