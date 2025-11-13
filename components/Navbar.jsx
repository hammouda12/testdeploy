"use client";

import { useModal } from "../contexts/ModalContext";

export default function Navbar() {
  const { openWalletModal } = useModal();
  return (
    <>
      <style>{`
        .navbar-container {
          width: 100%;
          z-index: 100;
          background: rgb(26, 44, 56);
          display: flex;
          flex-direction: column;
          box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 6px -1px, rgba(0, 0, 0, 0.1) 0px 2px 4px -1px;
          position: sticky;
          top: 0;
          height: 60px;
        }
        .navbar-inner {
          margin: 0;
          width: 100%;
          height: 100%;
          padding: 0 3vw;
        }
        .navbar-grid {
          display: grid;
          grid-template-columns: minmax(26px, 1fr) minmax(min-content, max-content) minmax(min-content, 1fr);
          gap: 8px;
          align-items: center;
          height: 100%;
          width: 100%;
        }
        .navbar-left {
          display: flex;
          align-items: center;
          justify-self: start;
        }
        .navbar-center {
          display: flex;
          align-items: center;
          justify-content: center;
          justify-self: center;
        }
        .navbar-right {
          display: flex;
          align-items: center;
          gap: 8px;
          justify-self: end;
        }
        .logo-link {
          font-family: var(--ds-font-family-default, "proxima-nova", ui-sans-serif, -apple-system, system-ui, sans-serif);
          font-variant-numeric: var(--ds-font-variant-numeric, lining-nums tabular-nums);
          font-feature-settings: var(--ds-font-feature-settings, "salt" on);
          display: inline-flex;
          position: relative;
          align-items: center;
          gap: 8px;
          justify-content: center;
          border-radius: 0.25rem;
          font-weight: var(--ds-font-weight-thick, 600);
          white-space: nowrap;
          transition: all 0.2s;
          text-decoration: none;
          background: transparent;
          color: white;
          font-size: 0.875rem;
          border: none;
          cursor: pointer;
        }
        .logo-link:hover {
          background: transparent;
          color: white;
        }
        .logo-link:active {
          transform: scale(0.98);
        }
        .logo-link:focus-visible {
          outline: 2px solid transparent;
          outline-offset: 2px;
        }
        .logo-wrapper {
          display: flex;
          align-items: center;
          position: relative;
          width: fit-content;
          height: 2rem;
          z-index: 1;
        }
        .logo-wrapper svg {
          display: block;
          flex-shrink: 0;
        }
        .logo-wrapper svg:first-of-type {
          height: 2rem;
          width: auto;
          max-width: 200px;
          display: block;
        }
        .logo-wrapper svg:last-of-type {
          display: none;
          height: 1.75rem;
          width: auto;
          max-width: 32px;
        }
        .balance-toggle-container {
          display: flex;
          align-items: center;
          gap: 0;
        }
        .currency-button {
          font-family: var(--ds-font-family-default, "proxima-nova", ui-sans-serif, -apple-system, system-ui, sans-serif);
          font-variant-numeric: var(--ds-font-variant-numeric, lining-nums tabular-nums);
          font-feature-settings: var(--ds-font-feature-settings, "salt" on);
          display: inline-flex;
          position: relative;
          align-items: center;
          gap: 8px;
          justify-content: center;
          font-weight: var(--ds-font-weight-thick, 600);
          white-space: nowrap;
          transition: all 0.2s;
          border: none;
          cursor: pointer;
          background: rgb(15, 33, 46);
          color: white;
          font-size: 1rem;
          padding: 0.75rem 20px;
          border-radius: 8px 0 0 8px;
          height: 48px;
          line-height: 24px;
          max-width: 100%;
        }
        .currency-button:hover {
          background: rgb(9, 20, 28);
          color: white;
        }
        .currency-button:active {
          transform: scale(0.98);
        }
        .currency-button:focus-visible {
          outline: 2px solid white;
          outline-offset: 2px;
        }
        .wallet-button {
          font-family: var(--ds-font-family-default, "proxima-nova", ui-sans-serif, -apple-system, system-ui, sans-serif);
          font-variant-numeric: var(--ds-font-variant-numeric, lining-nums tabular-nums);
          font-feature-settings: var(--ds-font-feature-settings, "salt" on);
          display: inline-flex;
          position: relative;
          align-items: center;
          gap: 8px;
          justify-content: center;
          font-weight: var(--ds-font-weight-thick, 600);
          white-space: nowrap;
          transition: all 0.2s;
          border: none;
          cursor: pointer;
          background: rgb(20, 117, 225);
          color: white;
          font-size: 1rem;
          padding: 0.75rem;
          border-radius: 0 8px 8px 0;
          height: 48px;
          line-height: 24px;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.1) 0px 2px 4px -2px;
        }
        .wallet-button:hover {
          background: rgb(16, 94, 180);
          color: white;
        }
        .wallet-button:active {
          transform: scale(0.98);
        }
        .wallet-button:focus-visible {
          outline: 2px solid white;
          outline-offset: 2px;
        }
        .wallet-text {
          display: none;
        }
        .wallet-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .icon-button {
          font-family: var(--ds-font-family-default, "proxima-nova", ui-sans-serif, -apple-system, system-ui, sans-serif);
          font-variant-numeric: var(--ds-font-variant-numeric, lining-nums tabular-nums);
          font-feature-settings: var(--ds-font-feature-settings, "salt" on);
          display: inline-flex;
          position: relative;
          align-items: center;
          gap: 8px;
          justify-content: center;
          font-weight: var(--ds-font-weight-thick, 600);
          white-space: nowrap;
          transition: all 0.2s;
          border: none;
          cursor: pointer;
          background: transparent;
          color: white;
          border-radius: 0.25rem;
          padding: 0.75rem;
        }
        .icon-button:hover {
          background: transparent;
          color: white;
        }
        .icon-button:active {
          transform: scale(0.98);
        }
        .icon-button:focus-visible {
          outline: 2px solid transparent;
          outline-offset: 2px;
        }
        .icon-button-search {
          font-size: 0.75rem;
        }
        .icon-button-profile {
          font-size: 0.875rem;
          display: none;
        }
        .icon-button-notification {
          font-size: 0.875rem;
          padding: 12px;
        }
        .currency-content {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          max-width: 100%;
        }
        .currency-bonus {
          display: inherit;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 16ch;
        }
        .currency-info {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 3px;
          margin-left: 4px;
        }
        @media (max-width: 768px) {
          .navbar-inner {
            padding: 0 3vw;
          }
          .logo-wrapper {
            height: 40px;
            z-index: 1;
          }
          .logo-wrapper svg:first-of-type {
            display: none;
          }
          .logo-wrapper svg:last-of-type {
            display: block;
            width: auto;
            height: 40px;
            max-width: none;
          }
          .navbar-left {
            justify-self: start;
            align-items: center;
          }
          .icon-button-search {
            display: none;
          }
          .icon-button-profile {
            display: inline-flex !important;
          }
          .sidebar-toggle-container {
            display: none !important;
          }
        }
        @media (min-width: 769px) {
          .logo-wrapper svg:first-of-type {
            display: block;
          }
          .logo-wrapper svg:last-of-type {
            display: none;
          }
          .icon-button-search {
            display: inline-flex;
          }
          .icon-button-profile {
            display: inline-flex;
          }
          .sidebar-toggle-container {
            display: flex;
          }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .logo-wrapper {
            height: 1.875rem;
          }
          .logo-wrapper svg:first-of-type {
            height: 1.875rem;
          }
        }
      `}</style>
      <div data-layout="" className="navbar-container">
        <div className="navbar-inner">
          <div className="navbar-grid" id="navigation-container-header">
            {/* Left: Logo */}
            <div className="navbar-left">
              <div>
                <a
                  data-testid="home-button"
                  className="logo-link"
                  href="/"
                  aria-label="Home"
                >
                  <div className="logo-wrapper" data-content="">
                    <StakeLogoDesktop />
                    <StakeLogoMobile />
                  </div>
                </a>
              </div>
            </div>

            {/* Center: Currency Toggle + Wallet */}
            <div className="navbar-center" id="openModalBtn">
              <div className="balance-toggle-container" data-testid="balance-toggle">
                <button
                  type="button"
                  tabIndex={0}
                  className="currency-button"
                  aria-label="Open Dropdown"
                  data-testid="coin-toggle"
                  data-active-currency="usdt"
                  onClick={openWalletModal}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", maxWidth: "100%", overflow: "hidden" }}>
                    <span className="currency-content">
                      <span className="currency-info">
                        <USDTIcon />
                        <span>USDT</span>
                      </span>
                    </span>
                  </div>
                  <span style={{ display: "inline-flex", alignItems: "center" }}>
                    <ChevronDownIcon />
                  </span>
                </button>
                <button
                  type="button"
                  tabIndex={0}
                  id="navbar-wallet-btn-1"
                  className="wallet-button"
                  data-testid="wallet"
                  data-analytics="global-navbar-wallet-button"
                  onClick={openWalletModal}
                >
                  <span className="wallet-text">Wallet</span>
                  <span className="wallet-icon">
                    <WalletIcon />
                  </span>
                </button>
              </div>
            </div>

            {/* Right: Search, Profile, Notifications, SidebarToggle */}
            <div className="navbar-right">
              <button
                type="button"
                tabIndex={0}
                className="icon-button icon-button-search"
                id="currencyPopup1"
                aria-label="Search"
                onClick={openWalletModal}
              >
                <SearchIcon />
              </button>

              <div style={{ display: "flex" }}>
                <button
                  type="button"
                  tabIndex={0}
                  id="currencyPopup2"
                  className="icon-button icon-button-profile"
                  data-testid="user-dropdown-toggle"
                  data-analytics="global-navbar-user-icon"
                  aria-label="Open Dropdown"
                  onClick={openWalletModal}
                >
                  <PersonIcon />
                </button>
              </div>

              <button
                type="button"
                tabIndex={0}
                className="icon-button icon-button-notification"
                id="notifications-nav-button"
                aria-label="Toggle Notifications Widget"
                onClick={openWalletModal}
              >
                <NotificationOnIcon />
              </button>

              <div className="sidebar-toggle-container">
                <button
                  type="button"
                  tabIndex={0}
                  className="icon-button icon-button-notification"
                  aria-label="Open Dropdown"
                  id="currencyPopup4"
                  onClick={openWalletModal}
                >
                  <SidebarToggleIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function StakeLogoDesktop() {
  return (
    <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200" className="svelte-nu4xlf" style={{ height: "2rem", color: "currentColor" }}>
      <g id="Layer_5">
        <path fill="currentColor" d="M31.47,58.5c-.1-25.81,16.42-40.13,46.75-40.23,21.82-.08,25.72,14.2,25.72,19.39,0,9.94-14.06,20.48-14.06,20.48,0,0,.78,6.19,12.85,6.14,12.07-.05,23.83-8.02,23.76-27.96-.06-22.91-24.06-33.38-47.78-33.29C58.87,3.09,6.24,5.88,6.42,58.13c.18,46.41,87.76,50.5,87.83,80.21.12,32.27-36.08,40.96-48.33,40.96s-17.23-8.67-17.25-13.43c-.09-26.13,25.92-33.41,25.92-33.41,0-1.95-1.52-10.64-11.59-10.6-25.95.05-36.28,22.36-36.21,44.14.07,18.53,13.16,30.09,32.94,30.01,37.82-.14,80.46-18.59,80.3-59.56-.14-38.32-88.46-48.33-88.57-77.96Z"></path>
        <path fill="currentColor" d="M391.96,161.17c-.3-.73-1.15-.56-2.27.37-4.29,3.54-14.1,13.56-37.06,13.65-41.85.16-49.12-68.83-49.12-68.83,0,0,31.9-23.81,36.88-33.42,4.98-9.61-10.87-11.7-10.87-11.7,0,0-22.31,27.15-38.13,35.1,1.72-11.81,13.42-38.72,14.09-54.2.67-15.48-18.63-11.7-21.72-10.22,0,6.76-17.06,68.1-23.27,101.82-3.66,5.85-8.88,12.54-13.56,12.55-2.71,0-3.71-5.02-3.73-12.22,0-9.99,5.5-25.99,5.46-35.71,0-6.73-3.09-7.13-5.75-7.12-.58,0-3.77.09-4.36.09-6.83,0-4.58-5.85-10.73-5.79-18.8.07-42.75,20.59-43.79,51.57-6.35,4.2-15.23,9.5-19.77,9.52-4.76,0-5.94-4.4-5.95-8.2,0-6.68,10.8-46.37,10.8-46.37,0,0,13.76-3.53,19.77-4.69,4.54-.89,5.85-1.22,7.62-3.41s5.22-6.73,8.01-10.8c2.79-4.08.05-7.23-5.11-7.21-6.77,0-24.88,4.29-24.88,4.29,0,0,8.7-37.5,8.69-38.26s-.98-1.16-2.45-1.15c-3.3,0-9.18,1.77-12.94,3.12-5.76,2.06-10.45,9.12-11.4,12.4s-7.46,29.02-7.46,29.02c0,0-34.88,12.04-39.65,13.85-.29.1-.49.37-.49.68s3.99,15.6,12.17,15.54c5.85,0,23.04-7.04,23.04-7.04,0,0-8.83,35.1-8.78,46.81,0,7.51,3.54,16.3,18.21,16.26,13.65,0,25.6-7.05,32.29-11.96,3.66,9.25,12.3,11.79,18.2,11.77,13.22,0,23.4-10.55,24.71-11.96,1.72,4.06,5.76,11.85,15.01,11.82,5.23,0,10.64-5.85,14.63-11.53-.08,1.18-.06,2.36.05,3.54,1.6,14.55,23.2,6,24.38,3.97.73-10.52.27-32.03,4.48-45.31,5.58,45.3,26.74,75.78,64.78,75.64,21.27-.08,32.18-6.19,36.69-11.23,3.69-4.08,4.94-9.81,3.29-15.06ZM209.45,146.23c-18.26.07,5.59-47.27,21.17-47.33.02,6.1-.32,47.26-21.17,47.33Z"></path>
        <path fill="currentColor" d="M357.73,160.74c16.49-.06,29.25-10.91,31.59-14.44,3.02-4.59-3.51-11.53-5.59-11.41-5.21,4.98-10.65,11.01-22.87,11.05-14.38.06-11.13-15.77-11.13-15.77,0,0,27.68,3.58,38.81-16.32,3.56-6.37,3.71-15.17,2.27-18.97s-9.49-10.81-22.3-9.75c-15.74,1.33-35.57,17.74-39.93,37.45-3.5,15.86,3.12,38.26,29.14,38.17ZM375.28,94.33c2.59-.09,2.36,4.18,1.67,8.65-.98,6.06-9.29,21.45-25.17,20.85,1.1-8.96,12.91-29.15,23.53-29.5h-.03Z"></path>
      </g>
    </svg>
  );
}

function StakeLogoMobile() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130 200" className="svelte-nu4xlf" style={{ color: "currentColor" }}>
      <title>Logo</title>
      <path
        fill="currentColor"
        d="M31.47,58.5c-.1-25.81,16.42-40.13,46.75-40.23,21.82-.08,25.72,14.2,25.72,19.39,0,9.94-14.06,20.48-14.06,20.48,0,0,.78,6.19,12.85,6.14,12.07-.05,23.83-8.02,23.76-27.96-.06-22.91-24.06-33.38-47.78-33.29C58.87,3.09,6.24,5.88,6.42,58.13c.18,46.41,87.76,50.5,87.83,80.21.12,32.27-36.08,40.96-48.33,40.96s-17.23-8.67-17.25-13.43c-.09-26.13,25.92-33.41,25.92-33.41,0-1.95-1.52-10.64-11.59-10.6-25.95.05-36.28,22.36-36.21,44.14.07,18.53,13.16,30.09,32.94,30.01,37.82-.14,80.46-18.59,80.3-59.56-.14-38.32-88.46-48.33-88.57-77.96Z"
      />
    </svg>
  );
}

function USDTIcon() {
  return (
    <svg data-ds-icon="USDT" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" className="inline-block shrink-0">
      <path fill="#26A17B" d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11" />
      <path
        fill="#fff"
        d="M13.322 12.95c-.076.005-.466.028-1.336.028-.694 0-1.183-.02-1.355-.029v.002c-2.673-.117-4.668-.583-4.668-1.14s1.995-1.021 4.668-1.14v1.817c.175.013.675.042 1.367.042.83 0 1.246-.034 1.324-.041v-1.817c2.667.119 4.657.584 4.657 1.14s-1.99 1.02-4.657 1.139m0-2.467V8.856h3.722v-2.48H6.909v2.48h3.722v1.626c-3.025.139-5.3.738-5.3 1.456s2.275 1.317 5.3 1.456v5.213h2.69v-5.214c3.02-.139 5.29-.738 5.29-1.455s-2.27-1.316-5.29-1.455"
      />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg data-ds-icon="ChevronDown" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" style={{ transform: "rotate(0deg)" }} className="inline-block shrink-0">
      <path fill="currentColor" d="M17.293 8.293a1 1 0 1 1 1.414 1.414l-6 6a1 1 0 0 1-1.414 0l-6-6-.068-.076A1 1 0 0 1 6.63 8.225l.076.068L12 13.586z" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg data-ds-icon="Search" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" className="inline-block shrink-0">
      <path
        fill="currentColor"
        d="m22.71 21.29-4.82-4.82a9.47 9.47 0 0 0 2.12-5.97c0-5.25-4.25-9.5-9.5-9.5S1 5.25 1 10.5 5.25 20 10.5 20c2.26 0 4.34-.79 5.97-2.12l4.82 4.82c.2.2.45.29.71.29s.51-.1.71-.29a.996.996 0 0 0 0-1.41M3 10.5C3 6.36 6.36 3 10.5 3S18 6.36 18 10.5 14.64 18 10.5 18 3 14.64 3 10.5"
      />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg data-ds-icon="Person" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" className="inline-block shrink-0">
      <path fill="currentColor" d="M12 11a5 5 0 1 0 0-10 5 5 0 0 0 0 10m-3 2h6c4.42 0 8 3.58 8 8 0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2 0-4.42 3.58-8 8-8" />
    </svg>
  );
}

function NotificationOnIcon() {
  return (
    <svg data-ds-icon="NotificationOn" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" className="inline-block shrink-0">
      <path
        fill="currentColor"
        d="M12 23c1.66 0 3-1.34 3-3H9c0 1.66 1.34 3 3 3m9-8h-1v-5c0-3.74-2.56-6.86-6.03-7.74.01-.08.03-.17.03-.26 0-1.1-.9-2-2-2s-2 .9-2 2c0 .09.01.17.03.26C6.57 3.14 4 6.27 4 10v5H3c-1.1 0-2 .9-2 2s.9 2 2 2h18c1.1 0 2-.9 2-2s-.9-2-2-2"
      />
    </svg>
  );
}

function SidebarToggleIcon() {
  return (
    <svg data-ds-icon="SidebarToggle" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" className="inline-block shrink-0">
      <path fill="currentColor" d="M21 1H3c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2m-8 18.78c0 .67-.55 1.22-1.22 1.22H4.22C3.55 21 3 20.45 3 19.78V4.22C3 3.55 3.55 3 4.22 3h7.56c.67 0 1.22.55 1.22 1.22z" />
    </svg>
  );
}

function WalletIcon() {
  return (
    <svg data-ds-icon="Wallet" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" className="inline-block shrink-0">
      <path fill="currentColor" d="M21 6h-4c0 .71-.16 1.39-.43 2H20c.55 0 1 .45 1 1s-.45 1-1 1H4c-.55 0-1-.45-1-1s.45-1 1-1h3.43C7.16 7.39 7 6.71 7 6H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2m-2 11c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2"></path>
      <path fill="currentColor" d="M9.38 9h5.24C15.46 8.27 16 7.2 16 6c0-2.21-1.79-4-4-4S8 3.79 8 6c0 1.2.54 2.27 1.38 3"></path>
    </svg>
  );
}
