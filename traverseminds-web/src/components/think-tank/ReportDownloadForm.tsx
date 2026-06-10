"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Report {
  id: string;
  title: string;
  pdfUrl: string;
}

interface Props {
  reports: Report[];
}

export function ReportDownloadForm({ reports }: Props) {
  const [email, setEmail] = useState("");
  const [selectedId, setSelectedId] = useState(reports[0]?.id ?? "");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const selected = reports.find((r) => r.id === selectedId) ?? reports[0];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selected) return;
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/report-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          reportTitle: selected.title,
          reportUrl: selected.pdfUrl,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-white/6 bg-surface-dark-elevated p-8 text-center" style={{ borderRadius: 16 }}>
        <CheckCircle2 className="mx-auto mb-4 h-10 w-10" style={{ color: "#ff4c00" }} />
        <h3 className="font-display text-lg font-bold text-white">Check your inbox.</h3>
        <p className="mt-2 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
          We have sent <span className="text-white/70 italic">{selected?.title}</span> to{" "}
          <span className="text-white">{email}</span>.
        </p>
      </div>
    );
  }

  return (
    <div className="border border-white/6 bg-surface-dark-elevated p-8" style={{ borderRadius: 16 }}>
      <h3 className="font-display text-lg font-bold text-white">Download the Report</h3>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
        {reports.length > 1 && (
          <div className="relative">
            <select
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              disabled={status === "loading"}
              className="w-full appearance-none border border-white/8 bg-white/4 px-4 py-3 pr-10 text-sm text-white outline-none"
              style={{ borderRadius: 8, transition: "border-color 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }}
            >
              {reports.map((r) => (
                <option key={r.id} value={r.id} style={{ background: "#212429", color: "#fff" }}>
                  {r.title}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center" style={{ color: "rgba(255,255,255,0.3)" }}>
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        )}
        <input
          type="email"
          placeholder="Your work email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-white/8 bg-white/4 px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none"
          style={{ borderRadius: 8, transition: "border-color 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }}
          required
          disabled={status === "loading"}
        />
        {status === "error" && (
          <p className="text-xs" style={{ color: "#ff6b6b" }}>{errorMsg}</p>
        )}
        <Button variant="primary" className="w-full" disabled={status === "loading"}>
          {status === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending&hellip;
            </>
          ) : (
            <>
              Send me the PDF
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
        <p className="text-[11px] text-center text-white/20">
          By downloading, you agree to join our research mailing list.
        </p>
      </form>
    </div>
  );
}
