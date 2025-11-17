"use client";

import { useEffect } from "react";

export default function PromotionsRedirect() {
  useEffect(() => {
    window.location.replace("/");
  }, []);

  return null;
}

