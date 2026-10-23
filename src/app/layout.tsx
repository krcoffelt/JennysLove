import type { Metadata, Viewport } from "next";
import { Lora, Open_Sans } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Enhancements } from "@/components/Enhancements";
import { site } from "@/content/business";
import "./globals.css";

const lora = Lora({ variable: "--font-lora", subsets: ["latin"], style: ["normal", "italic"], display: "swap" });
const openSans = Open_Sans({ variable: "--font-open-sans", subsets: ["latin"], weight: ["400", "500", "600"], display: "swap" });

const isProduction = process.env.SITE_ENV === "production";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Kansas City Bookkeeping & Accounting | Jenny’s Love",
    template: "%s | Jenny’s Love Accounting",
  },
  description:
    "Personal, practical bookkeeping for Kansas City small businesses: monthly books, payables, receivables, payroll support and QuickBooks training.",
  icons: { icon: "/icon.png", apple: "/apple-icon.png" },
  openGraph: { siteName: "Jenny’s Love Accounting", locale: "en_US", type: "website" },
  // Staging builds stay out of search until a separately authorized launch.
  robots: isProduction ? undefined : { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#f6f1e7" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-US" className={`${lora.variable} ${openSans.variable}`}>
      <body className="min-h-dvh overflow-x-clip">
        <a
          href="#main"
          className="sr-only z-50 rounded-full bg-ink px-5 py-3 font-sans text-cream focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <Enhancements />
      </body>
    </html>
  );
}
