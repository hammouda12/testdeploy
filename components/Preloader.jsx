"use client";

import { useEffect, useState } from "react";

export default function Preloader({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Show loader for at least 2 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) {
        setTimeout(onComplete, 300); // Small delay for fade out
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div 
      className="preloader fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-300"
      style={{ backgroundColor: 'var(--color-grey-600)' }}
    >
      <img
        src="/stakepromotions.com/images/Stake-preloader.ynQo6d0c-1.gif"
        alt="Loading..."
        className="preloader-img loader"
      />
    </div>
  );
}

