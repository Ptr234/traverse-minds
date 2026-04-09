"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ImageSlideshow } from "@/components/ui/ImageSlideshow";
import { PageTransition } from "@/components/ui/PageTransition";
import { SectionReveal, RevealItem } from "@/components/ui/SectionReveal";
import { TextReveal } from "@/components/ui/TextReveal";
import { Briefcase, Users, Zap, Globe, ArrowRight, GraduationCap, Loader2, CheckCircle } from "lucide-react";

const careersHeroImages = [
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2074&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1974&auto=format&fit=crop",
];

const benefits = [
  { icon: Globe, title: "Regional Impact", desc: "Work on projects that directly influence digital policy and security across Africa." },
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
      <PageTransition>
        {/* Hero */}
        <section className="relative overflow-hidden pt-32 pb-24 lg:pt-44 lg:pb-36 text-white">
          <ImageSlideshow images={careersHeroImages} overlay="bg-primary/70" />

          <div className="container-max relative z-10 px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
            >
              <p className="eyebrow" style={{ color: "#ff4c00", marginBottom: 16 }}>Careers</p>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1, ease: [0.215, 0.61, 0.355, 1] }}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
            >
              Build the future of{" "}
              <span style={{ color: "#ff4c00" }}>civic-tech</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
              className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}
            >
              We are looking for brilliant minds who want to solve the hardest technical
              and social challenges in Africa&apos;s digital landscape.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
              className="mt-10"
            >
              <Button variant="primary" size="lg" href="#openings">
                View Open Positions
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Benefits */}
        <section style={{ background: "#ffffff", borderTop: "1px solid rgba(0,0,0,0.3)", paddingTop: 56, paddingBottom: 56 }} className="relative overflow-hidden">
          <div className="container-max relative z-10">
            <SectionReveal variant="fade-up" staggerChildren={0.1} className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {benefits.map((benefit) => (
                <RevealItem key={benefit.title} variant="scale-fade">
                  <div
                    className="group flex flex-col items-center text-center border bg-white p-8"
                    style={{ borderRadius: 8, borderColor: "rgba(0,0,0,0.1)", transition: "all 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)", boxShadow: "0 4px 8px 0 rgba(0,0,0,0.1), 0 2px 2px 0 rgba(0,0,0,0.15), 0 1px 0 0 rgba(0,0,0,0.05)" }}
                  >
                    <div className="mb-5 flex h-14 w-14 items-center justify-center bg-primary/5" style={{ borderRadius: 8, transition: "all 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }}>
                      <benefit.icon className="h-6 w-6" style={{ color: "#000" }} />
                    </div>
                    <h3 className="font-display text-lg font-bold" style={{ color: "#000" }}>{benefit.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed" style={{ color: "#515459" }}>{benefit.desc}</p>
                  </div>
                </RevealItem>
              ))}
            </SectionReveal>
          </div>
        </section>

        {/* Openings */}
        <section id="openings" style={{ background: "#f0f1f4", paddingTop: 56, paddingBottom: 56 }} className="relative overflow-hidden">
          <div className="container-max relative z-10 max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
              >
                <p className="eyebrow" style={{ color: "#ff4c00", marginBottom: 16 }}>Open Roles</p>
              </motion.div>
              <TextReveal
                as="h2"
                variant="blur-in"
                className="font-display text-3xl md:text-4xl font-bold tracking-tight" style={{ color: "#000" }}
              >
                Current Openings
              </TextReveal>
              <SectionReveal variant="fade-up" delay={0.1}>
                <p className="mt-3" style={{ color: "#515459" }}>
                  We&apos;re growing. Send a speculative application to careers@traverseminds.ug
                </p>
              </SectionReveal>
            </div>

            <SectionReveal variant="clip-inset">
              {jobs.length > 0 ? (
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <div
                      key={job.title}
                      className="group relative overflow-hidden border bg-white p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      style={{ borderRadius: 8, borderColor: "rgba(0,0,0,0.1)", transition: "all 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }}
                    >
                      <div className="absolute inset-0 bg-linear-to-r from-accent/3 to-transparent opacity-0 group-hover:opacity-100" style={{ transition: "opacity 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }} />
                      <div className="relative z-10">
                        <h3 className="font-display text-lg font-bold" style={{ color: "#000", transition: "color 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }}>
                          {job.title}
                        </h3>
                        <div className="mt-2 flex flex-wrap gap-4 text-sm" style={{ color: "#515459" }}>
                          <span className="flex items-center gap-1.5">
                            <Briefcase className="h-3.5 w-3.5 text-accent" /> {job.team}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Globe className="h-3.5 w-3.5 text-accent" /> {job.location}
                          </span>
                          <span className="bg-primary/5 px-3 py-0.5 text-xs font-semibold" style={{ borderRadius: 999, color: "#515459" }}>
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
                <div className="border-2 border-dashed py-16 text-center" style={{ borderRadius: 16, borderColor: "rgba(0,0,0,0.1)" }}>
                  <Briefcase className="mx-auto h-10 w-10 mb-4" style={{ color: "#919499" }} />
                  <h3 className="font-display text-lg font-bold" style={{ color: "#000" }}>No current openings</h3>
                  <p className="mt-2 max-w-md mx-auto" style={{ color: "#515459" }}>
                    We don&apos;t have any open roles right now, but we&apos;re always interested in hearing from talented people.
                    Send your CV to <a href="mailto:careers@traverseminds.ug" className="text-accent underline underline-offset-2">careers@traverseminds.ug</a>.
                  </p>
                </div>
              )}
            </SectionReveal>
          </div>
        </section>

        {/* Internships & Fellowships */}
        <section style={{ background: "#212429", paddingTop: 56, paddingBottom: 56 }} className="relative overflow-hidden">
          <div className="container-max relative z-10">
            <div className="mx-auto max-w-3xl text-center">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
              >
                <p className="eyebrow" style={{ color: "#ff4c00", marginBottom: 16 }}>Early Careers</p>
              </motion.div>

              <TextReveal
                as="h2"
                variant="clip-up"
                className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight"
              >
                Internships & Fellowships
              </TextReveal>

              <SectionReveal variant="scale-fade" delay={0.1}>
                <div className="mt-8 flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center bg-white/10" style={{ borderRadius: 8 }}>
                    <GraduationCap className="h-8 w-8 text-accent" />
                  </div>
                </div>
              </SectionReveal>

              <SectionReveal variant="fade-blur" delay={0.2}>
                <p className="mt-6 text-base leading-relaxed max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
                  We offer structured internship and fellowship programmes for students and early-career
                  professionals interested in civic-tech. Gain hands-on experience across cybersecurity,
                  data journalism, policy research, and software engineering.
                </p>
              </SectionReveal>

              <SectionReveal variant="slide-up" delay={0.3}>
                <div className="mt-10">
                  <Button variant="primary" size="lg" href="#apply">
                    Express Interest
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </SectionReveal>
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section id="apply" style={{ background: "#ffffff", borderTop: "1px solid rgba(0,0,0,0.3)", paddingTop: 56, paddingBottom: 56 }} className="relative overflow-hidden">
          <div className="container-max relative z-10 max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
              >
                <p className="eyebrow" style={{ color: "#ff4c00", marginBottom: 16 }}>Application</p>
              </motion.div>

              <TextReveal
                as="h2"
                variant="fade-up"
                className="font-display text-3xl md:text-4xl font-bold tracking-tight" style={{ color: "#000" }}
              >
                Apply to Traverse Minds Africa
              </TextReveal>
              <SectionReveal variant="mask-wipe" delay={0.1}>
                <p className="mt-3" style={{ color: "#515459" }}>
                  Submit your application for open roles, internships, or fellowships.
                </p>
              </SectionReveal>
            </div>

            <SectionReveal variant="slide-up" delay={0.15}>
              {formStatus === "success" ? (
                <div className="border p-10 text-center" style={{ borderRadius: 16, borderColor: "rgba(0,0,0,0.1)", background: "#f0f1f4" }}>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald/10 text-emerald">
                    <CheckCircle className="h-10 w-10" />
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-bold" style={{ color: "#000" }}>Application Received</h3>
                  <p className="mt-4" style={{ color: "#515459" }}>
                    Thank you for your interest in Traverse Minds Africa. We&apos;ll review your application and get back to you within 5 business days.
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
                  className="border p-8 md:p-10 space-y-6"
                  style={{ borderRadius: 16, borderColor: "rgba(0,0,0,0.1)", background: "#f0f1f4" }}
                >
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold" style={{ color: "#000" }}>Full Name *</label>
                      <input
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Jane Nakamya"
                        className="w-full border bg-white px-4 py-3 text-sm outline-none"
                        style={{ borderRadius: 8, borderColor: "rgba(0,0,0,0.1)", color: "#000", transition: "border-color 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold" style={{ color: "#000" }}>Email Address *</label>
                      <input
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="jane@example.com"
                        className="w-full border bg-white px-4 py-3 text-sm outline-none"
                        style={{ borderRadius: 8, borderColor: "rgba(0,0,0,0.1)", color: "#000", transition: "border-color 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold" style={{ color: "#000" }}>Phone Number *</label>
                    <input
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+256 700 000 000"
                      className="w-full border bg-white px-4 py-3 text-sm outline-none"
                      style={{ borderRadius: 8, borderColor: "rgba(0,0,0,0.1)", color: "#000", transition: "border-color 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold" style={{ color: "#000" }}>Cover Letter *</label>
                    <textarea
                      name="coverLetter"
                      rows={5}
                      required
                      value={formData.coverLetter}
                      onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                      placeholder="Tell us about yourself, your experience, and why you want to join Traverse Minds Africa..."
                      className="w-full border bg-white px-4 py-3 text-sm outline-none resize-none"
                      style={{ borderRadius: 8, borderColor: "rgba(0,0,0,0.1)", color: "#000", transition: "border-color 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)" }}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold" style={{ color: "#000" }}>Upload CV *</label>
                    <input
                      name="cv"
                      type="file"
                      required
                      accept=".pdf,.doc,.docx"
                      className="w-full min-h-11 border bg-white px-4 py-3 text-sm file:mr-4 file:border-0 file:bg-accent/10 file:px-4 file:py-2 file:text-xs file:font-semibold file:text-accent cursor-pointer"
                      style={{ borderRadius: 8, borderColor: "rgba(0,0,0,0.1)", color: "#000" }}
                    />
                    <p className="text-xs" style={{ color: "#919499" }}>Accepted formats: PDF, DOC, DOCX (max 5MB)</p>
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
            </SectionReveal>
          </div>
        </section>
      </PageTransition>
    </main>
  );
}
