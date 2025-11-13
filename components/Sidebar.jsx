"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// import {
//   FavouriteIcon,
//   RecentIcon,
//   ChallengeIcon,
//   MyBetsIcon,
//   NewIcon,
//   SlotsIcon,
//   FireIcon,
//   StakeExclusiveIcon,
//   VipHostIcon,
//   GameShowsIcon,
//   BurstIcon,
//   EnhanceRtpIcon,
//   PokerIcon,
//   BlackjackIcon,
//   BaccaratIcon,
//   RouletteIcon,
//   ProvidersIcon,
//   AffiliateIcon,
//   TrophyIcon,
//   BlogIcon,
//   ChatIcon,
//   SponsorshipsIcon,
//   SecurityIcon,
//   LanguageIcon,
// } from "@/components/icons";

// import { Divider } from "@/components/ui/divider";
// import { SectionHeading } from "@/components/ui/section-heading";
// import { SidebarItem } from "@/components/sidebar-item";

const primaryPanel = [
  { label: "Favourites", icon: FavouriteIcon },
  { label: "Recent", icon: RecentIcon },
  { label: "Challenges", icon: ChallengeIcon },
  { label: "My Bets", icon: MyBetsIcon },
];

const gameItems = [
  { label: "New Releases", icon: NewIcon },
  { label: "Slots", icon: SlotsIcon },
  { label: "Stake Originals", icon: FireIcon },
  { label: "Only on Stake", icon: StakeExclusiveIcon },
  { label: "Live Casino", icon: VipHostIcon },
  { label: "Game Shows", icon: GameShowsIcon },
  { label: "Burst Games", icon: BurstIcon },
  { label: "Enhanced RTP", icon: EnhanceRtpIcon },
  { label: "Stake Poker", icon: PokerIcon },
  { label: "Bonus Buy", icon: GiftIcon },
  { label: "Blackjack", icon: BlackjackIcon },
  { label: "Baccarat", icon: BaccaratIcon },
  { label: "Roulette", icon: RouletteIcon },
  { label: "Publishers", icon: ProvidersIcon },
];

const extraLinks = [
  { label: "Promotions", icon: GiftIcon, withChevron: true },
  { label: "Affiliate", icon: AffiliateIcon },
  { label: "VIP Club", icon: TrophyIcon },
  { label: "Blog", icon: BlogIcon },
  { label: "Form", icon: ChatIcon },
];

const supportLinks = [
  { label: "Sponsorships", icon: SponsorshipsIcon, withChevron: true },
  { label: "Responsible Gambling", icon: SecurityIcon },
  { label: "Live support", icon: SupportIcon },
  { label: "Language: English", icon: LanguageIcon, withChevron: true },

];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const sidebarScrollRef = useRef(null);

  const primaryPanelItems = primaryPanel;
  const gameItemsList = gameItems;
  const extraLinksList = extraLinks;
  const supportLinksList = supportLinks;

  useEffect(() => {
    // Update body class and CSS variable to handle sidebar width
    const sidebarWidth = collapsed ? "60px" : "260px";
    document.body.style.setProperty('--sidebar-width', sidebarWidth);
    
    if (collapsed) {
      document.body.classList.add('sidebar-collapsed');
    } else {
      document.body.classList.remove('sidebar-collapsed');
    }
    return () => {
      document.body.style.removeProperty('--sidebar-width');
      document.body.classList.remove('sidebar-collapsed');
    };
  }, [collapsed]);

  useEffect(() => {
    const sidebarElement = sidebarScrollRef.current;
    if (!sidebarElement) return;

    const handleWheel = (e) => {
      const { scrollTop, scrollHeight, clientHeight } = sidebarElement;
      const isAtTop = scrollTop <= 0;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
      const isScrollingUp = e.deltaY < 0;
      const isScrollingDown = e.deltaY > 0;

      // If scrolling up and at top, or scrolling down and at bottom, stop scrolling
      if ((isAtTop && isScrollingUp) || (isAtBottom && isScrollingDown)) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // If there's scrollable content in sidebar, prevent main page scroll
      if (scrollHeight > clientHeight) {
        e.stopPropagation();
      }
    };

    sidebarElement.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      sidebarElement.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <>
      {/* Backdrop overlay for tablet screens */}
      {!collapsed && (
        <div 
          className="sidebar-backdrop"
          onClick={() => setCollapsed(true)}
          aria-hidden="true"
        />
      )}
    <aside 
        data-nosnippet=""
        data-layout=""
        data-testid="left-sidebar"
        className={`computer-sidebar sidebar normal svelte-13bc1zy ${collapsed ? 'collapsed' : ''}`}
        style={{ "--header-height": "60px", "--width": collapsed ? "60px" : "260px" }}
      >
      <div className={`header svelte-1yj7c6 ${collapsed ? 'collapsed' : ''}`}>
          <button
            onClick={() => setCollapsed(!collapsed)}
          className={`menu-button svelte-1yj7c6 ${collapsed ? 'collapsed' : ''}`}
            aria-label="Toggle Sidebar"
          data-testid="left-sidebar-close"
          data-analytics="left-sidebar-close-button"
          >
          <svg data-ds-icon="Menu" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" className="inline-block shrink-0">
            <path fill="currentColor" d="M19 4H5a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1m.15 6H4.85a.85.85 0 0 0-.85.85v2.3c0 .47.38.85.85.85h14.3c.47 0 .85-.38.85-.85v-2.3a.85.85 0 0 0-.85-.85M19 16H5a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
          </svg>
          </button>
        <div className={`link-wrap svelte-1yj7c6 ${collapsed ? 'collapsed' : ''}`}>
          {collapsed ? (
            <div className="hoverable svelte-bft4ul">
              <a
                href="/casino/home"
                className="header-button svelte-1l1ag6h collapsed"
                data-sveltekit-preload-data="hover"
                data-testid="header-casino-link"
                data-analytics="header-casino-link"
                draggable="false"
              >
                <img alt="Product Img" draggable="false" className="productImg svelte-1l1ag6h" src="/_app/immutable/assets/active-casino.D98ZVQ96-1.svg" />
                <img alt="Product Img" draggable="false" className="productImg svelte-1l1ag6h" src="/_app/immutable/assets/active-sports.CxIU50TW-1.svg" />
                <img alt="Product Img" draggable="false" className="productImg svelte-1l1ag6h" src="/_app/immutable/assets/default-casino.CqlOLRkM-1.svg" />
                <img alt="Product Img" draggable="false" className="productImg svelte-1l1ag6h" src="/_app/immutable/assets/default-sports.KM8Zs5_U-1.svg" />
                <img alt="Product Img" draggable="false" className="productImg svelte-1l1ag6h img-show" src="/_app/immutable/assets/active-casino-mini.C2xccerq-1.svg" />
                <img alt="Product Img" draggable="false" className="productImg svelte-1l1ag6h" src="/_app/immutable/assets/active-sports-mini.DzJgZyvU-1.svg" />
                <img alt="Product Img" draggable="false" className="productImg svelte-1l1ag6h" src="/_app/immutable/assets/default-casino-mini.CQlEkEv9-1.svg" />
                <img alt="Product Img" draggable="false" className="productImg svelte-1l1ag6h" src="/_app/immutable/assets/default-sports-mini.BJ4yNOA9-1.svg" />
                <svg data-ds-icon="Casino" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" className="inline-block shrink-0" style={{ color: "white" }}>
                  <path fill="currentColor" d="m2.14 4.63 7.25-3.38c.63-.3 1.34-.23 1.89.11-.09.14-.18.28-.26.43L4.81 15.1 1.17 7.29c-.47-1-.03-2.19.97-2.66" />
                  <path fill="currentColor" fillRule="evenodd" d="m21.86 4.63-7.25-3.38c-1-.47-2.19-.03-2.66.97l-6.76 14.5c-.47 1-.03 2.19.97 2.66l7.25 3.38c1 .47 2.19.03 2.66-.97l6.76-14.5c.47-1 .03-2.19-.97-2.66m-9.54 11-.85-4.81 4.23-2.44.85 4.81z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          ) : (
            <a
              href="/casino/home"
              className="header-button svelte-1l1ag6h"
              data-sveltekit-preload-data="hover"
              data-testid="header-casino-link"
              data-analytics="header-casino-link"
              draggable="false"
            >
              <img alt="Product Img" draggable="false" className="productImg svelte-1l1ag6h img-show" src="/_app/immutable/assets/active-casino.D98ZVQ96-1.svg" />
              <img alt="Product Img" draggable="false" className="productImg svelte-1l1ag6h" src="/_app/immutable/assets/active-sports.CxIU50TW-1.svg" />
              <img alt="Product Img" draggable="false" className="productImg svelte-1l1ag6h" src="/_app/immutable/assets/default-casino.CqlOLRkM-1.svg" />
              <img alt="Product Img" draggable="false" className="productImg svelte-1l1ag6h" src="/_app/immutable/assets/default-sports.KM8Zs5_U-1.svg" />
              <img alt="Product Img" draggable="false" className="productImg svelte-1l1ag6h" src="/_app/immutable/assets/active-casino-mini.C2xccerq-1.svg" />
              <img alt="Product Img" draggable="false" className="productImg svelte-1l1ag6h" src="/_app/immutable/assets/active-sports-mini.DzJgZyvU-1.svg" />
              <img alt="Product Img" draggable="false" className="productImg svelte-1l1ag6h" src="/_app/immutable/assets/default-casino-mini.CQlEkEv9-1.svg" />
              <img alt="Product Img" draggable="false" className="productImg svelte-1l1ag6h" src="/_app/immutable/assets/default-sports-mini.BJ4yNOA9-1.svg" />
              <span type="body" tag="span" size="md" strong="true" className="ds-body-md-strong" data-ds-text="true">
                Casino
              </span>
            </a>
          )}
          {collapsed ? (
            <div className="hoverable svelte-bft4ul">
              <a
                href="/sports/home"
                className="header-button svelte-1l1ag6h collapsed"
                data-sveltekit-preload-data="hover"
                data-testid="header-sports-link"
                data-analytics="header-sports-link"
                draggable="false"
              >
                <img alt="Product Img" draggable="false" className="productImg svelte-1l1ag6h" src="/_app/immutable/assets/active-casino.D98ZVQ96-1.svg" />
                <img alt="Product Img" draggable="false" className="productImg svelte-1l1ag6h" src="/_app/immutable/assets/active-sports.CxIU50TW-1.svg" />
                <img alt="Product Img" draggable="false" className="productImg svelte-1l1ag6h" src="/_app/immutable/assets/default-casino.CqlOLRkM-1.svg" />
                <img alt="Product Img" draggable="false" className="productImg svelte-1l1ag6h" src="/_app/immutable/assets/default-sports.KM8Zs5_U-1.svg" />
                <img alt="Product Img" draggable="false" className="productImg svelte-1l1ag6h" src="/_app/immutable/assets/active-casino-mini.C2xccerq-1.svg" />
                <img alt="Product Img" draggable="false" className="productImg svelte-1l1ag6h" src="/_app/immutable/assets/active-sports-mini.DzJgZyvU-1.svg" />
                <img alt="Product Img" draggable="false" className="productImg svelte-1l1ag6h" src="/_app/immutable/assets/default-casino-mini.CQlEkEv9-1.svg" />
                <img alt="Product Img" draggable="false" className="productImg svelte-1l1ag6h img-show" src="/_app/immutable/assets/default-sports-mini.BJ4yNOA9-1.svg" />
                <svg data-ds-icon="Basketball" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" className="inline-block shrink-0" style={{ color: "var(--color-grey-200)" }}>
                  <path fill="currentColor" fillRule="evenodd" d="M20.864 18.483a11 11 0 0 0 1.824-3.931 8.5 8.5 0 0 0-3.529 1.402 36 36 0 0 1 1.705 2.529m-5.399 3.94a11.1 11.1 0 0 0 4.134-2.493 33 33 0 0 0-1.833-2.776 8.48 8.48 0 0 0-2.292 5.269zm1.998-17.63a11.43 11.43 0 0 1-2.218 6.772c.98.934 1.907 1.915 2.768 2.96a10.35 10.35 0 0 1 4.95-1.842c.019-.23.037-.45.037-.688 0-4.196-2.356-7.843-5.812-9.694.175.806.275 1.64.275 2.492m-13.365-.43a35.2 35.2 0 0 1 9.79 5.965 9.6 9.6 0 0 0 1.742-5.535c0-1.182-.22-2.318-.614-3.362A11 11 0 0 0 12 1a10.94 10.94 0 0 0-7.902 3.363M5.932 16.33c-1.55 0-3.016-.312-4.364-.862C3.026 19.838 7.142 23 12 23c.55 0 1.082-.055 1.613-.128a10.35 10.35 0 0 1 3.007-7.166 33 33 0 0 0-2.548-2.73 11.48 11.48 0 0 1-8.131 3.363z" clipRule="evenodd" />
                  <path fill="currentColor" fillRule="evenodd" d="M12.706 11.73a33.4 33.4 0 0 0-9.818-5.883 10.9 10.9 0 0 0-1.824 7.321 9.66 9.66 0 0 0 11.642-1.448z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          ) : (
            <a
              href="/sports/home"
              className="header-button svelte-1l1ag6h"
              data-sveltekit-preload-data="hover"
              data-testid="header-sports-link"
              data-analytics="header-sports-link"
              draggable="false"
            >
              <img alt="Product Img" draggable="false" className="productImg svelte-1l1ag6h" src="/_app/immutable/assets/active-casino.D98ZVQ96-1.svg" />
              <img alt="Product Img" draggable="false" className="productImg svelte-1l1ag6h" src="/_app/immutable/assets/active-sports.CxIU50TW-1.svg" />
              <img alt="Product Img" draggable="false" className="productImg svelte-1l1ag6h" src="/_app/immutable/assets/default-casino.CqlOLRkM-1.svg" />
              <img alt="Product Img" draggable="false" className="productImg svelte-1l1ag6h img-show" src="/_app/immutable/assets/default-sports.KM8Zs5_U-1.svg" />
              <img alt="Product Img" draggable="false" className="productImg svelte-1l1ag6h" src="/_app/immutable/assets/active-casino-mini.C2xccerq-1.svg" />
              <img alt="Product Img" draggable="false" className="productImg svelte-1l1ag6h" src="/_app/immutable/assets/active-sports-mini.DzJgZyvU-1.svg" />
              <img alt="Product Img" draggable="false" className="productImg svelte-1l1ag6h" src="/_app/immutable/assets/default-casino-mini.CQlEkEv9-1.svg" />
              <img alt="Product Img" draggable="false" className="productImg svelte-1l1ag6h" src="/_app/immutable/assets/default-sports-mini.BJ4yNOA9-1.svg" />
              <span type="body" tag="span" size="md" strong="true" className="ds-body-md-strong" data-ds-text="true">
                Sports
              </span>
            </a>
          )}
        </div>
      </div>

      <div className="content svelte-13bc1zy">
        <div ref={sidebarScrollRef} className="scrollable-content svelte-13bc1zy sidebar-scrollable">
          {!collapsed ? (
            <div className="inner-content svelte-13bc1zy">
              <div className="inner-content add-background">
                {primaryPanelItems.map((item) => (
                  <SidebarItem
                    key={item.label}
                    {...item}
                    variant="flat"
                    collapsed={collapsed}
                  />
                ))}
                
                <div className="py-2.5 px-2">
                  <hr className="h-px !bg-[#2f4553] w-full" />
                </div>

                <div className="wrapper-text py-1.75 px-4">
                  <h4 className="text-[#9ca3af] text-base font-semibold">Games</h4>
                </div>

                {gameItemsList.map((item) => (
                  <SidebarItem
                    key={item.label}
                    {...item}
                    variant="flat"
                    collapsed={collapsed}
                  />
                ))}

                <div className="py-2.5 px-2">
                  <hr className="h-px bg-[#2f4553] w-full" />
                </div>

                {extraLinksList.map((item) => (
                  <SidebarItem key={item.label} {...item} variant="flat" collapsed={collapsed} />
                ))}

                <div className="py-2.5 px-2">
                  <hr className="h-px bg-[#2f4553] w-full" />
                </div>

                {supportLinksList.map((item) => (
                  <SidebarItem key={item.label} {...item} variant="flat" collapsed={collapsed} />
                ))}
              </div>
            </div>
          ) : (
            <div className="inner-content svelte-13bc1zy" >
              <div className="inner-content add-background" >
              {primaryPanelItems.map((item) => (
                <SidebarItem
                  key={item.label}
                  {...item}
                  variant="flat"
                  collapsed={collapsed}
                />
              ))}
              </div>
              <hr className="svelte-1ey91rp" />
              <div className="inner-content add-background">
              {gameItemsList.map((item) => (
                <SidebarItem
                  key={item.label}
                  {...item}
                  variant="flat"
                  collapsed={collapsed}
                />
              ))}
              </div>
              <hr className="svelte-1ey91rp" />
              <div className="inner-content add-background">
              {extraLinksList.map((item) => (
                <SidebarItem key={item.label} {...item} variant="flat" collapsed={collapsed} />
              ))}
              </div>
              <hr className="svelte-1ey91rp" />
              <div className="inner-content add-background">
              {supportLinksList.map((item) => (
                <SidebarItem key={item.label} {...item} variant="flat" collapsed={collapsed} />
              ))}
              </div>
          </div>
          )}
        </div>

        {/* Language Selector - At the end */}
        
      </div>
    </aside>
    </>
  );
}

function SidebarItem({
  icon: Icon,
  label,
  href = "https://stake.com/casino/home",
  variant = "flat",
  active = false,
  withChevron = false,
  collapsed = false,
}) {
  const base = collapsed
    ? "flex items-center justify-center rounded-lg w-11 h-11 transition-colors"
    : "inline-flex relative items-center gap-2 font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white hover:bg-grey-400 hover:text-white focus-visible:outline-white text-base px-[1rem] w-full rounded-md justify-start max-w-full py-3";

  const colors = collapsed
    ? "text-white hover:bg-[#2f4553]"
    : "";

  if (collapsed) {
  return (
      <div className="hoverable svelte-bft4ul">
      <a href={href} className={cn(base, colors)}>
          <Icon className="w-5 h-5 shrink-0" style={{ color: 'var(--ds-legacy-color-grey-200)' }} />
      </a>
      </div>
    );
  }

  return (
    <a href={href} className="base-sidebar-anchor max-w-full">
      <button type="button" className={cn(base, colors)}>
        <Icon className="w-5 h-5 shrink-0 inline-block transition-colors" style={{ color: 'var(--ds-legacy-color-grey-200)' }} />
        <span className="truncate" style={{ maxWidth: '100%', display: 'block', color: 'var(--ds-legacy-color-white)' }}>{label}</span>
        {withChevron && <ChevronDownIcon className="ml-auto w-4 h-4 shrink-0 transition-colors" style={{ color: 'var(--ds-legacy-color-grey-200)' }} />}
      </button>
    </a>
  );
}

function SectionHeading({ children, collapsed }) {
  if (collapsed) return null;
  return (
    <div className="wrapper-text py-1.75 px-4">
      <h4 className="text-[#9ca3af] text-base font-semibold">{children}</h4>
    </div>
  );
}

function Divider({ className }) {
  return <div className={cn("h-px bg-[#2f4553] w-full", className)} />;
}

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function MenuIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19 4H5a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1m.15 6H4.85a.85.85 0 0 0-.85.85v2.3c0 .47.38.85.85.85h14.3c.47 0 .85-.38.85-.85v-2.3a.85.85 0 0 0-.85-.85M19 16H5a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
    </svg>
  );
}

function ChevronRightIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M8.293 5.293a1 1 0 0 1 1.338-.069l.076.069 6 6a1 1 0 0 1 0 1.414l-6 6a1 1 0 1 1-1.414-1.414L13.586 12 8.293 6.707l-.068-.076a1 1 0 0 1 .068-1.338" />
    </svg>
  );
}

function ChevronLeftIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M15.707 18.707a1 1 0 0 0 1.414-1.414L11.414 12l4.293-4.293a1 1 0 0 0-1.414-1.414L9.999 10.586a1 1 0 0 0 0 1.414l5.293 5.293z" />
    </svg>
  );
}

function ChevronDownIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path fill="currentColor" d="M17.293 8.293a1 1 0 1 1 1.414 1.414l-6 6a1 1 0 0 1-1.414 0l-6-6-.068-.076A1 1 0 0 1 6.63 8.225l.076.068L12 13.586z" />
    </svg>
  );
}

function HomeIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 3 3 11.25V21a1 1 0 0 0 1 1h5.5a.5.5 0 0 0 .5-.5V16a2 2 0 0 1 4 0v5.5a.5.5 0 0 0 .5.5H20a1 1 0 0 0 1-1v-9.75z" />
    </svg>
  );
}

function GiftIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M21 5h-3.35c.22-.46.35-.96.35-1.5C18 1.57 16.43 0 14.5 0c-.98 0-1.86.41-2.5 1.06A3.5 3.5 0 0 0 9.5 0C7.57 0 6 1.57 6 3.5c0 .54.13 1.04.35 1.5H3c-1.1 0-2 .9-2 2v1c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2m-6.5-3c.83 0 1.5.67 1.5 1.5S15.33 5 14.5 5 13 4.33 13 3.5 13.67 2 14.5 2M8 3.5C8 2.67 8.67 2 9.5 2s1.5.67 1.5 1.5S10.33 5 9.5 5 8 4.33 8 3.5M3 21c0 1.1.9 2 2 2h6V12H3zm10 2h6c1.1 0 2-.9 2-2v-9h-8z" />
    </svg>
  );
}

function CasinoIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="m2.14 4.63 7.25-3.38c.63-.3 1.34-.23 1.89.11-.09.14-.18.28-.26.43L4.81 15.1 1.17 7.29c-.47-1-.03-2.19.97-2.66" />
      <path
        fillRule="evenodd"
        d="m21.86 4.63-7.25-3.38c-1-.47-2.19-.03-2.66.97l-6.76 14.5c-.47 1-.03 2.19.97 2.66l7.25 3.38c1 .47 2.19.03 2.66-.97l6.76-14.5c.47-1 .03-2.19-.97-2.66m-9.54 11-.85-4.81 4.23-2.44.85 4.81z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function SportsIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path
        fillRule="evenodd"
        d="M20.864 18.483a11 11 0 0 0 1.824-3.931 8.5 8.5 0 0 0-3.529 1.402 36 36 0 0 1 1.705 2.529m-5.399 3.94a11.1 11.1 0 0 0 4.134-2.493 33 33 0 0 0-1.833-2.776 8.48 8.48 0 0 0-2.292 5.269zm1.998-17.63a11.43 11.43 0 0 1-2.218 6.772c.98.934 1.907 1.915 2.768 2.96a10.35 10.35 0 0 1 4.95-1.842c.019-.23.037-.45.037-.688 0-4.196-2.356-7.843-5.812-9.694.175.806.275 1.64.275 2.492m-13.365-.43a35.2 35.2 0 0 1 9.79 5.965 9.6 9.6 0 0 0 1.742-5.535c0-1.182-.22-2.318-.614-3.362A11 11 0 0 0 12 1a10.94 10.94 0 0 0-7.902 3.363M5.932 16.33c-1.55 0-3.016-.312-4.364-.862C3.026 19.838 7.142 23 12 23c.55 0 1.082-.055 1.613-.128a10.35 10.35 0 0 1 3.007-7.166 33 33 0 0 0-2.548-2.73 11.48 11.48 0 0 1-8.131 3.363z"
        clipRule="evenodd"
      />
      <path
        fillRule="evenodd"
        d="M12.706 11.73a33.4 33.4 0 0 0-9.818-5.883 10.9 10.9 0 0 0-1.824 7.321 9.66 9.66 0 0 0 11.642-1.448z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function DiamondIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 3 4 9l8 12 8-12-8-6zm-4 6 4 7 4-7-4-3-4 3z" />
    </svg>
  );
}

function SupportIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 1C6.49 1 2 5.34 2 10.67v4.61a1 1 0 0 0 .69.95l3.89 1.26c1.25.27 2.42-.68 2.42-1.96v-4.05c0-1.27-1.17-2.22-2.42-1.96l-2.55.55C4.35 6.12 7.8 3.01 12 3.01s7.65 3.12 7.97 7.06l-2.55-.55c-1.25-.27-2.42.68-2.42 1.96v4.05c0 1.27 1.17 2.22 2.42 1.96l2.58-.55v1.07c0 1.1-.9 2-2 2h-4v-.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v1.5c0 .55.45 1 1 1h6c2.21 0 4-1.79 4-4v-7.33C22 5.34 17.51 1 12 1z" />
    </svg>
  );
}

function FavouriteIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 19.48 6.72 21.9c-.82.37-1.73-.29-1.63-1.18l.67-5.77-3.93-4.28c-.61-.66-.26-1.74.62-1.92l5.7-1.15L11 2.54c.44-.79 1.57-.79 2.02 0l2.85 5.06 5.7 1.15c.88.18 1.23 1.25.62 1.92l-3.93 4.28.67 5.77c.1.9-.81 1.56-1.63 1.18z" />
    </svg>
  );
}

function RecentIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path
        fillRule="evenodd"
        d="M12 1C5.92 1 1 5.92 1 12s4.92 11 11 11 11-4.92 11-11S18.08 1 12 1m4.21 15.21c-.2.2-.45.29-.71.29s-.51-.1-.71-.29l-3.5-3.5A1 1 0 0 1 11 12V4c0-.55.45-1 1-1s1 .45 1 1v7.59l3.21 3.21c.39.39.39 1.02 0 1.41"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ChallengeIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="m7.92 12.32 1.25-1.88c.37-.56 1.29-.56 1.66 0L12 12.19l1.17-1.75c.37-.56 1.29-.56 1.66 0l1.23 1.85 1.44-1.85L16 7h-3V5h6l-2-2 2-2h-8v6H8l-1.54 3.53zm10.5.2-1.63 2.09a1.02 1.02 0 0 1-.83.38 1 1 0 0 1-.8-.44L14 12.8l-1.17 1.75c-.37.56-1.29.56-1.66 0L9.99 12.8l-1.17 1.75c-.18.26-.47.43-.78.44H8a1 1 0 0 1-.77-.37l-1.67-2.04L1 23h22z" />
    </svg>
  );
}

function MyBetsIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M22 1h-7c0 1.66-1.34 3-3 3S9 2.66 9 1H2v22h7c0-1.66 1.34-3 3-3s3 1.34 3 3h7zM18.46 8.91l-7.22 5.78a1.436 1.436 0 0 1-1.92-.1L6.43 11.7c-.56-.56-.56-1.48 0-2.04s1.48-.56 2.04 0l1.97 1.97 6.21-4.97c.62-.5 1.53-.4 2.03.23.5.62.4 1.53-.23 2.03z" />
    </svg>
  );
}

function NewIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M22 12c-7.8 1.21-8.79 2.2-10 10-1.21-7.8-2.2-8.79-10-10 7.8-1.21 8.79-2.2 10-10 1.21 7.8 2.2 8.79 10 10m2-7c-3.12.48-3.52.88-4 4-.48-3.12-.88-3.52-4-4 3.12-.48 3.52-.88 4-4 .48 3.12.88 3.52 4 4M8 19c-3.12.48-3.52.88-4 4-.48-3.12-.88-3.52-4-4 3.12-.48 3.52-.88 4-4 .48 3.12.88 3.52 4 4" />
    </svg>
  );
}

function SlotsIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M7.62 10.61a20 20 0 0 0-1.45 3.96 7.5 7.5 0 0 0 0 3.59l.18.75-4.07 1A9.47 9.47 0 0 1 3 13.43l-3 .71v-2.92l7.34-1.76zM24 11.72l-.23 1.16a21.4 21.4 0 0 0-2.97 2.95 7.64 7.64 0 0 0-1.5 3.26l-.15.75-4.15-.76a9.53 9.53 0 0 1 3.34-5.57l-3-.59 1.26-2.66z" />
      <path d="M18 6.03a33.5 33.5 0 0 0-3.8 5.74 12.44 12.44 0 0 0-1.4 5.7v1.25H8.08a13.9 13.9 0 0 1 1.25-5.69 21.7 21.7 0 0 1 3.37-5.28h-7V4.09H18z" />
    </svg>
  );
}

function FireIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19.38 5.59c-.64-.83-1.93-.77-2.51.11L16 7l-2.56-4.48C12.6 1.05 10.7.55 9.27 1.45c-2.82 1.79-6.86 5.28-7.24 10.7-.36 5.11 3.19 9.84 8.24 10.69A10 10 0 0 0 22 12.99c0-3.02-1.13-5.48-2.62-7.41zM12 21c-2.21 0-4-1.22-4-3 0-2.91 4-6 4-6s4 3.09 4 6c0 1.78-1.79 3-4 3" />
    </svg>
  );
}

function StakeExclusiveIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M21.922 9.566c.758-1.907.225-4.45-1.743-5.403-2.214-.994-8.283-3.68-10.97-3.075-5.781.153-9.574 6.868-5.381 10.61-2.215 1.63-3.22 6.807-.154 8.335 3.465 2.03 9.862 4.48 13.799 1.763 2.973-1.497 5.372-5.73 3.065-8.704l-.092-.102a5 5 0 0 0-.452-.461 4.7 4.7 0 0 0-.656-.503c1.19-.318 2.143-1.332 2.584-2.46m-10.99-1.897c-.861.093-.892-.348-.892-.369.051-.051 1.046-.943 1.077-1.722.02-.4-.216-1.487-1.774-1.312-2.173.256-3.393 1.507-3.475 3.526-.103 2.327 6.171 2.4 6.048 5.403-.133 3.198-3.24 4.993-5.935 5.31-1.415.164-2.307-.635-2.246-2.08.062-1.713.882-3.538 2.738-3.753.717-.082.8.584.789.738-.092.041-1.886.79-1.958 2.82-.02.379.307 1.014 1.158.922.892-.102 3.506-1.066 3.62-3.598.091-2.327-6.152-1.938-5.998-5.567.164-4.1 3.937-4.736 5.351-4.9 1.712-.195 3.363.43 3.301 2.214-.061 1.569-.922 2.276-1.794 2.379z" />
    </svg>
  );
}

function VipHostIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M15.65 1.775h-.3l-3.4 1.2-3.4-1.2c-.6-.2-1.3.2-1.4.9v2.5c0 .7.6 1.2 1.2 1.2h.3l3.3-1.5 3.4 1.5c.7.2 1.3-.2 1.5-.9v-2.5c0-.7-.6-1.2-1.2-1.2m-5.4 18.9-4.5-15c-.3-.6-.9-.9-1.6-.7l-1.5.5c-.5.1-.8.6-.8 1.1l-.9 14.4c0 .7.5 1.2 1.1 1.3h7c.7 0 1.2-.5 1.2-1.2.1-.1 0-.3 0-.4m11.8-14.1c0-.5-.3-.9-.8-1.1l-1.5-.6c-.6-.2-1.3.1-1.5.7l-4.5 15c-.2.6.2 1.3.8 1.5.1 0 .2.1.4.1h6.9c.7 0 1.2-.5 1.2-1.2z" />
    </svg>
  );
}

function GameShowsIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M9.93 9.48 2 19l1.29 1.29-1 1a.996.996 0 0 0 .71 1.7c.26 0 .51-.1.71-.29l1-1L6 23l9.45-8.66a7.52 7.52 0 0 1-5.52-4.85M17 13a6 6 0 1 0 0-12 6 6 0 0 0 0 12" />
    </svg>
  );
}

function BurstIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fill="currentColor" d="m24 15-4.5 7.5h-3c0-2.49-2.01-4.5-4.5-4.5s-4.5 2.01-4.5 4.5h-3L0 15l4.5 1.5L3 9l6 3 3-10.5L15 12l6-3-1.5 7.5z"></path>
    </svg>
  );
}

function EnhanceRtpIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M14 1h-4a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1m4.5 4h-13C4.67 5 4 5.67 4 6.5v15c0 .83.67 1.5 1.5 1.5h13c.83 0 1.5-.67 1.5-1.5v-15c0-.83-.67-1.5-1.5-1.5m-1.98 8.13-4.3 6.58c-.38.55-1.25.28-1.25-.39V15.8H7.98a.6.6 0 0 1-.5-.93l4.3-6.57c.38-.56 1.25-.29 1.25.39v3.52h2.99a.6.6 0 0 1 .5.93z" />
    </svg>
  );
}

function PokerIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.45 4.96 18.31 7.1A8 8 0 0 1 20 12c0 1.85-.63 3.54-1.69 4.9l2.14 2.14C22.04 17.13 23 14.68 23 12s-.96-5.13-2.55-7.04M12 4c1.85 0 3.54.63 4.9 1.69l2.14-2.14A10.96 10.96 0 0 0 12 1c-2.68 0-5.13.96-7.04 2.55L7.1 5.69A8 8 0 0 1 12 4m0 16c-1.85 0-3.54-.63-4.9-1.69l-2.14 2.14C6.87 22.04 9.32 23 12 23s5.13-.96 7.04-2.55l-2.14-2.14A8 8 0 0 1 12 20m-8-8c0-1.85.63-3.54 1.69-4.9L3.55 4.96A10.96 10.96 0 0 0 1 12c0 2.68.96 5.13 2.55 7.04l2.14-2.14A8 8 0 0 1 4 12m12.75 2.45a2.74 2.74 0 0 0 0-3.86l-4.6-4.6-4.6 4.6a2.74 2.74 0 0 0 0 3.86c1.06 1.07 2.71 1.06 3.78.06l-.93 2.48h3.5l-.93-2.48c1.07.99 2.74.98 3.78-.06" />
    </svg>
  );
}

function BlackjackIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M9.24 5.634a.92.92 0 0 1 .817.5l.21.434-2.846 8.556-.031.133a.925.925 0 0 0 .61 1.02l7.779 2.61h.119l-.002.004a.87.87 0 0 1-.347.328l-7.342 3.686a.92.92 0 0 1-1.226-.412L1.084 10.615l.002.006a.926.926 0 0 1 .402-1.205l7.348-3.688-.006.002a.9.9 0 0 1 .41-.097" />
      <path
        fillRule="evenodd"
        d="M14.312 1c.1 0 .198.016.282.044l7.778 2.591.008.002a.923.923 0 0 1 .572 1.17l-4.189 12.586-.002.006a.92.92 0 0 1-1.145.565l-7.78-2.609-.006-.002a.92.92 0 0 1-.573-1.15l4.189-12.586.002-.007a.92.92 0 0 1 .864-.61m3.341 6.719a.23.23 0 0 0-.073.092l-.157.435v.003c0 .062.043.113.101.126l.643.24-1.111 3.126a.1.1 0 0 0-.012.05c0 .059.04.108.093.124l.772.277a.1.1 0 0 0 .043.008.13.13 0 0 0 .123-.09l1.589-4.419a.14.14 0 0 0-.082-.175l-.634-.23zM15.25 5.948a2.1 2.1 0 0 0-1.033.268.14.14 0 0 0-.054.185l.248.646a.15.15 0 0 0 .193.072l-.004.003a1.04 1.04 0 0 1 .803-.113h.004a.58.58 0 0 1 .428.719l-.003.007a1.1 1.1 0 0 1-.364.454c-.643.434-2.158 1.466-2.755 1.844v.147a.14.14 0 0 0 .082.176l2.755.996h-.002a.1.1 0 0 0 .038.005c.063 0 .117-.04.138-.097l.22-.617a.15.15 0 0 0-.083-.184l-1.212-.434c.487-.34 1.314-.886 1.681-1.199l.004-.003a1.9 1.9 0 0 0 .583-.808h.001a1.516 1.516 0 0 0-1.075-1.983l.015.004a2.1 2.1 0 0 0-.608-.088"
        clipRule="evenodd"
      />
    </svg>
  );
}

function BaccaratIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path
        fillRule="evenodd"
        d="M18.077 1.083a.77.77 0 0 1 .557.24l3.097 3.218-3.097 3.216a2.88 2.88 0 0 0-.806 2.01c0 .796.316 1.517.827 2.032l3.097 3.216-7.453 7.752a.785.785 0 0 1-1.116 0l-7.596-7.902a.82.82 0 0 1-.232-.574c0-.224.089-.427.232-.573L17.519 1.324a.77.77 0 0 1 .558-.241m-6.235 13.322a.19.19 0 0 0-.181.192.2.2 0 0 0 .047.13l1.58 1.672a.18.18 0 0 0 .124.05.19.19 0 0 0 .185-.179v-1.49a.37.37 0 0 0-.362-.375zm.712-3.453c-.2 0-.361.168-.361.375v1.522c0 .208.161.376.361.376h1.87a.38.38 0 0 1 .34.429v1.887c0 .207.16.376.36.376h1.466a.38.38 0 0 0 .372-.376v-4.214a.37.37 0 0 0-.362-.375z"
        clipRule="evenodd"
      />
      <path d="m23 13.729-2.128-2.253-1-1.038a1.03 1.03 0 0 1-.28-.707c0-.276.108-.526.28-.708l3.098-3.217v.032l.03-.032zM9.23 1c.322 0 .614.137.826.356l2.467 2.563-8.713 9.05-2.467-2.563A1.23 1.23 0 0 1 1 9.548c0-.336.132-.64.343-.859l7.06-7.333c.211-.22.504-.356.826-.356" />
    </svg>
  );
}

function RouletteIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M23 12c0-3.04-1.23-5.79-3.22-7.78A10.97 10.97 0 0 0 12 1C8.96 1 6.21 2.23 4.22 4.22A10.97 10.97 0 0 0 1 12c0 3.04 1.23 5.79 3.22 7.78S8.96 23 12 23s5.79-1.23 7.78-3.22S23 15.04 23 12m-2 0h-5c0-1.27-.6-2.39-1.53-3.12.12.1.25.18.36.29l3.53-3.53A8.97 8.97 0 0 1 21 12m-9-9v5c-1.27 0-2.39.61-3.13 1.53.1-.12.19-.25.3-.36L5.64 5.64A8.97 8.97 0 0 1 12 3m-9 9h5c0 1.27.6 2.39 1.53 3.12-.12-.09-.25-.18-.36-.29l-3.53 3.53A8.97 8.97 0 0 1 3 12m9 9v-5c1.27 0 2.39-.6 3.12-1.53-.09.12-.18.25-.29.36l3.53 3.53A8.97 8.97 0 0 1 12 21" />
    </svg>
  );
}

function ProvidersIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M13 5.6V10c0 .55-.45 1-1 1s-1-.45-1-1V5.6L2 11v2l10 6 10-6v-2z" />
      <path d="M22 15v2l-10 6-10-6v-2l10 6zM12 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
    </svg>
  );
}

function AffiliateIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 11a5 5 0 1 0 0-10 5 5 0 0 0 0 10" />
      <path
        fillRule="evenodd"
        d="M16.5 21v-.14l-.91-.65c-.5.19-1.04.29-1.59.29-2.48 0-4.5-2.02-4.5-4.5 0-1.16.45-2.2 1.17-3H9c-4.42 0-8 3.58-8 8 0 1.1.9 2 2 2h13.99c-.3-.61-.49-1.28-.49-2"
        clipRule="evenodd"
      />
      <path d="M21 18c-.64 0-1.23.2-1.72.54l-2.41-1.72c.08-.26.13-.53.13-.82s-.05-.56-.13-.82l2.41-1.72c.49.34 1.08.54 1.72.54 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .29.05.56.13.82l-2.41 1.72C15.23 13.2 14.64 13 14 13c-1.66 0-3 1.34-3 3s1.34 3 3 3c.64 0 1.23-.2 1.72-.54l2.41 1.72c-.08.26-.13.53-.13.82 0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3" />
    </svg>
  );
}

function TrophyIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M21.08 4H19c0-1.1-.9-2-2-2H7c-1.1 0-2 .9-2 2H2.92C1.8 4 .9 4.91.92 6.03c.04 2.48.69 6.41 4.35 6.86A6.98 6.98 0 0 0 11 17.9v1.08h-1c-2.21 0-4 1.79-4 4h12c0-2.21-1.79-4-4-4h-1V17.9c2.76-.4 4.99-2.39 5.73-5.02 3.65-.46 4.31-4.38 4.35-6.86.02-1.12-.88-2.03-2-2.03zM4 10.11c-.57-.68-1.04-1.9-1.08-4.1H4zM16.11 9l-1.45 1.04.57 1.71c.34 1.03-.83 1.89-1.71 1.26l-1.51-1.08-1.51 1.08c-.88.63-2.05-.24-1.71-1.26l.57-1.71L7.91 9c-.89-.63-.44-2.03.65-2.03h1.82l.58-1.75c.34-1.02 1.79-1.02 2.13 0l.58 1.75h1.82c1.09 0 1.54 1.4.65 2.03zM20 10.1V6h1.08c-.04 2.21-.51 3.43-1.08 4.1" />
    </svg>
  );
}

function BlogIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M21.17 5.632c.742 0 1.332.613 1.332 1.377v12.378c0 1.008-.799 1.83-1.783 1.83s-1.783-.822-1.783-1.83V5.632z" />
      <path d="M17.882 19.33V3.293C17.882 2.03 16.794 1 15.566 1H3.721C2.494 1 1.498 2.03 1.498 3.293V19.33c0 2.026 1.598 3.67 3.566 3.67h17.369c-1.969 0-4.54-1.644-4.54-3.67zM3.987 5.631h3.381v3.473h-3.38zm10.34 12.736H5.134a1.15 1.15 0 0 1-1.147-1.157c0-.637.51-1.158 1.147-1.158h9.193c.637 0 1.147.52 1.147 1.157s-.51 1.158-1.147 1.158h9.193c.637 0 1.147.521 1.147 1.158s-.51 1.158-1.147 1.158m.012-5.79h-3.416A1.15 1.15 0 0 1 9.788 6.79c0-.636.51-1.157 1.135-1.157h3.416a1.15 1.15 0 0 1 1.135 1.157 1.15 1.15 0 0 1-1.135 1.158" />
    </svg>
  );
}

function ChatIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20 4H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h10v3l4-3h2c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2M8 13c-.83 0-1.5-.67-1.5-1.5S7.17 10 8 10s1.5.67 1.5 1.5S8.83 13 8 13m4 0c-.83 0-1.5-.67-1.5-1.5S11.17 10 12 10s1.5.67 1.5 1.5S12.83 13 12 13m4 0c-.83 0-1.5-.67-1.5-1.5S15.17 10 16 10s1.5.67 1.5 1.5S16.83 13 16 13" />
    </svg>
  );
}

function SponsorshipsIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path
        fillRule="evenodd"
        d="M19 16.72v-1l-6-4-2.44 3.05c-.8 1-2.32 1-3.12 0L5 11.72l-1 1 2 4 5.59 4.79c.79.68 1.98.63 2.72-.1l.69-.69v-1h1l2-2v-1z"
        clipRule="evenodd"
      />
      <path
        fillRule="evenodd"
        d="m19 13.72-4.71-7.53a1 1 0 0 0-.85-.47h-2.91c-.33 0-.65.17-.83.45l-3.25 4.87c-.26.4-.21.92.12 1.26l1.63 1.63c.42.42 1.12.38 1.49-.08l3.3-4.13 6 4zm-5-10 7 9 3-2-7-9zm-4 0-3-2-7 9 3 2z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function SecurityIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path
        fillRule="evenodd"
        d="M11.18 3a2.12 2.12 0 0 1 1.64 0l7.08 2.57c.73.31 1.2 1 1.2 1.77v1.65c0 8.62-4.98 11.2-7.57 12.61-.95.52-2.11.52-3.06 0C7.88 20.18 2.9 17.61 2.9 8.99V7.34c0-.76.47-1.46 1.2-1.77zM12 7a2.5 2.5 0 0 0-2.5 2.5c0 1.03.62 1.9 1.5 2.29V15c0 .55.45 1 1 1s1-.45 1-1v-3.21c.88-.39 1.5-1.27 1.5-2.29A2.5 2.5 0 0 0 12 7"
        clipRule="evenodd"
      />
    </svg>
  );
}

function LanguageIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path fill="currentColor" d="M7.14 9.87c1.49.31 3.13.48 4.86.48s3.37-.18 4.86-.48c-.34-4.02-1.6-7.36-3.23-8.73-.53-.08-1.07-.13-1.63-.13s-1.1.05-1.63.13C8.74 2.52 7.48 5.86 7.14 9.87m8.32-8.31c1.28 1.84 2.19 4.69 2.49 8.05 1.75-.46 3.21-1.11 4.2-1.88a11.05 11.05 0 0 0-6.68-6.17zM18.05 12c0 1.59-.14 3.09-.38 4.48 1.4.33 2.64.77 3.67 1.31a10.92 10.92 0 0 0 1.18-8.99c-1.14.81-2.68 1.48-4.5 1.94q.03.615.03 1.26m-12.1 0c0-.43.01-.84.03-1.26-1.82-.46-3.37-1.13-4.5-1.94a10.92 10.92 0 0 0 1.18 8.99c1.04-.54 2.28-.99 3.67-1.31-.24-1.39-.38-2.89-.38-4.48m1.12-1.01c-.01.33-.02.67-.02 1.01 0 1.49.13 2.93.37 4.25 1.42-.26 2.96-.4 4.58-.4s3.17.15 4.58.4c.23-1.32.37-2.76.37-4.25 0-.34 0-.68-.02-1.01-1.51.3-3.17.46-4.93.46s-3.42-.16-4.93-.46m10.38 6.57c-.45 1.98-1.14 3.66-1.99 4.88 2.11-.7 3.93-2.02 5.26-3.74-.92-.46-2.02-.85-3.26-1.14zM12 16.95c-1.54 0-3.01.14-4.37.38.58 2.54 1.57 4.54 2.74 5.53.53.08 1.07.13 1.63.13s1.1-.05 1.63-.13c1.17-.99 2.15-2.99 2.74-5.53-1.36-.25-2.83-.38-4.37-.38m-3.46 5.49c-.85-1.23-1.54-2.9-1.99-4.88-1.24.29-2.34.68-3.26 1.14a11.06 11.06 0 0 0 5.26 3.74zM1.86 7.73c.99.77 2.45 1.42 4.2 1.88.3-3.36 1.2-6.21 2.49-8.05-3.02 1-5.46 3.26-6.68 6.17z" />
    </svg>
  );
}

// Alias for Earth icon (same as LanguageIcon)
const Earth = LanguageIcon;



