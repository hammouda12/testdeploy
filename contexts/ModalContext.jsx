"use client";

import { createContext, useContext, useState } from "react";

const ModalContext = createContext(null);

export function ModalProvider({ children }) {
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showBonusModal, setShowBonusModal] = useState(false);

  const openWalletModal = () => {
    setShowBonusModal(false);
    setTimeout(() => {
      setShowWalletModal(true);
    }, 300);
  };

  const closeWalletModal = () => {
    setShowWalletModal(false);
  };

  const openBonusModal = () => {
    setShowWalletModal(false);
    setTimeout(() => {
      setShowBonusModal(true);
    }, 300);
  };

  const closeBonusModal = () => {
    setShowBonusModal(false);
  };

  return (
    <ModalContext.Provider
      value={{
        showWalletModal,
        showBonusModal,
        openWalletModal,
        closeWalletModal,
        openBonusModal,
        closeBonusModal,
        setShowWalletModal,
        setShowBonusModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within ModalProvider");
  }
  return context;
}

