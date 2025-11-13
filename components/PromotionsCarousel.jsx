"use client";

import { useRef, useState, useEffect } from "react";
import PromotionCard from "./PromotionCard";

const promotions = [
  {
    title: "Daily Races",
    description: "Play in our $100,000 Daily Race",
    image: "/stakepromotions.com/images/frame3.png",
    href: "https://stake.com/promotions/promotion/stake-races",
    buttonText: "Race Now"
  },
  {
    title: "Mega Lucky Drops",
    description: "$50,000 in Prize Drops!",
    image: "/stakepromotions.com/images/frame8.avif",
    href: "https://stake.com/promotions/promotion/mega-lucky-drops",
    buttonText: "Learn More"
  },
  {
    title: "Weekly Raffle",
    description: "Share in $75,000 each week",
    image: "/stakepromotions.com/images/frame4.png",
    href: "https://stake.com/promotions/promotion/weekly-giveaway",
    buttonText: "Learn More"
  },
  {
    title: "Conquer the Casino",
    description: "Win a share in $50,000 every week",
    image: "/stakepromotions.com/images/framemiddle (7).png",
    href: "https://stake.com/promotions/promotion/conquer-the-casino",
    buttonText: "Play Now"
  },
  {
    title: "Stake vs Eddie",
    description: "Win a share in $50,000 every week",
    image: "/stakepromotions.com/images/framemiddle (5).png",
    href: "https://stake.com/promotions/promotion/stake-versus-eddie",
    buttonText: "Play Now"
  },
  {
    title: "Reel Rumble",
    description: "Win a share in $40,000 every week",
    image: "/stakepromotions.com/images/frame2.png",
    href: "https://stake.com/promotions/promotion/reel-rumble",
    buttonText: "Play Now"
  },
  {
    title: "The Level Up",
    description: "Win a share in $40,000 every week",
    image: "/stakepromotions.com/images/57d1eb33690b1e1f9b90358ae754b27fe243f459-1080x1080.avif",
    href: "https://stake.com/promotions/promotion/the-level-up",
    buttonText: "Play Now"
  },
  {
    title: "Originals Ascent",
    description: "Win a share in $40,000 every week",
    image: "/stakepromotions.com/images/framemiddle (6).png",
    href: "https://stake.com/promotions/promotion/originals-ascent",
    buttonText: "Play Now"
  },
  {
    title: "All in or Fold Jackpot",
    description: "$500,000 In Prizes!",
    image: "/stakepromotions.com/images/framemiddle (2).png",
    href: "https://stake.com/promotions/promotion/all-in-or-fold-jackpot",
    buttonText: "Learn More"
  }
];

export default function PromotionsCarousel() {
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  };

  useEffect(() => {
    checkScrollability();
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener("scroll", checkScrollability);
      window.addEventListener("resize", checkScrollability);
      return () => {
        carousel.removeEventListener("scroll", checkScrollability);
        window.removeEventListener("resize", checkScrollability);
      };
    }
  }, [promotions]);

  const step = () => {
    const el = carouselRef.current;
    if (!el) return 0;
    const first = el.querySelector('.promotion-card');
    if (!first) return 0;
    const cardWidth = first.getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(el).gap || '0');
    const viewportWidth = window.innerWidth;
    
    // Responsive scroll based on screen size
    let cardsToScroll = 1; // Default minimum
    if (viewportWidth > 1080) {
      cardsToScroll = 3; // Above 1080px: 3 cards
    } else if (viewportWidth > 613) {
      cardsToScroll = 2; // 614px-1080px: 2 cards
    } else {
      cardsToScroll = 1; // Below 613px: 1 card
    }
    
    return (cardWidth + gap) * cardsToScroll;
  };

  const prev = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -step(), behavior: 'smooth' });
    }
  };

  const next = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: step(), behavior: 'smooth' });
    }
  };

  return (
    <div className="promotions-carousel-wrapper group" >
      <div className="promotions-carousel-container">
        <div
          ref={carouselRef}
          id="promotions-carousel"
          className="promotions-carousel-scroll"
        >
          {promotions.map((promo, index) => (
            <PromotionCard key={index} {...promo} />
          ))}
        </div>
      </div>
      
      {/* Left arrow - hover only */}
      {canScrollLeft && (
        <button
          type="button"
          tabIndex={0}
          className="promotions-nav-btn promotions-nav-left"
          onClick={prev}
          aria-label="Previous"
        >
          <svg
            data-ds-icon="ChevronLeft"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="inline-block shrink-0"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      )}
      
      {/* Right arrow - hover only */}
      {canScrollRight && (
        <button
          type="button"
          tabIndex={0}
          className="promotions-nav-btn promotions-nav-right"
          onClick={next}
          aria-label="Next"
        >
          <svg
            data-ds-icon="ChevronRight"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="inline-block shrink-0"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      )}
    </div>
  );
}

