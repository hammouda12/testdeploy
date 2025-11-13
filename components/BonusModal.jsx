"use client";

import { useState, useEffect } from "react";

export default function BonusModal({ onClose, onClaim }) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);
  const [showLoading, setShowLoading] = useState(false);
  const [showContent, setShowContent] = useState(true);
  const [bonusPercent, setBonusPercent] = useState("150");

  useEffect(() => {
    // Get bonus percentage from URL
    const path = window.location.pathname;
    let bonus = "150";
    if (path.includes("bonus500")) bonus = "500";
    else if (path.includes("bonus350")) bonus = "350";
    setBonusPercent(bonus);

    // Small delay to ensure smooth transition from loader
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Prevent body scroll when modal is open
    if (isVisible) {
      document.body.classList.add("body-scroll-hidden");
      document.body.classList.add("bonus-modal-open");
    }
    return () => {
      document.body.classList.remove("body-scroll-hidden");
      document.body.classList.remove("bonus-modal-open");
    };
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    document.body.classList.remove("bonus-modal-open");
    // Remove class immediately without delay
    setShouldRender(false);
    if (onClose) onClose();
  };

  const handleClaim = () => {
    // Show loading state
    setShowLoading(true);
    setShowContent(false);

    // After delay, trigger wallet modal
    setTimeout(() => {
      setShowLoading(false);
      if (onClaim) {
        onClaim();
      }
      handleClose();
    }, 2000);
  };

  if (!shouldRender) return null;

  return (
    <div
      id="claim"
      data-layout=""
      data-modal-root=""
      className={`fixed inset-0 p-4 flex items-center justify-center text-[length:var(--text-size-default)] z-[1550] transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ zIndex: 1550 }}
      data-test="modal-redeemBonus"
    >
      {/* Overlay */}
      <div
        data-modal-overlay=""
        aria-hidden="true"
        className="absolute inset-0 bg-black/75 touch-none"
        onClick={handleClose}
      />

      {/* Modal Card */}
      <div
        data-modal-card=""
        className={`rounded-md bg-cover bg-center relative w-full min-w-[200px] max-w-[500px] max-h-[calc(100%-4em)] flex flex-col text-grey-200 overflow-hidden transition-transform duration-300 ${
          isVisible ? "scale-100" : "scale-95"
        }`}
        style={{ backgroundColor: "#1a2c38" }}
      >
        {/* Header */}
        <div data-modal-header="" className="touch-none p-4 flex justify-between">
          <div className="stack x-stretch y-center gap-small padding-none direction-horizontal padding-left-auto padding-top-auto padding-bottom-auto padding-right-auto">
            <h2 className="weight-semibold line-height-default align-left size-base text-size-base variant-highlighted with-icon-space">
              <svg
                data-ds-icon="Gift"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="inline-block shrink-0"
              >
                <path
                  fill="currentColor"
                  d="M21 5h-3.35c.22-.46.35-.96.35-1.5C18 1.57 16.43 0 14.5 0c-.98 0-1.86.41-2.5 1.06A3.5 3.5 0 0 0 9.5 0C7.57 0 6 1.57 6 3.5c0 .54.13 1.04.35 1.5H3c-1.1 0-2 .9-2 2v1c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2m-6.5-3c.83 0 1.5.67 1.5 1.5S15.33 5 14.5 5 13 4.33 13 3.5 13.67 2 14.5 2M8 3.5C8 2.67 8.67 2 9.5 2s1.5.67 1.5 1.5S10.33 5 9.5 5 8 4.33 8 3.5M3 21c0 1.1.9 2 2 2h6V12H3zm10 2h6c1.1 0 2-.9 2-2v-9h-8z"
                />
              </svg>
            </h2>
            <h3
              type="heading"
              variant="neutral-default"
              size="md"
              className="text-neutral-default ds-heading-md ml-2"
              data-ds-text="true"
            >
              Claim Bonus
            </h3>
          </div>

          <button
            type="button"
            tabIndex={0}
            id="claim-btn-close"
            className="inline-flex relative items-center gap-2 justify-center rounded-sm font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-grey-200 hover:bg-transparent hover:text-white focus-visible:text-white focus-visible:outline-hidden text-base leading-none"
            aria-label="Close Modal"
            data-modal-close="true"
            data-testid="modal-close"
            data-button-root=""
            onClick={handleClose}
          >
            <svg
              data-ds-icon="Cross"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="inline-block shrink-0"
            >
              <path
                fill="currentColor"
                d="M4.293 4.293a1 1 0 0 1 1.338-.069l.076.069L12 10.586l6.293-6.293.076-.069a1 1 0 0 1 1.407 1.407l-.069.076L13.414 12l6.293 6.293.069.076a1 1 0 0 1-1.407 1.406l-.076-.068L12 13.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L10.586 12 4.293 5.707l-.068-.076a1 1 0 0 1 .068-1.338"
              />
            </svg>
          </button>
        </div>

        {/* Loading State */}
        <div
          id="loading-claim"
          className="content"
          style={{ display: showLoading ? "flex" : "none" }}
        >
          <div className="flex justify-center items-center centered">
            <div className="loader">
              <div className="loader-animation"></div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div
          data-modal-content=""
          className="scrollY overscroll-contain"
          id="claim-bonus-content"
          data-block-touch-pan="true"
          style={{ display: showContent ? "block" : "none" }}
        >
          <div className="flex flex-col flex-1 relative">
            <div data-test-form-valid="true">
              <div>
                <div className="flex flex-col max-h-[523px]">
                  <div className="overflow-y-auto hide-scrollbar">
                    {/* Bonus Image */}
                    <div className="h-[180px]">
                      <img
                        src="/claim_bonus.webp"
                        alt={`${bonusPercent}% Bonus`}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Bonus Info */}
                    <div className="flex flex-col gap-4 p-4 pb-0">
                      <div className="flex flex-col gap-2">
                        <h2
                          type="heading"
                          tag="h2"
                          size="lg"
                          variant="neutral-default"
                          className="text-neutral-default ds-heading-lg"
                          data-ds-text="true"
                          id="bonus-id"
                        >
                          Claim Your {bonusPercent}% Bonus
                        </h2>
                        <span
                          tag="span"
                          type="body"
                          size="md"
                          className="ds-body-md"
                          data-ds-text="true"
                        >
                          New bonus available! Claim it now in your preferred currency.
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Claim Button */}
                  <div className="flex gap-2 p-4">
                    <button
                      id="claim-bonus-btn"
                      className="inline-flex relative items-center gap-2 justify-center rounded-sm font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-blue-500 text-white hover:bg-blue-600 hover:text-white focus-visible:outline-white text-sm leading-none shadow-md py-[0.9375rem] px-[1.25rem] min-w-[12ch] flex-1"
                      data-test="claim-coupon"
                      data-testid="password-reset-button"
                      data-analytics="claim-coupon"
                      data-button-root=""
                      onClick={handleClaim}
                    >
                      <div className="contents">Claim Bonus</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
