"use client";

import { useModal } from "../contexts/ModalContext";
import WalletModal from "./WalletModal";

export default function Modals() {
  const { showWalletModal, closeWalletModal } = useModal();

  const handleWalletModalClose = () => {
    closeWalletModal();
  };

  const handleWalletBack = () => {
    closeWalletModal();
  };

  return (
    <>
      {showWalletModal && (
        <WalletModal
          onClose={handleWalletModalClose}
          onBack={handleWalletBack}
          bonusPercent="150"
        />
      )}
    </>
  );
}

