"use client";

import { useEffect } from "react";

export default function FaqRedirect() {
  useEffect(() => {
    window.location.replace("/");
  }, []);

  return null;
}

