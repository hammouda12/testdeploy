export default function PublisherCard({ name, image, href, playing, backgroundGradient }) {
  const formattedPlaying = playing ? parseInt(playing).toLocaleString() : '0';
  const baseImageUrl = image.split('?')[0]; // Get base URL without query params

  return (
    <div className="card-focus svelte-4d9275">
      <div className="wrap svelte-181xon6">
        <a
          className="publisher-link"
          href={href || '#'}
          data-sveltekit-reload="off"
          data-sveltekit-preload-data="tap"
          data-sveltekit-noscroll="off"
        >
          <div className="img-wrap five-by-two svelte-181xon6">
            <img
              src={image}
              alt={name}
              background={backgroundGradient}
              loading="lazy"
              layout="constrained"
              aspectratio="0"
              className="max-w-full max-h-full"
              decoding="async"
              srcSet={`${baseImageUrl}?w=169&h=67&fit=min&auto=format 169w, ${baseImageUrl}?w=338&h=134&fit=min&auto=format 338w`}
              sizes="(min-width: 169px) 169px, 100vw"
              style={{
                objectFit: 'cover',
                background: backgroundGradient || 'transparent',
                maxWidth: '169px',
                maxHeight: '67px',
                aspectRatio: '2.52239 / 1',
                width: '100%'
              }}
            />
          </div>
        </a>
      </div>
      <div className="stack x-flex-start y-center gap-smaller padding-none direction-horizontal padding-left-auto padding-top-smaller padding-bottom-auto padding-right-auto svelte-1klblr3">
        <span
          className="scale-up block svelte-rxhcv3 is-relative"
          style={{ width: '6px', height: '6px' }}
        />
        <span type="body" tag="span" size="xs" className="ds-body-xs" data-ds-text="true">
          <span
            tag="span"
            type="body"
            size="xs"
            variant="neutral-default"
            className="text-neutral-default ds-body-xs"
            data-ds-text="true"
          >
            {formattedPlaying}
          </span>
          {' '}playing
        </span>
      </div>
    </div>
  );
}

