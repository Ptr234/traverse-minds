import type { Metadata } from "next";
import { getOpenDataLandscape } from "@/lib/hdx";
import { getStatistics } from "@/lib/statistics";
import { PublicRecordPageClient } from "./PublicRecordPageClient";
import preview from "@/data/public-record-preview.json";

// Counted at build time from the preview dataset, so the Coverage figures always match what is searchable
const records = (preview as { records: { type: string }[] }).records;
const previewCounts = {
  total: records.length,
  legislation: records.filter((r) => r.type === "Legislation").length,
  judgments: records.filter((r) => r.type === "Judgment").length,
};

export const metadata: Metadata = {
  title: "Public Record Africa | Searchable Government Records",
  description:
    "AI-powered search over African public records, starting with Ugandan laws and court judgments. Every record links to its official source.",
};

export default async function PublicRecordPage() {
  const [openData, stats] = await Promise.all([getOpenDataLandscape(), getStatistics("public-record", 4)]);
  return <PublicRecordPageClient openData={openData} stats={stats} previewCounts={previewCounts} />;
}
