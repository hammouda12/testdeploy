export const metadata = {
  title: "",
  description: "",
  icons: {
    icon: [
      { url: "/favicon-32x32.webp", type: "image/webp", sizes: "32x32" },
    ],
    shortcut: "/favicon-32x32.webp",
    apple: "/favicon-32x32.webp",
  },
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    "max-image-preview": "none",
    "max-snippet": -1,
  },
  // Explicitly omit openGraph and twitter to prevent link previews
  // Next.js won't generate these meta tags if they're not in the metadata object
};

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import MobileFooterNav from "../components/MobileFooterNav";
import Footer from "../components/Footer";
import Modals from "../components/Modals";
import { ModalProvider } from "../contexts/ModalContext";
import DisableDevTools from "../components/DisableDevTools";

export default function RootLayout({ children }){
  return (
    <html lang="en">
      <body className="bg-[#071420] text-[#e1edf3]">
        <DisableDevTools />
        <ModalProvider>
        <Sidebar style={{marginTop: '-100px !important'}} />
        <div className="flex-1 flex flex-col min-w-0 main-content-wrapper" style={{ marginLeft: 'var(--sidebar-width, 260px)' }}>
          <Navbar />
          <main className="flex-1 bg-[#1a2c38] overflow-y-auto hide-scrollbar">
            <div style={{ padding: 'var(--spacing-0) 3vw' }}>
              {children}
            </div>
          </main>
          <Footer />
        </div>
          <MobileFooterNav />
        <Modals />
        </ModalProvider>
      </body>
    </html>
  );
}
