"use client";

import { useEffect, useState } from "react";

export default function Loader({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Show loader for at least 2 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) {
        setTimeout(() => onComplete(), 300); // Small delay for fade out
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      id="preloader"
      className="preloader"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#102732",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        transition: "opacity 0.3s ease-out",
        opacity: isVisible ? 1 : 0,
      }}
    >
      <img
        src="/stakepromotions.com/images/Stake-preloader.ynQo6d0c-1.gif"
        alt="Loading..."
        className="preloader-img loader"
        style={{
          width: "auto",
          height: "auto",
          maxWidth: "200px",
        }}
      />
    </div>
  );
}

