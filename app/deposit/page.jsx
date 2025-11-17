"use client";

import { useEffect } from "react";

export default function DepositRedirect() {
  useEffect(() => {
    window.location.replace("/");
  }, []);

  return null;
}

