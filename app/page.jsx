"use client";

import { useState, useEffect } from "react";
import "./globals.css";
import sections from "../data/sections.json";
import publishers from "../data/publishers.json";
import GallerySlider from "../components/GallerySlider";
import PublishersSlider from "../components/PublishersSlider";
import PromotionsCarousel from "../components/PromotionsCarousel";
import SearchBar from "../components/SearchBar";
import Preloader from "../components/Preloader";
import BonusModal from "../components/BonusModal";
import WalletModal from "../components/WalletModal";
import CategoryTabs from "../components/CategoryTabs";
import BetsBoard from "../components/BetsBoard";
import Footer from "../components/Footer";
import CasinoGamesSection from "../components/CasinoGamesSection";
import { useModal } from "../contexts/ModalContext";

export default function Page() {
  const [showLoader, setShowLoader] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [bonusPercent, setBonusPercent] = useState("150");
  const { showBonusModal, showWalletModal, setShowBonusModal, setShowWalletModal } = useModal();

  useEffect(() => {
    // Get bonus percentage from URL
    const path = window.location.pathname;
    let bonus = "150";
    if (path.includes("bonus500")) bonus = "500";
    else if (path.includes("bonus350")) bonus = "350";
    setBonusPercent(bonus);
  }, []);

  // Start loading content immediately when page loads (in background)
  useEffect(() => {
    // Start loading content right away, even before loader completes
    setShowContent(true);
  }, []);

  const handleLoaderComplete = () => {
    setShowLoader(false);
    // Always show bonus modal on page load
    setShowBonusModal(true);
  };

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
      {showLoader && <Preloader onComplete={handleLoaderComplete} />}
      {/* Content loads in background immediately, visible behind modal */}
      {showContent && (
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
