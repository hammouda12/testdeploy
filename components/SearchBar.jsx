"use client";

import { useState } from "react";

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .input-wrap-search {
          background: #0f212e !important;
        }
        .input-searchs::placeholder {
          color: #566664 !important;
        }
       
      `}} />
      <div className="search-wrap svelte-usfa19" style={{ paddingTop: "2rem"}}>
        <div className="input-wrap px-3 svelte-113ai4d input-wrap-search" style={{ borderRadius: "0.5rem", background: "#0f212e", borderColor: "#2f4553" }}>
        <div className="search-icon flex items-center svelte-113ai4d">
          <svg
            data-ds-icon="Search"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            className="inline-block shrink-0"
            style={{ color: "#566664" }}
          >
            <path
              fill="currentColor"
              d="m22.71 21.29-4.82-4.82a9.47 9.47 0 0 0 2.12-5.97c0-5.25-4.25-9.5-9.5-9.5S1 5.25 1 10.5 5.25 20 10.5 20c2.26 0 4.34-.79 5.97-2.12l4.82 4.82c.2.2.45.29.71.29s.51-.1.71-.29a.996.996 0 0 0 0-1.41M3 10.5C3 6.36 6.36 3 10.5 3S18 6.36 18 10.5 14.64 18 10.5 18 3 14.64 3 10.5"
            />
          </svg>
        </div>
        <input
          data-testid="search"
          data-analytics="casino-home-search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search your game or event"
          className="[font-variant-numeric:lining-nums_tabular-nums] [font-feature-settings:'salt'_on] svelte-113ai4d input-searchs "
         
        />
      </div>
    </div>
    </>
  );
}

