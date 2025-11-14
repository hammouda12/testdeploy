"use client";

import { useEffect } from "react";

export default function TelegramMetaTags() {
  useEffect(() => {
    // Remove or set empty meta tags that Telegram uses for link previews
    // Use single space instead of empty string as some crawlers ignore empty strings
    const metaTags = [
      { property: "og:title", content: " " },
      { property: "og:description", content: " " },
      { property: "og:image", content: "" },
      { property: "og:site_name", content: " " },
      { property: "og:url", content: " " },
      { name: "twitter:title", content: " " },
      { name: "twitter:description", content: " " },
      { name: "twitter:image", content: "" },
      { name: "description", content: " " },
    ];

    metaTags.forEach(({ property, name, content }) => {
      const selector = property ? `meta[property="${property}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector);
      
      if (meta) {
        meta.setAttribute("content", content);
      } else {
        meta = document.createElement("meta");
        if (property) {
          meta.setAttribute("property", property);
        } else {
          meta.setAttribute("name", name);
        }
        meta.setAttribute("content", content);
        document.head.appendChild(meta);
      }
    });

    // Also ensure title is a single space
    if (document.title && document.title.trim() !== "") {
      document.title = " ";
    }
  }, []);

  return null;
}

