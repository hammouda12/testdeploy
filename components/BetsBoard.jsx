"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { fetchBets } from "../services/betsService";

// Currency Icon Component (matching WalletModal)
const CurrencyIcon = ({ code, className = "inline-block shrink-0", style, size = 20 }) => {
  const icons = {
    BTC: (
      <svg data-ds-icon="BTC" width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" className={className} style={style}>
        <path fill="#F7931A" d="M22.974 12.026C22.974 18.086 18.06 23 12 23S1.026 18.087 1.026 12.026C1.026 5.966 5.94 1.052 12 1.052s10.974 4.914 10.974 10.974"></path>
        <path fill="#fff" d="M16.932 10.669c.213-1.437-.88-2.21-2.378-2.726l.484-1.948-1.182-.296-.481 1.897c-.313-.079-.633-.151-.949-.223l.481-1.9-1.185-.296-.485 1.945a31 31 0 0 1-.756-.179l-1.636-.409L8.532 7.8s.88.203.86.213a.633.633 0 0 1 .553.69V8.7l-.553 2.22q.071.018.13.04l-.007-.002-.123-.03-.777 3.093a.43.43 0 0 1-.546.28l.003.001-.863-.213-.588 1.351 1.544.381.845.22-.491 1.97 1.185.295.485-1.948q.483.129.945.244l-.485 1.941 1.186.296.488-1.966c2.024.382 3.544.227 4.183-1.601.515-1.471-.024-2.32-1.09-2.874.777-.165 1.358-.677 1.516-1.728m-2.712 3.797c-.364 1.475-2.842.688-3.646.478l.65-2.598c.804.189 3.381.588 2.996 2.12m.368-3.818c-.344 1.34-2.406.657-3.066.492l.591-2.365c.667.165 2.822.478 2.475 1.873"></path>
      </svg>
    ),
    ETH: (
      <svg data-ds-icon="ETH" width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" className={className} style={style}>
        <path fill="#627EEA" d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11"></path>
        <path fill="#fff" d="M12.344 3.75v6.098l5.156 2.303zm0 0-5.156 8.401 5.156-2.303zm0 12.354v4.146l5.156-7.14zm0 4.146V16.1l-5.156-2.99z"></path>
        <path fill="#fff" d="m12.344 15.145 5.156-2.994-5.156-2.303zm-5.156-2.994 5.156 2.994V9.848z"></path>
      </svg>
    ),
    LTC: (
      <svg data-ds-icon="LTC" width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" className={className} style={style}>
        <path fill="#3C649B" d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11"></path>
        <path fill="#fff" d="m8.167 14.21-.98.382.475-1.905.99-.398L10.085 6.5h3.524l-1.031 4.26.969-.393-.468 1.89-.983.393-.58 2.406h5.297L16.21 17.5H7.359z"></path>
      </svg>
    ),
    USDT: (
      <svg data-ds-icon="USDT" width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" className={className} style={style}>
        <path fill="#26A17B" d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11"></path>
        <path fill="#fff" d="M13.322 12.95c-.076.005-.466.028-1.336.028-.694 0-1.183-.02-1.355-.029v.002c-2.673-.117-4.668-.583-4.668-1.14s1.995-1.021 4.668-1.14v1.817c.175.013.675.042 1.367.042.83 0 1.246-.034 1.324-.041v-1.817c2.667.119 4.657.584 4.657 1.14s-1.99 1.02-4.657 1.139m0-2.467V8.856h3.722v-2.48H6.909v2.48h3.722v1.626c-3.025.139-5.3.738-5.3 1.456s2.275 1.317 5.3 1.456v5.213h2.69v-5.214c3.02-.139 5.29-.738 5.29-1.455s-2.27-1.316-5.29-1.455"></path>
      </svg>
    ),
    SOL: (
      <svg data-ds-icon="SOL" width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" className={className} style={style}>
        <defs><linearGradient id="sol-gradient-unique" x1="6.457" x2="17.589" y1="17.459" y2="6.621" gradientUnits="userSpaceOnUse"><stop stopColor="#CF41E8"></stop><stop offset="1" stopColor="#10F2B0"></stop></linearGradient></defs>
        <path fill="#fff" d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11"></path>
        <path fill="url(#sol-gradient-unique)" d="M16.566 9.26a.3.3 0 0 1-.13.09.4.4 0 0 1-.158.032H6.088c-.36 0-.545-.45-.293-.72L7.47 6.885a.4.4 0 0 1 .135-.095.4.4 0 0 1 .157-.031h10.231c.364 0 .544.454.288.724zm0 7.945a.4.4 0 0 1-.288.122H6.088c-.36 0-.545-.441-.293-.702l1.674-1.737a.34.34 0 0 1 .135-.09.4.4 0 0 1 .157-.031h10.231c.364 0 .544.445.288.706zm0-6.32a.4.4 0 0 0-.288-.122H6.088c-.36 0-.545.44-.293.702L7.47 13.2a.34.34 0 0 0 .135.09q.075.033.157.032h10.231c.364 0 .544-.446.288-.707z"></path>
      </svg>
    ),
    BNB: (
      <svg data-ds-icon="BNB" width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" className={className} style={style}>
        <path fill="#F0B90B" fillRule="evenodd" d="M12 1c6.076 0 11 4.924 11 11s-4.924 11-11 11S1 18.076 1 12 5.924 1 12 1" clipRule="evenodd"></path>
        <path fill="#fff" d="m7.046 12 .008 2.909 2.471 1.454v1.703l-3.918-2.298v-4.619zm0-2.909v1.695l-1.44-.851V8.24l1.44-.852 1.446.852zm3.511-.851 1.44-.852 1.446.852-1.447.851z"></path>
        <path fill="#fff" d="M8.086 14.306v-1.703l1.439.851v1.695zm2.471 2.667 1.44.851 1.446-.851v1.695l-1.447.851-1.439-.851zm4.95-8.733 1.44-.852 1.446.852v1.695l-1.447.851V9.091zm1.44 6.669L16.954 12l1.44-.851v4.618l-3.918 2.298v-1.703z"></path>
        <path fill="#fff" d="m15.914 14.306-1.439.843v-1.695l1.44-.851z"></path>
        <path fill="#fff" d="m15.914 9.694.008 1.703-2.478 1.454v2.916l-1.44.844-1.439-.844v-2.916l-2.478-1.454V9.694l1.445-.851 2.464 1.461 2.478-1.461 1.447.851zM8.086 6.786l3.91-2.305 3.918 2.305-1.439.852-2.479-1.461-2.471 1.46z"></path>
      </svg>
    ),
    USDC: (
      <svg data-ds-icon="USDC" width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" className={className} style={style}>
        <path fill="#0F97F8" d="M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11"></path>
        <path fill="#fff" d="M9.654 20.7c0 .293-.239.457-.514.375a9.39 9.39 0 0 1-6.545-8.965A9.38 9.38 0 0 1 9.14 3.154c.284-.091.514.083.514.376v.733c0 .193-.147.422-.33.486-3.007 1.11-5.152 3.997-5.152 7.361a7.84 7.84 0 0 0 5.152 7.352c.183.064.33.293.33.486z"></path>
        <path fill="#fff" d="M12.78 17.986c0 .22-.175.394-.395.394h-.78a.39.39 0 0 1-.393-.394v-1.238c-1.714-.238-2.549-1.182-2.769-2.493a.362.362 0 0 1 .367-.422h.89a.41.41 0 0 1 .384.312c.165.77.614 1.375 1.99 1.375 1.008 0 1.732-.568 1.732-1.412 0-.843-.422-1.164-1.907-1.411-2.19-.294-3.236-.963-3.236-2.677 0-1.32 1.009-2.365 2.558-2.576v-1.21c0-.22.174-.394.394-.394h.78a.39.39 0 0 1 .393.394v1.247c1.265.229 2.063.944 2.329 2.136.046.229-.129.43-.367.43h-.825a.4.4 0 0 1-.376-.284c-.229-.751-.76-1.09-1.705-1.09-1.036 0-1.576.495-1.576 1.2 0 .743.302 1.119 1.897 1.339 2.154.293 3.273.907 3.273 2.74 0 1.394-1.036 2.521-2.659 2.769v1.256h-.009z"></path>
        <path fill="#fff" d="M14.86 21.075c-.284.092-.513-.082-.513-.376v-.733a.5.5 0 0 1 .33-.486c2.997-1.1 5.151-3.988 5.151-7.352a7.84 7.84 0 0 0-5.151-7.351c-.184-.064-.33-.294-.33-.486v-.734c0-.293.238-.458.513-.375a9.36 9.36 0 0 1 6.545 8.946 9.41 9.41 0 0 1-6.545 8.965z"></path>
      </svg>
    ),
    XRP: (
      <svg data-ds-icon="XRP" width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" className={className} style={style}>
        <path fill="#5E5E5E" d="M22.974 12.026C22.974 18.086 18.06 23 12 23S1.026 18.087 1.026 12.026C1.026 5.966 5.94 1.052 12 1.052s10.974 4.914 10.974 10.974"></path>
        <path fill="#fff" d="m16.976 18.027-1.718-1.698-1.567-1.553a2.55 2.55 0 0 0-1.812-.754c-.707 0-1.348.288-1.81.754l-3.283 3.25H4.724l.3-.308 1.03-1.032 2.361-2.336c.282-.279.557-.568.856-.825a3.8 3.8 0 0 1 2.075-.93l.018-.002a3.93 3.93 0 0 1 3.146.946l-.005-.004c.244.21.46.443.688.667l2.8 2.77.987.98a.3.3 0 0 1 .047.057h.001zM6.82 6.16l1.17 1.16c.535.53 1.065 1.059 1.6 1.585q.348.358.725.675l.015.012a2.52 2.52 0 0 0 1.558.535c.702 0 1.337-.284 1.796-.745.75-.749 1.505-1.491 2.262-2.24l1.003-.983h2.062l-.234.247-2.189 2.158-1.904 1.884a3.84 3.84 0 0 1-2.2 1.087l-.02.002a3.9 3.9 0 0 1-3.304-1.033l.001.002c-.381-.343-.739-.722-1.106-1.086L4.81 6.208c-.017-.017-.03-.038-.048-.059z"></path>
      </svg>
    ),
    TRX: (
      <svg data-ds-icon="TRX" width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" className={className} style={style}>
        <path fill="#EB0A29" d="M22.974 12.026C22.974 18.086 18.06 23 12 23S1.026 18.087 1.026 12.026C1.026 5.966 5.94 1.052 12 1.052s10.974 4.914 10.974 10.974"></path>
        <path fill="#fff" d="M5.37 5.816c.148.044.327.081.51.105l.016.001 10.459 1.915q.08.011.137.065l2.763 2.63c.045.04.052.065 0 .116q-1.155 1.399-2.302 2.801l-4.307 5.262-1.423 1.718-.044.048-.23-.57a4100 4100 0 0 1-2.668-6.709q-1.435-3.626-2.89-7.262a1 1 0 0 1-.037-.116v-.004zm5.774 12.486h.02q.059-.516.121-1.031c.08-.636.155-1.268.234-1.904q.102-.876.21-1.753c.072-.584.14-1.175.213-1.763l.003-.03a.14.14 0 0 0-.061-.114L6.92 7.579h-.017zm.798.041 5.873-7.155h-.079l-2.3.426-2.676.481c-.07 0-.086.045-.093.106 0 .19-.041.372-.066.557l-.23 1.908c-.075.636-.14 1.175-.213 1.763zM7.474 7.002v.02l.584.512 4.169 3.437a.1.1 0 0 0 .158 0 838 838 0 0 1 2.646-2.21l.365-.302zm5.866 4.19c.104 0 4.468-.788 4.582-.826 0 0 0-.024-.024-.034q-.784-.735-1.564-1.488c-.072-.069-.107-.059-.175 0-.653.55-1.313 1.096-1.97 1.643-.275.23-.553.46-.849.704"></path>
      </svg>
    ),
    CAD: (
      <svg data-ds-icon="CAD" width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" className={className} style={style}>
        <path fill="#EAA749" d="M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11"></path>
        <path fill="#61121F" d="M12.807 17.803v1.503h-1.33V17.82c-1.732-.138-2.997-.816-3.877-1.751l1.082-1.503a4.87 4.87 0 0 0 2.796 1.485v-3.218c-1.714-.43-3.53-1.063-3.53-3.236 0-1.696 1.385-3.052 3.53-3.236v-1.53h1.329v1.567c1.366.138 2.484.67 3.346 1.503L15.034 9.35a4.3 4.3 0 0 0-2.236-1.164v2.869c1.732.467 3.602 1.118 3.602 3.346 0 1.696-1.1 3.162-3.602 3.4zm-1.33-7.096V8.114c-.953.101-1.53.614-1.53 1.366 0 .651.65.981 1.53 1.229m2.952 3.878c0-.77-.687-1.118-1.613-1.403v2.87c1.146-.165 1.613-.835 1.613-1.467"></path>
      </svg>
    ),
    ARS: (
      <svg data-ds-icon="ARS" width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" className={className} style={style}>
        <path fill="#75AADB" d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12"></path>
        <path fill="#fff" d="M12.807 17.803v1.503h-1.33V17.82c-1.732-.138-2.997-.816-3.877-1.751l1.082-1.503a4.87 4.87 0 0 0 2.796 1.485v-3.218c-1.714-.43-3.53-1.063-3.53-3.236 0-1.696 1.385-3.052 3.53-3.236v-1.53h1.329v1.567c1.366.138 2.484.67 3.346 1.503L15.034 9.35a4.3 4.3 0 0 0-2.236-1.164v2.869c1.732.467 3.602 1.118 3.602 3.346 0 1.696-1.1 3.162-3.602 3.4zm-1.33-7.096V8.114c-.953.101-1.53.614-1.53 1.366 0 .651.65.981 1.53 1.229m2.952 3.878c0-.77-.687-1.118-1.613-1.403v2.87c1.146-.165 1.613-.835 1.613-1.467"></path>
      </svg>
    ),
    CLP: (
      <svg data-ds-icon="CLP" width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" className={className} style={style}>
        <path fill="#0039A6" d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12"></path>
        <path fill="#fff" d="M12.807 17.803v1.503h-1.33V17.82c-1.732-.138-2.997-.816-3.877-1.751l1.082-1.503a4.87 4.87 0 0 0 2.796 1.485v-3.218c-1.714-.43-3.53-1.063-3.53-3.236 0-1.696 1.385-3.052 3.53-3.236v-1.53h1.329v1.567c1.366.138 2.484.67 3.346 1.503L15.034 9.35a4.3 4.3 0 0 0-2.236-1.164v2.869c1.732.467 3.602 1.118 3.602 3.346 0 1.696-1.1 3.162-3.602 3.4zm-1.33-7.096V8.114c-.953.101-1.53.614-1.53 1.366 0 .651.65.981 1.53 1.229m2.952 3.878c0-.77-.687-1.118-1.613-1.403v2.87c1.146-.165 1.613-.835 1.613-1.467"></path>
      </svg>
    ),
    USD: (
      <svg data-ds-icon="USD" width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" className={className} style={style}>
        <path fill="#6CDE07" d="M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11"></path>
        <path fill="#1B3802" d="M12.807 17.803v1.503h-1.33V17.82c-1.732-.138-2.997-.816-3.877-1.751l1.082-1.503a4.87 4.87 0 0 0 2.796 1.485v-3.218c-1.714-.43-3.53-1.063-3.53-3.236 0-1.696 1.385-3.052 3.53-3.236v-1.53h1.329v1.567c1.366.138 2.484.67 3.346 1.503L15.034 9.35a4.3 4.3 0 0 0-2.236-1.164v2.869c1.732.467 3.602 1.118 3.602 3.346 0 1.696-1.1 3.162-3.602 3.4zm-1.33-7.096V8.114c-.953.101-1.53.614-1.53 1.366 0 .651.65.981 1.53 1.229m2.952 3.878c0-.77-.687-1.118-1.613-1.403v2.87c1.146-.165 1.613-.835 1.613-1.467"></path>
      </svg>
    ),
  };
  return icons[code] || (
    <svg fill="none" viewBox="0 0 24 24" className={className} style={style} width={size} height={size}>
      <circle cx="12" cy="12" r="12" fill="#26A17B" />
    </svg>
  );
};

// Tooltip component
const Tooltip = ({ children, content, icon, className = "" }) => {
  const [show, setShow] = useState(false);

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && content && (
        <div className="absolute z-50 bottom-full right-0 mb-2 px-3 py-2 bg-white text-gray-900 text-sm rounded-lg shadow-lg whitespace-nowrap pointer-events-none flex items-center gap-2">
          <span>{content}</span>
          {icon && <span className="inline-flex">{icon}</span>}
          <div className="absolute top-full right-4 -mt-1">
            <div className="border-4 border-transparent border-t-white"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function BetsBoard() {
  const [activeTab, setActiveTab] = useState("all-bets");
  const [betLimit, setBetLimit] = useState(10);
  const [bets, setBets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSelectHovered, setIsSelectHovered] = useState(false);
  const [isSelectFocused, setIsSelectFocused] = useState(false);

  // Handle click to redirect to casino home
  const handleRedirect = (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.location.href = 'https://stake.com/casino/home';
  };

  // Game icon components
  const getGameIcon = (iconName, gameName = '') => {
    // Map game names to icon types
    const gameNameToIcon = (name) => {
      const lowerName = name.toLowerCase();
      if (lowerName.includes('plinko')) return 'StakePlinko';
      if (lowerName.includes('roulette') || lowerName.includes('lightning')) return 'Roulette';
      if (lowerName.includes('blackjack') || lowerName.includes('salon privé') || lowerName.includes('salon prive')) return 'StakeBlackjack';
      if (lowerName.includes('flip')) return 'StakeFlip';
      if (lowerName.includes('limbo')) return 'StakeLimbo';
      if (lowerName.includes('dragon tower')) return 'StakeDragonTower';
      // Default to Slots for slot games
      return 'Slots';
    };

    // Use game name if iconName is not recognized
    const iconType = iconName && ['StakePlinko', 'StakeFlip', 'StakeLimbo', 'StakeDragonTower', 'StakeBlackjack', 'Roulette', 'Slots'].includes(iconName) 
      ? iconName 
      : gameNameToIcon(gameName);

    const iconMap = {
      StakePlinko: (
        <svg data-ds-icon="StakePlinko" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" className="inline-block shrink-0">
          <path fill="currentColor" d="M3.75 16.286c1.519 0 2.75 1.28 2.75 2.857S5.269 22 3.75 22 1 20.72 1 19.143s1.231-2.857 2.75-2.857m8.25 0c1.519 0 2.75 1.28 2.75 2.857S13.519 22 12 22s-2.75-1.28-2.75-2.857 1.231-2.857 2.75-2.857m8.25 0c1.519 0 2.75 1.28 2.75 2.857S21.769 22 20.25 22s-2.75-1.28-2.75-2.857 1.231-2.857 2.75-2.857M7.417 9.62c1.518 0 2.75 1.279 2.75 2.857 0 1.577-1.232 2.857-2.75 2.857s-2.75-1.28-2.75-2.857S5.898 9.62 7.417 9.62m8.25 0c1.518 0 2.75 1.279 2.75 2.857 0 1.577-1.232 2.857-2.75 2.857s-2.75-1.28-2.75-2.857 1.231-2.857 2.75-2.857"></path>
          <path fill="currentColor" fillRule="evenodd" d="M12 2c1.772 0 3.21 1.492 3.21 3.333 0 1.84-1.438 3.334-3.21 3.334S8.792 7.174 8.792 5.333 10.228 2 12 2m0 1.906c-.76 0-1.375.639-1.375 1.428 0 .79.615 1.428 1.375 1.429.76 0 1.375-.64 1.375-1.429 0-.79-.615-1.428-1.375-1.428" clipRule="evenodd"></path>
        </svg>
      ),
      StakeFlip: (
        <svg data-ds-icon="StakeFlip" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" className="inline-block shrink-0">
          <path fill="currentColor" d="M11.999 1A10.99 10.99 0 0 0 1 11.999c0 6.08 4.919 10.998 10.999 10.998S22.997 18.078 22.997 12A10.99 10.99 0 0 0 12 1m0 16.972-5.974-5.973L12 6.025 17.972 12z"></path>
        </svg>
      ),
      StakeLimbo: (
        <svg data-ds-icon="StakeLimbo" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" className="inline-block shrink-0">
          <path fill="currentColor" d="M12 9.745a2.255 2.255 0 1 1 0 4.51 2.255 2.255 0 0 1 0-4.51"></path>
          <path fill="currentColor" fillRule="evenodd" d="M12 5.372a6.628 6.628 0 1 1 0 13.256 6.628 6.628 0 0 1 0-13.256m0 2.118A4.52 4.52 0 0 0 7.49 12 4.51 4.51 0 1 0 12 7.49" clipRule="evenodd"></path>
          <path fill="currentColor" fillRule="evenodd" d="M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1m0 2.117A8.893 8.893 0 0 0 3.116 12 8.883 8.883 0 0 0 12 20.883a8.883 8.883 0 1 0 0-17.766" clipRule="evenodd"></path>
        </svg>
      ),
      StakeDragonTower: (
        <svg data-ds-icon="StakeDragonTower" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" className="inline-block shrink-0">
          <path fill="currentColor" fillRule="evenodd" d="M19.902 1c0 .006.347 4.71-.184 5.289-.907 1.081-1.934 2.485-1.934 2.915.046.642.624 2.549.046 3.74-.577 1.192-1.97 4.288-1.97 4.29a.7.7 0 0 1 .585.569c-.053.61-.238 1.2-.54 1.732a27 27 0 0 1-1 .66L14.338 23l-1.008-1.833a3.3 3.3 0 0 1-1.329.449 3.3 3.3 0 0 1-1.33-.45L9.664 23l-.651-2.759a6.7 6.7 0 0 1-.917-.66 4.3 4.3 0 0 1-.54-1.733.7.7 0 0 1 .586-.568 375 375 0 0 0-1.971-4.29c-.569-1.192-.009-3.098.046-3.74.046-.477-1.027-1.907-1.934-2.961C3.787 5.71 4.098 1.008 4.098 1c1.097.832 4.218 3.313 4.235 3.327l2.448-.788L12 1.504l1.256 2.035 2.41.788c.011-.008 3.138-2.494 4.236-3.327m-5.986 12.274q.269.115.56.156v.01a2.138 2.138 0 0 0 2.336-2.517 2.13 2.13 0 0 0-.623-1.15zM7.81 9.763a2.137 2.137 0 0 0 1.714 3.667 2.2 2.2 0 0 0 .56-.165z" clipRule="evenodd"></path>
          <path fill="currentColor" d="m5.684 16.244-3.024.394 1.934-2.75zm15.656.394-3.024-.394 1.09-2.356zM3.117 7.756q.661.798 1.21 1.678-.195.962-.238 1.943L1 9.341zM23 9.341l-3.098 1.99a12.6 12.6 0 0 0-.238-1.943q.556-.856 1.219-1.632z"></path>
        </svg>
      ),
      StakeBlackjack: (
        <svg data-ds-icon="StakeBlackjack" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" className="inline-block shrink-0">
          <path fill="currentColor" d="M9.24 5.634a.92.92 0 0 1 .817.5l.21.434-2.846 8.556-.031.133a.925.925 0 0 0 .61 1.02l7.779 2.61h.119l-.002.004a.87.87 0 0 1-.347.328l-7.342 3.686a.92.92 0 0 1-1.226-.412L1.084 10.615l.002.006a.926.926 0 0 1 .402-1.205l7.348-3.688-.006.002a.9.9 0 0 1 .41-.097"></path>
          <path fill="currentColor" fillRule="evenodd" d="M14.312 1c.1 0 .198.016.282.044l7.778 2.591.008.002a.923.923 0 0 1 .572 1.17l-4.189 12.586-.002.006a.92.92 0 0 1-1.145.565l-7.78-2.609-.006-.002a.92.92 0 0 1-.573-1.15l4.189-12.586.002-.007a.92.92 0 0 1 .864-.61m3.341 6.719a.23.23 0 0 0-.073.092l-.157.435v.003c0 .062.043.113.101.126l.643.24-1.111 3.126a.1.1 0 0 0-.012.05c0 .059.04.108.093.124l.772.277a.1.1 0 0 0 .043.008.13.13 0 0 0 .123-.09l1.589-4.419a.14.14 0 0 0-.082-.175l-.634-.23zM15.25 5.948a2.1 2.1 0 0 0-1.033.268.14.14 0 0 0-.054.185l.248.646a.15.15 0 0 0 .193.072l-.004.003a1.04 1.04 0 0 1 .803-.113h.004a.58.58 0 0 1 .428.719l-.003.007a1.1 1.1 0 0 1-.364.454c-.643.434-2.158 1.466-2.755 1.844v.147a.14.14 0 0 0 .082.176l2.755.996h-.002a.1.1 0 0 0 .038.005c.063 0 .117-.04.138-.097l.22-.617a.15.15 0 0 0-.083-.184l-1.212-.434c.487-.34 1.314-.886 1.681-1.199l.004-.003a1.9 1.9 0 0 0 .583-.808h.001a1.516 1.516 0 0 0-1.075-1.983l.015.004a2.1 2.1 0 0 0-.608-.088" clipRule="evenodd"></path>
        </svg>
      ),
      Roulette: (
        <svg data-ds-icon="Roulette" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" className="inline-block shrink-0">
          <path fill="currentColor" d="M23 12c0-3.04-1.23-5.79-3.22-7.78A10.97 10.97 0 0 0 12 1C8.96 1 6.21 2.23 4.22 4.22A10.97 10.97 0 0 0 1 12c0 3.04 1.23 5.79 3.22 7.78S8.96 23 12 23s5.79-1.23 7.78-3.22S23 15.04 23 12m-2 0h-5c0-1.27-.6-2.39-1.53-3.12.12.1.25.18.36.29l3.53-3.53A8.97 8.97 0 0 1 21 12m-9-9v5c-1.27 0-2.39.61-3.13 1.53.1-.12.19-.25.3-.36L5.64 5.64A8.97 8.97 0 0 1 12 3m-9 9h5c0 1.27.6 2.39 1.53 3.12-.12-.09-.25-.18-.36-.29l-3.53 3.53A8.97 8.97 0 0 1 3 12m9 9v-5c1.27 0 2.39-.6 3.12-1.53-.09.12-.18.25-.29.36l3.53 3.53A8.97 8.97 0 0 1 12 21"></path>
        </svg>
      ),
      Slots: (
        <svg data-ds-icon="Slots" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" className="inline-block shrink-0">
          <path fill="currentColor" d="M7.62 10.61a20 20 0 0 0-1.45 3.96 7.5 7.5 0 0 0 0 3.59l.18.75-4.07 1A9.47 9.47 0 0 1 3 13.43l-3 .71v-2.92l7.34-1.76zM24 11.72l-.23 1.16a21.4 21.4 0 0 0-2.97 2.95 7.64 7.64 0 0 0-1.5 3.26l-.15.75-4.15-.76a9.53 9.53 0 0 1 3.34-5.57l-3-.59 1.26-2.66z"></path>
          <path fill="currentColor" d="M18 6.03a33.5 33.5 0 0 0-3.8 5.74 12.44 12.44 0 0 0-1.4 5.7v1.25H8.08a13.9 13.9 0 0 1 1.25-5.69 21.7 21.7 0 0 1 3.37-5.28h-7V4.09H18z"></path>
        </svg>
      ),
    };
    return iconMap[iconType] || iconMap.Slots;
  };

  // Fetch bets data - only updates table, doesn't refresh page
  const loadBets = useCallback(async (showLoading = false) => {
    try {
      if (showLoading || isInitialLoad) {
        setLoading(true);
      } else {
        // For subsequent updates, use a subtle refresh indicator
        setIsRefreshing(true);
      }
      setError(null);
      const data = await fetchBets(activeTab, betLimit);
      // Only update the bets state - this won't cause page refresh
      setBets(data);
      setIsInitialLoad(false);
    } catch (err) {
      console.error("Error fetching bets:", err);
      setError("Failed to load bets. Please try again.");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, [activeTab, betLimit, isInitialLoad]);

  // Load bets on mount (with loading)
  useEffect(() => {
    loadBets(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update bets when tab/limit changes (without loading)
  useEffect(() => {
    if (!isInitialLoad) {
      loadBets(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, betLimit]);

  // Set up polling to refresh data every 5 seconds (skip for race leaderboard to keep data stable)
  // This only updates the table data, never refreshes the page
  useEffect(() => {
    if (isInitialLoad) return;
    if (activeTab === "race-leaderboard") return; // Don't poll race leaderboard
    
    const interval = setInterval(() => {
      // Silently update table data in background
      loadBets(false);
    }, 5000); // Refresh every 5 seconds

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialLoad, activeTab]);


  const formatCurrency = (amount, currency) => {
    if (amount === null || amount === undefined || isNaN(amount)) {
      return "$0.00";
    }
    // Normalize currency to uppercase
    const normalizedCurrency = currency ? currency.toUpperCase() : "USD";
    
    // Currency symbol mapping
    const currencySymbols = {
      "USD": "$",
      "USDT": "$",
      "USDC": "$",
      "CAD": "CA$",
      "BTC": "$",
      "ETH": "$",
      "BNB": "$",
      "LTC": "$",
      "SOL": "$",
      "TRX": "$"
    };
    
    const symbol = currencySymbols[normalizedCurrency] || "$";
    return `${symbol}${Math.abs(amount).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatCurrencyWithoutSymbol = (amount) => {
    if (amount === null || amount === undefined || isNaN(amount)) {
      return "0.00000000";
    }
    const absAmount = Math.abs(amount);
    // If amount is 0, show 8 decimal places
    if (absAmount === 0) {
      return "0.00000000";
    }
    return absAmount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  // Get currency symbol for display
  const getCurrencySymbol = (currency) => {
    const normalizedCurrency = currency ? currency.toUpperCase() : "USD";
    const currencySymbols = {
      "USD": "$",
      "USDT": "$",
      "USDC": "$",
      "CAD": "CA$",
      "BTC": "$",
      "ETH": "$",
      "BNB": "$",
      "LTC": "$",
      "SOL": "$",
      "TRX": "$",
      "XRP": "$",
      "ARS": "$",
      "CLP": "$"
    };
    return currencySymbols[normalizedCurrency] || "$";
  };

  // Check if currency is a stablecoin (1:1 with USD)
  const isStablecoinOrFiat = (currency) => {
    const normalizedCurrency = currency ? currency.toUpperCase() : "USD";
    // Only USD, USDT, and USDC are truly 1:1 with USD
    return normalizedCurrency === "USD" || normalizedCurrency === "USDT" || normalizedCurrency === "USDC";
  };

  // Convert USD amount to coin currency (approximate exchange rates)
  const convertToCoinCurrency = (usdAmount, currency) => {
    if (!usdAmount || isNaN(usdAmount)) {
      return usdAmount;
    }
    
    // Normalize currency to uppercase
    const normalizedCurrency = currency ? currency.toUpperCase() : "USD";
    
    // Stablecoins (1:1 with USD)
    if (normalizedCurrency === "USD" || normalizedCurrency === "USDT" || normalizedCurrency === "USDC") {
      return usdAmount;
    }
    
    // Approximate exchange rates (these should ideally come from an API)
    // Rates are in units per USD (e.g., 0.000015 BTC per USD means 1 USD = 0.000015 BTC)
    const exchangeRates = {
      // Cryptocurrencies
      BTC: 0.000015, // ~$66,000 per BTC
      ETH: 0.00025,  // ~$4,000 per ETH
      LTC: 0.003,    // ~$333 per LTC
      BNB: 0.0015,   // ~$666 per BNB
      SOL: 0.004,    // ~$250 per SOL
      TRX: 0.1,      // ~$10 per TRX
      XRP: 0.5,      // ~$2 per XRP
      // Fiat currencies (approximate rates)
      CAD: 1.35,     // ~1.35 CAD per USD
      ARS: 850,      // ~850 ARS per USD (approximate, varies significantly)
      CLP: 900,      // ~900 CLP per USD (approximate)
    };
    
    const rate = exchangeRates[normalizedCurrency];
    if (rate === undefined) {
      // If currency not found, return USD amount (fallback)
      return usdAmount;
    }
    return usdAmount * rate;
  };



  // Format coin amount for display
  const formatCoinAmount = (amount, currency) => {
    if (amount === null || amount === undefined || isNaN(amount)) {
      return "0.00";
    }
    
    // Normalize currency to uppercase
    const normalizedCurrency = currency ? currency.toUpperCase() : "USD";
    
    // High precision cryptocurrencies (8 decimal places)
    if (normalizedCurrency === "BTC") {
      // For BTC, use special formatting that handles satoshi
      const absAmount = Math.abs(amount);
      if (absAmount > 0 && absAmount < 0.00000001) {
        const satoshi = Math.round(absAmount * 100000000);
        return `${satoshi.toLocaleString("en-US")} sats`;
      }
      return amount.toLocaleString("en-US", { minimumFractionDigits: 8, maximumFractionDigits: 8 });
    } else if (normalizedCurrency === "ETH") {
      return amount.toLocaleString("en-US", { minimumFractionDigits: 8, maximumFractionDigits: 8 });
    } 
    // Medium precision cryptocurrencies (4 decimal places)
    else if (normalizedCurrency === "LTC" || normalizedCurrency === "BNB" || normalizedCurrency === "SOL") {
      return amount.toLocaleString("en-US", { minimumFractionDigits: 4, maximumFractionDigits: 4 });
    }
    // Standard precision cryptocurrencies (2-6 decimal places)
    else if (normalizedCurrency === "TRX" || normalizedCurrency === "XRP") {
      return amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 6 });
    }
    // Fiat currencies (2 decimal places, no decimals for high-value currencies)
    else if (normalizedCurrency === "ARS" || normalizedCurrency === "CLP") {
      return amount.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    }
    // Default: 2 decimal places for other currencies
    return amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const getCurrencyIcon = (currency) => {
    // Normalize currency to uppercase
    const normalizedCurrency = currency ? currency.toUpperCase() : "USD";
    return <CurrencyIcon code={normalizedCurrency} size={20} />;
  };

  const getRankIcon = (rank) => {
    if (rank === 1) {
      return (
        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M17 6.33334L10 2.16667L3 6.33334V14.6667L10 18.8333L17 14.6667V6.33334Z" fill="#5D6559"></path>
          <path fillRule="evenodd" clipRule="evenodd" d="M10 2.16667L3 6.33334V14.6667L10 18.8333L17 14.6667V6.33334L10 2.16667ZM16.5833 6.57022L10 2.65157L3.41667 6.57022V14.4298L10 18.3484L16.5833 14.4298V6.57022Z" fill="#E9D18C"></path>
          <path d="M9.25829 14.2765C9.25829 14.3941 9.35244 14.5 9.48189 14.5H10.7882C10.9059 14.5 11 14.3941 11 14.2765V6.72353C11 6.60588 10.9059 6.5 10.7882 6.5H9.70549L7.9873 7.84118C7.95199 7.87647 7.91669 7.97059 7.91669 8.01765V8.75882C7.91669 8.87647 8.01083 8.98235 8.12852 8.98235H9.25829V14.2765Z" fill="#E9D18C"></path>
          <path d="M20 5.66667L17.9167 6.25001V8.58334C19.1485 8.23844 20 7.1157 20 5.83655V5.66667Z" fill="#CBC9B5"></path>
          <path d="M20 8.33334L17.9167 8.91668V11.25C19.1485 10.9051 20 9.78237 20 8.50322V8.33334Z" fill="#A1A498"></path>
          <path d="M20 11L17.9167 11.5833V13.9167C19.1485 13.5718 20 12.449 20 11.1699V11Z" fill="#5D6559"></path>
          <path d="M-2.02656e-05 5.66667L2.08331 6.25001V8.58334C0.851534 8.23844 -2.02656e-05 7.1157 -2.02656e-05 5.83655V5.66667Z" fill="#CBC9B5"></path>
          <path d="M-2.02656e-05 8.33334L2.08331 8.91668V11.25C0.851534 10.9051 -2.02656e-05 9.78237 -2.02656e-05 8.50322V8.33334Z" fill="#A1A498"></path>
          <path d="M-2.02656e-05 11L2.08331 11.5833V13.9167C0.851534 13.5718 -2.02656e-05 12.449 -2.02656e-05 11.1699V11Z" fill="#5D6559"></path>
        </svg>
      );
    } else if (rank === 2) {
      return (
        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M17 6.33334L10 2.16667L3 6.33334V14.6667L10 18.8333L17 14.6667V6.33334Z" fill="#55626F"></path>
          <path fillRule="evenodd" clipRule="evenodd" d="M10 2.16667L3 6.33334V14.6667L10 18.8333L17 14.6667V6.33334L10 2.16667ZM16.5833 6.57022L10 2.65157L3.41667 6.57022V14.4298L10 18.3484L16.5833 14.4298V6.57022Z" fill="#DEE1EF"></path>
          <path d="M7.41669 14.2797C7.41669 14.3957 7.50999 14.5 7.63828 14.5H12.3034C12.4201 14.5 12.525 14.3957 12.525 14.2797V13.2362C12.525 13.1203 12.4201 13.0159 12.3034 13.0159H10.2508C10.7989 12.2507 11.7553 11.0101 12.1285 10.3493C12.4084 9.80435 12.5834 9.45652 12.5834 8.84203C12.5834 7.55507 11.6037 6.5 9.93587 6.5C8.54799 6.5 7.60329 7.63623 7.60329 7.63623C7.52165 7.72899 7.53332 7.86812 7.61496 7.93768L8.32639 8.65652C8.4197 8.74928 8.55965 8.74928 8.65295 8.65652C8.87455 8.41304 9.30608 8.07681 9.78426 8.07681C10.4374 8.07681 10.8106 8.47101 10.8106 8.91159C10.8106 9.23623 10.659 9.56087 10.5074 9.79275C9.81925 10.8362 8.09314 13.1667 7.41669 14.0478V14.2797Z" fill="#DEE1EF"></path>
          <path d="M20 7.66667L17.9167 8.25001V10.5833C19.1485 10.2384 20 9.1157 20 7.83655V7.66667Z" fill="#B7BDCA"></path>
          <path d="M20 10.3333L17.9167 10.9167V13.25C19.1485 12.9051 20 11.7824 20 10.5032V10.3333Z" fill="#9099A6"></path>
          <path d="M-2.02656e-05 7.66667L2.08331 8.25001V10.5833C0.851534 10.2384 -2.02656e-05 9.1157 -2.02656e-05 7.83655V7.66667Z" fill="#B7BDCA"></path>
          <path d="M-2.02656e-05 10.3333L2.08331 10.9167V13.25C0.851534 12.9051 -2.02656e-05 11.7824 -2.02656e-05 10.5032V10.3333Z" fill="#9099A6"></path>
        </svg>
      );
    } else if (rank === 3) {
      return (
        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M17 6.33332L10 2.16666L3 6.33332V14.6667L10 18.8333L17 14.6667V6.33332Z" fill="#636B6B"></path>
          <path fillRule="evenodd" clipRule="evenodd" d="M10 2.16666L3 6.33332V14.6667L10 18.8333L17 14.6667V6.33332L10 2.16666ZM16.5833 6.5702L10 2.65155L3.41667 6.5702V14.4298L10 18.3484L16.5833 14.4298V6.5702Z" fill="#FDE6CA"></path>
          <path d="M20 9L17.9167 9.58333V11.9167C19.1485 11.5718 20 10.449 20 9.16987V9Z" fill="#D1C3AF"></path>
          <path d="M-2.02656e-05 9L2.08331 9.58333V11.9167C0.851534 11.5718 -2.02656e-05 10.449 -2.02656e-05 9.16987V9Z" fill="#D1C3AF"></path>
          <path d="M10 14.5C11.8758 14.5 13.0834 13.5595 13.0834 12.2242C13.0834 11.0631 12.0517 10.4478 11.2545 10.3665C12.122 10.2155 12.9661 9.57692 12.9661 8.6016C12.9661 7.31277 11.8406 6.5 10.0117 6.5C8.64007 6.5 7.65528 7.0225 7.0222 7.73077L7.85458 8.76415C8.4056 8.24165 9.08557 7.96299 9.83589 7.96299C10.6565 7.96299 11.2896 8.26488 11.2896 8.88026C11.2896 9.4492 10.7152 9.70464 9.84761 9.70464C9.55452 9.70464 9.01523 9.70464 8.87455 9.69303V11.1792C8.99178 11.1676 9.51935 11.156 9.84761 11.156C10.9379 11.156 11.4186 11.4347 11.4186 12.0501C11.4186 12.6306 10.891 13.037 9.9414 13.037C9.17936 13.037 8.32353 12.7119 7.78424 12.1546L6.91669 13.2576C7.49115 13.9543 8.55801 14.5 10 14.5Z" fill="#FDE6CA"></path>
        </svg>
      );
    }
    return null;
  };

  const getRankDisplay = (rank) => {
    if (rank <= 3) {
      return <div className="rank-wrapper">{getRankIcon(rank)}</div>;
    }
    const suffixes = { 1: 'st', 2: 'nd', 3: 'rd' };
    const suffix = suffixes[rank % 10] || 'th';
    if (rank === 10) {
      return (
        <span 
          style={{
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, .2), 0 1px 2px 0 rgba(0, 0, 0, .12)',
            border: '2px solid #2f4553',
            borderRadius: '0.5rem',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '66px',
            height: '44px',
            backgroundColor: '#99c8ff',
            fontFamily: 'unset',
            fontVariantNumeric: 'unset',
            fontFeatureSettings: 'unset',
            fontSize: 'unset',
            padding: '0',
            paddingTop: '0',
            paddingRight: '0',
            paddingBottom: '0',
            paddingLeft: '0',
            margin: '0'
          }}
        >
          {rank}{suffix}
        </span>
      );
    }
    if (rank > 3 && rank <= 10) {
      return <span className="ds-body-md">{rank}{suffix}</span>;
    }
    return <span className="ds-body-md">{rank}{suffix}</span>;
  };

  // Get user icon (for specific users like inigo)
  const getUserIcon = (username) => {
    if (!username) return null;
    
    const lowerUsername = username.toLowerCase();
    if (lowerUsername === 'inigo') {
      return (
        <svg data-ds-icon="Inigo" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" className="inline-block shrink-0">
          <path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
        </svg>
      );
    }
    return null;
  };

  const getTimeRemaining = () => {
    // Calculate hours remaining (mock: 16 hours)
    const hours = 16;
    return `in ${hours} hours`;
  };

  // Memoize displayed bets to prevent unnecessary re-renders
  const displayedBets = useMemo(() => bets, [bets]);
  
  // Memoize tabs to prevent re-creation on every render
  const tabs = useMemo(() => [
    { id: "my-bets", label: "My Bets", disabled: true },
    { id: "all-bets", label: "All Bets" },
    { id: "high-rollers", label: "High Rollers" },
    { id: "race-leaderboard", label: "Race Leaderboard" },
  ], []);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const options = [0, 10, 20, 30, 40];
  const selectRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsSelectOpen(false);
      }
    };

    if (isSelectOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSelectOpen]);

  return (
    <div data-nosnippet="true" data-layout="true" data-analytics="bets-board" className="w-full py-6" style={{ background: '#1a2c38' }}>
      <div className="w-full">
        <div className="flex flex-col gap-4">
          {/* Tabs and Dropdown */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="tabs-wrapper scrollX flex-1 min-w-0">
              <div className="slider variant-dark">
                <div className="content-wrapper font-thick text-md flex gap-2 overflow-x-auto hide-scrollbar">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => !tab.disabled && setActiveTab(tab.id)}
                      disabled={tab.disabled}
                      className={`inline-flex relative items-center gap-2 justify-center font-thick whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white focus-visible:outline-white text-sm py-[0.625rem] px-[1.25rem] rounded-full ${
                        activeTab === tab.id
                          ? "!text-white [&_svg]:!text-white"
                          : "[&_svg]:text-grey-200"
                      }`}
                      style={{
                        fontFamily: 'var(--ds-font-family-default)',
                        fontVariantNumeric: 'var(--ds-font-variant-numeric)',
                        fontFeatureSettings: 'var(--ds-font-feature-settings)',
                        fontWeight: 'var(--ds-font-weight-thick)',
                        fontSize: 'var(--ds-font-size-md)',
                        padding: 'var(--ds-spacing-1-5) var(--ds-spacing-5)',
                        backgroundColor: activeTab === tab.id ? '#2f4553' : 'transparent'
                      }}
                    >
                      <span className="ds-body-md-strong">{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Dropdown */}
            <div className="select-wrap relative" ref={selectRef}>
              <div className="select-content relative" style={{ position: 'relative', width: '64px' }}>
                <div
                  onClick={() => setIsSelectOpen(!isSelectOpen)}
                  style={{
                    fontFamily: 'var(--ds-font-family-default)',
                    fontVariantNumeric: 'var(--ds-font-variant-numeric)',
                    fontFeatureSettings: 'var(--ds-font-feature-settings)',
                    fontSize: 'var(--ds-font-size-sm)',
                    backgroundColor: '#1a2c38',
                    border: '2px solid #557086',
                    borderRadius: '0.5rem',
                    padding: '0.5rem',
                    outline: 'none',
                    color: '#ffffff',
                    width: '64px',
                    height: '44px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'start',
                    justifyContent: 'start',
                    textAlign: 'start',
                  }}
                >
                  {betLimit}
                </div>

                {isSelectOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      right: 0,
                      backgroundColor: '#1a2c38',
                      border: '2px solid #858585',
                      zIndex: 10,
                      overflow: 'hidden',
                      
                    }}
                  >
                    {options.map((opt) => (
                      <div
                        key={opt}
                        onClick={() => {
                          setBetLimit(opt);
                          setIsSelectOpen(false);
                        }}
                        style={{
                          fontFamily: 'var(--ds-font-family-default)',
                          fontVariantNumeric: 'var(--ds-font-variant-numeric)',
                          fontFeatureSettings: 'var(--ds-font-feature-settings)',
                          fontSize: 'var(--ds-font-size-sm)',
                          padding: '0.5rem 0.8rem',
                          backgroundColor: '#1a2c38',
                          color: '#ffffff',
                          cursor: 'pointer',
                          textAlign: 'start',
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor = '#99c8ff')
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor = '#1a2c38')
                        }
                      >
                        {opt}
                      </div>
                    ))}
                  </div>
                )}

                <div className="dropdown-icon-wrap absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg data-ds-icon="ChevronDown" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" className="inline-block shrink-0" style={{ color: '#ffffff' }}>
                    <path fill="currentColor" d="M17.293 8.293a1 1 0 1 1 1.414 1.414l-6 6a1 1 0 0 1-1.414 0l-6-6-.068-.076A1 1 0 0 1 6.63 8.225l.076.068L12 13.586z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Race Header - Only show for Race Leaderboard */}
          {activeTab === "race-leaderboard" && (
            <div className=" px-2 py-4  border-b-2 border-solid flex flex-col gap-1 items-start md:flex-row md:justify-between md:gap-0 md:items-center">
              <button
                type="button"
                className="inline-flex items-center gap-2 text-white bg-transparent border-none cursor-pointer"
              >
                <svg data-ds-icon="Races" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" className="inline-block shrink-0">
                  <path fill="currentColor" d="m20.55 8.11.99-.99a.996.996 0 1 0-1.41-1.41l-.85.85a9 9 0 0 0-5.27-2.5V3h1c.55 0 1-.45 1-1s-.45-1-1-1h-4c-.55 0-1 .45-1 1s.45 1 1 1h1v1.07A8.98 8.98 0 0 0 6.32 7H3.01c-.55 0-1 .45-1 1s.45 1 1 1h5.54c1.1-1.22 2.69-2 4.46-2 3.31 0 6 2.69 6 6s-2.69 6-6 6c-1.77 0-3.36-.78-4.46-2H3c-.55 0-1 .45-1 1s.45 1 1 1h3.3a9 9 0 0 0 8.12 2.89c3.68-.56 6.69-3.44 7.4-7.09.49-2.48-.06-4.82-1.28-6.69z"></path>
                  <path fill="currentColor" d="M3 14h7.18c.4 1.17 1.51 2 2.82 2 1.66 0 3-1.34 3-3s-1.34-3-3-3c-1.31 0-2.42.83-2.82 2H3c-.55 0-1 .45-1 1s.45 1 1 1"></path>
                </svg>
                <span className="ds-body-md-strong">$100k Race</span>
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 text-white bg-transparent border-none cursor-pointer"
              >
                <svg data-ds-icon="Stats" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" className="inline-block shrink-0">
                  <path fill="currentColor" d="M21 1H3c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2m-1 9c0 .55-.45 1-1 1s-1-.45-1-1V8.63l-6.21 7.99c-.22.28-.58.43-.93.38a1.01 1.01 0 0 1-.79-.62l-1.36-3.41-2.93 3.66c-.2.25-.49.38-.78.38-.22 0-.44-.07-.62-.22-.43-.35-.5-.97-.16-1.41l4-5a1 1 0 0 1 1.71.26l1.35 3.38 5.45-7.01H15c-.55 0-1-.45-1-1s.45-1 1-1h4c.55 0 1 .45 1 1v4z"></path>
                </svg>
                <span className="ds-body-md-strong">Ends {getTimeRemaining()}</span>
              </button>
            </div>
          )}

          {/* Table */}
          <div className="table-wrapper scrollX overflow-x-auto hide-scrollbar relative">
            <table className="table-content w-full border-collapse is-fixed stripey">
              <thead className="bg-transparent">
                <tr>
                  {activeTab === "race-leaderboard" ? (
                    <>
                      <th className="!text-left p-3 text-sm font-semibold text-white" style={{ padding: 'var(--ds-spacing-4)', fontSize: 'var(--ds-font-size-sm)', fontFamily: 'var(--ds-font-family-default)', fontWeight: 'var(--ds-font-weight-thick)' }}>Rank</th>
                      <th className="!text-left p-3 text-sm font-semibold text-white" style={{ padding: 'var(--ds-spacing-4)', fontSize: 'var(--ds-font-size-sm)', fontFamily: 'var(--ds-font-family-default)', fontWeight: 'var(--ds-font-weight-thick)' }}>User</th>
                      <th className="!text-right p-3 text-sm font-semibold text-white" style={{ padding: 'var(--ds-spacing-4)', fontSize: 'var(--ds-font-size-sm)', fontFamily: 'var(--ds-font-family-default)', fontWeight: 'var(--ds-font-weight-thick)' }}>
                        <div className="flex items-center justify-end gap-2">
                          <svg data-ds-icon="Info" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" className="inline-block shrink-0">
                            <path fill="currentColor" d="M12 1C6.48 1 2 5.48 2 11s4.48 10 10 10v2l3.54-2.66C19.31 18.91 22 15.27 22 11c0-5.52-4.48-10-10-10m-.5 3c.83 0 1.5.67 1.5 1.5S12.33 7 11.5 7 10 6.33 10 5.5 10.67 4 11.5 4M15 17H9c-.55 0-1-.45-1-1s.45-1 1-1h2v-5H9c-.55 0-1-.45-1-1s.45-1 1-1h3c.55 0 1 .45 1 1v6h2c.55 0 1 .45 1 1s-.45 1-1 1"></path>
                          </svg>
                          <span>Wagered</span>
                        </div>
                      </th>
                      <th className="!text-right p-3 text-sm font-semibold text-white" style={{ padding: 'var(--ds-spacing-4)', fontSize: 'var(--ds-font-size-sm)', fontFamily: 'var(--ds-font-family-default)', fontWeight: 'var(--ds-font-weight-thick)' }}>Prize</th>
                    </>
                  ) : (
                    <>
                      <th className="!text-left p-3 text-sm font-semibold text-white" style={{ padding: 'var(--ds-spacing-4)', fontSize: 'var(--ds-font-size-sm)', fontFamily: 'var(--ds-font-family-default)', fontWeight: 'var(--ds-font-weight-thick)', width: 'auto' }}>Game</th>
                      <th className="hidden min-[961px]:table-cell !text-left p-3 text-sm font-semibold text-white" style={{ padding: 'var(--ds-spacing-4)', fontSize: 'var(--ds-font-size-sm)', fontFamily: 'var(--ds-font-family-default)', fontWeight: 'var(--ds-font-weight-thick)' }}>User</th>
                      <th className="hidden min-[961px]:table-cell !text-right p-3 text-sm font-semibold text-white" style={{ padding: 'var(--ds-spacing-4)', fontSize: 'var(--ds-font-size-sm)', fontFamily: 'var(--ds-font-family-default)', fontWeight: 'var(--ds-font-weight-thick)' }}>Time</th>
                      <th className="hidden min-[961px]:table-cell !text-right p-3 text-sm font-semibold text-white" style={{ padding: 'var(--ds-spacing-4)', fontSize: 'var(--ds-font-size-sm)', fontFamily: 'var(--ds-font-family-default)', fontWeight: 'var(--ds-font-weight-thick)' }}>Bet Amount</th>
                      <th className="hidden min-[701px]:table-cell !text-right p-3 text-sm font-semibold text-white" style={{ padding: 'var(--ds-spacing-4)', fontSize: 'var(--ds-font-size-sm)', fontFamily: 'var(--ds-font-family-default)', fontWeight: 'var(--ds-font-weight-thick)' }}>Multiplier</th>
                      <th className="!text-right p-3 text-sm font-semibold text-white" style={{ padding: 'var(--ds-spacing-4)', fontSize: 'var(--ds-font-size-sm)', fontFamily: 'var(--ds-font-family-default)', fontWeight: 'var(--ds-font-weight-thick)', width: 'auto', whiteSpace: 'nowrap' }}>Payout</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {isInitialLoad && loading ? (
                  <tr>
                    <td colSpan={activeTab === "race-leaderboard" ? 4 : 6} className="text-center p-8 text-grey-200">
                      Loading bets...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={activeTab === "race-leaderboard" ? 4 : 6} className="text-center p-8 text-red-400">
                      {error}
                    </td>
                  </tr>
                ) : displayedBets.length > 0 ? (
                  displayedBets.map((bet, index) => (
                    <tr
                      key={bet.id}
                      data-bet-index={index}
                      className="border-b border-grey-700"
                      onClick={handleRedirect}
                    >
                      {activeTab === "race-leaderboard" ? (
                        <>
                          <td className="!text-left p-3" onClick={handleRedirect} style={{ padding: 'var(--ds-spacing-4)', color: '#b1bad3' }}>
                            {getRankDisplay(bet.rank)}
                          </td>
                          <td className="!text-left p-3" style={{ padding: 'var(--ds-spacing-4)' }}>
                            <div className="flex !justify-start">
                              {bet.isHidden || !bet.user ? (
                                <Tooltip content="This user has privacy enabled">
                                  <div className="flex gap-1 items-center w-full" onClick={handleRedirect}>
                                    {getUserIcon(bet.user) ? (
                                      <span style={{ color: '#b1bad3' }}>
                                        {getUserIcon(bet.user)}
                                      </span>
                                    ) : (
                                      <svg data-ds-icon="GhostModeOn" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" className="inline-block shrink-0" style={{ color: '#b1bad3' }}>
                                        <path fill="currentColor" d="M22 11.157h-2l-2-7c-.18-1.19-1.69-1.69-3-1-2.51 1.32-3.49 1.32-6 0-1.31-.69-2.82-.19-3 1l-2 7H2c-.55 0-1 .45-1 1s.45 1 1 1h20c.55 0 1-.45 1-1s-.45-1-1-1m-6 4c-1.66 0-3.09.2-3.69 1h-1.62c-.6-.8-2.03-1-3.69-1-2.21 0-4 .34-4 2s1.79 4 4 4c1.79 0 3.29-1.54 3.8-3h1.41c.51 1.46 2.01 3 3.8 3 2.21 0 4-2.34 4-4s-1.79-2-4-2z"></path>
                                      </svg>
                                    )}
                                    <span className="ds-body-md-strong inline truncate" style={{ color: '#b1bad3' }}>Hidden</span>
                                  </div>
                                </Tooltip>
                              ) : (
                                <button
                                  type="button"
                                  onClick={handleRedirect}
                                  className="inline-flex items-center gap-2 text-white bg-transparent border-none cursor-pointer"
                                >
                                  {getUserIcon(bet.user)}
                                  <span className="ds-body-md-strong">{bet.user}</span>
                                </button>
                              )}
                            </div>
                          </td>
                          <td className="!text-right p-3" style={{ padding: 'var(--ds-spacing-4)' }}>
                            {(() => {
                              const currency = (bet.currency || "USD").toUpperCase();
                              const usdAmount = bet.wagered || 0;
                              const coinAmount = convertToCoinCurrency(usdAmount, currency);
                              
                              // Always show BTC amounts in tooltip, not USD
                              const tooltipContent = currency === "BTC"
                                ? `${formatCoinAmount(coinAmount, currency)} ${currency}`
                                : isStablecoinOrFiat(currency)
                                ? `${formatCurrencyWithoutSymbol(usdAmount)} ${currency}`
                                : `${formatCoinAmount(coinAmount, currency)} ${currency}`;
                              
                              return (
                                <Tooltip 
                                  content={tooltipContent}
                                  icon={getCurrencyIcon(currency)}
                                >
                                  <div className="inline-flex items-center gap-1 max-w-full justify-end cursor-pointer" onClick={handleRedirect}>
                                    <span className="ds-body-md whitespace-nowrap overflow-hidden text-ellipsis currency-amount" style={{ color: '#b1bad3' }}>
                                      ${formatCurrencyWithoutSymbol(usdAmount)}
                                    </span>
                                    {getCurrencyIcon(currency)}
                                  </div>
                                </Tooltip>
                              );
                            })()}
                          </td>
                          <td className="!text-right p-3" style={{ padding: 'var(--ds-spacing-4)' }}>
                            {(() => {
                              const currency = (bet.currency || "USD").toUpperCase();
                              const usdAmount = bet.prize || 0;
                              const coinAmount = convertToCoinCurrency(usdAmount, currency);
                              
                              // Always show BTC amounts in tooltip, not USD
                              const tooltipContent = currency === "BTC"
                                ? `${formatCoinAmount(coinAmount, currency)} ${currency}`
                                : isStablecoinOrFiat(currency)
                                ? `${formatCurrencyWithoutSymbol(usdAmount)} ${currency}`
                                : `${formatCoinAmount(coinAmount, currency)} ${currency}`;
                              
                              return (
                                <Tooltip 
                                  content={tooltipContent}
                                  icon={getCurrencyIcon(currency)}
                                >
                                  <div className="inline-flex items-center gap-1 max-w-full justify-end cursor-pointer" onClick={handleRedirect}>
                                    <span className="ds-body-md whitespace-nowrap overflow-hidden text-ellipsis currency-amount" style={{ color: '#b1bad3' }}>
                                      ${formatCurrencyWithoutSymbol(usdAmount)}
                                    </span>
                                    {getCurrencyIcon(currency)}
                                  </div>
                                </Tooltip>
                              );
                            })()}
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="text-left p-3" style={{ padding: 'var(--ds-spacing-4)', width: 'auto' }}>
                            <button
                              type="button"
                              onClick={handleRedirect}
                              className="inline-flex items-center gap-2 text-white max-w-full bg-transparent border-none cursor-pointer"
                            >
                              {getGameIcon(bet.gameIcon, bet.game)}
                              <span className="ds-body-md-strong truncate">{bet.game}</span>
                            </button>
                          </td>
                          <td className="hidden min-[961px]:table-cell text-left p-3" style={{ padding: 'var(--ds-spacing-4)' }}>
                              {bet.isHidden || !bet.user ? (
                                <Tooltip content="This user has privacy enabled">
                                  <div className="flex gap-1 items-center w-full" onClick={handleRedirect}>
                                    {getUserIcon(bet.user) ? (
                                      <span style={{ color: '#b1bad3' }}>
                                        {getUserIcon(bet.user)}
                                      </span>
                                    ) : (
                                      <svg data-ds-icon="GhostModeOn" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" className="inline-block shrink-0" style={{ color: '#b1bad3' }}>
                                        <path fill="currentColor" d="M22 11.157h-2l-2-7c-.18-1.19-1.69-1.69-3-1-2.51 1.32-3.49 1.32-6 0-1.31-.69-2.82-.19-3 1l-2 7H2c-.55 0-1 .45-1 1s.45 1 1 1h20c.55 0 1-.45 1-1s-.45-1-1-1m-6 4c-1.66 0-3.09.2-3.69 1h-1.62c-.6-.8-2.03-1-3.69-1-2.21 0-4 .34-4 2s1.79 4 4 4c1.79 0 3.29-1.54 3.8-3h1.41c.51 1.46 2.01 3 3.8 3 2.21 0 4-2.34 4-4s-1.79-2-4-2z"></path>
                                      </svg>
                                    )}
                                    <span className="ds-body-md-strong inline truncate" style={{ color: '#b1bad3' }}>Hidden</span>
                                  </div>
                                </Tooltip>
                              ) : (
                              <button
                                type="button"
                                onClick={handleRedirect}
                                className="inline-flex items-center gap-2 text-white bg-transparent border-none cursor-pointer"
                              >
                                {getUserIcon(bet.user)}
                                <span className="ds-body-md-strong">{bet.user}</span>
                              </button>
                            )}
                          </td>
                          <td className="hidden min-[961px]:table-cell text-right p-3 cursor-pointer" onClick={handleRedirect} style={{ padding: 'var(--ds-spacing-4)', color: '#b1bad3' }}>{bet.time}</td>
                          <td className="hidden min-[961px]:table-cell text-right p-3" style={{ padding: 'var(--ds-spacing-4)' }}>
                            {(() => {
                              const currency = (bet.currency || "USD").toUpperCase();
                              let usdAmount = bet.betAmount;
                              
                              // If amount is 0 or null/undefined, generate a random amount
                              if (!usdAmount || usdAmount === 0) {
                                if (currency === "BTC") {
                                  // For BTC, generate a small random BTC amount like 0.0000002
                                  // Random between 0.0000001 and 0.000001 BTC (1 to 10 satoshi)
                                  const randomBTC = Math.random() * 0.0000009 + 0.0000001;
                                  // Convert to USD equivalent for display (assuming ~$66,000 per BTC)
                                  usdAmount = randomBTC * 66000;
                                } else {
                                  // For other currencies, generate random amount between 0.01 and 5000
                                  usdAmount = Math.random() * 5000 + 0.01;
                                }
                              }
                              
                              const coinAmount = convertToCoinCurrency(usdAmount, currency);
                              
                              // Always show BTC amounts in tooltip, not USD
                              const tooltipContent = currency === "BTC"
                                ? `${formatCoinAmount(coinAmount, currency)} ${currency}`
                                : isStablecoinOrFiat(currency)
                                ? `${formatCurrencyWithoutSymbol(usdAmount)} ${currency}`
                                : `${formatCoinAmount(coinAmount, currency)} ${currency}`;
                              
                              return (
                                <Tooltip 
                                  content={tooltipContent}
                                  icon={getCurrencyIcon(currency)}
                                >
                                  <div className="inline-flex items-center gap-1 max-w-full justify-end cursor-pointer" onClick={handleRedirect}>
                                    <span className="ds-body-md whitespace-nowrap overflow-hidden text-ellipsis currency-amount" style={{ color: '#b1bad3' }}>
                                      ${formatCurrencyWithoutSymbol(usdAmount)}
                                    </span>
                                    {getCurrencyIcon(currency)}
                                  </div>
                                </Tooltip>
                              );
                            })()}
                          </td>
                          <td className="hidden min-[701px]:table-cell text-right p-3 cursor-pointer" onClick={handleRedirect} style={{ padding: 'var(--ds-spacing-4)' }}>
                            <div className="flex items-center justify-end text-right gap-1">
                              <span className="ds-body-md" style={{ color: '#b1bad3' }}>{bet.multiplier?.toFixed(2)}×</span>
                            </div>
                          </td>
                          <td className="text-right p-3" style={{ padding: 'var(--ds-spacing-4)', width: 'auto', whiteSpace: 'nowrap' }}>
                            {(() => {
                              const isWin = bet.payout > 0;
                              const currency = ((bet.payoutCurrency || bet.currency || "USD")).toUpperCase();
                              const displayAmount = isWin ? bet.payout : Math.abs(bet.betAmount || 0);
                              const coinAmount = convertToCoinCurrency(Math.abs(displayAmount), currency);
                              
                              // Always show BTC amounts in tooltip, not USD
                              const tooltipContent = currency === "BTC"
                                ? `${isWin ? "+" : "-"}${formatCoinAmount(coinAmount, currency)} ${currency}`
                                : isStablecoinOrFiat(currency)
                                ? `${isWin ? "+" : "-"}${formatCurrencyWithoutSymbol(displayAmount)} ${currency}`
                                : `${isWin ? "+" : "-"}${formatCoinAmount(coinAmount, currency)} ${currency}`;
                              
                              return (
                                <Tooltip 
                                  content={tooltipContent}
                                  icon={getCurrencyIcon(currency)}
                                >
                                  <div className="inline-flex items-center gap-1 justify-end cursor-pointer" onClick={handleRedirect} style={{ marginLeft: 'auto' }}>
                                    <span
                                      className="ds-body-md whitespace-nowrap currency-amount"
                                      style={{ color: isWin ? '#02da06' : '#b1bad3' }}
                                    >
                                      {isWin ? "+" : "-"}${formatCurrencyWithoutSymbol(displayAmount)}
                                    </span>
                                    {getCurrencyIcon(currency)}
                                  </div>
                                </Tooltip>
                              );
                            })()}
                          </td>
                        </>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={activeTab === "race-leaderboard" ? 4 : 6} className="text-center p-8 text-grey-200">
                      No bets to display
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

