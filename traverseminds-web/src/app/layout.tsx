import type { Metadata } from "next";
import { spaceGrotesk, inter, ibmPlexMono } from "@/lib/fonts";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { CookieBanner } from "@/components/ui/CookieBanner";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Traverse Minds UG — Built for Africa, Driven by Evidence",
    template: "%s | Traverse Minds UG",
  },
  description:
    "Uganda's integrated civic-tech company: cybersecurity, public records intelligence, digital literacy, events, media, and policy research for East Africa.",
  metadataBase: new URL("https://traverseminds.ug"),
  openGraph: {
    type: "website",
    locale: "en_UG",
    siteName: "Traverse Minds UG",
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
      <body className="min-h-screen font-body antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
