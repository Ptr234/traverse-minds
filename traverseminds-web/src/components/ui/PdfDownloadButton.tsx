"use client";

import { useState } from "react";
import { Download } from "lucide-react";

interface Props {
  pdfUrl: string;
  filename: string;
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function PdfDownloadButton({ pdfUrl, filename, label = "Download PDF", className, style }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleDownload() {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch(pdfUrl);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className={className}
      style={style}
    >
      <Download className="h-4 w-4" />
      {loading ? "Preparing…" : label}
    </button>
  );
}
