"use client";

import { useState } from "react";

export default function GameCard({ title, provider, image, href, playing }) {
  const [isClicked, setIsClicked] = useState(false);

  const handleButtonClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(href, '_blank');
  };

  return (
    <div className="game-card-wrap svelte-zglogk">
      <a 
        className="link svelte-zglogk block game-card" 
        href={href} 
        target="_blank" 
        rel="noreferrer"
        onClick={() => setIsClicked(!isClicked)}
      >
        <div className="img-wrap mx-auto" style={{ position: "relative", borderRadius: "0.5rem", overflow: "hidden", width: "100%" }}>
          <img src={image} alt={title} style={{ borderRadius: "0.5rem", width: "100%", height: "auto", display: "block" }} />
          
          {/* Hover Stat Button - positioned over image */}
          <div
            className={`hover-button svelte-zglogk ${isClicked ? 'clicked' : ''}`}
            style={{ top: '65%', right: '0.5rem', bottom: 'auto', position: 'absolute' }}
          >
            <button 
              type="button" 
              tabIndex={0}
              className="hover-stat-button inline-flex relative items-center gap-2 justify-e rounded-md font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] text-white hover:text-white focus-visible:outline-white text-xs shadow-md px-3 py-3"
              onClick={handleButtonClick}
            >
              <svg data-ds-icon="Popout" width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" className="inline-block shrink-0">
                <path fill="currentColor" d="M14.395 3c-.55 0-1 .45-1 1s.45 1 1 1h3.19l-9.49 9.49a.996.996 0 0 0 .71 1.7c.26 0 .51-.1.71-.29l9.49-9.49V9.6c0 .55.45 1 1 1s1-.45 1-1V4c0-.55-.45-1-1-1z"></path>
                <path fill="currentColor" d="M19.995 19h-15V4c0-.55-.45-1-1-1s-1 .45-1 1v16c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1"></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="px-2 pl-0 pt-2 text-xs flex items-center gap-1" style={{ width: "100%" }}>
          <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
          <span className="text-neutral">
            <strong className="text-white">{playing}</strong> playing
          </span>
        </div>
      </a>
    </div>
  );
}
