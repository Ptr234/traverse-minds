import type { Metadata } from "next";
import { spaceGrotesk, inter, ibmPlexMono } from "@/lib/fonts";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";

import { CookieBanner } from "@/components/ui/CookieBanner";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { StructuredData } from "@/components/seo/StructuredData";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Traverse Minds Africa — Built for Africa, Driven by Evidence",
    template: "%s | Traverse Minds Africa",
  },
  description:
    "Africa's integrated civic-tech company: cybersecurity, public records intelligence, digital literacy, events, media, and policy research for Africa.",
  metadataBase: new URL("https://traverseminds.ug"),
  openGraph: {
    type: "website",
    locale: "en_UG",
    siteName: "Traverse Minds Africa",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${ibmPlexMono.variable}`}
    >
      <head>
        <StructuredData type="organization" />
      </head>
      <body className="min-h-screen font-body antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <SmoothScroll />
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />

        <CookieBanner />
      </body>
    </html>
  );
}
