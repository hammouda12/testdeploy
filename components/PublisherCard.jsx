"use client";

export default function PublisherCard({ name, image, href, playing, backgroundGradient }) {
  const formattedPlaying = playing ? parseInt(playing).toLocaleString() : '0';
  const baseImageUrl = image.split('?')[0]; // Get base URL without query params

  const getFullUrl = (href) => {
    if (!href || href === '#') return '#';
    // If it already starts with http, return as is
    if (href.startsWith('http')) return href;
    // Otherwise, prepend stake.com
    return `https://stake.com${href}`;
  };

  const handleClick = (e) => {
    const fullUrl = getFullUrl(href);
    if (fullUrl !== '#') {
      e.preventDefault();
      window.location.href = fullUrl;
    }
  };

  return (
    <div className="card-focus svelte-4d9275">
      <div className="wrap svelte-181xon6">
        <a
          className="publisher-link"
          href={getFullUrl(href)}
          onClick={handleClick}
          data-sveltekit-reload="off"
          data-sveltekit-preload-data="tap"
          data-sveltekit-noscroll="off"
        >
          <div className="img-wrap five-by-two svelte-181xon6">
            <img
              src={image}
              alt={name}
              background={backgroundGradient}
              loading="eager"
              layout="constrained"
              aspectratio="0"
              className="max-w-full max-h-full"
              decoding="async"
              srcSet={`${baseImageUrl}?w=169&h=67&fit=min&auto=format 169w, ${baseImageUrl}?w=338&h=134&fit=min&auto=format 338w`}
              sizes="(min-width: 169px) 169px, 100vw"
              onLoad={(e) => {
                // Ensure image is visible after load (fade in effect)
                const img = e.target;
                if (img.complete && img.naturalHeight !== 0) {
                  img.style.opacity = '1';
                }
              }}
              onError={(e) => {
                // Fallback strategy: try base URL, then original image URL
                const target = e.target;
                if (target.src !== baseImageUrl && target.src !== image) {
                  target.src = baseImageUrl;
                } else if (target.src === baseImageUrl) {
                  // If base URL also fails, try original image URL
                  target.src = image;
                } else {
                  // Last resort: show background gradient only
                  target.style.display = 'none';
                }
              }}
              style={{
                objectFit: 'cover',
                background: backgroundGradient || 'transparent',
                maxWidth: '169px',
                maxHeight: '67px',
                aspectRatio: '2.52239 / 1',
                width: '100%',
                opacity: '1'
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

