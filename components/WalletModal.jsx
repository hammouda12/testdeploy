"use client";

import { useState, useEffect, useRef } from "react";

// Currency Icon Components
const CurrencyIcon = ({ code, className = "svg-icon", style }) => {
  const icons = {
    BTC: (
      <svg data-ds-icon="BTC" width="28" height="28" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" className={className} style={style}>
        <path fill="#F7931A" d="M22.974 12.026C22.974 18.086 18.06 23 12 23S1.026 18.087 1.026 12.026C1.026 5.966 5.94 1.052 12 1.052s10.974 4.914 10.974 10.974"></path>
        <path fill="#fff" d="M16.932 10.669c.213-1.437-.88-2.21-2.378-2.726l.484-1.948-1.182-.296-.481 1.897c-.313-.079-.633-.151-.949-.223l.481-1.9-1.185-.296-.485 1.945a31 31 0 0 1-.756-.179l-1.636-.409L8.532 7.8s.88.203.86.213a.633.633 0 0 1 .553.69V8.7l-.553 2.22q.071.018.13.04l-.007-.002-.123-.03-.777 3.093a.43.43 0 0 1-.546.28l.003.001-.863-.213-.588 1.351 1.544.381.845.22-.491 1.97 1.185.295.485-1.948q.483.129.945.244l-.485 1.941 1.186.296.488-1.966c2.024.382 3.544.227 4.183-1.601.515-1.471-.024-2.32-1.09-2.874.777-.165 1.358-.677 1.516-1.728m-2.712 3.797c-.364 1.475-2.842.688-3.646.478l.65-2.598c.804.189 3.381.588 2.996 2.12m.368-3.818c-.344 1.34-2.406.657-3.066.492l.591-2.365c.667.165 2.822.478 2.475 1.873"></path>
      </svg>
    ),
    ETH: (
      <svg data-ds-icon="ETH" width="28" height="28" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" className={className} style={style}>
        <path fill="#627EEA" d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11"></path>
        <path fill="#fff" d="M12.344 3.75v6.098l5.156 2.303zm0 0-5.156 8.401 5.156-2.303zm0 12.354v4.146l5.156-7.14zm0 4.146V16.1l-5.156-2.99z"></path>
        <path fill="#fff" d="m12.344 15.145 5.156-2.994-5.156-2.303zm-5.156-2.994 5.156 2.994V9.848z"></path>
      </svg>
    ),
    LTC: (
      <svg data-ds-icon="LTC" width="28" height="28" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" className={className} style={style}>
        <path fill="#3C649B" d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11"></path>
        <path fill="#fff" d="m8.167 14.21-.98.382.475-1.905.99-.398L10.085 6.5h3.524l-1.031 4.26.969-.393-.468 1.89-.983.393-.58 2.406h5.297L16.21 17.5H7.359z"></path>
      </svg>
    ),
    USDT: (
      <svg data-ds-icon="USDT" width="28" height="28" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" className={className} style={style}>
        <path fill="#26A17B" d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11"></path>
        <path fill="#fff" d="M13.322 12.95c-.076.005-.466.028-1.336.028-.694 0-1.183-.02-1.355-.029v.002c-2.673-.117-4.668-.583-4.668-1.14s1.995-1.021 4.668-1.14v1.817c.175.013.675.042 1.367.042.83 0 1.246-.034 1.324-.041v-1.817c2.667.119 4.657.584 4.657 1.14s-1.99 1.02-4.657 1.139m0-2.467V8.856h3.722v-2.48H6.909v2.48h3.722v1.626c-3.025.139-5.3.738-5.3 1.456s2.275 1.317 5.3 1.456v5.213h2.69v-5.214c3.02-.139 5.29-.738 5.29-1.455s-2.27-1.316-5.29-1.455"></path>
      </svg>
    ),
    SOL: (
      <svg data-ds-icon="SOL" width="28" height="28" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" className={className} style={style}>
        <defs><linearGradient id="sol-gradient-unique" x1="6.457" x2="17.589" y1="17.459" y2="6.621" gradientUnits="userSpaceOnUse"><stop stopColor="#CF41E8"></stop><stop offset="1" stopColor="#10F2B0"></stop></linearGradient></defs>
        <path fill="#fff" d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11"></path>
        <path fill="url(#sol-gradient-unique)" d="M16.566 9.26a.3.3 0 0 1-.13.09.4.4 0 0 1-.158.032H6.088c-.36 0-.545-.45-.293-.72L7.47 6.885a.4.4 0 0 1 .135-.095.4.4 0 0 1 .157-.031h10.231c.364 0 .544.454.288.724zm0 7.945a.4.4 0 0 1-.288.122H6.088c-.36 0-.545-.441-.293-.702l1.674-1.737a.34.34 0 0 1 .135-.09.4.4 0 0 1 .157-.031h10.231c.364 0 .544.445.288.706zm0-6.32a.4.4 0 0 0-.288-.122H6.088c-.36 0-.545.44-.293.702L7.47 13.2a.34.34 0 0 0 .135.09q.075.033.157.032h10.231c.364 0 .544-.446.288-.707z"></path>
      </svg>
    ),
    DOGE: (
      <svg data-ds-icon="DOGE" width="28" height="28" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" className={className} style={style}>
        <path fill="#C2A633" d="M22.974 12.026C22.974 18.086 18.06 23 12 23S1.026 18.087 1.026 12.026C1.026 5.966 5.94 1.052 12 1.052s10.974 4.914 10.974 10.974"></path>
        <path fill="#fff" d="M11.729 5.472h-3.78v5.843h-1.55v1.433h1.55v5.843h4.395s6.186.518 6.186-6.458c0-6.864-5.908-6.66-6.801-6.66m.522 10.71H10.43v-3.437h2.749v-1.43h-2.75V7.878h1.719c.65 0 3.918.261 3.925 4.296s-3.354 3.99-3.822 3.99z"></path>
      </svg>
    ),
    BCH: (
      <svg data-ds-icon="BCH" width="28" height="28" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" className={className} style={style}>
        <path fill="#8DC351" d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11"></path>
        <path fill="#fff" d="M14.96 7.703c-.736-1.258-2.063-1.172-3.568-.632l-.85-1.83-1.11.517.825 1.773-.883.423-.811-1.798-1.11.512.845 1.826c-.237.117-.475.233-.705.344l-1.533.708.55 1.189s.811-.399.804-.375a.63.63 0 0 1 .865.187l.002.002.962 2.08.12-.048-.116.055 1.35 2.915q.031.073.032.163c0 .19-.122.352-.293.41l-.003.001c.02 0-.808.375-.808.375l.392 1.43 1.447-.67.798-.362.87 1.836 1.11-.512-.846-1.829q.459-.201.89-.402l.842 1.818 1.097-.515-.852-1.857c1.818-.972 2.908-2.062 2.258-3.877-.522-1.475-1.482-1.798-2.657-1.56.491-.612.625-1.376.086-2.297m.271 4.668c.643 1.375-1.794 2.317-2.547 2.668l-1.13-2.448c.752-.347 3.014-1.66 3.677-.22m-2.114-3.21c.581 1.254-1.457 2.02-2.083 2.31L10.006 9.25c.619-.289 2.506-1.4 3.111-.09"></path>
      </svg>
    ),
    XRP: (
      <svg data-ds-icon="XRP" width="28" height="28" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" className={className} style={style}>
        <path fill="#5E5E5E" d="M22.974 12.026C22.974 18.086 18.06 23 12 23S1.026 18.087 1.026 12.026C1.026 5.966 5.94 1.052 12 1.052s10.974 4.914 10.974 10.974"></path>
        <path fill="#fff" d="m16.976 18.027-1.718-1.698-1.567-1.553a2.55 2.55 0 0 0-1.812-.754c-.707 0-1.348.288-1.81.754l-3.283 3.25H4.724l.3-.308 1.03-1.032 2.361-2.336c.282-.279.557-.568.856-.825a3.8 3.8 0 0 1 2.075-.93l.018-.002a3.93 3.93 0 0 1 3.146.946l-.005-.004c.244.21.46.443.688.667l2.8 2.77.987.98a.3.3 0 0 1 .047.057h.001zM6.82 6.16l1.17 1.16c.535.53 1.065 1.059 1.6 1.585q.348.358.725.675l.015.012a2.52 2.52 0 0 0 1.558.535c.702 0 1.337-.284 1.796-.745.75-.749 1.505-1.491 2.262-2.24l1.003-.983h2.062l-.234.247-2.189 2.158-1.904 1.884a3.84 3.84 0 0 1-2.2 1.087l-.02.002a3.9 3.9 0 0 1-3.304-1.033l.001.002c-.381-.343-.739-.722-1.106-1.086L4.81 6.208c-.017-.017-.03-.038-.048-.059z"></path>
      </svg>
    ),
    TRX: (
      <svg data-ds-icon="TRX" width="28" height="28" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" className={className} style={style}>
        <path fill="#EB0A29" d="M22.974 12.026C22.974 18.086 18.06 23 12 23S1.026 18.087 1.026 12.026C1.026 5.966 5.94 1.052 12 1.052s10.974 4.914 10.974 10.974"></path>
        <path fill="#fff" d="M5.37 5.816c.148.044.327.081.51.105l.016.001 10.459 1.915q.08.011.137.065l2.763 2.63c.045.04.052.065 0 .116q-1.155 1.399-2.302 2.801l-4.307 5.262-1.423 1.718-.044.048-.23-.57a4100 4100 0 0 1-2.668-6.709q-1.435-3.626-2.89-7.262a1 1 0 0 1-.037-.116v-.004zm5.774 12.486h.02q.059-.516.121-1.031c.08-.636.155-1.268.234-1.904q.102-.876.21-1.753c.072-.584.14-1.175.213-1.763l.003-.03a.14.14 0 0 0-.061-.114L6.92 7.579h-.017zm.798.041 5.873-7.155h-.079l-2.3.426-2.676.481c-.07 0-.086.045-.093.106 0 .19-.041.372-.066.557l-.23 1.908c-.075.636-.14 1.175-.213 1.763zM7.474 7.002v.02l.584.512 4.169 3.437a.1.1 0 0 0 .158 0 838 838 0 0 1 2.646-2.21l.365-.302zm5.866 4.19c.104 0 4.468-.788 4.582-.826 0 0 0-.024-.024-.034q-.784-.735-1.564-1.488c-.072-.069-.107-.059-.175 0-.653.55-1.313 1.096-1.97 1.643-.275.23-.553.46-.849.704"></path>
      </svg>
    ),
    EOS: (
      <svg data-ds-icon="EOS" width="28" height="28" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" className={className} style={style}>
        <path fill="#E7EAEF" d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11"></path>
        <path fill="#231F20" d="M12 20.422a.6.6 0 0 1-.172-.029l.004.001a.5.5 0 0 1-.102-.05l.002.002-5.27-3.159a.51.51 0 0 1-.233-.567v.003l1.845-7.645a.5.5 0 0 1 .077-.17l-.001.002 3.438-5.008a.54.54 0 0 1 .851-.002l.001.002 3.438 5.008q.052.073.075.165v.003l1.846 7.645q.015.057.015.125a.51.51 0 0 1-.246.438l-.003.001-5.297 3.16a.5.5 0 0 1-.093.043h-.003a.5.5 0 0 1-.172.032m3.293-9.666-2.406 8.023 3.802-2.283zm-7.975 5.74 3.802 2.283-2.406-8.023zm1.932-7.48L12 18.12l2.75-9.103L12 5.008z"></path>
      </svg>
    ),
    BNB: (
      <svg data-ds-icon="BNB" width="28" height="28" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" className={className} style={style}>
        <path fill="#F0B90B" fillRule="evenodd" d="M12 1c6.076 0 11 4.924 11 11s-4.924 11-11 11S1 18.076 1 12 5.924 1 12 1" clipRule="evenodd"></path>
        <path fill="#fff" d="m7.046 12 .008 2.909 2.471 1.454v1.703l-3.918-2.298v-4.619zm0-2.909v1.695l-1.44-.851V8.24l1.44-.852 1.446.852zm3.511-.851 1.44-.852 1.446.852-1.447.851z"></path>
        <path fill="#fff" d="M8.086 14.306v-1.703l1.439.851v1.695zm2.471 2.667 1.44.851 1.446-.851v1.695l-1.447.851-1.439-.851zm4.95-8.733 1.44-.852 1.446.852v1.695l-1.447.851V9.091zm1.44 6.669L16.954 12l1.44-.851v4.618l-3.918 2.298v-1.703z"></path>
        <path fill="#fff" d="m15.914 14.306-1.439.843v-1.695l1.44-.851z"></path>
        <path fill="#fff" d="m15.914 9.694.008 1.703-2.478 1.454v2.916l-1.44.844-1.439-.844v-2.916l-2.478-1.454V9.694l1.445-.851 2.464 1.461 2.478-1.461 1.447.851zM8.086 6.786l3.91-2.305 3.918 2.305-1.439.852-2.479-1.461-2.471 1.46z"></path>
      </svg>
    ),
    USDC: (
      <svg data-ds-icon="USDC" width="28" height="28" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" className={className} style={style}>
        <path fill="#0F97F8" d="M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11"></path>
        <path fill="#fff" d="M9.654 20.7c0 .293-.239.457-.514.375a9.39 9.39 0 0 1-6.545-8.965A9.38 9.38 0 0 1 9.14 3.154c.284-.091.514.083.514.376v.733c0 .193-.147.422-.33.486-3.007 1.11-5.152 3.997-5.152 7.361a7.84 7.84 0 0 0 5.152 7.352c.183.064.33.293.33.486z"></path>
        <path fill="#fff" d="M12.78 17.986c0 .22-.175.394-.395.394h-.78a.39.39 0 0 1-.393-.394v-1.238c-1.714-.238-2.549-1.182-2.769-2.493a.362.362 0 0 1 .367-.422h.89a.41.41 0 0 1 .384.312c.165.77.614 1.375 1.99 1.375 1.008 0 1.732-.568 1.732-1.412 0-.843-.422-1.164-1.907-1.411-2.19-.294-3.236-.963-3.236-2.677 0-1.32 1.009-2.365 2.558-2.576v-1.21c0-.22.174-.394.394-.394h.78a.39.39 0 0 1 .393.394v1.247c1.265.229 2.063.944 2.329 2.136.046.229-.129.43-.367.43h-.825a.4.4 0 0 1-.376-.284c-.229-.751-.76-1.09-1.705-1.09-1.036 0-1.576.495-1.576 1.2 0 .743.302 1.119 1.897 1.339 2.154.293 3.273.907 3.273 2.74 0 1.394-1.036 2.521-2.659 2.769v1.256h-.009z"></path>
        <path fill="#fff" d="M14.86 21.075c-.284.092-.513-.082-.513-.376v-.733a.5.5 0 0 1 .33-.486c2.997-1.1 5.151-3.988 5.151-7.352a7.84 7.84 0 0 0-5.151-7.351c-.184-.064-.33-.294-.33-.486v-.734c0-.293.238-.458.513-.375a9.36 9.36 0 0 1 6.545 8.946 9.41 9.41 0 0 1-6.545 8.965z"></path>
      </svg>
    ),
    APE: (
      <svg data-ds-icon="APE" width="28" height="28" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" className={className} style={style}>
        <path fill="#024AD6" d="M23 12c0 .55-.037 1.1-.12 1.632q-.024.192-.063.385c-.11.605-.275 1.191-.486 1.76h-.01s0 .018-.009.027a8 8 0 0 1-.302.761 11.2 11.2 0 0 1-2.218 3.208h-.01c-.165.175-.339.33-.513.486a10.9 10.9 0 0 1-5.72 2.631c-.046.01-.091.01-.137.018a11.05 11.05 0 0 1-4.684-.403h-.019a5 5 0 0 1-.531-.183 10.5 10.5 0 0 1-2.558-1.348 7 7 0 0 1-.596-.458c-.009 0-.018-.018-.037-.018a11.7 11.7 0 0 1-1.594-1.641 9 9 0 0 1-.615-.853c0-.009 0-.018-.009-.018a10.7 10.7 0 0 1-1.668-4.538c-.028-.128-.037-.247-.046-.366A11 11 0 0 1 1 12.009c0-.266.01-.522.037-.788 0-.101.009-.202.018-.312.202-2.072.99-3.987 2.19-5.564.092-.12.193-.238.294-.357a10.95 10.95 0 0 1 10.496-3.796 10.6 10.6 0 0 1 3.098 1.073c.156.083.303.174.459.257a11 11 0 0 1 4.776 5.811c.045.101.082.211.11.312q.3.921.421 1.898c.028.137.037.275.055.403q.044.52.046 1.054"></path>
        <path fill="#6FC0FF" d="M22.056 16.3c-.019.09-.028.183-.046.265.12-.248.21-.504.302-.76a.87.87 0 0 0-.256.494m.422-2.044a6.8 6.8 0 0 1-1.027 1.155 1.05 1.05 0 0 0-.34.67 9 9 0 0 1-.073.513c-.265 1.393-.889 2.364-1.118 2.731l-.65.935c.173-.156.348-.311.512-.477h.01l.247-.375a7.6 7.6 0 0 0 1.146-2.787c.037-.174.055-.348.082-.523a.83.83 0 0 1 .294-.577 7.5 7.5 0 0 0 1.036-1.182c.073-.101.146-.211.22-.321q.039-.193.064-.385a7 7 0 0 1-.404.623M3.217 5.409a7 7 0 0 0-.375 1.54l-.046.147-.064.1c-.285.432-.88 1.33-1.11 2.622a1.4 1.4 0 0 1-.155.404l-.413.678c-.01.11-.018.21-.018.312.027-.046.064-.101.1-.156l.459-.752c.082-.146.147-.302.174-.458C2 8.58 2.577 7.7 2.86 7.279l.038-.055.091-.247a7 7 0 0 1 .376-1.513l.046-.137.046-.12c.018-.064.046-.137.082-.229-.1.12-.201.239-.293.358zM22.9 10.543c-.02.055-.037.1-.056.146v.064a6.3 6.3 0 0 1-1.155 2.924c-.32.459-.706.871-1.136 1.22a.9.9 0 0 0-.275.33q-.097.192-.11.412c0 .257-.037.514-.092.77-.22 1.21-.77 2.053-1 2.411l-.522.788c-.797 1.055-1.732 1.733-2.86 2.081l-.229.073-.247.046a6 6 0 0 1-.972.083h-.34l-.375.018c-.202 0-.394.037-.587.101-.788.266-1.705.394-2.887.394-.67 0-1.32-.046-1.88-.091a5 5 0 0 0 .532.183h.019c.421.018.87.037 1.329.037 1.191 0 2.126-.129 2.933-.395a1.8 1.8 0 0 1 .54-.1l.386-.019h.32c.34.01.67-.027 1-.082l.266-.046.238-.073c1.155-.358 2.118-1.055 2.924-2.136l.532-.789c.238-.366.797-1.228 1.027-2.466q.066-.398.091-.797a.87.87 0 0 1 .32-.633c.45-.357.844-.779 1.165-1.246A6.1 6.1 0 0 0 22.698 12c.119-.348.201-.706.256-1.063-.018-.129-.027-.266-.055-.404zM9.222 1.944h.22a5 5 0 0 1 1.164.147 1.48 1.48 0 0 0 1.045-.11 6.2 6.2 0 0 1 1.916-.587.6.6 0 0 0 .128-.018c.1 0 .247-.028.44-.046q.165-.014.385-.028a8 8 0 0 0-.486-.1c-.147.018-.275.027-.357.036-.037.01-.083.01-.138.019a6.5 6.5 0 0 0-1.952.596 1.37 1.37 0 0 1-.954.1 4.7 4.7 0 0 0-1.191-.146h-.33a7 7 0 0 0-1.385.247A5.4 5.4 0 0 0 5.63 3.237l-.22.201-.201.248c-.605.742-.835 1.43-.963 1.797a.7.7 0 0 1-.055.155l-.037.11a6.5 6.5 0 0 0-.339 1.421c-.027.064-.046.129-.064.184l-.027.091a1 1 0 0 1-.065.156l-.1.147c-.257.394-.807 1.219-.981 2.374a1.7 1.7 0 0 1-.174.504l-.275.504-.028.037-.1.128-.138.193c-.376.54-.642 1.063-.807 1.595.01.119.018.238.046.366.147-.623.43-1.237.88-1.888l.128-.174.11-.138.303-.55c.1-.174.165-.366.192-.559.174-1.118.706-1.925.972-2.31l.1-.165.074-.174.028-.092c.018-.055.036-.119.064-.192.055-.477.174-.953.339-1.403l.037-.11.055-.165a5.3 5.3 0 0 1 .935-1.75l.192-.248.21-.183a5.4 5.4 0 0 1 2.045-1.155 6.2 6.2 0 0 1 1.357-.239h.1z"></path>
        <path fill="#fff" d="M19.342 8.627c-.045.265-.1.394-.155.54-.065.165-.147.34-.211.706-.028.147-.037.248-.055.349v.009c-.019.146-.028.247-.092.43a2 2 0 0 1-.33.66c-.165.212-.43.569-.788.615h-.12c-1.017-.523-1.897-.908-2.2-.99-.348-.101-.311-.871-.265-1.55.018-.302.036-.586.018-.834-.046-.852-.202-1.796-.944-2.254-.45-.276-1.018-.349-1.568-.358.101-.046.211-.11.34-.183.32-.193.724-.422 1.127-.459.128-.009.257-.027.385-.045.807-.092 1.494-.165 2.228.082.33.11 1.017.495 1.191.843.12.248.33.44.752.835.22.201.357.32.467.403.147.128.175.146.22.238.138.275.083.569.019.972zm-3.73 3.52c.054.018.082.091.045.146-.11.165-.229.385-.376.651-.073.128-.137.257-.192.348-.202.34-.21.624-.23.853-.008.238-.027.348-.164.45-.12.082-.239.11-1.082.228-.146.019-.21.055-.266.074-.009 0-.018 0-.027.009-.055.027-.12-.028-.11-.092 0-.119.009-.266.009-.44v-.44c-.01-.21-.01-.302.046-.394a.6.6 0 0 1 .21-.202c.129-.082.294-.183.55-.54.138-.184.166-.285.184-.376 0-.037.01-.046.12-.129.11-.082.448-.339.88-.265.11.018.256.064.412.11zm-3.319 3.877s-.036.037-.073.037c-.092 0-.147-.018-.192-.064-.083-.101-.074-.321-.055-.44l.357-.092c.028.193.037.458-.037.568zm.027-1.284c0 .056-.008.11-.008.175v.257c-.11.036-.202.036-.33.036v-.302c0-.064 0-.184.018-.211.037 0 .064-.01.1-.018a.7.7 0 0 1 .23-.028v.083zm-.66 1.174c-.018.184-.073.403-.247.44-.073.018-.11 0-.137-.027-.12-.11-.138-.431-.12-.66.074 0 .175-.019.294-.037.073-.018.147-.028.202-.046 0 .083.009.211 0 .33zm-.082-.651-.385.138c.019-.147.046-.358.055-.504 0-.101.037-.129.037-.138h.018l.248-.009c.01.11.01.367 0 .523zm-.614-.119c-.018.055-.046.22-.064.34l-.486-.019a2.6 2.6 0 0 1 .11-.422c.046-.119.092-.21.129-.238.045-.027.155-.037.22.018.11.092.137.193.091.312zm-.184 1.476a.2.2 0 0 1-.127.082c-.056 0-.092 0-.129-.036-.156-.138-.137-.596-.137-.816a5 5 0 0 1 .522-.092c.018.184.018.66-.128.862m-.632-1.173c-.028.064-.046.119-.065.174-.055.018-.229 0-.403-.037l.12-.76c.2-.056.43-.074.485-.01.073.073-.073.468-.137.633m-.22 1.283c-.092.12-.239.165-.431.165-.138 0-.184-.055-.211-.092-.11-.174 0-.577.1-.834l.652.037s.009.1.018.165c0 .183-.018.412-.138.559z"></path>
      </svg>
    ),
    BUSD: (
      <svg data-ds-icon="BUSD" width="28" height="28" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" className={className} style={style}>
        <path fill="#F0B90B" d="M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11"></path>
        <path fill="#473800" d="m12 3.887 2.007 2.054-5.05 5.05-2.008-2.007zm3.043 3.043 2.008 2.054-8.085 8.085-2.008-2.007zm-9.13 3.044 2.008 2.053-2.008 2.008-2.007-2.008zm12.174 0 2.007 2.053-8.085 8.086-2.007-2.008 8.085-8.14z"></path>
      </svg>
    ),
    CRO: (
      <svg data-ds-icon="CRO" width="28" height="28" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" className={className} style={style}>
        <path fill="#0F76F8" d="M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11"></path>
        <path fill="#fff" d="m12 22.175-8.818-5.088V6.912L12 1.825l8.818 5.087v10.185L12 22.184zm-8.076-5.51L12 21.333l8.076-4.666V7.334L12 2.677 3.924 7.334z"></path>
        <path fill="#fff" d="M15.29 6.463H8.664l-.77 3.383h8.214zm-5.453 8.021v-2.246l-1.971-1.237-2.228 1.65 3.034 5.28h1.22l1.43-1.348v-.66l-1.495-1.43z"></path>
        <path fill="#fff" d="M14.136 10.35H9.855l.706 1.88-.211 2.117h3.29l-.21-2.118z"></path>
        <path fill="#fff" d="m16.107 10.973-1.944 1.265v2.246l-1.476 1.43v.66l1.43 1.33h1.201l3.016-5.262z"></path>
      </svg>
    ),
    DAI: (
      <svg data-ds-icon="DAI" width="28" height="28" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" className={className} style={style}>
        <path fill="#F5AC37" d="M12 1c6.078 0 11 4.923 11 11 0 6.078-4.922 11-11 11-6.077 0-11-4.922-11-11C1 5.923 5.923 1 12 1"></path>
        <path fill="#FEFEFD" d="M12.403 12.78h4.18c.092 0 .129 0 .138-.12a7.4 7.4 0 0 0 0-1.274c0-.083-.037-.12-.129-.12H8.27c-.1 0-.128.037-.128.129v1.22q0 .155.165.155h4.097zm3.85-2.943s.01-.064 0-.092a3 3 0 0 0-.247-.43 3.4 3.4 0 0 0-.514-.643 1.7 1.7 0 0 0-.32-.311 5 5 0 0 0-2.063-1.045 5.6 5.6 0 0 0-1.164-.128H8.26c-.1 0-.12.036-.12.128v2.438c0 .101 0 .129.13.129h7.928s.074-.019.083-.055h-.037zm0 4.372a2 2 0 0 0-.348 0H8.278c-.1 0-.137 0-.137.138v2.383c0 .11 0 .137.137.137h3.52c.165.01.34 0 .504-.036a5.2 5.2 0 0 0 1.495-.33c.174-.064.339-.138.504-.23h.046a4.44 4.44 0 0 0 1.915-1.934s.046-.1 0-.128zm-9.496.092c0-.092 0-.101-.11-.101H5.152c-.082 0-.119 0-.119-.11v-1.31h1.595c.092 0 .129 0 .129-.12v-1.293c0-.082 0-.1-.11-.1H5.152c-.082 0-.119 0-.119-.11v-1.21c0-.074 0-.092.11-.092H6.62c.1 0 .128 0 .128-.128V6.023c0-.11 0-.137.138-.137h5.152a8 8 0 0 1 1.118.128c.76.138 1.485.413 2.154.798.44.256.853.577 1.21.935.275.284.513.586.733.916s.395.688.541 1.054c.019.092.11.165.202.147h1.228q.157 0 .165.156v1.128c0 .11-.036.137-.156.137h-.953c-.092 0-.128 0-.12.128.038.422.038.844 0 1.256 0 .12 0 .128.13.128h1.08c.047.065 0 .129 0 .184v1.072c0 .12-.036.156-.137.156h-1.301c-.092-.018-.174.037-.202.129a5.6 5.6 0 0 1-1.448 2.108c-.23.21-.477.412-.734.586-.275.156-.54.321-.825.459a7.8 7.8 0 0 1-1.622.513 8.7 8.7 0 0 1-1.613.128h-4.73z"></path>
      </svg>
    ),
    LINK: (
      <svg data-ds-icon="LINK" width="28" height="28" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" className={className} style={style}>
        <path fill="#3B55D8" d="M12 1c6.078 0 11 4.923 11 11 0 6.078-4.922 11-11 11-6.077 0-11-4.922-11-11C1 5.923 5.923 1 12 1"></path>
        <path fill="#fff" d="m12 7.453 3.95 2.274v4.546l-3.932 2.283-3.95-2.246V9.745zm0-3.346-6.838 3.98v7.892l1.448.835 3.95 2.264 1.45.834 6.828-3.979v-7.91L13.44 4.914 12 4.098z"></path>
      </svg>
    ),
    SAND: (
      <svg data-ds-icon="SAND" width="28" height="28" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" className={className} style={style}>
        <path fill="#0F94F8" d="M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11"></path>
        <path fill="#fff" d="M8.306 6.188 7.114 7.38v4.712l1.192 1.191h4.711v2.375H10.69v-1.192H7.123v2.374l1.192 1.192H15.4l1.191-1.192v-4.748l-1.19-1.192h-4.712V8.526h2.374v1.191h3.566V7.343l-1.192-1.191H8.306v.045z"></path>
      </svg>
    ),
    SHIB: (
      <svg data-ds-icon="SHIB" width="28" height="28" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" className={className} style={style}>
        <path fill="#EB0A29" d="M12 1c6.078 0 11 4.923 11 11 0 6.078-4.922 11-11 11-6.077 0-11-4.922-11-11C1 5.923 5.923 1 12 1"></path>
        <path fill="#000" d="M16.272 12.33s-.12.156-.239.238c-.339.248-.935.477-1.549.587-.348.064-.696.073-.797.018-.064-.036-.074-.064-.055-.146.055-.184.22-.385.476-.569.129-.091.66-.421.908-.55.412-.22.742-.357.962-.385a.6.6 0 0 1 .184 0c.046.019.091.147.11.303.009.082 0 .449 0 .513zm-5.729.807s-.092.064-.175.073c-.082.01-.339 0-.476-.01a5 5 0 0 1-1.458-.42 2 2 0 0 1-.504-.34l-.064-.073v-.092a2.3 2.3 0 0 1 0-.504.6.6 0 0 1 .073-.211l.11-.027c.11 0 .193.018.34.064.302.091.742.311 1.283.641.449.266.614.395.742.578.092.11.147.266.129.32m3.437 3.384s-.027.128-.064.265a5 5 0 0 0-.064.257h-.147l-.11.256c-.055.138-.11.266-.12.285l-.017.036-.11-.165v-.669h-.019s-.339.055-.467.064a6.2 6.2 0 0 1-1.595-.037l-.156-.018v.697l-.037.064c-.018.037-.046.064-.046.064s-.027-.027-.091-.146a2 2 0 0 1-.138-.367l-.018-.074h-.073l-.074.01-.018-.092c-.01-.046-.018-.128-.028-.165v-.073l-.073-.055c-.037-.028-.073-.064-.082-.064a.07.07 0 0 1-.019-.046v-.028h.605v.028l.019.027h.1c.055 0 .248.01.413.018h.302l.074-.11.082-.119h.101v-.513l-.137-.055c-.431-.193-.679-.403-.78-.67-.018-.054-.018-.072-.027-.31 0-.24 0-.267.018-.312a.35.35 0 0 1 .248-.248c.046-.01.146-.01.724-.01h.678l.074.038a.4.4 0 0 1 .183.146c.055.073.073.138.073.284 0 .211-.018.395-.036.468a1 1 0 0 1-.138.275c-.12.156-.34.312-.54.385l-.056.018v.513h.055l.055.01.147.22h.678c.028 0 .028 0 .055-.037l.028-.046h.275c.21-.009.275 0 .275 0z"></path>
        <path fill="#FFA409" d="M18.756 14.008c0-.11-.018-.266-.018-.34a7.1 7.1 0 0 0-.917-2.96c-.018-.037-.046-.074-.055-.101 0 0 0-.019-.01-.019.074-.229.386-1.173.633-2.255.33-1.466.541-3.18-.1-3.694 0 0-1.119-.082-2.613 1.384-.403.404-.78.844-1.11 1.311l-.1-.036a7.6 7.6 0 0 0-1.852-.358 12 12 0 0 0-1.127 0 6.6 6.6 0 0 0-1.843.357l-.064.028a9 9 0 0 0-1.146-1.302C6.876 4.548 5.721 4.63 5.721 4.63c-.688.532-.45 2.328-.1 3.84.228 1 .522 1.89.622 2.2 0 .02-.018.037-.027.056-.568 1.146-.87 2.255-.944 3.428.632-.091 2.383-.192 3.694 1.21 0 0 .862-2.282 3.2-2.282s2.832 2.282 2.832 2.282a5.17 5.17 0 0 1 3.795-1.173c0-.046 0-.12-.01-.193zM6.683 9.763s-.907-2.273-.678-3.565c.037-.22.11-.413.23-.56 0 0 1.026.101 2.694 1.953 0 0-.311.156-.742.477a5.9 5.9 0 0 0-1.504 1.695m3.86 3.374s-.092.064-.175.073c-.082.01-.339 0-.476-.01a5 5 0 0 1-1.458-.42 2 2 0 0 1-.504-.34l-.064-.073v-.092a2.3 2.3 0 0 1 0-.504.6.6 0 0 1 .073-.211l.11-.027c.11 0 .193.018.34.064.302.091.742.311 1.283.641.449.266.614.395.742.578.092.11.147.266.129.32m5.72-.807s-.12.156-.239.238c-.339.248-.935.477-1.549.587-.348.064-.697.073-.797.018-.065-.036-.074-.064-.055-.146.055-.184.22-.385.476-.569.129-.091.66-.421.908-.55.412-.22.742-.357.962-.385a.6.6 0 0 1 .184 0c.046.019.091.147.11.303.009.082 0 .449 0 .513zm-.404-4.272a4.3 4.3 0 0 0-.715-.476c1.604-1.843 2.604-1.953 2.604-1.953.11.147.183.34.22.56.229 1.301-.651 3.574-.651 3.574a5.8 5.8 0 0 0-1.449-1.695z"></path>
      </svg>
    ),
    UNI: (
      <svg data-ds-icon="UNI" width="28" height="28" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" className={className} style={style}>
        <path fill="#FF007A" d="M23 12c0 6.068-4.922 11-11 11-6.077 0-11-4.932-11-11 0-3.52 1.65-6.646 4.217-8.662.055-.046.119-.092.174-.129A10.9 10.9 0 0 1 12 1c6.078 0 11 4.923 11 11"></path>
        <path fill="#fff" d="M9.497 4.868c-.21-.027-.22-.036-.119-.055.193-.027.642.01.954.083.733.174 1.384.614 2.09 1.402l.183.211.266-.037c1.127-.183 2.282-.036 3.245.404.265.119.678.366.733.422.018.018.055.155.073.284.074.476.037.834-.11 1.1-.082.155-.082.192-.027.32.037.101.165.175.275.175.247 0 .495-.385.614-.926l.055-.211.092.1c.513.578.925 1.376.98 1.944l.019.156-.092-.128c-.156-.23-.293-.385-.486-.514-.348-.229-.706-.302-1.668-.357-.87-.055-1.366-.12-1.852-.284-.834-.275-1.255-.633-2.236-1.935-.44-.577-.706-.889-.981-1.155-.596-.577-1.192-.88-1.971-.999z"></path>
      </svg>
    ),
    POL: (
      <svg data-ds-icon="MATIC" width="28" height="28" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" className={className} style={style}>
        <path fill="#914FFF" d="M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11"></path>
        <path fill="#fff" d="M16.024 9.323c-.284-.165-.65-.165-.98 0l-2.292 1.348-1.559.862-2.245 1.347c-.284.165-.651.165-.981 0l-1.76-1.063a1.01 1.01 0 0 1-.495-.862V8.911c0-.33.165-.651.495-.862l1.76-1.026c.284-.165.65-.165.98 0l1.76 1.063c.285.165.496.495.496.861v1.348l1.558-.898V8.003c0-.33-.165-.65-.495-.861L8.994 5.217c-.285-.165-.651-.165-.981 0L4.658 7.178a.9.9 0 0 0-.495.816v3.841c0 .33.165.65.495.862l3.309 1.925c.284.165.65.165.98 0l2.247-1.311 1.558-.899 2.246-1.31c.284-.165.65-.165.98 0l1.76 1.026c.285.165.495.495.495.862v2.044c0 .33-.165.651-.495.862l-1.714 1.026c-.284.165-.65.165-.98 0l-1.76-1.026a1.01 1.01 0 0 1-.495-.862v-1.31l-1.559.898v1.347c0 .33.165.651.495.862l3.31 1.925c.284.165.65.165.98 0l3.31-1.925c.284-.165.494-.495.494-.862v-3.886c0-.33-.165-.651-.495-.862l-3.309-1.925z"></path>
      </svg>
    ),
    TRUMP: (
      <svg data-ds-icon="TRUMP" width="28" height="28" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" className={className} style={style}>
        <path fill="#E1B367" d="M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11"></path>
        <path fill="#fff" d="m13.47 16.666-.902 2.56-4.524-6.897.155-.87c2.513-2.545 7.784 2.662 5.27 5.207"></path>
        <path fill="#030303" d="M13.793 18.097c-.002-.535.098-1.065-.324-1.431.345-.176.68-.35 1.02-.519.367-.18.72-.41 1.107-.518.477-.134.933-.29 1.362-.537.363-.207.481-.496.334-.886q-.045-.114-.084-.23c-.045-.14-.045-.246.126-.315.07-.027.11-.144.154-.225.034-.06.037-.148.084-.19.157-.144.159-.31.118-.497-.036-.164-.06-.329-.092-.51l.31-.018c.364-.027.504-.183.447-.547-.032-.199-.113-.391-.185-.582-.138-.359-.294-.712-.426-1.072-.062-.169-.117-.368.09-.482.178-.098.214-.24.18-.412-.053-.278-.121-.553-.198-.889.263 0 .513-.002.763.001.224.004.432-.04.551-.248.033-.056.024-.177-.017-.228-.183-.23-.386-.441-.578-.663-.992-1.146-2.174-1.994-3.696-2.259a18 18 0 0 0-2.15-.22c-.932-.05-1.817.157-2.576.723-.65.484-1.184 1.064-1.21 1.948-.003.07-.048.138-.071.207-.12.356-.27.706-.353 1.07-.092.404-.204.786-.437 1.136-.11.165-.17.375-.204.574-.077.436-.283.798-.567 1.124-.184.21-.16.469.084.612.124.073.27.134.412.147.324.032.613.128.885.312.591.398 1.206.761 1.788 1.17 1.099.773 2.122 1.63 2.822 2.803.05.082.092.211.062.288-.232.582-.482 1.156-.749 1.787-.083-.25-.138-.437-.207-.62-.504-1.335-1.209-2.54-2.256-3.53-.707-.67-1.387-1.368-2.068-2.042-.707.517-1.401.997-2.063 1.517-.729.572-1.421 1.178-1.922 1.956a10.02 10.02 0 0 0 10.312 4.933c-.132-.38-.261-.76-.36-1.15-.125-.484-.217-.99-.218-1.488"></path>
        <path fill="#6D4600" d="M12 21.252c-5.101 0-9.252-4.15-9.252-9.252 0-5.101 4.15-9.252 9.252-9.252 5.101 0 9.252 4.15 9.252 9.252 0 5.101-4.15 9.252-9.252 9.252m0-17.83C7.27 3.422 3.422 7.27 3.422 12S7.27 20.578 12 20.578 20.578 16.73 20.578 12 16.73 3.422 12 3.422"></path>
      </svg>
    ),
  };
  return icons[code] || (
    <svg fill="none" viewBox="0 0 24 24" className={className} style={style} width="28" height="28">
      <circle cx="12" cy="12" r="12" fill="#26A17B" />
    </svg>
  );
};

// Currency data with networks - ordered as specified
const currencies = [
  { code: "BTC", name: "Bitcoin", networks: ["BTC"] },
  { code: "ETH", name: "Ethereum", networks: ["ETH", "BSC", "POL", "TRX"] },
  { code: "LTC", name: "Litecoin", networks: ["LTC"] },
  { code: "USDT", name: "USD Tether", networks: ["ETH", "BSC", "POL", "TRX", "SOL"] },
  { code: "SOL", name: "Solana", networks: ["SOL"] },
  { code: "DOGE", name: "Dogecoin", networks: ["DOGE"] },
  { code: "BCH", name: "Bitcoin Cash", networks: ["BCH"] },
  { code: "XRP", name: "Ripple", networks: ["XRP"] },
  { code: "TRX", name: "Tron", networks: ["TRX"] },
  { code: "EOS", name: "EOS", networks: ["EOS"] },
  { code: "BNB", name: "Binance Coin", networks: ["BSC"] },
  { code: "USDC", name: "USD Coin", networks: ["ETH", "BSC", "POL", "TRX", "SOL"] },
  { code: "APE", name: "Apecoin", networks: ["ETH", "BSC", "POL"] },
  { code: "BUSD", name: "Binance USD", networks: ["BSC", "ETH"] },
  { code: "CRO", name: "Cronos", networks: ["CRO"] },
  { code: "DAI", name: "DAI", networks: ["ETH", "BSC", "POL"] },
  { code: "LINK", name: "Chainlink", networks: ["ETH", "BSC", "POL"] },
  { code: "SAND", name: "Sandbox", networks: ["ETH", "BSC", "POL"] },
  { code: "SHIB", name: "Shiba Inu", networks: ["ETH", "BSC", "POL"] },
  { code: "UNI", name: "Uniswap", networks: ["ETH", "BSC", "POL"] },
  { code: "POL", name: "Polygon", networks: ["POL"] },
  { code: "TRUMP", name: "TRUMP Coin", networks: ["ETH", "BSC", "POL"] },
];

const networkNames = {
  BTC: "BTC - Bitcoin",
  ETH: "ETH - Ethereum (ERC20)",
  BSC: "BSC - BNB Smart Chain (BEP20)",
  POL: "POL - Polygon",
  TRX: "TRX - Tron (TRC20)",
  SOL: "SOL - Solana",
  LTC: "LTC - Litecoin",
  DOGE: "DOGE - Dogecoin",
  BCH: "BCH - Bitcoin Cash",
  XRP: "XRP - Ripple",
  CRO: "CRO - Cronos",
  EOS: "EOS - EOS",
};

export default function WalletModal({ onClose, onBack, bonusPercent = "150" }) {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]); // BTC is now first
  const [selectedNetwork, setSelectedNetwork] = useState("BTC");
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [isNetworkOpen, setIsNetworkOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [depositAddress, setDepositAddress] = useState("0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb");
  const [qrCode, setQrCode] = useState("/stakepromotions.com/images/qrcodes/eth-1.png");
  const [walletData, setWalletData] = useState(null);
  const [copied, setCopied] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isCopyClicked, setIsCopyClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const currencyRef = useRef(null);
  const networkRef = useRef(null);

  useEffect(() => {
    // Small delay to ensure smooth transition
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isVisible) {
      document.body.classList.add("body-scroll-hidden");
    }
    return () => {
      document.body.classList.remove("body-scroll-hidden");
    };
  }, [isVisible]);

  // Load wallet data from wallet.txt
  useEffect(() => {
    const loadWalletData = async () => {
      try {
        const response = await fetch('/wallet.txt');
        if (response.ok) {
          const text = await response.text();
          const data = JSON.parse(text);
          setWalletData(data);
        }
      } catch (error) {
        console.warn('Failed to load wallet.txt, using default addresses:', error);
      }
    };
    loadWalletData();
  }, []);

  // Update address and QR code when currency or network changes
  useEffect(() => {
    if (!walletData) return;

    const currencyCode = selectedCurrency.code;
    const network = selectedNetwork;

    // Get wallet data for this currency/network combination
    let address = "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"; // default
    let qr = "/stakepromotions.com/images/qrcodes/eth-1.png"; // default

    if (walletData[currencyCode]) {
      const currencyData = walletData[currencyCode];
      
      // Check if currency has network-specific addresses (like ETH, USDT, etc.)
      if (currencyData[network]) {
        address = currencyData[network].address || address;
        qr = currencyData[network].qrCode || qr;
      } 
      // Otherwise, it's a single address currency (like BTC, LTC, etc.)
      else if (currencyData.address) {
        address = currencyData.address;
        qr = currencyData.qrCode || qr;
      }
    }

    setDepositAddress(address);
    setQrCode(qr);
  }, [selectedCurrency, selectedNetwork, walletData]);

  useEffect(() => {
    // Update networks when currency changes
    if (selectedCurrency.networks.length > 0) {
      setSelectedNetwork(selectedCurrency.networks[0]);
    }
  }, [selectedCurrency]);

  useEffect(() => {
    // Close dropdowns when clicking outside
    const handleClickOutside = (event) => {
      if (currencyRef.current && !currencyRef.current.contains(event.target)) {
        setIsCurrencyOpen(false);
      }
      if (networkRef.current && !networkRef.current.contains(event.target)) {
        setIsNetworkOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  const handleBack = () => {
    setIsVisible(false);
    if (onBack) onBack();
  };

  const handleCurrencySelect = (currency) => {
    setSelectedCurrency(currency);
    setIsCurrencyOpen(false);
    setSearchQuery("");
  };

  const handleNetworkSelect = (network) => {
    setSelectedNetwork(network);
    setIsNetworkOpen(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(depositAddress);
      setCopied(true);
      setIsCopyClicked(true);
      setTimeout(() => {
        setCopied(false);
        setIsCopyClicked(false);
      }, 3000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = depositAddress;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setIsCopyClicked(true);
        setTimeout(() => {
          setCopied(false);
          setIsCopyClicked(false);
        }, 3000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
      document.body.removeChild(textArea);
    }
  };

  const handleDirectDeposit = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const filteredCurrencies = currencies.filter(
    (currency) =>
      currency.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      currency.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const availableNetworks = selectedCurrency.networks || [];

  return (
    <div
      id="myModal"
      className={`fixed inset-0 p-4 flex items-center justify-center text-[length:var(--text-size-default)] z-[1550] transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ zIndex: 1550 }}
      onClick={(e) => {
        if (e.target.id === "myModal") handleClose();
      }}
    >
      {/* Overlay/Backdrop */}
      <div
        data-modal-overlay=""
        aria-hidden="true"
        className="absolute inset-0 bg-black/75 touch-none transition-opacity duration-300"
        onClick={handleClose}
      />

      {/* Modal Card */}
      <div
        data-modal-card=""
        className={`modal-scroll-y rounded-md bg-cover bg-center relative w-full min-w-[200px] max-w-[500px] max-h-[calc(100%-4em)] flex flex-col text-grey-200 overflow-hidden transition-transform duration-300 ${
          isVisible ? "scale-100" : "scale-95"
        }`}
        style={{ backgroundColor: "#1a2c38" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div data-modal-header="" className="touch-none p-4 flex justify-between">
          <div className="stack x-stretch y-center gap-small padding-none direction-horizontal padding-left-auto padding-top-auto padding-bottom-auto padding-right-auto">
            <h2 className="weight-semibold line-height-default align-left size-base text-size-base variant-highlighted with-icon-space">
              <svg
                data-ds-icon="Wallet"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="inline-block shrink-0"
              >
                <path
                  fill="currentColor"
                  d="M21 6h-4c0 .71-.16 1.39-.43 2H20c.55 0 1 .45 1 1s-.45 1-1 1H4c-.55 0-1-.45-1-1s.45-1 1-1h3.43C7.16 7.39 7 6.71 7 6H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2m-2 11c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2"
                />
                <path
                  fill="currentColor"
                  d="M9.38 9h5.24C15.46 8.27 16 7.2 16 6c0-2.21-1.79-4-4-4S8 3.79 8 6c0 1.2.54 2.27 1.38 3"
                />
              </svg>
            </h2>
            <h3
              type="heading"
              variant="neutral-default"
              size="md"
              className="text-neutral-default ds-heading-md"
              data-ds-text="true"
              style={{ marginLeft: "0.5rem" }}
            >
              Wallet
            </h3>
          </div>

          <button
            type="button"
            tabIndex={0}
            className="inline-flex relative items-center gap-2 justify-center rounded-sm font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-grey-200 hover:bg-transparent hover:text-white focus-visible:text-white focus-visible:outline-hidden text-base leading-none"
            aria-label="Close Modal"
            data-modal-close="true"
            data-testid="modal-close"
            data-button-root=""
            id="closeModalBtn"
            onClick={handleClose}
          >
            <svg
              data-ds-icon="Cross"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="inline-block shrink-0"
            >
              <path
                fill="currentColor"
                d="M4.293 4.293a1 1 0 0 1 1.338-.069l.076.069L12 10.586l6.293-6.293.076-.069a1 1 0 0 1 1.407 1.407l-.069.076L13.414 12l6.293 6.293.069.076a1 1 0 0 1-1.407 1.406l-.076-.068L12 13.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L10.586 12 4.293 5.707l-.068-.076a1 1 0 0 1 .068-1.338"
              />
            </svg>
          </button>
        </div>
        {/* Back Button */}
        <div>
          <button
            type="button"
            tabIndex={0}
            id="wallet-back-btn"
            style={{ paddingLeft: "1rem", paddingBottom: "1rem", cursor: "pointer" }}
            className="pl-[1rem] pr-[1rem] pb-[1rem] inline-flex relative items-center gap-2 justify-center rounded-sm font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white hover:bg-transparent hover:text-white focus-visible:outline-hidden text-sm leading-none [&_svg]:text-grey-200 [&:hover>svg]:text-white"
            data-test="wallet-back-overview"
            data-button-root=""
            onClick={handleBack}
          >
            <svg
              data-ds-icon="ChevronLeft"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="inline-block shrink-0"
            >
              <path
                fill="currentColor"
                d="M14.293 5.293a1 1 0 1 1 1.414 1.414L10.414 12l5.293 5.293.068.076a1 1 0 0 1-1.406 1.406l-.076-.068-6-6a1 1 0 0 1 0-1.414z"
              />
            </svg>
            <h2
              id="deposit-id"
              className="weight-semibold line-height-default align-left size-base text-size-base variant-highlighted with-icon-space"
              style={{ cursor: "pointer", pointerEvents: "auto" }}
            >
              Deposit Bonus ({bonusPercent}%)
            </h2>
          </button>
        </div>

        {/* Content */}
        <div data-modal-content="" className=" ">
          <div className="content" style={{ paddingRight: "1rem", paddingLeft: "1rem", paddingBottom: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {/* Currency Selection */}
            <div className="form-group">
              <span
                tag="span"
                type="body"
                size="sm"
                strong="true"
                className="ds-body-sm-strong"
                data-ds-text="true"
                style={{ color: "#b1bad3", display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}
              >
                Currency
              </span>

              <div className="dropdown-container" ref={currencyRef} style={{ position: "relative" }}>
                <div
                  className={`custom-select currency-selection ${isCurrencyOpen ? "active" : ""}`}
                  id="currency-select"
                  aria-haspopup="listbox"
                  aria-expanded={isCurrencyOpen}
                  style={{ position: "relative" }}
                >
                  <div
                    className="select-display rounded-[0.5rem]"
                    style={{ 
                      borderRadius: "0.5rem",
                      backgroundColor: "#2f4553",
                      position: "relative",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)"
                    }}
                    onClick={() => {
                      setIsCurrencyOpen(!isCurrencyOpen);
                      setIsNetworkOpen(false);
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", width: "100%",  }}>
                      <div style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", width: "28px", height: "28px" }}>
                        <CurrencyIcon code={selectedCurrency.code} className="svg-icon" style={{ width: "28px", height: "28px", display: "block" }} />
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", gap: "0px", flex: 1, minWidth: 0 }}>
                        <span style={{ fontSize: "16px", color: "#fff", fontWeight: "600", lineHeight: "1.25", display: "block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", width: "100%", marginBottom: "2px" }}>
                          {selectedCurrency.code}
                        </span>
                        <span style={{ fontSize: "13px", color: "#b1bad3", fontWeight: "400", lineHeight: "1.25", display: "block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", width: "100%" }}>
                          {selectedCurrency.name}
                        </span>
                      </div>
                      <span style={{ 
                        flexShrink: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transform: isCurrencyOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.2s",
                        width: "14px",
                        height: "14px"
                      }}>
                        <svg
                          fill="currentColor"
                          viewBox="0 0 64 64"
                          style={{ 
                            width: "14px",
                            height: "14px",
                            color: "#fff"
                          }}
                        >
                          <path d="M32.271 49.763 9.201 26.692l6.928-6.93 16.145 16.145 16.144-16.144 6.93 6.929-23.072 23.07z" />
                        </svg>
                      </span>
                    </div>
                  </div>
                  {isCurrencyOpen && (
                    <>
                      <div
                        style={{
                          position: "absolute",
                          left: "50%",
                          transform: "translateX(-50%)",
                          top: "calc(100% + 0px)",
                          width: "0",
                          height: "0",
                          borderLeft: "8px solid transparent",
                          borderRight: "8px solid transparent",
                          borderBottom: "8px solid #2f4553",
                          zIndex: 1001,
                        }}
                      ></div>
                      <div
                        style={{ 
                          borderRadius: "0.5rem",
                          position: "absolute",
                          top: "calc(100% + 8px)",
                          left: 0,
                          right: 0,
                          background: "#2f4553",
                          maxHeight: "258px",
                          overflowY: "auto",
                          overflowX: "hidden",
                          zIndex: 1000,
                          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                          scrollbarWidth: "none",
                          msOverflowStyle: "none",
                        }}
                        onWheel={(e) => {
                          e.currentTarget.scrollTop += e.deltaY;
                        }}
                      >
                        {/* Search Input - Sticky, not scrollable */}
                        <div style={{ 
                          position: "sticky",
                          top: 0,
                          zIndex: 10,
                          background: "#2f4553",
                          padding: "8px"
                        }}>
                          <div style={{ width: "100%", position: "relative" }}>
                            <div style={{ 
                              position: "absolute",
                              left: "12px",
                              top: "50%",
                              transform: "translateY(-50%)",
                              display: "flex",
                              alignItems: "center",
                              pointerEvents: "none"
                            }}>
                              <svg
                                data-ds-icon="Search"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                style={{ color: "#53626a" }}
                              >
                                <path
                                  fill="currentColor"
                                  d="m22.71 21.29-4.82-4.82a9.47 9.47 0 0 0 2.12-5.97c0-5.25-4.25-9.5-9.5-9.5S1 5.25 1 10.5 5.25 20 10.5 20c2.26 0 4.34-.79 5.97-2.12l4.82 4.82c.2.2.45.29.71.29s.51-.1.71-.29a.996.996 0 0 0 0-1.41M3 10.5C3 6.36 6.36 3 10.5 3S18 6.36 18 10.5 14.64 18 10.5 18 3 14.64 3 10.5"
                                />
                              </svg>
                            </div>
                            <input
                              id="input-input-search"
                              autoComplete="on"
                              type="search"
                              placeholder="Search"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              spellCheck={false}
                              style={{
                                width: "100%",
                                background: "#0f212e",
                                border: "1px solid #3a5568",
                                borderRadius: "0.5rem",
                                padding: searchQuery ? "0.625rem 2.5rem 0.625rem 2.75rem" : "0.625rem 0.625rem 0.625rem 2.75rem",
                                outline: 0,
                                cursor: "text",
                                color: "#fff",
                                fontSize: "1rem",
                                fontFamily: "inherit",
                                // Make sure background-color stays correct for autofill
                                WebkitBoxShadow: "0 0 0px 1000px #0f212e inset"
                              }}
                            />
                            {/* Inline style for placeholder color */}
                            <style>
                              {`
                                #input-input-search::placeholder {
                                  color: #4f5f6a !important;
                                  opacity: 1 !important;
                                }
                                #input-input-search::-webkit-input-placeholder { color: #4f5f6a !important; }
                                #input-input-search::-moz-placeholder { color: #4f5f6a !important; }
                                #input-input-search:-ms-input-placeholder { color: #4f5f6a !important; }
                                #input-input-search::-ms-input-placeholder { color: #4f5f6a !important; }
                              `}
                            </style>
                            {/* X (clear) button */}
                            {searchQuery && (
                              <button
                                type="button"
                                onClick={() => setSearchQuery("")}
                                tabIndex={-1}
                                aria-label="Clear"
                                style={{
                                  position: "absolute",
                                  right: "12px",
                                  top: "50%",
                                  transform: "translateY(-50%)",
                                  background: "transparent",
                                  border: "none",
                                  padding: 0,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  cursor: "pointer",
                                }}
                              >
                                <svg
                                  width="18"
                                  height="18"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  style={{ color: "#fff", display: "block" }}
                                >
                                  <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                  <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                              </button>
                            )}
                          </div>
                        </div>
                        {/* Currency Options */}
                        <div 
                          id="currency-options" 
                          style={{ 
                            overflowY: "auto", 
                            maxHeight: "200px",
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                          }}
                          className="currency-options-scroll"
                        >
                        {filteredCurrencies.map((currency) => (
                          <div
                            key={currency.code}
                            className="option inline-flex relative items-center gap-2 font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] text-white focus-visible:outline-white text-xs leading-none justify-start shadow-none w-full rounded-none py-2 px-4"
                            role="option"
                            aria-selected={selectedCurrency.code === currency.code}
                            tabIndex={0}
                            onClick={() => handleCurrencySelect(currency)}
                            style={{ 
                              backgroundColor: "#2f4553",
                              cursor: "pointer"
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = "#557086";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = "#2f4553";
                            }}
                          >
                            <div style={{ width: "100%", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                              <div style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <CurrencyIcon code={currency.code} className="svg-icon" style={{ width: "28px", height: "28px", display: "block" }} />
                              </div>
                              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", gap: "2px", flex: 1, minWidth: 0 }}>
                                <span style={{ fontSize: "16px", color: "#fff", fontWeight: "600", lineHeight: "1.2", display: "block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", width: "100%" }}>
                                  {currency.code}
                                </span>
                                <span style={{ fontSize: "14px", color: "#b1bad3", fontWeight: "400", lineHeight: "1.2", display: "block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", width: "100%" }}>
                                  {currency.name}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Network Selection or Info Message */}
            {(() => {
              const currenciesWithoutNetwork = ["BTC", "SOL", "LTC", "DOGE", "BCH", "TRX"];
              const currenciesWithInfoMessage = ["XRP", "EOS"];
              
              // Don't show network for currencies that don't need it
              if (currenciesWithoutNetwork.includes(selectedCurrency.code)) {
                return null;
              }
              
              // Show info message for XRP and EOS
              if (currenciesWithInfoMessage.includes(selectedCurrency.code)) {
                return (
                  <div className="form-group" id="info-message-group" style={{ display: "block" }}>
                    <div
                      style={{
                        border: "1px dashed #fff",
                        borderRadius: "0.5rem",
                        padding: "1rem",
                        backgroundColor: "#1a2c38",
                        display: "flex",
                        gap: "0.75rem",
                        alignItems: "flex-start"
                      }}
                    >
                      <div style={{ flexShrink: 0, marginTop: "2px" }}>
                        <div
                          style={{
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            border: "2px solid #fff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#fff",
                            fontSize: "14px",
                            fontWeight: "bold",
                            fontFamily: "Arial, sans-serif",
                            lineHeight: "1"
                          }}
                        >
                          i
                        </div>
                      </div>
                      <div style={{ flex: 1, color: "#b1bad3", fontSize: "14px", lineHeight: "1.5" }}>
                        <p style={{ margin: "0 0 0.5rem 0", color: "#fff" }}>
                          Please provide the following details when transferring {selectedCurrency.code} to your account:
                        </p>
                        <ol style={{ margin: "0 0 0.5rem 0", paddingLeft: "1.25rem" }}>
                          <li>Address</li>
                          <li>Tag/Memo</li>
                        </ol>
                        <p style={{ margin: 0 }}>
                          In case you are not sure about the tag, or where to put it on your transaction, contact our{" "}
                          <strong style={{ color: "#fff", fontWeight: "600" }}>live support team</strong>.
                        </p>
                      </div>
                    </div>
                  </div>
                );
              }
              
              // Show network dropdown for other currencies
              return (
              <div className="form-group" id="network-group" style={{ display: "block" }} ref={networkRef}>
                <span
                  tag="span"
                  type="body"
                  size="sm"
                  strong="true"
                  className="ds-body-sm-strong"
                  data-ds-text="true"
                  style={{ color: "#b1bad3", display: "block", marginBottom: "0.5rem" }}
                >
                  Network
                </span>

                <div className="dropdown-container">
                  <div
                    className={`custom-select network-selection ${isNetworkOpen ? "active" : ""}`}
                    id="network-select"
                    aria-haspopup="listbox"
                    aria-expanded={isNetworkOpen}
                  >
                    <div
                      className="select-display rounded-[0.5rem]"
                      style={{ 
                        borderRadius: "0.5rem", 
                        backgroundColor: "#2f4553",
                        position: "relative",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "0.5rem 0.75rem"
                      }}
                      onClick={() => {
                        setIsNetworkOpen(!isNetworkOpen);
                        setIsCurrencyOpen(false);
                      }}
                    >
                      <div className="flex items-center h-8">
                        <span className="network-name-title" style={{ fontSize: "14px", color: "#fff", fontWeight: "600" }}>{selectedNetwork}</span>
                      </div>
                      <span className="dropdown-icon arrow" style={{ 
                        flexShrink: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transform: isNetworkOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.2s"
                      }}>
                        <svg
                          fill="currentColor"
                          viewBox="0 0 64 64"
                          className="svg-icon"
                          style={{ 
                            width: "0.875em",
                            height: "0.875em",
                            color: "#fff"
                          }}
                        >
                          <path d="M32.271 49.763 9.201 26.692l6.928-6.93 16.145 16.145 16.144-16.144 6.93 6.929-23.072 23.07z" />
                        </svg>
                      </span>
                    </div>
                    {isNetworkOpen && (
                    <>
                      <div
                        style={{
                          position: "absolute",
                          left: "50%",
                          transform: "translateX(-50%)",
                          top: "calc(100% + 0px)",
                          width: "0",
                          height: "0",
                          borderLeft: "8px solid transparent",
                          borderRight: "8px solid transparent",
                          borderBottom: "8px solid #2f4553",
                          zIndex: 1001,
                        }}
                      ></div>
                      <div
                        className="options-container dropdown-scroll-content scrollY scrollY-light scroll-light"
                        style={{ 
                          borderRadius: "0.5rem",
                          position: "absolute",
                          top: "calc(100% + 8px)",
                          left: 0,
                          right: 0,
                          background: "#2f4553",
                          maxHeight: "258px",
                          overflowY: "auto",
                          overflowX: "hidden",
                          zIndex: 1000,
                          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                          scrollbarWidth: "none",
                          msOverflowStyle: "none"
                        }}
                        id="network-options"
                      >
                      {availableNetworks.map((network) => (
                        <div
                          key={network}
                          className="option"
                          role="option"
                          aria-selected={selectedNetwork === network}
                          tabIndex={0}
                          onClick={() => handleNetworkSelect(network)}
                          style={{
                            backgroundColor: "#2f4553",
                            cursor: "pointer"
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#557086";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "#2f4553";
                          }}
                        >
                          <button
                            type="button"
                            tabIndex={0}
                            className="w-full flex relative items-center gap-2 font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] text-white focus-visible:outline-white text-sm leading-none justify-start rounded-none shadow-none p-4"
                            data-test={`chain-toggle-${network.toLowerCase()}`}
                            data-testid={`chain-toggle-${network.toLowerCase()}`}
                            aria-label={`Select ${network.toLowerCase()}`}
                            data-button-root=""
                            style={{
                              backgroundColor: "transparent",
                              border: "none",
                              width: "100%",
                              textAlign: "left"
                            }}
                          >
                            {networkNames[network] || network}
                          </button>
                        </div>
                      ))}
                    </div>
                    </>
                    )}
                  </div>
                </div>
              </div>
              );
            })()}

            {/* Deposit Address */}
            <div className="form-group">
              <span
                tag="span"
                type="body"
                size="sm"
                strong="true"
                className="ds-body-sm-strong"
                data-ds-text="true"
                style={{ color: "#b1bad3", display: "block", marginBottom: "0.5rem" }}
              >
                Address
              </span>
              <div className="wrapper" style={{ width: "100%" }}>
                <div className="wrap" style={{ width: "100%" }}>
                  <label className="stacked" style={{ width: "100%" }}>
                    <div className="input-wrap" style={{ borderRadius: "0.5rem", backgroundColor: "#2f4553", display: "flex", width: "100%", alignItems: "stretch", gap: 0, overflow: "visible", position: "relative" }}>
                    <div className="input-content" style={{ flexGrow: 1, flex: 1, minWidth: 0, display: "flex", alignItems: "center", paddingLeft: "0.75rem", paddingRight: "0.75rem" }}>
                      <input
                        id="address-input"
                        autoComplete="on"
                        readOnly
                        className="input spacing-expanded"
                        type="text"
                        value={depositAddress}
                        tooltipvisible="false"
                        data-testid="wallet-deposit-address-input"
                        style={{
                          fontSize: "1rem",
                          borderRadius: 0,
                          padding: "0.625rem 0",
                          minHeight: "40.2px",
                          backgroundColor: "transparent",
                          width: "100%",
                          flex: 1,
                          border: "none",
                          outline: "none",
                          color: "#fafbfb",
                        }}
                      />
                    </div>
                    <div 
                      className="input-button-wrap" 
                      style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        paddingRight: "0.75rem", 
                        gap: 0,
                        borderRadius: "0.5rem",
                        borderTopLeftRadius: isHovered ? "0" : "0.5rem",
                        borderBottomLeftRadius: isHovered ? "0" : "0.5rem",
                        backgroundColor: isHovered ? "#557086" : "transparent",
                        transition: "background-color 0.2s ease, border-radius 0.2s ease",
                        position: "relative",
                        boxShadow: isCopyClicked ? "inset 0 2px 4px rgba(0, 0, 0, 0.2)" : "none",
                      }}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      {/* Vertical Divider */}
                      <div style={{ 
                        width: "1px", 
                        height: "24px", 
                        backgroundColor: "#1a2c38", 
                        marginRight: "0.5rem",
                        flexShrink: 0
                      }}></div>
                      <button
                        type="button"
                        tabIndex={0}
                        style={{
                          borderRadius: "0.5rem",
                          zIndex: 999,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "transparent",
                          border: "none",
                          cursor: "pointer",
                          padding: "0.5rem",
                          transition: "transform 0.1s ease",
                          transform: isCopyClicked ? "scale(0.95)" : "scale(1)",
                        }}
                        className="inline-flex relative items-center gap-2 justify-center transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 text-white focus-visible:outline-white"
                        data-button-root=""
                        id="copy-btn"
                        onClick={handleCopy}
                        onMouseDown={(e) => {
                          e.currentTarget.style.transform = "scale(0.95)";
                          const parent = e.currentTarget.closest('.input-button-wrap');
                          if (parent) {
                            parent.style.boxShadow = "inset 0 2px 4px rgba(0, 0, 0, 0.2)";
                          }
                        }}
                        onMouseUp={(e) => {
                          // Only reset transform if not in clicked state
                          if (!isCopyClicked) {
                            e.currentTarget.style.transform = "scale(1)";
                            const parent = e.currentTarget.closest('.input-button-wrap');
                            if (parent) {
                              parent.style.boxShadow = "none";
                            }
                          }
                        }}
                      >
                        {/* Tooltip with speech bubble - show only after copy */}
                        {copied && (
                          <div
                            style={{
                              position: "absolute",
                              bottom: "calc(100% + 16px)",
                              left: "50%",
                              transform: "translateX(-50%)",
                              backgroundColor: "#ffffff",
                              color: "#0F212E",
                              padding: "12px 16px",
                              borderRadius: "8px",
                              fontSize: "14px",
                              fontFamily: "proxima-nova, ui-sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                              fontWeight: "400",
                              whiteSpace: "nowrap",
                              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                              zIndex: 99999999999999999999999, // sufficiently high, syntax fixed, no !important in inline styles
                              pointerEvents: "none",
                              opacity: 1,
                            }}
                          >
                            Address copied!
                            {/* Speech bubble tail */}
                            <div
                              style={{
                                position: "absolute",
                                bottom: "-6px",
                                left: "50%",
                                transform: "translateX(-50%)",
                                width: 0,
                                height: 0,
                                borderLeft: "6px solid transparent",
                                borderRight: "6px solid transparent",
                                borderTop: "6px solid #ffffff",
                              }}
                            ></div>
                          </div>
                        )}
                        <svg
                          data-ds-icon="Copy"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          className="inline-block shrink-0"
                          style={{ color: "#b1bad3" }}
                        >
                          <path
                            fill="currentColor"
                            d="M14 8H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2"
                          />
                          <path
                            fill="currentColor"
                            d="M22 4v10c0 1.1-.9 2-2 2h-2v-6c0-2.21-1.79-4-4-4H8V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* QR Code - Outside content div */}
        <div className="flex items-center justify-center" style={{ marginBottom: "1rem", marginTop: "-7px" }}>
          <div
            className="gr-code"
            data-test="wallet-deposit-address-qr"
            style={{ 
              background: "white", 
              borderRadius: "0.5rem",
              padding: "0.5rem",
              boxShadow: "var(--shadows-md)"
            }}
          >
            <img
              id="qrcode-img"
              alt="deposit-address"
              src={qrCode}
              width="104px"
              height="104px"
              style={{ width: "104px", height: "104px" }}
            />
          </div>
        </div>

        {/* Or Divider - Outside content div */}
        <div style={{ marginInline: "1rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem" }} className="or">
          <div style={{ flex: 1, height: "1px", backgroundColor: "#2f4553" }}></div>
          <span tag="span" type="body" size="md" className="ds-body-md text-center" data-ds-text="true" style={{ color: "#b1bad3", padding: "0 0.5rem" }}>
            Or
          </span>
          <div style={{ flex: 1, height: "1px", backgroundColor: "#2f4553" }}></div>
        </div>
        
        {/* Direct Deposit Button - Outside content div */}
        <div
          style={{
            paddingBlock: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginInline: "1rem",
          }}
        >
          <button
            type="button"
            tabIndex={0}
            className="[font-family:var(--ds-font-family-default)] relative [font-variant-numeric:var(--ds-font-variant-numeric,lining-nums_tabular-nums)] [font-feature-settings:var(--ds-font-feature-settings,'salt'_on)] inline-flex relative items-center gap-2 justify-center rounded-(--ds-radius-md,0.25rem) [font-weight:var(--ds-font-weight-thick)] whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] text-white hover:text-white focus-visible:outline-white var(--ds-font-size-sm) shadow-md py-[0.5rem] px-[1rem] w-full"
            style={{ backgroundColor: "#2f4553" }}
            data-button-root=""
            id="showalertmessage"
            onClick={handleDirectDeposit}
          >
            <span
              className={`absolute ${showAlert ? "show-copied-1" : "hide-alert"}`}
              id="show-copied-11"
              style={{ top: "-19px" }}
            >
              ◆
            </span>
            <div
              className={`nodepositeavaliabe ${showAlert ? "" : "hide-alert"} absolute w-36 bg-white pr-36 rounded-sm text-black flex items-center justify-center`}
              id="show-copied-alert"
              style={{
                right: "0",
                left: "0",
                height: "39px",
                top: "-26px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: "translate(-50%, -50%)",
                left: "50%",
                right: "50%",
              }}
            >
              Not available for Deposit Bonus!
            </div>
            <div data-loader-content="true" className="contents">
              <div className="flex w-full justify-between items-center">
                <span
                  tag="span"
                  type="body"
                  size="md"
                  variant="neutral-default"
                  strong="true"
                  className="text-neutral-default ds-body-md-strong"
                  data-ds-text="true"
                  style={{ whiteSpace: "normal" }}
                >
                  Direct Deposit
                </span>
                <div className="pl-2 flex gap-1">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="18" height="18" rx="9" fill="#F0B90B"></rect>
                    <path d="M9.00011 10.3826L10.3823 8.99987L8.9996 7.61762L7.61736 8.99987L9.00011 10.3826ZM9.00011 12.3561L6.63085 9.98791L5.24862 11.3691L8.9996 15.1201L12.7511 11.3691L11.3689 9.98791L9.00011 12.3561ZM13.7386 7.61764L12.3564 8.99987L13.7386 10.3826L15.1199 8.99987L13.7386 7.61764ZM8.9996 5.64359L11.3689 8.01336L12.7511 6.63112L8.9996 2.88013L5.24913 6.63113L6.63137 8.01336L9.00062 5.64359H8.9996ZM5.64588 8.99987L4.26213 10.3826L2.87988 8.99987L4.26212 7.61762L5.64588 8.99987Z" fill="white"></path>
                  </svg>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="18" height="18" rx="9" fill="#141418"></rect>
                    <path d="M14.5149 3.6001L9.7334 6.9751L10.6226 4.9861L14.5149 3.6001Z" fill="#E17726" stroke="#E17726" strokeWidth="0.1875" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M3.48535 3.6001L8.22438 7.0066L7.37779 4.9861L3.48535 3.6001Z" fill="#E27625" stroke="#E27625" strokeWidth="0.1875" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M12.7928 11.4255L11.5205 13.2795L14.2447 13.995L15.0251 11.4661L12.7928 11.4255Z" fill="#E27625" stroke="#E27625" strokeWidth="0.1875" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M2.97949 11.4661L3.75514 13.995L6.47465 13.2795L5.20712 11.4255L2.97949 11.4661Z" fill="#E27625" stroke="#E27625" strokeWidth="0.1875" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M6.32752 8.29366L5.5708 9.3827L8.26665 9.49966L8.1768 6.73218L6.32752 8.29366Z" fill="#E27625" stroke="#E27625" strokeWidth="0.1875" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M11.672 8.29367L9.7944 6.70068L9.73291 9.49967L12.4288 9.3827L11.672 8.29367Z" fill="#E27625" stroke="#E27625" strokeWidth="0.1875" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M6.47412 13.2796L8.1058 12.5282L6.70115 11.4841L6.47412 13.2796Z" fill="#E27625" stroke="#E27625" strokeWidth="0.1875" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M9.89404 12.5282L11.521 13.2796L11.2987 11.4841L9.89404 12.5282Z" fill="#E27625" stroke="#E27625" strokeWidth="0.1875" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M11.521 13.2796L9.89404 12.5281L10.0264 13.5361L10.0123 13.9636L11.521 13.2796Z" fill="#D5BFB2" stroke="#D5BFB2" strokeWidth="0.1875" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M6.47412 13.2796L7.98759 13.9636L7.97812 13.5361L8.1058 12.5281L6.47412 13.2796Z" fill="#D5BFB2" stroke="#D5BFB2" strokeWidth="0.1875" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M8.01624 10.818L6.66357 10.44L7.61894 10.0215L8.01624 10.818Z" fill="#233447" stroke="#233447" strokeWidth="0.1875" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M9.98389 10.818L10.3812 10.0215L11.3413 10.44L9.98389 10.818Z" fill="#233447" stroke="#233447" strokeWidth="0.1875" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M6.47454 13.2795L6.71103 11.4255L5.20703 11.4661L6.47454 13.2795Z" fill="#CC6228" stroke="#CC6228" strokeWidth="0.1875" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M11.2891 11.4255L11.5208 13.2795L12.7931 11.4661L11.2891 11.4255Z" fill="#CC6228" stroke="#CC6228" strokeWidth="0.1875" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M12.4288 9.38257L9.73291 9.49954L9.9836 10.8181L10.3809 10.0216L11.341 10.4401L12.4288 9.38257Z" fill="#CC6228" stroke="#CC6228" strokeWidth="0.1875" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M6.66333 10.4401L7.6187 10.0216L8.01599 10.8181L8.26665 9.49954L5.5708 9.38257L6.66333 10.4401Z" fill="#CC6228" stroke="#CC6228" strokeWidth="0.1875" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M5.5708 9.38257L6.70118 11.4841L6.66332 10.4401L5.5708 9.38257Z" fill="#E27525" stroke="#E27525" strokeWidth="0.1875" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M11.3409 10.4401L11.2983 11.4841L12.4287 9.38257L11.3409 10.4401Z" fill="#E27525" stroke="#E27525" strokeWidth="0.1875" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M8.26681 9.49976L8.01611 10.8183L8.33299 12.3753L8.40395 10.3233L8.26681 9.49976Z" fill="#E27525" stroke="#E27525" strokeWidth="0.1875" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M9.73305 9.49976L9.60059 10.3188L9.66685 12.3753L9.98367 10.8183L9.73305 9.49976Z" fill="#E27525" stroke="#E27525" strokeWidth="0.1875" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M9.98382 10.8182L9.66699 12.3752L9.89396 12.5282L11.2987 11.4842L11.3412 10.4402L9.98382 10.8182Z" fill="#F5841F" stroke="#F5841F" strokeWidth="0.1875" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M6.66357 10.4402L6.70144 11.4842L8.10609 12.5282L8.33312 12.3752L8.01624 10.8182L6.66357 10.4402Z" fill="#F5841F" stroke="#F5841F" strokeWidth="0.1875" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M10.0119 13.9635L10.026 13.536L9.90306 13.437H8.09638L7.97812 13.536L7.98759 13.9635L6.47412 13.2795L7.00383 13.6935L8.07745 14.4H9.91724L10.9956 13.6935L11.5206 13.2795L10.0119 13.9635Z" fill="#C0AC9D" stroke="#C0AC9D" strokeWidth="0.1875" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M9.89401 12.5282L9.66698 12.3752H8.33322L8.10622 12.5282L7.97852 13.5363L8.09676 13.4373H9.90342L10.0264 13.5363L9.89401 12.5282Z" fill="#161616" stroke="#161616" strokeWidth="0.1875" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M14.7182 7.19559L15.1202 5.3326L14.5148 3.6001L9.89404 6.86262L11.6723 8.2936L14.1838 8.99112L14.7371 8.37462L14.4959 8.2081L14.879 7.87512L14.5857 7.65911L14.9689 7.3801L14.7182 7.19559Z" fill="#763E1A" stroke="#763E1A" strokeWidth="0.1875" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M2.87988 5.3326L3.28663 7.19559L3.0265 7.3801L3.41432 7.65911L3.12109 7.87512L3.50418 8.2081L3.26298 8.37462L3.81634 8.99112L6.32775 8.2936L8.10604 6.86262L3.48527 3.6001L2.87988 5.3326Z" fill="#763E1A" stroke="#763E1A" strokeWidth="0.1875" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M14.1834 8.99121L11.672 8.2937L12.4287 9.3827L11.2983 11.4842L12.7929 11.4662H15.0252L14.1834 8.99121Z" fill="#F5841F" stroke="#F5841F" strokeWidth="0.1875" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M6.32801 8.2937L3.81662 8.99121L2.97949 11.4662H5.20712L6.70164 11.4842L5.57129 9.3827L6.32801 8.2937Z" fill="#F5841F" stroke="#F5841F" strokeWidth="0.1875" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M9.73277 9.49962L9.8936 6.86257L10.6219 4.98608H7.37744L8.10578 6.86257L8.26658 9.49962L8.32807 10.3276L8.33281 12.3751H9.66657L9.67128 10.3276L9.73277 9.49962Z" fill="#F5841F" stroke="#F5841F" strokeWidth="0.1875" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="18" height="18" rx="9" fill="#141418"></rect>
                    <path d="M5.3999 6.09865L8.99973 4.91992V13.0799C6.42839 11.9918 5.3999 9.90651 5.3999 8.72802V6.09865Z" fill="#48FF91"></path>
                    <path d="M12.6003 6.09865L9.00049 4.91992V13.0799C11.5718 11.9918 12.6003 9.90651 12.6003 8.72802V6.09865Z" fill="url(#paint0_linear_13359_103939)"></path>
                    <defs>
                      <linearGradient id="paint0_linear_13359_103939" x1="8.84847" y1="14.1055" x2="11.8359" y2="3.38023" gradientUnits="userSpaceOnUse">
                        <stop offset="0.26" stopColor="#48FF91"></stop>
                        <stop offset="0.66" stopColor="#0094FF"></stop>
                        <stop offset="0.8" stopColor="#0038FF"></stop>
                        <stop offset="0.89" stopColor="#0500FF"></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="18" height="18" rx="9" fill="#0052FF"></rect>
                    <path fillRule="evenodd" clipRule="evenodd" d="M8.99988 2.88013C12.3799 2.88013 15.1199 5.62014 15.1199 9.00013C15.1199 12.3801 12.3799 15.1201 8.99988 15.1201C5.6199 15.1201 2.87988 12.3801 2.87988 9.00013C2.87988 5.62014 5.6199 2.88013 8.99988 2.88013ZM6.85008 9.00013C6.85008 10.1889 7.81291 11.1517 9.00165 11.1517C10.0667 11.1517 10.9488 10.3753 11.1191 9.35872H13.2886C13.1058 11.5677 11.2572 13.3033 9.00165 13.3033C6.62596 13.3033 4.69852 11.3758 4.69852 9.00013C4.69852 6.62444 6.62596 4.697 9.00165 4.697C11.2572 4.697 13.1058 6.4326 13.2886 8.64153H11.1209C10.9506 7.62492 10.0667 6.84856 9.00165 6.84856C7.81291 6.84856 6.85008 7.81139 6.85008 9.00013Z" fill="white"></path>
                  </svg>
                  <span tag="span" type="body" size="sm" className="ds-body-sm" data-ds-text="true">+300</span>
                </div>
              </div>
            </div>
          </button>
        </div>
        <hr className="border-t-2 border-solid" style={{ marginInline: "1rem", borderColor: "#2f4553" }} />
        <div style={{ paddingBlock: "1rem", paddingInline: "1rem" }} className="flex flex-row justify-between gap-2">
          <span tag="span" type="body" size="md" strong="true" className="ds-body-md-strong text-center" data-ds-text="true" style={{ color: "#b1bad3" }}>Credited</span>
          <span tag="span" type="body" size="md" variant="neutral-default" className="text-neutral-default ds-body-md text-center" data-ds-text="true">2 Confirmations</span>
        </div>
        <div className="footer" style={{ 
          borderTop: "0px", 
          paddingRight: "1rem", 
          paddingLeft: "1rem", 
          paddingTop: "1rem",
          paddingBottom: "1rem",
          backgroundColor: "#0f212e",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center"
        }}>
          <p type="body" tag="p" size="md" className="ds-body-md" data-ds-text="true" style={{ textAlign: "center", marginBottom: "1rem", color: "#b1bad3" }}>
            Improve your account security with Two-Factor
            Authentication
          </p>
          <a
            style={{ borderRadius: "0.5rem", backgroundColor: "#2f4553" }}
            className="[font-family:var(--ds-font-family-default)] [font-variant-numeric:var(--ds-font-variant-numeric,lining-nums_tabular-nums)] [font-feature-settings:var(--ds-font-feature-settings,'salt'_on)] inline-flex relative items-center gap-2 justify-center rounded-(--ds-radius-md,0.25rem) [font-weight:var(--ds-font-weight-thick)] whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] [text-decoration:none] hover:[text-decoration:none] text-white hover:bg-grey-300 hover:text-white focus-visible:outline-white var(--ds-font-size-sm) shadow-md py-[0.625rem] px-[1.25rem] w-full"
            href="https://stake.com/settings/security"
            data-sveltekit-reload="off"
            data-sveltekit-preload-data="off"
            data-sveltekit-noscroll="off"
          >
            <span type="body" tag="span" size="md" strong="true" className="ds-body-md-strong" data-ds-text="true">Enable 2FA</span>
          </a>
        </div>
      </div>
    </div>
  );
}

