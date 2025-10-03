// src/components/SelectedWorkCard.jsx
export default function SelectedWorkCard({ videoSrc, poster, title, subtitle }) {
  return (
    <article className="relative h-full w-full rounded-[24px] overflow-hidden bg-dark origin-top">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={videoSrc}
        poster={poster}
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-4 text-center text-light">
        <h3 className="title-64 font-normal leading-none">{title}</h3>
        <p className="text-16 font-normal leading-tight opacity-90">{subtitle}</p>
      </div>

      <div className="absolute inset-0 bg-dark/20" aria-hidden="true" />
    </article>
  );
}

SelectedWorkCard.defaultProps = {
  poster: undefined,
};
