"use client";

import { useEffect, useState } from "react";

export default function Preloader({ onComplete }) {
  // Preloader visibility is now controlled by parent component
  // No auto-hide timer - parent controls when to hide

  return (
    <div 
      className="preloader fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-300"
      style={{ backgroundColor: 'var(--color-grey-600)' }}
    >
      <img
        src="/stakepromotions.com/images/Stake-preloader.ynQo6d0c-1.gif"
        alt="Loading..."
        className="preloader-img loader"
        style={{ width: '100px', height: '100px' }}
      />
    </div>
  );
}

