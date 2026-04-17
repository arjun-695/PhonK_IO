import type { Metadata, Viewport } from "next";
import { Syne, Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
// Components commented out until you create them!
import {Navbar} from "@/components/layout/Navbar";
import {Footer} from "@/components/layout/Footer";
import {Toaster} from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


// PRO: next/font downloads fonts at BUILD time — zero layout shift, no
//    external network request from the browser.
// MISTAKE: <link href="fonts.googleapis.com/..."> in layout = extra
//    render-blocking round trip the browser must make
const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap", //shows fallback test immediately, swaps when loaded 
});

// Pro: metadata export - replaces <Head> 
// Fully typed and composable across nested layouts
export const metadata: Metadata = {
  title: {
    //template applies to all cchild pages: "Products | NovaMovile"
    template: "%s | NovaMobile",
    default: "NovaMobile — Phones Reimagined",
  },
  description: "Premium smartphones with cutting-edge technology and innovative features.",
  // pro: Opengraph for Social sharing previews
  openGraph: {
    siteName: "NovaMobile",
    type: "website",
    locale: "en_US",
  },
  // Pro:  Canonical robots meta — prevents duplicate content SEO issues
robots: {
    index: true,
    follow: true,
  },
};


// PRO: viewport export is separate from metadata in Next 14+
// MISTAKE: Putting viewport in metadata object (deprecated, throws warning)
export const viewport: Viewport = {
  themeColor: "#0f172a", // dark mode background
  colorScheme: "dark",
  initialScale: 1,
};

export default function RootLayout({
  children, 
}: {
  children: React.ReactNode;
})  {
  return (
    //  PRO: suppressHydrationWarning on <html> prevents console errors
    // when browser extensions modify the DOM (e.g. password managers)
    <html lang="en" className= "dark" suppressHydrationWarning>
      <body className={`${syne.variable} ${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col`}>
        {/*  PRO: Navbar outside <main> — correct landmark semantics for a11y */}<Navbar />

        {/* PRO: <main> wraps page content — screen readers jump here */}
        <main className="flex-1">{children}</main>
        <Footer />
        
        {/* PRO: Toast provider at root — accessible from any page */}
        <Toaster position="bottom-right"/>
      </body>
    </html>
  )
}