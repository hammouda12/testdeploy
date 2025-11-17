"use client";

import { useEffect, useState } from "react";
import Preloader from "../components/Preloader";

export default function NotFound() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Show loader immediately, then redirect after a brief moment
    const redirectTimer = setTimeout(() => {
      window.location.replace("/");
    }, 100);

    return () => clearTimeout(redirectTimer);
  }, []);

  return (
    <>
      {showLoader && <Preloader onComplete={() => {}} />}
    </>
  );
}

