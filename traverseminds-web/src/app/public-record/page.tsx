import type { Metadata } from "next";
import { getOpenDataLandscape } from "@/lib/hdx";
import { getStatistics } from "@/lib/statistics";
import { PublicRecordPageClient } from "./PublicRecordPageClient";

export const metadata: Metadata = {
  title: "Public Record Africa | Searchable Government Records",
  description:
    "AI-powered access to parliamentary records, gazettes, court filings, and regulatory notices across Africa, in one searchable place.",
};

export default async function PublicRecordPage() {
  const [openData, stats] = await Promise.all([getOpenDataLandscape(), getStatistics("public-record", 4)]);
  return <PublicRecordPageClient openData={openData} stats={stats} />;
}
