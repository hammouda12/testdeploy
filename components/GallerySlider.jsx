"use client";

import { useRef, useState, useEffect } from "react";
import GameCard from "./GameCard";

export default function GallerySlider({ id, title, cards, icon }) {
  const galleryRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    if (!galleryRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = galleryRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  };

  useEffect(() => {
    checkScrollability();
    const gallery = galleryRef.current;
    if (gallery) {
      gallery.addEventListener("scroll", checkScrollability);
      window.addEventListener("resize", checkScrollability);
      return () => {
        gallery.removeEventListener("scroll", checkScrollability);
        window.removeEventListener("resize", checkScrollability);
      };
    }
  }, [cards]);

  const step = () => {
    const el = galleryRef.current;
    if (!el) return 0;
    const first = el.querySelector('.slide');
    if (!first) return 0;
    const cardWidth = first.getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(el).gap || '0');
    const viewportWidth = window.innerWidth;
    
    // Responsive scroll based on screen size
    let cardsToScroll = 3; // Default minimum (for screens < 500px)
    if (viewportWidth >= 1120) {
      cardsToScroll = 8; // 1120px+: 8 cards
    } else if (viewportWidth >= 1060) {
      cardsToScroll = 7; // 1060px-1119px: 7 cards
    } else if (viewportWidth >= 910) {
      cardsToScroll = 6; // 910px-1059px: 6 cards
    } else if (viewportWidth >= 768) {
      cardsToScroll = 5; // 768px-909px: 5 cards
    } else if (viewportWidth >= 712) {
      cardsToScroll = 4; // 712px-767px: 4 cards
    } else if (viewportWidth >= 701) {
      cardsToScroll = 3; // 701px-711px: 3 cards
    } else if (viewportWidth >= 500) {
      cardsToScroll = 4; // 500px-700px: 4 cards
    } else {
      cardsToScroll = 3; // Below 500px: 3 cards
    }
    
    return (cardWidth + gap) * cardsToScroll;
  };

  const prev = () => {
    if (galleryRef.current) {
      galleryRef.current.scrollBy({ left: -step(), behavior: 'smooth' });
    }
  };

  const next = () => {
    if (galleryRef.current) {
      galleryRef.current.scrollBy({ left: step(), behavior: 'smooth' });
    }
  };

  const sectionHref = title === "Stake Originals" ? "/casino/group/stake-originals" : "#";

  return (
    <div className="slider svelte-86vx8t">
      <div className="header svelte-86vx8t">
        <div className="inline-flex items-center gap-2">
          <a
            className="[font-family:var(--ds-font-family-default)] [font-variant-numeric:var(--ds-font-variant-numeric,lining-nums_tabular-nums)] [font-feature-settings:var(--ds-font-feature-settings,&quot;salt&quot;_on)] inline-flex relative items-center gap-2 justify-center rounded-(--ds-radius-md) [font-weight:var(--ds-font-weight-thick)] ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] [text-decoration:none] hover:[text-decoration:none] bg-transparent text-white hover:bg-transparent hover:text-white focus-visible:outline-hidden var(--ds-font-size-md) [&_svg]:text-grey-200 [&:hover>svg]:text-white whitespace-normal"
            href={sectionHref}
            data-sveltekit-reload="off"
            data-sveltekit-preload-data="hover"
            data-sveltekit-noscroll="off"
          >
            {icon && (
              <svg
                data-ds-icon={icon}
                width="20"
                height="20"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="inline-block shrink-0"
                style={{ color: '#b1bad3' }}
              >
                {icon === "Fire" && (
                  <path
                    fill="currentColor"
                    d="M19.38 5.59c-.64-.83-1.93-.77-2.51.11L16 7l-2.56-4.48C12.6 1.05 10.7.55 9.27 1.45c-2.82 1.79-6.86 5.28-7.24 10.7-.36 5.11 3.19 9.84 8.24 10.69A10 10 0 0 0 22 12.99c0-3.02-1.13-5.48-2.62-7.41zM12 21c-2.21 0-4-1.22-4-3 0-2.91 4-6 4-6s4 3.09 4 6c0 1.78-1.79 3-4 3"
                  />
                )}
                {icon === "Slots" && (
                  <>
                    <path
                      fill="currentColor"
                      d="M7.62 10.61a20 20 0 0 0-1.45 3.96 7.5 7.5 0 0 0 0 3.59l.18.75-4.07 1A9.47 9.47 0 0 1 3 13.43l-3 .71v-2.92l7.34-1.76zM24 11.72l-.23 1.16a21.4 21.4 0 0 0-2.97 2.95 7.64 7.64 0 0 0-1.5 3.26l-.15.75-4.15-.76a9.53 9.53 0 0 1 3.34-5.57l-3-.59 1.26-2.66z"
                    />
                    <path
                      fill="currentColor"
                      d="M18 6.03a33.5 33.5 0 0 0-3.8 5.74 12.44 12.44 0 0 0-1.4 5.7v1.25H8.08a13.9 13.9 0 0 1 1.25-5.69 21.7 21.7 0 0 1 3.37-5.28h-7V4.09H18z"
                    />
                  </>
                )}
                {icon === "VIPHost" && (
                  <path
                    fill="currentColor"
                    d="M15.65 1.775h-.3l-3.4 1.2-3.4-1.2c-.6-.2-1.3.2-1.4.9v2.5c0 .7.6 1.2 1.2 1.2h.3l3.3-1.5 3.4 1.5c.7.2 1.3-.2 1.5-.9v-2.5c0-.7-.6-1.2-1.2-1.2m-5.4 18.9-4.5-15c-.3-.6-.9-.9-1.6-.7l-1.5.5c-.5.1-.8.6-.8 1.1l-.9 14.4c0 .7.5 1.2 1.1 1.3h7c.7 0 1.2-.5 1.2-1.2.1-.1 0-.3 0-.4m11.8-14.1c0-.5-.3-.9-.8-1.1l-1.5-.6c-.6-.2-1.3.1-1.5.7l-4.5 15c-.2.6.2 1.3.8 1.5.1 0 .2.1.4.1h6.9c.7 0 1.2-.5 1.2-1.2z"
                  />
                )}
                {icon === "AllGames" && (
                  <path
                    fill="currentColor"
                    d="M9.08 1H3a2 2 0 0 0-2 2v6.08a2 2 0 0 0 2 2h6.08a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2M21 1h-6.08a2 2 0 0 0-2 2v6.08a2 2 0 0 0 2 2H21a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2M9.08 12.92H3a2 2 0 0 0-2 2V21a2 2 0 0 0 2 2h6.08a2 2 0 0 0 2-2v-6.08a2 2 0 0 0-2-2m11.92 0h-6.08a2 2 0 0 0-2 2V21a2 2 0 0 0 2 2H21a2 2 0 0 0 2-2v-6.08a2 2 0 0 0-2-2"
                  />
                )}
                {icon === "Burst" && (
                  <path
                    fill="currentColor"
                    d="m24 15-4.5 7.5h-3c0-2.49-2.01-4.5-4.5-4.5s-4.5 2.01-4.5 4.5h-3L0 15l4.5 1.5L3 9l6 3 3-10.5L15 12l6-3-1.5 7.5z"
                  />
                )}
              </svg>
            )}
            <h2
              type="heading"
              size="lg"
              variant="neutral-default"
              className="text-neutral-default ds-heading-lg"
              data-ds-text="true"
            >
              {title}
            </h2>
          </a>
        </div>

        <div className="arrows">
          <button
            type="button"
            tabIndex={0}
            className={`[font-family:var(--ds-font-family-default)] [font-variant-numeric:var(--ds-font-variant-numeric,lining-nums_tabular-nums)] [font-feature-settings:var(--ds-font-feature-settings,&quot;salt&quot;_on)] inline-flex relative items-center gap-2 justify-center [font-weight:var(--ds-font-weight-thick)] whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white hover:bg-transparent hover:text-white focus-visible:outline-hidden var(--ds-font-size-sm) [&_svg]:text-grey-200 [&:hover>svg]:text-white backward ${!canScrollLeft ? 'disabled' : ''}`}
            disabled={!canScrollLeft}
            onClick={prev}
            data-button-root=""
            style={{
              width: '50%',
              height: '100%',
              border: 'none',
              borderRight: `1px solid ${!canScrollLeft ? '#637082' : '#a9b2ca'}`,
              borderRadius: 0,
              padding: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: !canScrollLeft ? 'not-allowed' : 'pointer',
              background: 'transparent'
            }}
          >
            <div className="arrow-inner">
              <svg
                data-ds-icon="ChevronLeft"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="inline-block shrink-0"
                style={{ color: !canScrollLeft ? '#637082' : '#a9b2ca' }}
              >
                <path
                  fill="currentColor"
                  d="M14.293 5.293a1 1 0 1 1 1.414 1.414L10.414 12l5.293 5.293.068.076a1 1 0 0 1-1.406 1.406l-.076-.068-6-6a1 1 0 0 1 0-1.414z"
                />
              </svg>
            </div>
          </button>
          <button
            type="button"
            tabIndex={0}
            className={`[font-family:var(--ds-font-family-default)] [font-variant-numeric:var(--ds-font-variant-numeric,lining-nums_tabular-nums)] [font-feature-settings:var(--ds-font-feature-settings,&quot;salt&quot;_on)] inline-flex relative items-center gap-2 justify-center [font-weight:var(--ds-font-weight-thick)] whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white hover:bg-transparent hover:text-white focus-visible:outline-hidden var(--ds-font-size-sm) [&_svg]:text-grey-200 [&:hover>svg]:text-white forward ${!canScrollRight ? 'disabled' : ''}`}
            disabled={!canScrollRight}
            onClick={next}
            data-button-root=""
            style={{
              width: '50%',
              height: '100%',
              border: 'none',
              borderRadius: 0,
              padding: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: !canScrollRight ? 'not-allowed' : 'pointer',
              background: 'transparent'
            }}
          >
            <div className="arrow-inner">
              <svg
                data-ds-icon="ChevronRight"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="inline-block shrink-0"
                style={{ color: !canScrollRight ? '#637082' : '#a9b2ca' }}
              >
                <path
                  fill="currentColor"
                  d="M8.293 5.293a1 1 0 0 1 1.338-.069l.076.069 6 6a1 1 0 0 1 0 1.414l-6 6a1 1 0 1 1-1.414-1.414L13.586 12 8.293 6.707l-.068-.076a1 1 0 0 1 .068-1.338"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>

      <div
        id={id}
        ref={galleryRef}
        className="gallery scrollX hide-scrollbar svelte-86vx8t"
      >
        {cards.map((c, i) => (
          <div 
            className="slide svelte-1vx4gmg" 
            key={i}
          >
            <GameCard {...c} sectionName={title} />
          </div>
        ))}
        <div className="slide svelte-1vx4gmg">
          <div 
            className="wrap see-all svelte-1phf9cx"
            style={{
              width: '100%',
              maxWidth: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 0,
              position: 'relative',
              flexShrink: 0,
              boxSizing: 'border-box'
            }}
          >
            <a
              data-sveltekit-preload-data="hover"
              data-analytics="see-all-card-link"
              className="link svelte-1phf9cx"
              href={sectionHref}
              style={{
                width: '100%',
                maxWidth: '100%',
                textDecoration: 'none',
                color: 'inherit',
                display: 'flex',
                flexDirection: 'column',
                boxSizing: 'border-box'
              }}
            >
              <div 
                className="card-wrap wrap svelte-1phf9cx"
                style={{
                  width: '100%',
                  maxWidth: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0,
                  position: 'relative',
                  boxSizing: 'border-box'
                }}
              >
                <div 
                  className="image"
                  style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '100%',
                    aspectRatio: '180 / 236',
                    overflow: 'hidden',
                    borderRadius: '0.5rem',
                    marginBottom: '0.25rem',
                    boxSizing: 'border-box'
                  }}
                >
                  <img
                    src="https://mediumrare.imgix.net/seeAll-en.jpg?&dpr=1.100000023841858&format=auto&auto=format&q=50&w=220&blur=200&px=6&quality=15"
                    alt="See All Card"
                    width="180"
                    height="236"
                    draggable="false"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'blur(200px)',
                      opacity: 0.3,
                      boxSizing: 'border-box'
                    }}
                  />
                  <img
                    loading="lazy"
                    src="https://mediumrare.imgix.net/seeAll-en.jpg?&dpr=1.100000023841858&format=auto&auto=format&q=50&w=220"
                    alt="See All Card"
                    width="180"
                    height="236"
                    draggable="false"
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div 
                  className="info-wrap svelte-1phf9cx"
                  style={{
                    paddingTop: '0.5rem',
                    textAlign: 'center',
                    width: '100%',
                    boxSizing: 'border-box'
                  }}
                >
                  <span
                    tag="span"
                    type="body"
                    size="md"
                    variant="neutral-default"
                    className="text-neutral-default ds-body-md"
                    data-ds-text="true"
                  >
                    See All
                  </span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
