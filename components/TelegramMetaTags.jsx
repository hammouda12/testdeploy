"use client";

import { useEffect } from "react";

export default function TelegramMetaTags() {
  useEffect(() => {
    // Aggressively remove or set empty meta tags that Telegram uses for link previews
    const metaTags = [
      { property: "og:title", content: "" },
      { property: "og:description", content: "" },
      { property: "og:image", content: "" },
      { property: "og:site_name", content: "" },
      { property: "og:url", content: "" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "" },
      { name: "twitter:description", content: "" },
      { name: "twitter:image", content: "" },
      { name: "twitter:card", content: "" },
      { name: "description", content: "" },
      { name: "title", content: "" },
    ];

    // Remove or update existing meta tags
    metaTags.forEach(({ property, name, content }) => {
      const selector = property ? `meta[property="${property}"]` : `meta[name="${name}"]`;
      const existingMetas = document.querySelectorAll(selector);
      
      existingMetas.forEach(meta => {
        meta.setAttribute("content", content);
      });
      
      // If no meta tag exists, create one with empty content
      if (existingMetas.length === 0) {
        const meta = document.createElement("meta");
        if (property) {
          meta.setAttribute("property", property);
        } else {
          meta.setAttribute("name", name);
        }
        meta.setAttribute("content", content);
        document.head.appendChild(meta);
      }
    });

    // Remove title tag content
    const titleTag = document.querySelector("title");
    if (titleTag) {
      titleTag.textContent = "";
    }
    
    // Also set document.title to empty
    document.title = "";
    
    // Try to remove any h1 tags that might be used as fallback
    const h1Tags = document.querySelectorAll("h1");
    h1Tags.forEach(h1 => {
      if (h1.textContent.includes("Stake Design Clone") || h1.textContent.includes("Static clone")) {
        h1.textContent = "";
      }
    });
  }, []);

  return null;
}

