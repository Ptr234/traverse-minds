"use client";

import { useState } from "react";
import { Download } from "lucide-react";

interface PdfDownloadButtonProps {
  pdfUrl: string;
  filename: string;
  /** "card" = small pill for report cards; "prominent" = full orange button for detail page */
  variant?: "card" | "prominent";
}

export function PdfDownloadButton({ pdfUrl, filename, variant = "card" }: PdfDownloadButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch(pdfUrl);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      window.open(`${pdfUrl}?dl=${encodeURIComponent(filename)}`, "_blank");
    } finally {
      setLoading(false);
    }
  };

  if (variant === "prominent") {
    return (
      <button
        type="button"
        onClick={handleDownload}
        disabled={loading}
        className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white shrink-0"
        style={{ background: "#ff4c00", borderRadius: 6, cursor: loading ? "wait" : "pointer", border: "none" }}
      >
        <Download className="h-4 w-4" />
        {loading ? "Downloading…" : "Download PDF"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={loading}
      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold"
      style={{
        borderRadius: 8,
        color: "#000",
        background: "rgba(33,36,41,0.06)",
        transition: "all 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)",
        cursor: loading ? "wait" : "pointer",
        border: "none",
      }}
    >
      <Download className="h-3 w-3" />
      {loading ? "…" : "PDF"}
    </button>
  );
}
