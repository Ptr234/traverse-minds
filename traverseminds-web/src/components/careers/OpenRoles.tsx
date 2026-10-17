"use client";

import { useSyncExternalStore } from "react";
import { ArrowRight } from "lucide-react";
import { divisionLabel } from "@/lib/divisions";
import type { Job } from "@/lib/cms";

const noSubscribe = () => () => {};
const todayInBrowser = () => new Date().toISOString().slice(0, 10);

const deadlineLabel = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

/**
 * Open roles from Sanity. The static build already drops closed listings; this re-checks deadlines
 * in the browser so a role disappears on its closing date even before the next deploy.
 */
export function OpenRoles({ jobs }: { jobs: Job[] }) {
  const today = useSyncExternalStore(noSubscribe, todayInBrowser, () => "");
  const open = today ? jobs.filter((j) => j.deadline >= today) : jobs;

  if (open.length === 0) {
    return (
      <div className="border-t border-black/15 py-8">
        <p className="font-serif text-[22px] font-semibold text-black">No open roles right now.</p>
        <p className="mt-2 max-w-xl text-[16px] leading-relaxed text-gn-400">
          We are always glad to hear from talented people. Send a speculative application using the form below, or email{" "}
          <a href="mailto:traversemindsug@gmail.com" className="text-accent underline underline-offset-2">traversemindsug@gmail.com</a>.
        </p>
      </div>
    );
  }

  return (
    <ul className="border-t border-black/15">
      {open.map((job) => (
        <li key={job.id} className="border-b border-black/15">
          <a href={`?role=${encodeURIComponent(job.title)}#apply`} className="group grid gap-3 py-6 md:grid-cols-[1fr_auto] md:items-center">
            <span>
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-accent">{divisionLabel(job.division)}</span>
              <span className="mt-1.5 block font-serif text-[22px] font-semibold leading-tight text-black group-hover:text-accent">{job.title}</span>
              <span className="mt-2 block font-mono text-[12px] uppercase tracking-wide text-gn-500">
                {job.location} · {job.type.replace(/-/g, " ")} · closes {deadlineLabel(job.deadline)}
              </span>
            </span>
            <span className="inline-flex items-center gap-2 text-[14px] font-semibold text-black group-hover:text-accent">
              Apply <ArrowRight className="h-4 w-4" />
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
