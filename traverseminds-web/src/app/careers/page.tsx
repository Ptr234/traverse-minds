import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { ImageSlideshow } from "@/components/ui/ImageSlideshow";
import { Briefcase, Users, Zap, Globe, ArrowRight } from "lucide-react";

const careersHeroImages = [
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1800&q=80",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1800&q=80",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1800&q=80",
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1800&q=80",
];

export const metadata: Metadata = {
  title: "Careers | Join the Traverse Minds Team",
  description: "Build the future of civic-tech in East Africa. Explore career opportunities in cybersecurity, data journalism, policy research, and software engineering.",
};

const benefits = [
  { icon: Globe, title: "Regional Impact", desc: "Work on projects that directly influence digital policy and security across East Africa." },
  { icon: Users, title: "Expert Culture", desc: "Collaborate with some of the region's leading cybersecurity experts and researchers." },
  { icon: Zap, title: "Continuous Growth", desc: "Access to international certifications and specialized training programs." },
];

const jobs: { title: string; team: string; location: string; type: string }[] = [];

export default function CareersPage() {
  return (
    <main className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-24 lg:pt-44 lg:pb-36 text-white">
        <ImageSlideshow images={careersHeroImages} overlay="bg-primary/70" />

        <div className="container-max relative z-10 px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/4 px-4 py-1.5 backdrop-blur-md mb-8">
            <div className="h-1 w-1 rounded-full bg-accent" />
            <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-white/40">Careers</span>
          </div>

          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Build the future of{" "}
            <span className="text-gradient-accent">civic-tech</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/35 leading-relaxed">
            We are looking for brilliant minds who want to solve the hardest technical
            and social challenges in Africa&apos;s digital landscape.
          </p>

          <div className="mt-10">
            <Button variant="primary" size="lg" href="#openings">
              View Open Positions
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="relative bg-white section-padding overflow-hidden">
        <div className="absolute inset-0 dot-grid-light opacity-30 pointer-events-none" />

        <div className="container-max relative z-10">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="group flex flex-col items-center text-center rounded-2xl border border-border-light bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-elevated hover:border-accent/15"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/5 text-primary transition-all duration-300 group-hover:bg-accent group-hover:text-white group-hover:scale-110">
                  <benefit.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg font-bold text-primary">{benefit.title}</h3>
                <p className="mt-3 text-sm text-brand-medium/60 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Openings */}
      <section id="openings" className="relative bg-surface-elevated section-padding overflow-hidden">
        <div className="absolute inset-0 dot-grid-light opacity-40 pointer-events-none" />

        <div className="container-max relative z-10 max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/8 bg-primary/3 px-4 py-1.5 mb-5">
              <div className="h-1 w-1 rounded-full bg-accent" />
              <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-primary/50">Open Roles</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary tracking-tight">
              Current Openings
            </h2>
            <p className="mt-3 text-brand-medium/60">
              We&apos;re growing. Send a speculative application to careers@traverseminds.ug
            </p>
          </div>

          {jobs.length > 0 ? (
            <div className="space-y-4">
              {jobs.map((job) => (
                <div
                  key={job.title}
                  className="group relative overflow-hidden rounded-2xl border border-border-light bg-white p-6 transition-all duration-500 hover:shadow-elevated hover:border-accent/15 hover:-translate-y-0.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="absolute inset-0 bg-linear-to-r from-accent/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <h3 className="font-display text-lg font-bold text-primary group-hover:text-accent transition-colors">
                      {job.title}
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-4 text-sm text-brand-medium/50">
                      <span className="flex items-center gap-1.5">
                        <Briefcase className="h-3.5 w-3.5 text-accent" /> {job.team}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Globe className="h-3.5 w-3.5 text-accent" /> {job.location}
                      </span>
                      <span className="rounded-full bg-primary/5 px-3 py-0.5 text-xs font-semibold text-primary/60">
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="relative z-10 shrink-0">
                    Apply Now <ArrowRight className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border-2 border-dashed border-border-light py-16 text-center">
              <Briefcase className="mx-auto h-10 w-10 text-brand-muted/30 mb-4" />
              <h3 className="font-display text-lg font-bold text-primary">No current openings</h3>
              <p className="mt-2 text-brand-medium/60 max-w-md mx-auto">
                We don&apos;t have any open roles right now, but we&apos;re always interested in hearing from talented people.
                Send your CV to <a href="mailto:careers@traverseminds.ug" className="text-accent underline underline-offset-2 hover:text-accent-hover">careers@traverseminds.ug</a>.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
