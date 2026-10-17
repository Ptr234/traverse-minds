// Division names and links, shared by the magazine sections and anywhere content is labelled by division.

export const DIVISIONS = [
  { key: "security", label: "Security", href: "/security", blurb: "Penetration testing, ISO 27001, Bank of Uganda audits and incident response." },
  { key: "thinktank", label: "Think Tank", href: "/think-tank", blurb: "Independent research on data protection, digital rights and AI governance." },
  { key: "public-record", label: "Public Record", href: "/public-record", blurb: "Africa's laws, judgments and gazettes, searchable in one place." },
  { key: "literacy", label: "Literacy", href: "/literacy", blurb: "Cyber-safety and digital-skills training for schools, SMEs and government." },
  { key: "events", label: "Events", href: "/events", blurb: "The Cyber Luncheon and forums for Africa's security decision-makers." },
  { key: "media", label: "Media", href: "/media", blurb: "Podcasts and explainers on technology, policy and society." },
] as const;

const LABELS: Record<string, string> = Object.fromEntries(DIVISIONS.map((d) => [d.key, d.label]));
// Report topics and older division keys map onto the same labels
Object.assign(LABELS, {
  "think-tank": "Think Tank",
  "data-protection": "Data Protection",
  "ai-governance": "AI Governance",
  "digital-id": "Digital ID",
  "civic-tech": "Civic Tech",
  "open-gov": "Open Government",
  cybersecurity: "Cybersecurity",
});

export const divisionLabel = (key?: string | null) => (key ? LABELS[key] ?? key.replace(/-/g, " ") : "");
