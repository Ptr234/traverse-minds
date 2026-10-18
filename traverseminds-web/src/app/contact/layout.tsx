import type { Metadata } from "next";

// The page itself is a client component, so its metadata lives here
export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to Traverse Minds Africa about cybersecurity, research, training, events or Public Record. Based in Kampala, serving Africa.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
