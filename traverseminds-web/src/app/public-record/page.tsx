import type { Metadata } from "next";
import { getOpenDataLandscape } from "@/lib/hdx";
import { PublicRecordPageClient } from "./PublicRecordPageClient";

export const metadata: Metadata = {
  title: "Public Record Africa | Searchable Government Records",
  description:
    "AI-powered access to parliamentary records, gazettes, court filings, and regulatory notices across Africa, in one searchable place.",
};

export default async function PublicRecordPage() {
  const openData = await getOpenDataLandscape();
  return <PublicRecordPageClient openData={openData} />;
}
