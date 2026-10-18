import type { Metadata } from "next";
import { MeetChristine } from "@/components/meet-christine/MeetChristine";
import { getOrganisations, getSiteSettings } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Meet Christine: Masiika Christine Thembo, Founder",
  description:
    "Cybersecurity and digital governance leader Masiika Christine Thembo: national security frameworks, digital forensics, and capacity building across Africa.",
};

export default async function MeetChristinePage() {
  const [organisations, settings] = await Promise.all([getOrganisations(), getSiteSettings()]);
  return <MeetChristine organisations={organisations} portrait={settings.christinePortrait} profileImage={settings.christineProfileImage} />;
}
