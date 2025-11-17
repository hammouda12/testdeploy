"use client";

import { useEffect } from "react";

export default function BonusRedirect() {
  useEffect(() => {
    window.location.replace("/");
  }, []);

  return null;
}

