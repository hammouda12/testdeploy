"use client";

import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const socialLinks = [
    { name: "Blog", href: "https://stake.com/blog", icon: "blog" },
    { name: "Forum", href: "https://stakecommunity.com/", icon: "forum" },
    { name: "Facebook", href: "https://facebook.com/StakeCasino", icon: "facebook" },
    { name: "x.com (Twitter)", href: "https://x.com/stake", icon: "twitter" },
    { name: "Instagram", href: "https://instagram.com/stake", icon: "instagram" },
    { name: "YouTube", href: "https://youtube.com/c/StakeCasinoTV", icon: "youtube" },
    { name: "Shop", href: "https://shop.stake.com/", icon: "shop" },
  ];

  const casinoLinks = [
    { label: "Casino Games", href: "/casino/home" },
    { label: "Slots", href: "/casino/group/slots" },
    { label: "Live Casino", href: "/casino/group/live-casino" },
    { label: "Roulette", href: "/casino/group/roulette" },
    { label: "Blackjack", href: "/casino/group/blackjack" },
    { label: "Poker", href: "/casino/games/poker" },
    { label: "Publishers", href: "/casino/collection/provider" },
    { label: "Promos & Competitions", href: "/promotions" },
    { label: "Stake Engine", href: "https://engine.stake.com/", external: true },
    { label: "Stake Vendors", href: "https://vendors.stake.com/", external: true },
  ];

  const sportsLinks = [
    { label: "Sportsbook", href: "/sports/home" },
    { label: "Live Sports", href: "/sports/live" },
    { label: "Soccer", href: "/sports/soccer" },
    { label: "Basketball", href: "/sports/basketball" },
    { label: "Tennis", href: "/sports/tennis" },
    { label: "eSports", href: "/sports/esports" },
    { label: "Bet Bonuses", href: "/promotions/category/sports" },
    { label: "Sports Rules", href: "/policies/sportsbook" },
    { label: "Racing Rules", href: "/policies/racing-rules" },
  ];

  const supportLinks = [
    { label: "Help Center", href: "https://help.stake.com/", external: true },
    { label: "Fairness", href: "/provably-fair" },
    { label: "Gambling Helpline", href: "https://www.gamblingtherapy.org/", external: true },
    { label: "Live Support", href: "#", button: true },
    { label: "Self Exclusion", href: "/policies/self-exclusion" },
    { label: "Law Enforcement Request", href: "/policies/law-enforcement" },
  ];

  const aboutLinks = [
    { label: "VIP Club", href: "/vip-club" },
    { label: "Affiliate", href: "/affiliate" },
    { label: "Privacy Policy", href: "/policies/privacy" },
    { label: "AML Policy", href: "/policies/anti-money-laundering" },
    { label: "Terms of Service", href: "/policies/terms" },
  ];

  const paymentLinks = [
    { label: "Deposit & Withdrawals", href: "/blog/deposit-withdrawal-methods-online-betting" },
    { label: "Currency Guide", href: "/blog/local-currency-deposit-withdraw-guide" },
    { label: "Crypto Guide", href: "/blog/what-is-crypto-gambling-guide" },
    { label: "Supported Crypto", href: "/blog/what-crypto-does-stake-offer" },
    { label: "How to Use the Vault", href: "/blog/how-to-use-our-vault" },
    { label: "How Much to Bet With", href: "/blog/how-much-to-gamble-budget-calculator" },
  ];

  const faqLinks = [
    { label: "How-to Guides", href: "/blog/category/how-to-guides" },
    { label: "Online Casino Guide", href: "/blog/online-casino-guide" },
    { label: "Sports Betting Guide", href: "/blog/sports-betting-guide" },
    { label: "How to Live Stream Sports", href: "/blog/how-to-watch-live-stream-sports-free" },
    { label: "Stake VIP Guide", href: "/blog/vip-program-levels-benefits-rewards" },
    { label: "House Edge Guide", href: "/blog/casino-house-edge-guide" },
  ];

  const renderSocialIcon = (iconName) => {
    const icons = {
      blog: (
        <svg fill="currentColor" viewBox="0 0 24 24" className="svg-icon w-4 h-auto text-white">
          <title>Blog</title>
          <path fill="currentColor" d="M17.882 19.33V3.293C17.882 2.03 16.794 1 15.566 1H3.721C2.494 1 1.498 2.03 1.498 3.293V19.33c0 2.026 1.598 3.67 3.566 3.67h17.369c-1.969 0-4.54-1.644-4.54-3.67zM3.987 5.631h3.381v3.473h-3.38zm10.34 12.736H5.134a1.15 1.15 0 0 1-1.147-1.157c0-.637.51-1.158 1.147-1.158h9.193c.637 0 1.147.52 1.147 1.157s-.51 1.158-1.147 1.158m0-4.631H5.134a1.15 1.15 0 0 1-1.147-1.158c0-.637.51-1.158 1.147-1.158h9.193c.637 0 1.147.521 1.147 1.158s-.51 1.158-1.147 1.158m.012-5.79h-3.416A1.15 1.15 0 0 1 9.788 6.79c0-.636.51-1.157 1.135-1.157h3.416a1.15 1.15 0 0 1 1.135 1.157 1.15 1.15 0 0 1-1.135 1.158"></path>
        </svg>
      ),
      forum: (
        <svg fill="currentColor" viewBox="0 0 24 24" className="svg-icon w-4 h-auto text-white">
          <title>Forum</title>
          <path fill="currentColor" d="M20 4H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h10v3l4-3h2c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2M8 13c-.83 0-1.5-.67-1.5-1.5S7.17 10 8 10s1.5.67 1.5 1.5S8.83 13 8 13m4 0c-.83 0-1.5-.67-1.5-1.5S11.17 10 12 10s1.5.67 1.5 1.5S12.83 13 12 13m4 0c-.83 0-1.5-.67-1.5-1.5S15.17 10 16 10s1.5.67 1.5 1.5S16.83 13 16 13"></path>
        </svg>
      ),
      facebook: (
        <svg fill="currentColor" viewBox="0 0 96 96" className="svg-icon w-4 h-auto text-white">
          <title>Facebook</title>
          <path d="M80 8H16c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h37.72V61.64c0-1.12-.92-2-2-2h-5.8c-1.08 0-2-.92-2-2v-6.92c0-1.08.92-2 2-2h5.8c1.08 0 2-.88 2-2v-6c0-4.48 1.12-7.88 3.68-10.44s5.92-3.84 10.24-3.84c2.44 0 4.68.08 6.6.28 1 .08 1.76.96 1.76 2v5.84c0 1.08-.92 2-2 2h-3.8q-3.12 0-4.32 1.44-.96 1.44-.96 3.84v4.88c0 1.12.92 2 2 2h6.8c1.2 0 2.12 1.08 1.96 2.28l-.92 6.88c-.12 1-.96 1.76-1.96 1.76h-5.88c-1.08 0-2 .88-2 2V88H80c4.4 0 8-3.6 8-8V16c0-4.4-3.6-8-8-8"></path>
        </svg>
      ),
      twitter: (
        <svg fill="currentColor" viewBox="0 0 96 96" className="svg-icon w-4 h-auto text-white">
          <title>x.com (Twitter)</title>
          <path d="M73.52 8H87L57.4 41.96 92 88H64.84L43.6 60 19.28 88H5.76l31.36-36.32L4 8h27.84l19.2 25.56zM68.8 80.04h7.48l-48.4-64.36h-8.04z"></path>
        </svg>
      ),
      instagram: (
        <svg fill="currentColor" viewBox="0 0 96 96" className="svg-icon w-4 h-auto text-white">
          <title>Instagram</title>
          <path d="M48 60c6.6 0 12-5.4 12-12s-5.4-12-12-12-12 5.4-12 12 5.4 12 12 12"></path>
          <path d="M68.56 8H27.44C16.72 8 8 16.72 8 27.44v41.12C8 79.28 16.72 88 27.44 88h41.12C79.28 88 88 79.28 88 68.56V27.44C88 16.72 79.28 8 68.56 8m3.36 16.2c-2.28 0-4.12-1.84-4.12-4.08S69.64 16 71.92 16 76 17.84 76 20.12s-1.84 4.08-4.08 4.08M48 28c11 0 20 9 20 20s-9 20-20 20-20-9-20-20 9-20 20-20"></path>
        </svg>
      ),
      youtube: (
        <svg fill="currentColor" viewBox="0 0 96 96" className="svg-icon w-4 h-auto text-white">
          <title>YouTube</title>
          <path d="M80.72 18.036c-6.64-1.84-30-1.88-32.64-1.88s-26.16.04-32.76 1.88c-4.64 1.2-8.32 5-9.52 9.56-1.84 6.64-1.88 20.08-1.88 20.6 0 .56.04 13.8 1.88 20.52 1.16 4.68 4.8 8.32 9.52 9.56 6.64 1.68 30.12 1.72 32.76 1.72s25.92-.04 32.6-1.72c4.72-1.24 8.36-4.88 9.52-9.48 1.88-6.8 1.88-20.04 1.88-20.6 0-.52 0-13.88-1.88-20.52-1.2-4.68-4.92-8.48-9.48-9.64m-39.32 44.8c-1 0-2-.28-2.92-.76a5.83 5.83 0 0 1-2.88-5.04v-17.72c0-2.08 1.12-3.92 2.88-5 1.8-1 3.96-1.04 5.76 0l15.52 8.88c1.8 1 2.92 2.96 2.92 5s-1.12 4-2.92 5.04l-15.52 8.88c-.92.52-1.88.76-2.88.76z"></path>
        </svg>
      ),
      shop: (
        <svg fill="currentColor" viewBox="0 0 96 96" className="svg-icon w-4 h-auto text-white">
          <title>Shop</title>
          <path d="M12 16h16l4 12h54.24c2.8 0 4.72 2.8 3.76 5.4l-9 24c-.6 1.56-2.08 2.6-3.76 2.6H40c-2.2 0-4 1.8-4 4s1.8 4 4 4h36c2.2 0 4 1.8 4 4s-1.8 4-4 4H32L20 28h-8c-2.2 0-4-1.8-4-4v-4c0-2.2 1.8-4 4-4"></path>
          <path d="M72 88a8 8 0 1 0 0-16 8 8 0 0 0 0 16m-40 0a8 8 0 1 0 0-16 8 8 0 0 0 0 16"></path>
        </svg>
      ),
    };
    return icons[iconName] || null;
  };

  const renderExternalIcon = () => (
    <svg fill="currentColor" viewBox="0 0 64 64" className="svg-icon text-grey-300">
      <title></title>
      <path fillRule="evenodd" d="M10.823 53.176h42.353V39.941h7.059v20.294H3.765V3.765h20.293v7.058H10.823zm28.236-42.353V3.765h21.176V24.94h-7.059v-9.123L27.88 41.115l-4.994-4.995 25.297-25.296z" clipRule="evenodd"></path>
    </svg>
  );

  const sections = [
    { key: 'casino', title: 'Casino', links: casinoLinks },
    { key: 'sports', title: 'Sports', links: sportsLinks },
    { key: 'support', title: 'Support', links: supportLinks },
    { key: 'about', title: 'About Us', links: aboutLinks },
    { key: 'payment', title: 'Payment Info', links: paymentLinks },
    { key: 'faq', title: 'FAQ', links: faqLinks },
  ];

  // Common link classes for mobile (< 768px)
  const mobileLinkClasses = "inline-flex relative items-center gap-2 justify-start rounded-sm font-semibold ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-[#b1bad3] hover:bg-transparent hover:text-white focus-visible:text-white focus-visible:outline-hidden text-sm leading-none whitespace-break-spaces";
  
  // Common link classes for desktop (>= 768px)
  const desktopLinkClasses = "inline-flex relative items-center gap-2 justify-start rounded-sm font-semibold ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-[#b1bad3] hover:opacity-80 focus-visible:text-white focus-visible:outline-hidden text-sm leading-none whitespace-break-spaces";

  return (
    <footer data-test="footer" data-layout="" className="py-8 bg-grey-800 pb-[calc(var(--mobile-footer-height)+2rem)] md:pb-8">
      <div className="mx-auto max-w-[1320px] px-8 footer-padding">
        <div className="footer-content w-full grid gap-6 md:gap-8" data-nosnippet="">
          
          {/* ============================================
              MOBILE VIEW - Screens < 768px
              ============================================ */}
          <div className="mobile-footer-accordion md:hidden flex flex-col gap-2 w-full">
            {sections.map((section) => {
              const isExpanded = expandedSections[section.key];
              return (
                <div 
                  key={section.key} 
                  className="rounded-lg overflow-hidden"
                  style={{ backgroundColor: '#213743' }}
                >
                  {/* Section Title Button */}
                  <button
                    type="button"
                    onClick={() => toggleSection(section.key)}
                    className="w-full flex items-center justify-between py-4 px-4 text-white font-semibold text-base hover:opacity-90 transition-opacity"
                  >
                    <span>{section.title}</span>
                    <svg
                      fill="currentColor"
                      viewBox="0 0 64 64"
                      className={`w-4 h-4 ${isExpanded ? 'rotate-180' : ''}`}
                    >
                      <path d="M32.271 49.763 9.201 26.692l6.928-6.93 16.145 16.145 16.144-16.144 6.93 6.929-23.072 23.07z"></path>
                    </svg>
                  </button>
                  
                  {/* Expanded Content */}
                  {isExpanded && (
                    <div 
                      className="px-4 pb-4 border-t pt-2" 
                      style={{ borderColor: '#2f4553' }}
                    >
                      <ul className="flex flex-col gap-1.5">
                        {section.links.map((link) => (
                          <li key={link.label}>
                            {link.button ? (
                              <button
                                type="button"
                                className={`${mobileLinkClasses} intercom-a-go-go`}
                              >
                                <span>{link.label}</span>
                              </button>
                            ) : (
                              <Link
                                className={`${mobileLinkClasses} ${link.external ? 'gap-1' : ''}`}
                                href={link.href}
                                target={link.external ? "_blank" : undefined}
                                rel={link.external ? "external noreferrer noopener" : undefined}
                              >
                                <span>{link.label}</span>
                                {link.external && renderExternalIcon()}
                              </Link>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
            
            {/* Social Media Links - Mobile */}
            <div className="flex justify-center py-6">
              <ul className="flex gap-x-3 items-center justify-center">
                {socialLinks.map((social) => (
                  <li key={social.name} className="flex items-center justify-center group relative">
                    <a
                      className="icons-fonts inline-flex relative items-center justify-center rounded-sm font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-[#b1bad3] hover:bg-transparent hover:text-white focus-visible:text-white focus-visible:outline-hidden text-sm leading-none"
                      href={social.href}
                      target={social.href.startsWith("http") ? "_blank" : undefined}
                      rel={social.href.startsWith("http") ? "external noreferrer noopener" : undefined}
                    >
                      {renderSocialIcon(social.icon)}
                    </a>
                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-[#213743] rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      {social.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ============================================
              DESKTOP VIEW - Screens >= 768px (Table Layout)
              ============================================ */}
          <div className="hidden md:block w-full overflow-x-auto">
            <table className="w-full border-collapse">
              <tbody>
                <tr>
                  {/* Casino Column */}
                  <td className="align-top pr-4 pb-4">
                    <p className="weight-semibold line-height-default align-left size-base text-size-base variant-highlighted with-icon-space svelte-794yvu font-bold mb-2 text-white">
                      Casino
                    </p>
                    <ul className="flex flex-col gap-1.5 items-start">
                      {casinoLinks.map((link) => (
                        <li key={link.label}>
                          <Link
                            className={`${desktopLinkClasses} ${link.external ? 'gap-1' : ''}`}
                            href={link.href}
                            target={link.external ? "_blank" : undefined}
                            rel={link.external ? "external noreferrer noopener" : undefined}
                          >
                            <span>{link.label}</span>
                            {link.external && renderExternalIcon()}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </td>

                  {/* Sports Column */}
                  <td className="align-top pr-4 pb-4">
                    <p className="weight-semibold line-height-default align-left size-base text-size-base variant-highlighted with-icon-space svelte-794yvu font-bold mb-2 text-white">
                      Sports
                    </p>
                    <ul className="flex flex-col gap-1.5 items-start">
                      {sportsLinks.map((link) => (
                        <li key={link.label}>
                          <Link
                            className={desktopLinkClasses}
                            href={link.href}
                            data-sveltekit-reload="off"
                            data-sveltekit-preload-data="off"
                            data-sveltekit-noscroll="off"
                          >
                            <span>{link.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </td>

                  {/* Support Column */}
                  <td className="align-top pr-4 pb-4">
                    <p className="weight-semibold line-height-default align-left size-base text-size-base variant-highlighted with-icon-space svelte-794yvu font-bold mb-2 text-white">
                      Support
                    </p>
                    <ul className="flex flex-col gap-1.5 items-start">
                      {supportLinks.map((link) => (
                        <li key={link.label}>
                          {link.button ? (
                            <button
                              type="button"
                              className={`${desktopLinkClasses} intercom-a-go-go`}
                            >
                              <span>{link.label}</span>
                            </button>
                          ) : (
                            <Link
                              className={`${desktopLinkClasses} ${link.external ? 'gap-1' : ''}`}
                              href={link.href}
                              target={link.external ? "_blank" : undefined}
                              rel={link.external ? "external noreferrer noopener" : undefined}
                            >
                              <span>{link.label}</span>
                              {link.external && renderExternalIcon()}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </td>

                  {/* About Us Column */}
                  <td className="align-top pr-4 pb-4">
                    <p className="weight-semibold line-height-default align-left size-base text-size-base variant-highlighted with-icon-space svelte-794yvu font-bold mb-2 text-white">
                      About Us
                    </p>
                    <ul className="flex flex-col gap-1.5 items-start">
                      {aboutLinks.map((link) => (
                        <li key={link.label}>
                          <Link
                            className={desktopLinkClasses}
                            href={link.href}
                            data-sveltekit-reload="off"
                            data-sveltekit-preload-data="off"
                            data-sveltekit-noscroll="off"
                          >
                            <span>{link.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </td>

                  {/* Payment Info Column */}
                  <td className="align-top pr-4 pb-4">
                    <p className="weight-semibold line-height-default align-left size-base text-size-base variant-highlighted with-icon-space svelte-794yvu font-bold mb-2 text-white">
                      Payment Info
                    </p>
                    <ul className="flex flex-col gap-1.5 items-start">
                      {paymentLinks.map((link) => (
                        <li key={link.label}>
                          <Link
                            className={desktopLinkClasses}
                            href={link.href}
                            data-sveltekit-reload="off"
                            data-sveltekit-preload-data="off"
                            data-sveltekit-noscroll="off"
                          >
                            <span>{link.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </td>

                  {/* FAQ Column */}
                  <td className="align-top pb-4">
                    <p className="weight-semibold line-height-default align-left size-base text-size-base variant-highlighted with-icon-space svelte-794yvu font-bold mb-2 text-white">
                      FAQ
                    </p>
                    <ul className="flex flex-col gap-1.5 items-start">
                      {faqLinks.map((link) => (
                        <li key={link.label}>
                          <Link
                            className={desktopLinkClasses}
                            href={link.href}
                            data-sveltekit-reload="off"
                            data-sveltekit-preload-data="off"
                            data-sveltekit-noscroll="off"
                          >
                            <span>{link.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* ============================================
              SHARED ELEMENTS - Both Mobile & Desktop
              ============================================ */}
          
          {/* Social Media Links - Desktop (centered) */}
          <div className="hidden md:flex justify-center">
            <ul className="flex gap-x-3 items-center justify-center">
              {socialLinks.map((social) => (
                <li key={social.name} className="flex items-center justify-center group relative">
                  <a
                    className="icons-fonts inline-flex relative items-center justify-center rounded-sm font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-[#b1bad3] hover:bg-transparent hover:text-white focus-visible:text-white focus-visible:outline-hidden text-sm leading-none"
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "external noreferrer noopener" : undefined}
                    data-sveltekit-reload="off"
                    data-sveltekit-preload-data="off"
                    data-sveltekit-noscroll={social.href.startsWith("http") ? "" : "off"}
                  >
                    {renderSocialIcon(social.icon)}
                  </a>
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-[#213743] rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    {social.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Divider */}
          <div className="border-solid border-t-2 border-t-grey-500"></div>
          
          {/* Copyright Text */}
          <div className="flex justify-center text-center">
            <span className="weight-normal line-height-default size-default text-base variant-subtle with-icon-space svelte-794yvu">
              © 2025 Stake.com | All Rights Reserved.
            </span>
          </div>
          
          {/* Legal Text */}
          <div className="flex justify-center text-center">
            <span className="weight-normal line-height-default size-default text-base variant-subtle with-icon-space svelte-794yvu">
              Stake is owned and operated by Medium Rare N.V., registration number: 145353, registered address: Seru Loraweg 17 B, Curaçao. Payment agent companies are Medium Rare Limited and MRS Tech Limited. Contact us at support@stake.com.
            </span>
          </div>
          
          {/* Responsible Gambling Text */}
          <div className="flex justify-center text-center">
            <span className="weight-normal line-height-default size-default text-base variant-subtle with-icon-space svelte-794yvu">
              Stake is committed to responsible gambling,&nbsp;for more information visit&nbsp;
              <a
                href="https://gamblingtherapy.org/"
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Gamblingtherapy.org
              </a>
            </span>
          </div>
          
          {/* Exchange Rate, Language Selector, and Stake Logo - Centered with equal spacing */}
          <div className="flex flex-col items-center justify-center gap-8">
            {/* USDT Exchange Rate */}
            <div className="flex items-center justify-center">
              <p className="text-sm text-white whitespace-nowrap">
                1 USDT = $1.00
              </p>
            </div>
            
            {/* Language Selector */}
            <div className="dropdown flex items-center justify-center py-8">
              <button
                type="button"
                className="inline-flex relative items-center gap-2 font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] text-white focus-visible:outline-white text-sm leading-none shadow-md justify-between"
                style={{
                  backgroundColor: "#213743",
                  width: "120px",
                  height: "44px",
                  borderRadius: "8px",
                  padding: "0 1.25rem"
                }}
                aria-label="Open Language Dropdown"
                onMouseOver={e => e.currentTarget.style.backgroundColor = "#557086"}
                onMouseOut={e => e.currentTarget.style.backgroundColor = "#213743"}
              >
                <span>English</span>
                <svg fill="currentColor" viewBox="0 0 64 64" className="svg-icon w-4 h-4" style={{ transform: "rotate(0deg)" }}>
                  <path d="M32.271 49.763 9.201 26.692l6.928-6.93 16.145 16.145 16.144-16.144 6.93 6.929-23.072 23.07z"></path>
                </svg>
              </button>
            </div>
            
            {/* Stake Logo and GCB Certification */}
            <div className="flex flex-col gap-6 items-center justify-center">
            {/* Stake Logo */}
            <div className="image-focus flex justify-center">
              <a href="https://stake.com/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 396.11 197.92"
                  width="80"
                  height="40"
                  className="text-white"
                  style={{ width: "80px", height: "40px" }}
                >
                  <g id="Layer_5" data-name="Layer 5">
                    <path fill="currentColor" d="M25.68,56.89c-.1-26.47,16.84-41.15,47.94-41.26C96,15.55,100,30.19,100,35.51c0,10.19-14.42,21-14.42,21s.8,6.35,13.18,6.3,24.44-8.22,24.37-28.67C123.07,10.65,98.46-.09,74.13,0,53.78.07-.19,2.93,0,56.51c.18,47.59,90,51.79,90.07,82.26.12,33.09-37,42-49.56,42S22.84,171.88,22.82,167c-.09-26.8,26.58-34.26,26.58-34.26,0-2-1.56-10.91-11.89-10.87C10.9,121.92.3,144.8.38,167.14c.07,19,13.5,30.86,33.78,30.78,38.78-.14,82.51-19.06,82.35-61.08C116.37,97.54,25.79,87.28,25.68,56.89Z"></path>
                    <path fill="currentColor" d="M395.37,162.18c-.31-.75-1.18-.57-2.33.38-4.4,3.63-14.46,13.91-38,14-42.92.16-50.37-70.58-50.37-70.58s32.71-24.42,37.82-34.27-11.15-12-11.15-12-22.88,27.84-39.1,36C294,83.6,306,56,306.69,40.13s-19.11-12-22.27-10.48c0,6.93-17.49,69.84-23.86,104.42-3.75,6-9.11,12.86-13.91,12.87-2.78,0-3.8-5.15-3.83-12.53,0-10.24,5.64-26.65,5.6-36.62,0-6.9-3.17-7.31-5.9-7.3-.59,0-3.87.09-4.47.09-7,0-4.7-6-11-5.94-19.28.07-43.84,21.12-44.91,52.89-6.51,4.31-15.62,9.74-20.27,9.76-4.88,0-6.09-4.51-6.1-8.41,0-6.85,11.08-47.55,11.08-47.55s14.11-3.62,20.27-4.81c4.66-.91,6-1.25,7.81-3.5s5.35-6.9,8.21-11.08.05-7.41-5.24-7.39c-6.94,0-25.51,4.4-25.51,4.4s8.92-38.46,8.91-39.24-1-1.19-2.51-1.18c-3.38,0-9.41,1.82-13.27,3.2-5.91,2.11-10.72,9.35-11.69,12.72s-7.65,29.76-7.65,29.76-35.77,12.35-40.66,14.2a.74.74,0,0,0-.5.7c0,.32,4.09,16,12.48,15.94,6,0,23.63-7.22,23.63-7.22s-9.06,36-9,48c0,7.7,3.63,16.72,18.67,16.67,14,0,26.25-7.23,33.11-12.26,3.75,9.49,12.61,12.09,18.66,12.07,13.56,0,24-10.82,25.34-12.27,1.76,4.16,5.91,12.15,15.39,12.12,5.36,0,10.91-6,15-11.82a23.38,23.38,0,0,0,.05,3.63c1.64,14.92,23.79,6.15,25,4.07.75-10.79.28-32.85,4.59-46.47,5.72,46.46,27.42,77.71,66.43,77.57,21.81-.08,33-6.35,37.63-11.52A15.9,15.9,0,0,0,395.37,162.18ZM208.2,146.86c-18.73.07,5.73-48.48,21.71-48.54C229.93,104.58,229.58,146.79,208.2,146.86Z"></path>
                    <path fill="currentColor" d="M360.26,161.74c16.91-.06,30-11.19,32.4-14.81,3.1-4.71-3.6-11.82-5.73-11.7-5.34,5.11-10.92,11.29-23.45,11.33-14.75.06-11.41-16.17-11.41-16.17s28.39,3.67,39.8-16.74c3.65-6.53,3.8-15.56,2.33-19.45s-9.73-11.09-22.87-10c-16.14,1.36-36.48,18.19-40.95,38.4C326.79,138.86,333.58,161.84,360.26,161.74Zm18-68.1c2.66-.09,2.42,4.29,1.71,8.87-1,6.21-9.53,22-25.81,21.38C355.29,114.7,367.4,94,378.29,93.64Z"></path>
                  </g>
                </svg>
              </a>
            </div>

            {/* GCB Certification Badge */}
            <div className="seal flex items-center justify-center mt-3">
              <a 
                href="https://cert.gcb.cw/certificate?id=ZXlKcGRpSTZJbkJtT0dKb04zWTRhbmc1VERsd1RXTTRRMjVHZDNjOVBTSXNJblpoYkhWbElqb2lSVEJwU2t0emJYSm9LMUkzYm04NVVqSkZRMnRxZHowOUlpd2liV0ZqSWpvaVpEWm1NV0kwT1dNeE9XVmpaVFkyTnpFd01HVmpPV1V4WmpWaU5qRm1NVEprWXpjd05tTTJaamczWkdNM1pHSXdaVEl6T1RFeVlUSXlOell6TnpJNVpTSXNJblJoWnlJNklpSjk="
                target="_blank"
                rel="noopener noreferrer"
                className="block"
                style={{ borderRadius: "0.5rem", overflow: "hidden" }}
              >
                <img 
                  alt="GCB Certification" 
                  src="https://stake.com/_app/immutable/assets/seal.Dfnd6-1N.svg"
                  className="h-16 w-auto rounded-xl"
                  style={{ borderRadius: "0.5rem" }}
                  onError={(e) => {
                    // Fallback to external URL if local file doesn't exist
                    e.target.src = "https://seal.cgcb.info/1c0246df-1aa7-485a-a24c-21ae5e730000";
                  }}
                />
              </a>
            </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
