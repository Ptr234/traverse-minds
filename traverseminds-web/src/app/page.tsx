import { TrustLogoStrip } from "@/components/ui/TrustLogoStrip";
import { PageTransition } from "@/components/ui/PageTransition";
import { NewsletterSignup } from "@/components/home/NewsletterSignup";
import { SectionBar } from "@/components/magazine/SectionBar";
import { LeadStory } from "@/components/magazine/LeadStory";
import { Briefing, type BriefingItem } from "@/components/magazine/Briefing";
import { StorySection } from "@/components/magazine/StorySection";
import { Diary } from "@/components/magazine/Diary";
import { DivisionIndex } from "@/components/magazine/DivisionIndex";
import { getMagazineContent } from "@/lib/content";
import { getStatistics, formatStatistic } from "@/lib/statistics";
import { getThreatWatch } from "@/lib/cisa";

export default async function HomePage() {
  const [content, homeStats, threats] = await Promise.all([
    getMagazineContent(),
    getStatistics("home", 6),
    getThreatWatch(1, { cvss: false }),
  ]);

  const [lead, ...otherPosts] = content.posts;
  const latest = content.latest.filter((s) => s.href !== lead?.href).slice(0, 5);

  const briefing: BriefingItem[] = [
    ...(threats
      ? [{ value: String(threats.addedLast30Days), label: "Software flaws newly confirmed as exploited in the last 30 days", source: "CISA KEV catalogue", href: "/security" }]
      : []),
    // Cited Sanity figures; population is context rather than news, so it is left out here
    ...homeStats
      .filter((s) => !s._id.includes("population"))
      .slice(0, threats ? 3 : 4)
      .map((s) => ({ value: formatStatistic(s), label: `${s.label} (${s.period})`, source: s.sourceOrg, href: "/think-tank" })),
  ];

  return (
    <PageTransition>
      <SectionBar />
      {lead && <LeadStory lead={lead} latest={latest} />}
      <Briefing items={briefing} />
      <StorySection title="Research" href="/think-tank" stories={content.reports} layout="feature" />
      <StorySection title="Analysis" href="/blog" stories={otherPosts} background="paper" />
      <Diary upcoming={content.upcomingEvents} past={content.pastEvents} />
      <DivisionIndex />
      <section className="section-padding-sm overflow-hidden border-t border-black/10">
        <TrustLogoStrip variant="light" />
      </section>
      <div id="newsletter">
        <NewsletterSignup />
      </div>
    </PageTransition>
  );
}
