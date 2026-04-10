"use client";

import { useCallback, useState } from "react";
import { Play, Share2, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface PodcastEpisodeCardProps {
  episodeNumber: number;
  title: string;
  duration: string;
  topics: string[];
  publishedAt: string;
  /** URL used for sharing; falls back to current page URL */
  shareUrl?: string;
  className?: string;
}

export function PodcastEpisodeCard({
  episodeNumber,
  title,
  duration,
  topics,
  publishedAt,
  shareUrl,
  className,
}: PodcastEpisodeCardProps) {
  const [copied, setCopied] = useState(false);

  const resolvedUrl =
    shareUrl ?? (typeof window !== "undefined" ? window.location.href : "");

  const shareText = `${title} — Traverse Minds Africa Podcast Ep. ${episodeNumber}`;

  const handleCopyLink = useCallback(() => {
    if (!resolvedUrl) return;
    navigator.clipboard.writeText(resolvedUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [resolvedUrl]);

  const handleWhatsAppShare = useCallback(() => {
    const url = `https://wa.me/?text=${encodeURIComponent(`${shareText}\n${resolvedUrl}`)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }, [shareText, resolvedUrl]);

  const handleXShare = useCallback(() => {
    const url = `https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(resolvedUrl)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }, [shareText, resolvedUrl]);

  /* Format the date */
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(publishedAt));

  return (
    <article
      className={cn(
        "group relative flex flex-col gap-4 rounded-2xl border border-border-light bg-white p-6 transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-elevated hover:border-accent/15",
        className,
      )}
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      {/* Top row: badge + date + duration */}
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent">
          Ep. {episodeNumber}
        </span>
        <div className="flex items-center gap-3 text-xs text-brand-medium">
          <time dateTime={publishedAt}>{formattedDate}</time>
          <span className="h-1 w-1 rounded-full bg-brand-muted" />
          <span>{duration}</span>
        </div>
      </div>

      {/* Title + play button */}
      <div className="flex items-start gap-3">
        <button
          type="button"
          aria-label={`Play episode ${episodeNumber}`}
          className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-white shadow-lg shadow-accent/20 transition-transform duration-200 hover:scale-110 active:scale-95"
        >
          <Play className="h-4 w-4 fill-current" />
        </button>
        <h3 className="font-display text-lg font-bold leading-snug text-primary line-clamp-2">
          {title}
        </h3>
      </div>

      {/* Topic tags */}
      {topics.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {topics.map((topic) => (
            <span
              key={topic}
              className="rounded-full border border-border-light bg-surface-elevated px-3 py-0.5 text-xs font-medium text-brand-medium"
            >
              {topic}
            </span>
          ))}
        </div>
      )}

      {/* Share row */}
      <div className="mt-auto flex items-center gap-1 border-t border-border-light pt-4">
        <span className="mr-2 flex items-center gap-1 text-xs text-brand-muted">
          <Share2 className="h-3.5 w-3.5" />
          Share
        </span>

        {/* WhatsApp */}
        <button
          type="button"
          onClick={handleWhatsAppShare}
          aria-label="Share on WhatsApp"
          className="flex h-8 w-8 items-center justify-center rounded-full text-brand-medium transition-colors hover:bg-emerald/10 hover:text-emerald"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 fill-current"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </button>

        {/* X / Twitter */}
        <button
          type="button"
          onClick={handleXShare}
          aria-label="Share on X"
          className="flex h-8 w-8 items-center justify-center rounded-full text-brand-medium transition-colors hover:bg-primary/10 hover:text-primary"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 fill-current"
            aria-hidden="true"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </button>

        {/* Copy link */}
        <button
          type="button"
          onClick={handleCopyLink}
          aria-label="Copy episode link"
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full transition-colors",
            copied
              ? "text-emerald"
              : "text-brand-medium hover:bg-accent/10 hover:text-accent",
          )}
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
      </div>
    </article>
  );
}
