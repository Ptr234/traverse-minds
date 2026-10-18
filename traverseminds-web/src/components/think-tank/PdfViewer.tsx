"use client";

import { useSyncExternalStore } from "react";
import { FileText } from "lucide-react";
import { PdfDownloadButton } from "@/components/ui/PdfDownloadButton";

interface PdfViewerProps {
  pdfUrl: string;
  title: string;
  filename: string;
}

const MOBILE = "(max-width: 768px)";
const subscribeMobile = (onChange: () => void) => {
  const mq = window.matchMedia(MOBILE);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};

export function PdfViewer({ pdfUrl, title, filename }: PdfViewerProps) {
  const isMobile = useSyncExternalStore(subscribeMobile, () => window.matchMedia(MOBILE).matches, () => false);

  if (isMobile) {
    return (
      <div className="mb-10">
        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#6b6e73" }}>Read the Report</p>
        <div
          className="flex flex-col items-center text-center gap-4 p-8"
          style={{ borderRadius: 0, border: "1px solid rgba(0,0,0,0.12)", background: "#f0f1f4" }}
        >
          <FileText className="h-12 w-12" style={{ color: "#6b6e73" }} />
          <p className="text-sm" style={{ color: "#515459" }}>
            Inline PDF viewing is not supported on mobile. Download the report to read it.
          </p>
          <PdfDownloadButton pdfUrl={pdfUrl} filename={filename} variant="prominent" />
        </div>
      </div>
    );
  }

  return (
    <div className="mb-10">
      <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#6b6e73" }}>Read the Report</p>
      <div style={{ borderRadius: 0, overflow: "hidden", border: "1px solid rgba(0,0,0,0.12)" }}>
        <iframe
          src={pdfUrl}
          title={title}
          width="100%"
          style={{ height: "80vh", minHeight: 520, display: "block", background: "#f0f1f4" }}
        />
      </div>
      <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="text-sm" style={{ color: "#6b6e73" }}>
          PDF not displaying? Try the download below.
        </p>
        <PdfDownloadButton pdfUrl={pdfUrl} filename={filename} variant="prominent" />
      </div>
    </div>
  );
}
