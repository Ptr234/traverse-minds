import { Space_Grotesk, Inter, IBM_Plex_Mono, Source_Serif_4 } from "next/font/google";

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

// Editorial serif for magazine headlines only; UI, nav and labels stay on the brand sans fonts
export const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-editorial",
});
