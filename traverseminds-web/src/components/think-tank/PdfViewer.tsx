"use client";

import { useState, useEffect } from "react";
import { FileText } from "lucide-react";
import { PdfDownloadButton } from "@/components/ui/PdfDownloadButton";

interface PdfViewerProps {
  pdfUrl: string;
  title: string;
  filename: string;
}

export function PdfViewer({ pdfUrl, title, filename }: PdfViewerProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (isMobile) {
    return (
      <div className="mb-10">
        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#919499" }}>Read the Report</p>
        <div
          className="flex flex-col items-center text-center gap-4 p-8"
          style={{ borderRadius: 8, border: "1px solid rgba(0,0,0,0.12)", background: "#f0f1f4" }}
        >
          <FileText className="h-12 w-12" style={{ color: "#919499" }} />
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
      <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#919499" }}>Read the Report</p>
      <div style={{ borderRadius: 8, overflow: "hidden", border: "1px solid rgba(0,0,0,0.12)" }}>
        <iframe
          src={pdfUrl}
          title={title}
          width="100%"
          style={{ height: "80vh", minHeight: 520, display: "block", background: "#f0f1f4" }}
        />
      </div>
      <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="text-sm" style={{ color: "#919499" }}>
          PDF not displaying? Try the download below.
        </p>
        <PdfDownloadButton pdfUrl={pdfUrl} filename={filename} variant="prominent" />
      </div>
    </div>
  );
}
