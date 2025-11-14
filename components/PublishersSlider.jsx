"use client";

import { useRef, useState, useEffect } from "react";
import PublisherCard from "./PublisherCard";

export default function PublishersSlider({ id, title, publishers }) {
  const galleryRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const isScrollingRef = useRef(false);

  const checkScrollability = () => {
    if (!galleryRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = galleryRef.current;
    // Add a small threshold (1px) to account for rounding errors on mobile
    setCanScrollLeft(scrollLeft > 1);
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
  }, [publishers]);

  const step = () => {
    const el = galleryRef.current;
    if (!el) return 0;
    const first = el.querySelector('.slide');
    if (!first) return 0;
    const cardWidth = first.getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(el).gap || '0');
    // Scroll by 7 cards (7 * (cardWidth + gap))
    return (cardWidth + gap) * 7;
  };

  const prev = () => {
    if (galleryRef.current) {
      galleryRef.current.scrollBy({ left: -step(), behavior: 'smooth' });
    }
  };

  const next = () => {
    const el = galleryRef.current;
    if (!el || isScrollingRef.current) return;
    
    // Prevent multiple simultaneous scrolls
    isScrollingRef.current = true;
    
    // Use requestAnimationFrame to ensure layout is complete before scrolling
    requestAnimationFrame(() => {
      const scrollAmount = step();
      if (scrollAmount > 0) {
        el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        
        // Update scrollability after scroll completes (for mobile smooth scroll)
        setTimeout(() => {
          checkScrollability();
          isScrollingRef.current = false;
        }, 350); // Wait for smooth scroll to complete
      } else {
        isScrollingRef.current = false;
      }
    });
  };

  return (
    <div className="slider svelte-86vx8t" data-content="">
      <div className="header svelte-86vx8t">
        <div className="inline-flex items-center gap-2">
          <a
            className="slider-title-link"
            href="/casino/collection/provider"
            data-sveltekit-reload="off"
            data-sveltekit-preload-data="hover"
            data-sveltekit-noscroll="off"
          >
            <svg
              data-ds-icon="GroupProviders"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="inline-block shrink-0"
              style={{ color: 'rgb(177, 186, 211)' }}
            >
              <path
                fill="currentColor"
                d="M13 5.6V10c0 .55-.45 1-1 1s-1-.45-1-1V5.6L2 11v2l10 6 10-6v-2z"
              />
              <path
                fill="currentColor"
                d="M22 15v2l-10 6-10-6v-2l10 6zM12 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4"
              />
            </svg>
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
            className={`slider-arrow backward ${!canScrollLeft ? 'disabled' : ''}`}
            disabled={!canScrollLeft}
            onClick={prev}
            data-button-root=""
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
            className={`slider-arrow forward ${!canScrollRight ? 'disabled' : ''}`}
            disabled={!canScrollRight}
            onClick={next}
            data-button-root=""
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
        style={{
          gridAutoColumns: '14.29%',
          marginLeft: '-8px',
          marginRight: '-8px'
        }}
      >
        {publishers.map((publisher, i) => (
          <div
            className="slide svelte-1vx4gmg"
            style={{ padding: 'var(--spacing-0) 8px' }}
            key={i}
          >
            <PublisherCard {...publisher} />
          </div>
        ))}
      </div>
    </div>
  );
}

