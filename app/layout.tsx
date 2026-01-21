import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import AdSenseScript from "@/components/AdSenseScript";
// ---------------------------------
//  FIXED THEME SCRIPT (WORKS 100%)
// ---------------------------------
function ThemeInitializer() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              var savedTheme = localStorage.getItem("theme") || "dark";
              document.documentElement.setAttribute("data-theme", savedTheme);
            } catch (e) {}
          })();
        `,
      }}
    />
  );
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),

  title: {
    default: "OnlineToolsBase — Free Online Tools & Utilities",
    template: "%s — OnlineToolsBase",
  },
  description:
    "OnlineToolsBase.com offers 100+ free tools for text, images, PDFs, finance, age calculators, social media utilities and more — fast, clean and 100% free.",

  openGraph: {
    type: "website",
    siteName: "OnlineToolsBase",
    title: "OnlineToolsBase — Free Online Tools & Utilities",
    description: "Fast, privacy-first online tools for PDFs, images and more.",
    images: [
      { url: "/otb-og.png", width: 1200, height: 630, alt: "OnlineToolsBase" },
    ],
  },

  twitter: {
    card: "summary_large_image",
    images: ["/otb-og.png"],
  },
};



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Load theme IMMEDIATELY before page renders */}
        <ThemeInitializer />
      </head>

      <body className="main-shell">
      {/*  <AdSenseScript />*/}
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />

      </body>
    </html>
  );
}
