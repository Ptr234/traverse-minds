// Site-wide images and copy that editors manage in Sanity ("Site settings"). These are the seed
// values and the fallback when Sanity is unreachable.
export const SITE_DEFAULTS = {
  heroEyebrow: "Built for Africa · Driven by Evidence",
  heroHeadline: "Securing the Digital Frontier of Africa.",
  heroDek:
    "Africa's integrated civic-tech company. Six divisions working together across cybersecurity, public records, events, digital literacy, media, and policy research.",
  heroSlides: [
    "/heroslideimages/WhatsApp Image 2026-06-09 at 11.09.07.webp",
    "/heroslideimages/WhatsApp Image 2026-06-09 at 11.09.08.webp",
    "/heroslideimages/WhatsApp Image 2026-06-09 at 11.09.09.webp",
    "/heroslideimages/WhatsApp Image 2026-06-09 at 11.09.11.webp",
    "/heroslideimages/WhatsApp Image 2026-06-09 at 11.09.14.webp",
  ],
  aboutImage: "/imagestouse/tec (2).jpg",
  timelineImage: "/imagestouse/tec (1).jpg",
  eventsSpeakImage: "/imagestouse/eventslide/stud (2).jpg",
  eventsSponsorImage: "/imagestouse/div-events.jpeg",
  christinePortrait: "/christine.jpg",
};

export type SiteSettings = typeof SITE_DEFAULTS;
