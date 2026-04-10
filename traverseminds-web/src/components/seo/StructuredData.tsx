import type { WithContext, Organization, LocalBusiness, Event, Article } from "schema-dts";

/* -------------------------------------------------------------------------- */
/*  Helper functions – call these from page-level components / layouts         */
/* -------------------------------------------------------------------------- */

export function getOrganizationSchema(): WithContext<Organization> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Traverse Minds Africa",
    url: "https://traverseminds.ug",
    logo: "https://traverseminds.ug/logo.png",
    description:
      "Africa's integrated civic-tech company: cybersecurity, public records intelligence, digital literacy, events, media, and policy research for Africa.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kampala",
      addressCountry: "UG",
    },
    sameAs: [
      "https://www.linkedin.com/company/traverseminds",
      "https://twitter.com/traverseminds",
    ],
    foundingDate: "2024",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "hello@traverseminds.ug",
      availableLanguage: ["English"],
    },
  };
}

export function getLocalBusinessSchema(): WithContext<LocalBusiness> {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Traverse Minds Africa",
    url: "https://traverseminds.ug",
    logo: "https://traverseminds.ug/logo.png",
    image: "https://traverseminds.ug/logo.png",
    description:
      "Africa's integrated civic-tech company offering cybersecurity, public records intelligence, digital literacy, events, media, and policy research services.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kampala",
      addressRegion: "Central Region",
      addressCountry: "UG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 0.3476,
      longitude: 32.5825,
    },
    telephone: "+256-XXX-XXXXXX",
    email: "hello@traverseminds.ug",
    sameAs: [
      "https://www.linkedin.com/company/traverseminds",
      "https://twitter.com/traverseminds",
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
    priceRange: "$$",
  };
}

export function getEventSchema(data: {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location?: string;
  image?: string;
  url?: string;
}): WithContext<Event> {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: data.name,
    description: data.description,
    startDate: data.startDate,
    ...(data.endDate && { endDate: data.endDate }),
    location: data.location
      ? {
          "@type": "Place",
          name: data.location,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Kampala",
            addressCountry: "UG",
          },
        }
      : undefined,
    organizer: {
      "@type": "Organization",
      name: "Traverse Minds Africa",
      url: "https://traverseminds.ug",
    },
    ...(data.image && { image: data.image }),
    ...(data.url && { url: data.url }),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  };
}

export function getArticleSchema(data: {
  headline: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  url: string;
}): WithContext<Article> {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.headline,
    description: data.description,
    ...(data.image && { image: data.image }),
    datePublished: data.datePublished,
    dateModified: data.dateModified ?? data.datePublished,
    author: {
      "@type": "Person",
      name: data.authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "Traverse Minds Africa",
      logo: {
        "@type": "ImageObject",
        url: "https://traverseminds.ug/logo.png",
      },
    },
    url: data.url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": data.url,
    },
  };
}

/* -------------------------------------------------------------------------- */
/*  Component – renders JSON-LD <script> tag                                  */
/* -------------------------------------------------------------------------- */

type StructuredDataType = "organization" | "localBusiness" | "event" | "article";

interface StructuredDataProps {
  type: StructuredDataType;
  data?: Record<string, unknown>;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  let schema: WithContext<Organization | LocalBusiness | Event | Article>;

  switch (type) {
    case "organization":
      schema = getOrganizationSchema();
      break;
    case "localBusiness":
      schema = getLocalBusinessSchema();
      break;
    case "event":
      schema = getEventSchema(
        data as {
          name: string;
          description: string;
          startDate: string;
          endDate?: string;
          location?: string;
          image?: string;
          url?: string;
        },
      );
      break;
    case "article":
      schema = getArticleSchema(
        data as {
          headline: string;
          description: string;
          image?: string;
          datePublished: string;
          dateModified?: string;
          authorName: string;
          url: string;
        },
      );
      break;
    default:
      return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
