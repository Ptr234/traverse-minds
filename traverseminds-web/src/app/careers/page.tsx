import type { Metadata } from "next";
import { ArrowRight, GraduationCap, Globe, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PageTransition } from "@/components/ui/PageTransition";
import { SectionBar } from "@/components/magazine/SectionBar";
import { PageHeader } from "@/components/magazine/PageHeader";
import { SectionHeader } from "@/components/magazine/primitives";
import { OpenRoles } from "@/components/careers/OpenRoles";
import { ApplicationForm } from "@/components/careers/ApplicationForm";
import { getJobs } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join Traverse Minds Africa: open roles, internships and fellowships in cybersecurity, research, media and civic tech.",
};

const benefits = [
  { icon: Globe, title: "Regional impact", desc: "Work on projects that directly influence digital policy and security across Africa." },
  { icon: Users, title: "Expert culture", desc: "Collaborate with some of the region's leading cybersecurity experts and researchers." },
  { icon: Zap, title: "Continuous growth", desc: "Access to international certifications and specialised training programmes." },
];

const earlyCareerTracks = ["Cybersecurity", "Data journalism", "Policy research", "Software engineering"];

export default async function CareersPage() {
  const jobs = await getJobs();

  return (
    <main className="flex flex-col">
      <PageTransition>
        <SectionBar />
        <PageHeader
          crumbs={[{ name: "Home", href: "/" }, { name: "Careers", href: "/careers" }]}
          kicker="Careers"
          title="Build the future of civic tech"
          dek="We are looking for people who want to solve the hardest technical and social challenges in Africa's digital landscape."
        >
          <div className="mt-6">
            <Button variant="primary" size="lg" href="#openings">View open positions</Button>
          </div>
        </PageHeader>

        {/* Why join */}
        <section className="bg-white">
          <div className="container-max py-14 lg:py-20">
            <SectionHeader title="Why Traverse" />
            <ol className="grid border-t border-black/15 md:grid-cols-3">
              {benefits.map((b, i) => (
                <li key={b.title} className="border-b border-black/15 py-6 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0">
                  <div className="flex items-center justify-between">
                    <b.icon className="h-5 w-5 text-accent" aria-hidden />
                    <span className="font-mono text-[12px] text-gn-500">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mt-4 font-serif text-[22px] font-semibold text-black">{b.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-gn-400">{b.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Open roles (Sanity: Job Listing) */}
        <section id="openings" className="bg-bg-light">
          <div className="container-max py-14 lg:py-20">
            <SectionHeader title="Open roles" />
            <div className="grid gap-10 lg:grid-cols-[1fr_2.2fr] lg:gap-14">
              <div>
                <h2 className="font-serif text-[clamp(26px,3vw,36px)] font-semibold leading-tight text-black">Current openings.</h2>
                <p className="mt-4 text-[16px] leading-relaxed text-gn-400">We are growing. Roles are listed here as they open, with their closing dates.</p>
              </div>
              <OpenRoles jobs={jobs} />
            </div>
          </div>
        </section>

        {/* Internships and fellowships */}
        <section className="relative overflow-hidden bg-bg-dark text-white">
          <div className="tech-grid-dark absolute inset-0" aria-hidden />
          <div className="container-max relative py-14 lg:py-20">
            <SectionHeader title="Early careers" dark />
            <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
              <div>
                <h2 className="font-serif text-[clamp(28px,3.4vw,40px)] font-semibold leading-tight">Internships and fellowships.</h2>
                <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-white/65">
                  We offer structured internship and fellowship programmes for students and early-career professionals interested in
                  civic tech, with hands-on experience across our divisions.
                </p>
                <div className="mt-8">
                  <Button variant="primary" size="lg" href="?role=Internship%20or%20fellowship#apply">
                    Express interest <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div>
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-white/45">
                  <GraduationCap className="h-4 w-4 text-accent" aria-hidden /> Tracks
                </p>
                <ul className="mt-4 border-t border-white/15">
                  {earlyCareerTracks.map((t, i) => (
                    <li key={t} className="flex items-baseline gap-4 border-b border-white/15 py-3.5">
                      <span className="font-mono text-[12px] text-white/35">{String(i + 1).padStart(2, "0")}</span>
                      <span className="font-serif text-[19px] font-semibold">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Application */}
        <section id="apply" className="bg-white">
          <div className="container-max py-14 lg:py-20">
            <SectionHeader title="Apply" />
            <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-14">
              <div>
                <h2 className="font-serif text-[clamp(26px,3vw,36px)] font-semibold leading-tight text-black">Apply to Traverse Minds Africa.</h2>
                <p className="mt-4 text-[16px] leading-relaxed text-gn-400">
                  Submit your application for an open role, an internship or fellowship, or send a speculative application.
                </p>
                <ul className="mt-6 space-y-2 font-mono text-[12px] uppercase tracking-wide text-gn-300">
                  <li className="flex items-center gap-2.5"><span className="h-1.5 w-1.5 bg-accent" aria-hidden /> Reply within five working days</li>
                  <li className="flex items-center gap-2.5"><span className="h-1.5 w-1.5 bg-accent" aria-hidden /> CV in PDF or Word</li>
                </ul>
              </div>
              <ApplicationForm roles={jobs.map((j) => j.title)} />
            </div>
          </div>
        </section>
      </PageTransition>
    </main>
  );
}
