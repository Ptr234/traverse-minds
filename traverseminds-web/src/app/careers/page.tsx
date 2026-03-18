"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ImageSlideshow } from "@/components/ui/ImageSlideshow";
import { Briefcase, Users, Zap, Globe, ArrowRight, GraduationCap, Loader2, CheckCircle } from "lucide-react";

const careersHeroImages = [
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1800&q=80",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1800&q=80",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1800&q=80",
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1800&q=80",
];

const benefits = [
  { icon: Globe, title: "Regional Impact", desc: "Work on projects that directly influence digital policy and security across East Africa." },
  { icon: Users, title: "Expert Culture", desc: "Collaborate with some of the region's leading cybersecurity experts and researchers." },
  { icon: Zap, title: "Continuous Growth", desc: "Access to international certifications and specialized training programs." },
];

const jobs: { title: string; team: string; location: string; type: string }[] = [];

export default function CareersPage() {
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    coverLetter: "",
  });

  const handleApplicationSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("loading");

    try {
      const form = e.currentTarget;
      const data = new FormData(form);

      const res = await fetch("/api/apply", {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error("Failed to submit");
      setFormStatus("success");
      setFormData({ name: "", email: "", phone: "", coverLetter: "" });
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <main className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-24 lg:pt-44 lg:pb-36 text-white">
        <ImageSlideshow images={careersHeroImages} overlay="bg-primary/70" />

        <div className="container-max relative z-10 px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/4 px-4 py-1.5 backdrop-blur-md mb-8">
            <div className="h-1 w-1 rounded-full bg-accent" />
            <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-white/55">Careers</span>
          </div>

          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Build the future of{" "}
            <span className="text-gradient-accent">civic-tech</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/50 leading-relaxed">
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

      {/* Internships & Fellowships */}
      <section className="relative bg-primary section-padding overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
        <div className="absolute top-0 right-0 h-96 w-96 translate-x-1/3 -translate-y-1/3 rounded-full bg-accent/5 blur-[120px]" />

        <div className="container-max relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/4 px-4 py-1.5 mb-5">
              <div className="h-1 w-1 rounded-full bg-accent" />
              <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-white/55">Early Careers</span>
            </div>

            <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">
              Internships & Fellowships
            </h2>

            <div className="mt-8 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
                <GraduationCap className="h-8 w-8 text-accent" />
              </div>
            </div>

            <p className="mt-6 text-base text-white/55 leading-relaxed max-w-2xl mx-auto">
              We offer structured internship and fellowship programmes for students and early-career
              professionals interested in civic-tech. Gain hands-on experience across cybersecurity,
              data journalism, policy research, and software engineering.
            </p>

            <div className="mt-10">
              <Button variant="primary" size="lg" href="#apply">
                Express Interest
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="relative bg-white section-padding overflow-hidden">
        <div className="absolute inset-0 dot-grid-light opacity-30 pointer-events-none" />

        <div className="container-max relative z-10 max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/8 bg-primary/3 px-4 py-1.5 mb-5">
              <div className="h-1 w-1 rounded-full bg-accent" />
              <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-primary/50">Application</span>
            </div>

            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary tracking-tight">
              Apply to Traverse Minds
            </h2>
            <p className="mt-3 text-brand-medium/60">
              Submit your application for open roles, internships, or fellowships.
            </p>
          </div>

          {formStatus === "success" ? (
            <div className="rounded-3xl border border-border-light bg-surface-elevated p-10 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald/10 text-emerald">
                <CheckCircle className="h-10 w-10" />
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold text-primary">Application Received</h3>
              <p className="mt-4 text-brand-medium/60">
                Thank you for your interest in Traverse Minds. We&apos;ll review your application and get back to you within 5 business days.
              </p>
              <div className="mt-8">
                <Button variant="outline" onClick={() => setFormStatus("idle")}>
                  Submit Another Application
                </Button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleApplicationSubmit}
              className="rounded-3xl border border-border-light bg-surface-elevated p-8 md:p-10 space-y-6"
            >
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-primary">Full Name *</label>
                  <input
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jane Nakamya"
                    className="w-full rounded-xl border border-border-light bg-white px-4 py-3 text-sm text-primary placeholder:text-brand-muted/40 outline-none focus:border-accent/40 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-primary">Email Address *</label>
                  <input
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@example.com"
                    className="w-full rounded-xl border border-border-light bg-white px-4 py-3 text-sm text-primary placeholder:text-brand-muted/40 outline-none focus:border-accent/40 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-primary">Phone Number *</label>
                <input
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+256 700 000 000"
                  className="w-full rounded-xl border border-border-light bg-white px-4 py-3 text-sm text-primary placeholder:text-brand-muted/40 outline-none focus:border-accent/40 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-primary">Cover Letter *</label>
                <textarea
                  name="coverLetter"
                  rows={5}
                  required
                  value={formData.coverLetter}
                  onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                  placeholder="Tell us about yourself, your experience, and why you want to join Traverse Minds..."
                  className="w-full rounded-xl border border-border-light bg-white px-4 py-3 text-sm text-primary placeholder:text-brand-muted/40 outline-none focus:border-accent/40 transition-colors resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-primary">Upload CV *</label>
                <input
                  name="cv"
                  type="file"
                  required
                  accept=".pdf,.doc,.docx"
                  className="w-full rounded-xl border border-border-light bg-white px-4 py-3 text-sm text-primary file:mr-4 file:rounded-lg file:border-0 file:bg-accent/10 file:px-4 file:py-1.5 file:text-xs file:font-semibold file:text-accent hover:file:bg-accent/20 cursor-pointer"
                />
                <p className="text-xs text-brand-muted/50">Accepted formats: PDF, DOC, DOCX (max 5MB)</p>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full justify-center"
                disabled={formStatus === "loading"}
              >
                {formStatus === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Application
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>

              {formStatus === "error" && (
                <p className="text-center text-sm font-medium text-red-500">
                  Something went wrong. Please try again or email your application to careers@traverseminds.ug
                </p>
              )}
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
