"use client";

import { useState, useEffect } from "react";
import "../globals.css";
import sections from "../../data/sections.json";
import publishers from "../../data/publishers.json";
import GallerySlider from "../../components/GallerySlider";
import PublishersSlider from "../../components/PublishersSlider";
import PromotionsCarousel from "../../components/PromotionsCarousel";
import SearchBar from "../../components/SearchBar";
import Preloader from "../../components/Preloader";
import BonusModal from "../../components/BonusModal";
import WalletModal from "../../components/WalletModal";
import CategoryTabs from "../../components/CategoryTabs";
import BetsBoard from "../../components/BetsBoard";
import Footer from "../../components/Footer";
import CasinoGamesSection from "../../components/CasinoGamesSection";
import { useModal } from "../../contexts/ModalContext";

export default function Page() {
  const [showLoader, setShowLoader] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [bonusPercent, setBonusPercent] = useState("150");
  const [firstGamesLoaded, setFirstGamesLoaded] = useState(false);
  const { showBonusModal, showWalletModal, setShowBonusModal, setShowWalletModal } = useModal();

  useEffect(() => {
    // Get bonus percentage from URL pathname only (ignore query parameters)
    const path = window.location.pathname;
    let bonus = "150";
    if (path.includes("bonus500")) bonus = "500";
    else if (path.includes("bonus350")) bonus = "350";
    setBonusPercent(bonus);
    // Note: URL parameters are kept in the URL but not read or used
  }, []);

  // Start loading content immediately when page loads (in background, but hidden)
  useEffect(() => {
    // Start loading content right away in background
    // Content will be visible once firstGamesLoaded is true
    setShowContent(true);
  }, []);

  // Track when first game images are loaded - keep loader visible until then
  useEffect(() => {
    if (!showContent || firstGamesLoaded) return;

    let cleanupFunctions = [];
    let checkTimeoutId = null;
    let fallbackTimeoutId = null;

    // Wait for DOM to render images
    const checkImages = () => {
      const images = document.querySelectorAll('main img[src*="mediumrare.imgix.net"], main img[src*="stakepromotions.com"]');
      
      if (images.length === 0) {
        // If no images found yet, check again after a short delay
        checkTimeoutId = setTimeout(checkImages, 100);
        return;
      }

      // We only need to wait for the first few games to load (e.g., first 5-10 images)
      const minImagesToLoad = Math.min(10, images.length);
      let loadedCount = 0;

      const handleImageLoad = () => {
        loadedCount++;
        // Once we have at least minImagesToLoad images loaded, consider games loaded
        if (loadedCount >= minImagesToLoad && !firstGamesLoaded) {
          setFirstGamesLoaded(true);
          // Hide loader and show content
          setShowLoader(false);
          // Show bonus modal after a short delay
          setTimeout(() => {
            setShowBonusModal(true);
          }, 300);
        }
      };

      const handleImageError = () => {
        loadedCount++;
        // Count errors as loaded for fallback
        if (loadedCount >= minImagesToLoad && !firstGamesLoaded) {
          setFirstGamesLoaded(true);
          setShowLoader(false);
          setTimeout(() => {
            setShowBonusModal(true);
          }, 300);
        }
      };

      images.forEach((img, index) => {
        // Only track first minImagesToLoad images
        if (index >= minImagesToLoad) return;
        
        if (img.complete && img.naturalHeight !== 0) {
          loadedCount++;
        } else {
          img.addEventListener('load', handleImageLoad, { once: true });
          img.addEventListener('error', handleImageError, { once: true });
          cleanupFunctions.push(() => {
            img.removeEventListener('load', handleImageLoad);
            img.removeEventListener('error', handleImageError);
          });
        }
      });

      // Check if enough images are already loaded
      if (loadedCount >= minImagesToLoad && !firstGamesLoaded) {
        setFirstGamesLoaded(true);
        setShowLoader(false);
        setTimeout(() => {
          setShowBonusModal(true);
        }, 300);
      } else {
        // Fallback: show content after 3 seconds even if images are still loading
        fallbackTimeoutId = setTimeout(() => {
          if (!firstGamesLoaded) {
            setFirstGamesLoaded(true);
            setShowLoader(false);
            setTimeout(() => {
              setShowBonusModal(true);
            }, 300);
          }
        }, 3000);
      }
    };

    // Start checking after a small delay to allow DOM to render
    checkTimeoutId = setTimeout(checkImages, 100);
    
    return () => {
      if (checkTimeoutId) clearTimeout(checkTimeoutId);
      if (fallbackTimeoutId) clearTimeout(fallbackTimeoutId);
      cleanupFunctions.forEach(cleanup => cleanup());
    };
  }, [showContent, firstGamesLoaded, setShowBonusModal]);

  const handleBonusModalClose = () => {
    setShowBonusModal(false);
  };

  const handleBonusClaim = () => {
    setShowBonusModal(false);
    setTimeout(() => {
      setShowWalletModal(true);
    }, 300);
  };

  const handleWalletModalClose = () => {
    setShowWalletModal(false);
  };

  const handleWalletBack = () => {
    setShowWalletModal(false);
    setTimeout(() => {
      setShowBonusModal(true);
    }, 300);
  };

  return (
    <>
      {showLoader && <Preloader onComplete={() => {}} />}
      {/* Content loads in background, but only visible after games start loading */}
      {showContent && !showLoader && (
        <main
          className={`relative ${
            showBonusModal || showWalletModal
              ? "opacity-30 pointer-events-none"
              : "opacity-100"
          }`}
          style={{ zIndex: 1 }}
        >
          <PromotionsCarousel />
          <SearchBar />
          <CategoryTabs />
          {sections.map((sec, index) => (
            <div key={sec.name}>
              <GallerySlider
                id={sec.name.toLowerCase().replace(/\s+/g, "-")}
                title={sec.name}
                cards={sec.cards}
                icon={sec.icon}
              />
              {sec.name === "Slots" && (
                <PublishersSlider
                  id="publishers"
                  title="Publishers"
                  publishers={publishers}
                />
              )}
            </div>
          ))}
          <BetsBoard />
         

        </main>
      )}
      {/* Modals render on top with higher z-index */}
      {showBonusModal && (
        <BonusModal onClose={handleBonusModalClose} onClaim={handleBonusClaim} />
      )}
      {showWalletModal && (
        <WalletModal
          onClose={handleWalletModalClose}
          onBack={handleWalletBack}
          bonusPercent={bonusPercent}
        />
      )}
    </>
  );
}

