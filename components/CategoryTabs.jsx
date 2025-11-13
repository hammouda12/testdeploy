"use client";

import Link from "next/link";

export default function CategoryTabs() {
  const tabs = [
    {
      name: "Lobby",
      href: "/casino/home",
      icon: (
        <svg
          data-ds-icon="AllGames"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          className="inline-block shrink-0"
        >
          <path
            fill="currentColor"
            d="M9.08 1H3a2 2 0 0 0-2 2v6.08a2 2 0 0 0 2 2h6.08a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2M21 1h-6.08a2 2 0 0 0-2 2v6.08a2 2 0 0 0 2 2H21a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2M9.08 12.92H3a2 2 0 0 0-2 2V21a2 2 0 0 0 2 2h6.08a2 2 0 0 0 2-2v-6.08a2 2 0 0 0-2-2m11.92 0h-6.08a2 2 0 0 0-2 2V21a2 2 0 0 0 2 2H21a2 2 0 0 0 2-2v-6.08a2 2 0 0 0-2-2"
          />
        </svg>
      ),
      active: true,
    },
    {
      name: "New Releases",
      href: "/casino/home/new-releases",
      icon: (
        <svg
          data-ds-icon="New"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          className="inline-block shrink-0"
        >
          <path
            fill="currentColor"
            d="M22 12c-7.8 1.21-8.79 2.2-10 10-1.21-7.8-2.2-8.79-10-10 7.8-1.21 8.79-2.2 10-10 1.21 7.8 2.2 8.79 10 10m2-7c-3.12.48-3.52.88-4 4-.48-3.12-.88-3.52-4-4 3.12-.48 3.52-.88 4-4 .48 3.12.88 3.52 4 4M8 19c-3.12.48-3.52.88-4 4-.48-3.12-.88-3.52-4-4 3.12-.48 3.52-.88 4-4 .48 3.12.88 3.52 4 4"
          />
        </svg>
      ),
      active: false,
    },
    {
      name: "Stake Originals",
      href: "/casino/home/stake-originals",
      icon: (
        <svg
          data-ds-icon="Fire"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          className="inline-block shrink-0"
        >
          <path
            fill="currentColor"
            d="M19.38 5.59c-.64-.83-1.93-.77-2.51.11L16 7l-2.56-4.48C12.6 1.05 10.7.55 9.27 1.45c-2.82 1.79-6.86 5.28-7.24 10.7-.36 5.11 3.19 9.84 8.24 10.69A10 10 0 0 0 22 12.99c0-3.02-1.13-5.48-2.62-7.41zM12 21c-2.21 0-4-1.22-4-3 0-2.91 4-6 4-6s4 3.09 4 6c0 1.78-1.79 3-4 3"
          />
        </svg>
      ),
      active: false,
    },
    {
      name: "Slots",
      href: "/casino/home/slots",
      icon: (
        <svg
          data-ds-icon="Slots"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          className="inline-block shrink-0"
        >
          <path
            fill="currentColor"
            d="M7.62 10.61a20 20 0 0 0-1.45 3.96 7.5 7.5 0 0 0 0 3.59l.18.75-4.07 1A9.47 9.47 0 0 1 3 13.43l-3 .71v-2.92l7.34-1.76zM24 11.72l-.23 1.16a21.4 21.4 0 0 0-2.97 2.95 7.64 7.64 0 0 0-1.5 3.26l-.15.75-4.15-.76a9.53 9.53 0 0 1 3.34-5.57l-3-.59 1.26-2.66z"
          />
          <path
            fill="currentColor"
            d="M18 6.03a33.5 33.5 0 0 0-3.8 5.74 12.44 12.44 0 0 0-1.4 5.7v1.25H8.08a13.9 13.9 0 0 1 1.25-5.69 21.7 21.7 0 0 1 3.37-5.28h-7V4.09H18z"
          />
        </svg>
      ),
      active: false,
    },
    {
      name: "Live Casino",
      href: "/casino/home/live-casino",
      icon: (
        <svg
          data-ds-icon="VIPHost"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          className="inline-block shrink-0"
        >
          <path
            fill="currentColor"
            d="M15.65 1.775h-.3l-3.4 1.2-3.4-1.2c-.6-.2-1.3.2-1.4.9v2.5c0 .7.6 1.2 1.2 1.2h.3l3.3-1.5 3.4 1.5c.7.2 1.3-.2 1.5-.9v-2.5c0-.7-.6-1.2-1.2-1.2m-5.4 18.9-4.5-15c-.3-.6-.9-.9-1.6-.7l-1.5.5c-.5.1-.8.6-.8 1.1l-.9 14.4c0 .7.5 1.2 1.1 1.3h7c.7 0 1.2-.5 1.2-1.2.1-.1 0-.3 0-.4m11.8-14.1c0-.5-.3-.9-.8-1.1l-1.5-.6c-.6-.2-1.3.1-1.5.7l-4.5 15c-.2.6.2 1.3.8 1.5.1 0 .2.1.4.1h6.9c.7 0 1.2-.5 1.2-1.2z"
          />
        </svg>
      ),
      active: false,
    },
    {
      name: "Only on Stake",
      href: "/casino/home/only-on-stake",
      icon: (
        <svg
          data-ds-icon="StakeExclusive"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          className="inline-block shrink-0"
        >
          <path
            fill="currentColor"
            d="M21.922 9.566c.758-1.907.225-4.45-1.743-5.403-2.214-.994-8.283-3.68-10.97-3.075-5.781.153-9.574 6.868-5.381 10.61-2.215 1.63-3.22 6.807-.154 8.335 3.465 2.03 9.862 4.48 13.799 1.763 2.973-1.497 5.372-5.73 3.065-8.704l-.092-.102a5 5 0 0 0-.452-.461 4.7 4.7 0 0 0-.656-.503c1.19-.318 2.143-1.332 2.584-2.46m-10.99-1.897c-.861.093-.892-.348-.892-.369.051-.051 1.046-.943 1.077-1.722.02-.4-.216-1.487-1.774-1.312-2.173.256-3.393 1.507-3.475 3.526-.103 2.327 6.171 2.4 6.048 5.403-.133 3.198-3.24 4.993-5.935 5.31-1.415.164-2.307-.635-2.246-2.08.062-1.713.882-3.538 2.738-3.753.717-.082.8.584.789.738-.092.041-1.886.79-1.958 2.82-.02.379.307 1.014 1.158.922.892-.102 3.506-1.066 3.62-3.598.091-2.327-6.152-1.938-5.998-5.567.164-4.1 3.937-4.736 5.351-4.9 1.712-.195 3.363.43 3.301 2.214-.061 1.569-.922 2.276-1.794 2.379z"
          />
        </svg>
      ),
      active: false,
    },
  ];

  return (
    <div className="category-tab-wrapper py-4">
      <div className="tabs-wrapper scrollX">
        <div className="slider variant-dark">
          <div className="content-wrapper font-thick text-md">
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                href={tab.href}
                className={`inline-flex relative items-center gap-2 justify-center font-thick whitespace-nowrap ring-offset-background transition-all disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] no-underline hover:no-underline text-white focus-visible:outline-white text-sm ${
                  tab.active
                    ? "!text-white [&_svg]:!text-white py-[0.75rem] px-[1.5rem] rounded-full"
                    : "[&_svg]:text-grey-200 [&:hover>svg]:text-white py-[0.625rem] px-[1.25rem] rounded-full"
                }`}
                style={tab.active ? { backgroundColor: "#2f4553" } : { backgroundColor: "transparent" }}
                onMouseEnter={(e) => {
                  if (!tab.active) {
                    e.currentTarget.style.backgroundColor = "#2f4553";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!tab.active) {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
                }}
              >
                {tab.icon}
                <span className="ds-body-md-strong">{tab.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

