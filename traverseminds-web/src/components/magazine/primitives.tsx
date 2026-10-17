// Building blocks for the magazine layouts: kicker, byline, section header, story card.

import Image from "next/image";
import Link from "next/link";
import { divisionLabel } from "@/lib/divisions";
import { formatStoryDate, type Story } from "@/lib/content";

export function Kicker({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-accent ${className}`}>{children}</p>
  );
}

export function Byline({ story, className = "" }: { story: Story; className?: string }) {
  const parts = [
    story.author ? `By ${story.author}` : null,
    story.kind === "event" && story.location ? story.location : null,
    formatStoryDate(story.date),
    story.readTime ?? null,
  ].filter(Boolean);
  return <p className={`text-[13px] text-gn-500 ${className}`}>{parts.join(" · ")}</p>;
}

/** Heavy rule + label, the standard magazine section opener. `dark` is for sections on a dark background. */
export function SectionHeader({
  title,
  href,
  linkLabel = "See all",
  dark = false,
}: {
  title: string;
  href?: string;
  linkLabel?: string;
  dark?: boolean;
}) {
  return (
    <div className={`mb-6 flex items-baseline justify-between border-t-2 pt-3 ${dark ? "border-white/80" : "border-black"}`}>
      <h2 className={`flex items-center gap-2 font-mono text-[13px] font-semibold uppercase tracking-[0.14em] ${dark ? "text-white" : "text-black"}`}>
        <span className="h-2 w-2 bg-accent" aria-hidden />
        {title}
      </h2>
      {href && (
        <Link href={href} className={`text-[13px] font-medium hover:text-accent ${dark ? "text-white/60" : "text-gn-400"}`}>
          {linkLabel} →
        </Link>
      )}
    </div>
  );
}

const KIND_LABEL: Record<Story["kind"], string> = { post: "Analysis", report: "Research", event: "Event" };
export const storyKicker = (s: Story) => divisionLabel(s.kicker) || KIND_LABEL[s.kind];

type CardSize = "lg" | "md" | "sm";
const HEADLINE: Record<CardSize, string> = {
  lg: "text-[28px] md:text-[34px] leading-[1.12]",
  md: "text-[21px] leading-[1.2]",
  sm: "text-[17px] leading-[1.25]",
};

/** Image on top, text below. Square image corners, serif headline; HUD brackets on hover. */
export function StoryCard({ story, size = "md", showDek = true, priority = false }: { story: Story; size?: CardSize; showDek?: boolean; priority?: boolean }) {
  return (
    <article className="group">
      <Link href={story.href} className="block">
        {story.image && (
          <div className={`tech-card relative overflow-hidden bg-gn-800 ${size === "lg" ? "aspect-[16/9]" : "aspect-[3/2]"}`}>
            <Image
              src={story.image}
              alt={story.imageAlt ?? ""}
              fill
              priority={priority}
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              sizes={size === "lg" ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 640px) 100vw, 33vw"}
            />
          </div>
        )}
        <Kicker className={story.image ? "mt-4" : ""}>{storyKicker(story)}</Kicker>
        <h3 className={`mt-2 font-serif font-semibold text-black group-hover:text-accent transition-colors ${HEADLINE[size]}`}>
          {story.title}
        </h3>
      </Link>
      {showDek && story.dek && (
        <p className={`mt-2 text-gn-400 ${size === "lg" ? "text-[17px] leading-relaxed" : "text-[15px] leading-relaxed line-clamp-3"}`}>{story.dek}</p>
      )}
      <Byline story={story} className="mt-3" />
    </article>
  );
}
