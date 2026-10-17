"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import {
  Linkedin,
  Mail,
  Award,
  CheckCircle2,
  Globe,
  ExternalLink,
  ArrowRight,
  Fingerprint,
  Loader2,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import type { OrganisationContent } from "@/content/organisations";

const TABS = [
  { id: "about",        label: "About" },
  { id: "competencies", label: "Expertise" },
  { id: "affiliations", label: "Network" },
  { id: "experience",   label: "Journey" },
  { id: "recognition",  label: "Recognition" },
  { id: "connect",      label: "Connect" },
];

const COMPETENCIES = [
  { 
    title: "Digital Governance & Policy", 
    desc: "Architecting national cybersecurity strategies and data protection frameworks (GDPR, AU Convention) to foster secure digital economies.",
    items: ["National Strategy", "Regulatory Compliance", "PPP Development", "Multi-stakeholder Engagement"]
  },
  { 
    title: "National Security & Risk", 
    desc: "Critical Infrastructure Protection, threat intelligence analysis, and high-stakes security audits (ISO 27001, NIST, COBIT).",
    items: ["Incident Response", "Vulnerability Assessment", "Digital Forensics", "Business Continuity"]
  },
  { 
    title: "Capacity Building", 
    desc: "Designing technical training and gender-inclusive STEM initiatives to strengthen institutional resilience and knowledge transfer.",
    items: ["Technical Training", "Mentorship Programs", "Institutional Strengthening", "STEM Advocacy"]
  },
  { 
    title: "Project Management & Leadership", 
    desc: "Leading multidisciplinary teams of 30+ staff in agile environments to deliver complex security and development projects.",
    items: ["Agile Management", "Budget Management", "Stakeholder Relations", "Change Management"]
  },
];

const TOOLKIT = [
  { label: "Security stack", items: ["Nmap / Metasploit", "Burp Suite / OWASP", "EnCase / Axiom / FTK", "Python / SQL / C++"] },
  { label: "Frameworks", items: ["ISO 27001 / NIST", "COBIT / CIS", "GDPR / AU Data Act", "Agile / Scrum"] },
];

const EXPERIENCE = [
  {
    company: "Uganda Investment Authority",
    role: "Information Security Specialist",
    period: "Dec 2023 - Present",
    desc: "Leading cybersecurity initiatives for Uganda's primary investment promotion agency, focusing on national digital infrastructure.",
    impact: [
      "Reduced security exposure by 60% across 15+ government portals.",
      "Developed policy frameworks addressing emerging cyber threats in Sub-Saharan Africa.",
      "Designed security assessment protocols for foreign direct investment platforms."
    ]
  },
  {
    company: "Traverse Minds Africa",
    role: "Researcher Lead & Cyber Advisor",
    period: "Jan 2022 - Present",
    desc: "Advancing cybersecurity policy and conducting applied research on challenges in emerging economies.",
    impact: [
      "Designed penetration testing frameworks for FINTECH compliance with regional regulations.",
      "Facilitated 20+ training sessions for legal professionals on cyber law and privacy.",
      "Collaborated with academia and government to address privacy and security challenges."
    ]
  },
  {
    company: "TMFE Group, Sydney",
    role: "Cyber Security Consultant",
    period: "Nov 2020 - Mar 2021",
    desc: "Providing strategic cybersecurity guidance for international digital transformation initiatives.",
    impact: [
      "Authored 6 technical papers on IoT security, ML applications, and threat modeling.",
      "Developed information security programs for emerging technology adoption.",
      "Led vulnerability management initiatives across distributed global teams."
    ]
  },
  {
    company: "Applied Principles Consulting",
    role: "Digital Forensics Analyst & Lead IT Ops",
    period: "Jul 2019 - Aug 2020",
    desc: "Supporting financial sector stability through advanced forensics and cross-sector security assessments.",
    impact: [
      "Managed 15+ investigations in financial fraud cases, recovering $2M+ in assets.",
      "Developed innovative mobile forensics methodologies adopted across East Africa.",
      "Pioneered security service offerings contributing to 40% revenue growth."
    ]
  },
  {
    company: "Ngyero Design Co. & Kikorongo Safari Lodge",
    role: "Founder & CEO",
    period: "2018 - Present",
    desc: "Promoting sustainable tourism and local economic development through entrepreneurial ventures.",
    impact: [
      "Created 30+ direct employment opportunities in rural Uganda.",
      "Completed 30+ design projects across East Africa using sustainable materials.",
      "Managed multidisciplinary teams of 30+ professionals across various roles."
    ]
  },
  {
    company: "NITA-U",
    role: "Information Security Graduate Trainee",
    period: "Oct 2016 - Sept 2017",
    desc: "Contributing to Uganda's national digital transformation and cyber resilience strategy.",
    impact: [
      "Co-developed the National Information Security Framework (NISF).",
      "Established Computer Emergency Response Team (CERT) capabilities.",
      "Trained 300+ government personnel on encryption and web application security."
    ]
  }
];

// ── Components ──

function OrgOverlay({ org, onClose }: { org: OrganisationContent; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[110] flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm"
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={org.name}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg border-t-[3px] border-accent bg-white"
      >
        <button type="button" onClick={onClose} className="absolute right-4 top-4 p-1 text-gn-400 hover:text-black" aria-label="Close">
          <X className="h-5 w-5" />
        </button>
        <div className="p-8 sm:p-10">
          <div className="relative h-14 w-36">
            {org.logo ? (
              <Image src={org.logo} alt={org.name} fill className="object-contain object-left" />
            ) : (
              <p className="font-serif text-xl font-semibold text-black">{org.name}</p>
            )}
          </div>
          <p className="mt-8 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-accent">{org.role}</p>
          <h3 className="mt-2 font-serif text-[26px] font-semibold leading-tight text-black">{org.name}</h3>
          <p className="mt-4 text-[16px] leading-relaxed text-gn-400">{org.description}</p>
          <div className="mt-8 flex flex-wrap items-center gap-5 border-t border-black/10 pt-6">
            {org.website && (
              <a href={org.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-black px-5 py-3 text-[13px] font-semibold text-white hover:bg-accent">
                Visit website <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
            <button type="button" onClick={onClose} className="font-mono text-[12px] uppercase tracking-wider text-gn-400 hover:text-black">
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/** Section opener used on this page: heavy rule + mono label with an accent square. */
function SectionLabel({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p
      className={`flex items-center gap-2 border-t-2 pt-3 font-mono text-[13px] font-semibold uppercase tracking-[0.14em] ${
        dark ? "border-white/80 text-white" : "border-black text-black"
      }`}
    >
      <span className="h-2 w-2 bg-accent" aria-hidden />
      {children}
    </p>
  );
}

function SectionHeading({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <h2 className={`mt-6 font-serif text-[clamp(30px,4vw,48px)] font-semibold leading-[1.08] ${light ? "text-white" : "text-black"}`}>
      {children}
    </h2>
  );
}

function TabBar({ active, onChange }: { active: string; onChange: (id: string) => void }) {
  return (
    <nav aria-label="On this page" className="sticky top-[72px] z-40 border-b border-black/10 bg-white/95 backdrop-blur-md lg:top-20">
      <div className="container-max flex overflow-x-auto">
        {TABS.map((t, i) => (
          <button
            key={t.id}
            type="button"
            onClick={() => onChange(t.id)}
            aria-current={active === t.id ? "true" : undefined}
            className={`relative flex shrink-0 items-baseline gap-2 whitespace-nowrap px-4 py-4 font-mono text-[12px] uppercase tracking-wider transition-colors first:pl-0 ${
              active === t.id ? "text-black" : "text-gn-500 hover:text-black"
            }`}
          >
            <span className={active === t.id ? "text-accent" : "text-gn-600"}>{String(i + 1).padStart(2, "0")}</span>
            {t.label}
            {active === t.id && (
              <motion.span layoutId="activeTab" className="absolute inset-x-4 bottom-0 h-[3px] bg-accent" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
}

const PROFILE = [
  { label: "Recognition", val: "Ascent Top 100 Career Women in Africa 2026" },
  { label: "Leadership", val: "President, Women in Design UG" },
  { label: "Community", val: "Founder, CyberLuncheon" },
  { label: "Impact", val: "$2M+ asset recovery in forensics" },
];

const PILLARS = [
  { title: "Strategic policy", desc: "Crafting national frameworks that align technology with public interest." },
  { title: "Cyber protection", desc: "Hardening critical infrastructure against evolving global threats." },
  { title: "Inclusive growth", desc: "Bridging the digital divide with gender-equitable STEM initiatives." },
];

const SPEAKING = [
  { event: "(ISC)² Keynote", title: "Mentoring Women in Cybersecurity", detail: "Global audience of 2,000+ professionals." },
  { event: "Africa Tech Summit", title: "Cybersecurity Challenges in Africa", detail: "Expert panelist on regional digital transformation." },
  { event: "Bowmans & Citibank Fintech", title: "Digital Economy Transformation", detail: "Leveraging technology for financial inclusion." },
  { event: "Kipya Cyber Security", title: "Blockchain in Digital Forensics", detail: "Exploring emerging investigative technologies." },
];

const AWARDS = [
  {
    year: "2026",
    by: "Ascent Club Global",
    title: "Top 100 Career Women in Africa",
    citation: "“Power, Presence & Prestige”: recognised among Africa’s most influential women shaping the continent’s future.",
    href: "https://ascentclubglobal.com/ascent-top-100/christine-masiika-thembo/",
  },
  {
    year: "2020",
    by: "African Women in Cybersecurity",
    title: "Africa’s Top 50 Women in Cyber",
    citation: "Recognised for demonstrated mastery in policy development, institutional strengthening, and multi-stakeholder partnerships.",
    href: "",
  },
];

const CREDENTIALS = [
  {
    title: "Education",
    items: ["MA Policy Development & Analysis (UMI)", "PGD Security Management (UMI)", "B.IT (Hons) Security Technology (MMU)"],
  },
  {
    title: "Certifications",
    items: ["CHFI", "EnCase Forensics", "CIIP", "Digital Identity", "Cyber Essentials & IASME", "ISO 27001"],
  },
];

const SUBJECTS = ["Strategic security consultation", "Speaking engagement", "Policy research collaboration", "Media inquiry", "Other"];

const input = "mt-1.5 w-full border border-black/15 bg-white px-3.5 py-3 text-[15px] text-black outline-none focus:border-accent";
const inputLabel = "font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-gn-300";

/** "Work with Masiika": sends through the site's contact endpoint, which emails the team and the sender. */
function InquiryForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, division: "general", howHeard: "Meet Christine page" }),
      });
      if (!res.ok) throw new Error("Failed");
      form.reset();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="border border-black/10 bg-white p-8" role="status">
        <CheckCircle2 className="h-8 w-8 text-emerald" aria-hidden />
        <p className="mt-4 font-serif text-[24px] font-semibold text-black">Thank you. Your message is on its way.</p>
        <p className="mt-2 text-[15px] text-gn-400">We have emailed you a confirmation and will reply within one working day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 border border-black/10 bg-white p-6 sm:grid-cols-2 lg:p-8">
      <p className="font-serif text-[22px] font-semibold text-black sm:col-span-2">Work with Masiika</p>
      <input type="text" name="honeypot" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <label className="block">
        <span className={inputLabel}>Full name *</span>
        <input name="name" required minLength={2} maxLength={120} autoComplete="name" className={input} />
      </label>
      <label className="block">
        <span className={inputLabel}>Email *</span>
        <input name="email" type="email" required maxLength={200} autoComplete="email" className={input} />
      </label>
      <label className="block">
        <span className={inputLabel}>Organisation</span>
        <input name="organisation" maxLength={160} autoComplete="organization" className={input} />
      </label>
      <label className="block">
        <span className={inputLabel}>Subject</span>
        <select name="useCase" defaultValue={SUBJECTS[0]} className={input}>
          {SUBJECTS.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </label>
      <label className="block sm:col-span-2">
        <span className={inputLabel}>Message *</span>
        <textarea name="message" rows={4} required maxLength={5000} placeholder="Tell us about your project." className={`${input} resize-y`} />
      </label>
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center gap-2 bg-accent px-6 py-3.5 text-[14px] font-bold uppercase tracking-wider text-white hover:bg-accent-hover disabled:opacity-60"
        >
          {status === "sending" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
          Send inquiry
          {status === "sending" ? null : <ArrowRight className="h-4 w-4" aria-hidden />}
        </button>
      </div>
      {status === "error" && (
        <p className="border-l-2 border-accent pl-3 text-[14px] text-gn-300 sm:col-span-2" role="alert">
          Something went wrong. Please try again, or email christinethembo@gmail.com.
        </p>
      )}
    </form>
  );
}

/** Meet Christine; organisations and both photos are edited in Sanity (Site Settings) and passed in by the page. */
export function MeetChristine({
  organisations,
  portrait,
  profileImage,
}: {
  organisations: OrganisationContent[];
  portrait: string;
  profileImage: string;
}) {
  const [activeTab, setActiveTab] = useState("about");
  const [selectedOrg, setSelectedOrg] = useState<OrganisationContent | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveTab(e.target.id); }),
      { rootMargin: "-20% 0px -70% 0px" }
    );
    TABS.forEach((t) => { const el = document.getElementById(t.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="bg-white selection:bg-accent/20 selection:text-accent">
      {/* ── HERO SECTION ── */}
      <section className="relative min-h-screen grid lg:grid-cols-[1fr_1fr] items-stretch overflow-hidden bg-bg-dark">
        {/* Left Side: Image */}
        <div className="relative h-[50vh] sm:h-[60vh] lg:h-auto overflow-hidden group">
          <Image
            src={portrait}
            alt="Masiika Christine Thembo"
            fill
            priority
            className="object-cover object-[50%_15%] transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-r from-bg-dark/20 to-bg-dark/80 lg:to-bg-dark/40" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-16 gradient-mask-t">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-x-8 gap-y-4 sm:gap-12"
            >
              {[
                { label: "Location", val: "Kampala, UG" },
                { label: "Language", val: "EN / FR / SW / LU" },
                { label: "Focus", val: "Cyber Resilience" }
              ].map(stat => (
                <div key={stat.label}>
                  <p className="text-[10px] font-bold tracking-widest text-white/40 uppercase mb-1">{stat.label}</p>
                  <p className="text-sm font-medium text-white">{stat.val}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="flex flex-col justify-center px-6 py-12 sm:p-12 lg:p-24 bg-bg-dark text-white relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] -mr-48 -mt-48" />
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="eyebrow-accent mb-6 sm:mb-8 flex items-center gap-4">
              <span className="w-10 h-px bg-accent/40" />
              Senior Cybersecurity Specialist
            </p>
            <h1 className="font-display text-[clamp(2.5rem,9vw,4.5rem)] font-bold leading-[0.95] tracking-tight mb-6 sm:mb-8 uppercase">
              Masiika<br />
              <span className="text-white/40">Christine</span><br />
              Thembo
            </h1>
            <p className="text-base sm:text-lg lg:text-xl font-light leading-relaxed text-gn-600 max-w-lg mb-10 sm:mb-12">
              Architecting secure digital futures. 8+ years experience bridging technology, national policy, and inclusive growth across Africa.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-12 sm:mb-16">
              <Button onClick={() => scrollTo("connect")} variant="primary" size="xl" className="px-10 rounded-none uppercase tracking-widest bg-accent hover:bg-white hover:text-bg-dark border-none">
                Get in Touch
              </Button>
              <Button onClick={() => scrollTo("experience")} variant="outline-dark" size="xl" className="px-10 rounded-none uppercase tracking-widest border-white/20 hover:border-white">
                View Journey
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-10 sm:pt-12 border-t border-white/10">
              {[
                { val: "Top 50", label: "Women in Cyber" },
                { val: "300+", label: "Personnel Trained" },
                { val: "60%", label: "Risk Reduction" }
              ].map(item => (
                <div key={item.label}>
                  <p className="text-2xl sm:text-3xl font-display font-bold mb-1">{item.val}</p>
                  <p className="text-[9px] font-bold tracking-widest text-white/40 uppercase leading-tight">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <TabBar active={activeTab} onChange={scrollTo} />

      {/* ══ SECTION: ABOUT ══ */}
      <section id="about" className="scroll-mt-36 bg-white">
        <div className="container-max py-14 lg:py-20">
          <SectionLabel>Mission &amp; vision</SectionLabel>
          <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
            <div>
              <SectionHeading>
                Empowering Africa through <span className="text-accent">evidence-based</span> digital resilience.
              </SectionHeading>

              <blockquote className="mt-8 border-l-[3px] border-accent pl-6 font-serif text-[clamp(20px,2.2vw,26px)] font-semibold leading-snug text-black">
                &ldquo;Digital transformation is not just about tools; it&rsquo;s about creating secure ecosystems where innovation thrives,
                governance is transparent, and no one is left behind.&rdquo;
              </blockquote>

              <ol className="mt-10 grid border-t border-black/15 sm:grid-cols-3">
                {PILLARS.map((pillar, i) => (
                  <li key={pillar.title} className="border-b border-black/15 py-5 sm:border-r sm:px-5 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-accent">Pillar {String(i + 1).padStart(2, "0")}</p>
                    <h3 className="mt-2 font-serif text-[19px] font-semibold text-black">{pillar.title}</h3>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-gn-400">{pillar.desc}</p>
                  </li>
                ))}
              </ol>

              <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-gn-300">
                <p>
                  Masiika Christine Thembo is a recognised authority in cyber resilience and national security frameworks. Her work at the{" "}
                  <strong className="font-semibold text-black">Uganda Investment Authority</strong> and{" "}
                  <strong className="font-semibold text-black">NITA-U</strong> has been instrumental in hardening national digital
                  infrastructure and harmonising cybersecurity policies across borders.
                </p>
                <p>
                  Named among Africa&rsquo;s <strong className="font-semibold text-black">Top 50 Women in Cybersecurity</strong>, Masiika
                  brings a unique blend of deep technical mastery, from digital forensics to threat intelligence, and strategic policy insight.
                  She is an advocate for the UN Sustainable Development Goals, especially gender equality in STEM and decent economic growth.
                </p>
              </div>

              <div className="mt-8 flex items-center gap-3">
                {[
                  { Icon: Linkedin, href: "https://linkedin.com/in/christinemasika", label: "LinkedIn" },
                  { Icon: Mail, href: "mailto:christinethembo@gmail.com", label: "Email" },
                ].map(({ Icon, href, label }) => (
                  <a key={label} href={href} aria-label={label} className="flex h-11 w-11 items-center justify-center border border-black/15 text-gn-300 transition-colors hover:border-accent hover:bg-accent hover:text-white">
                    <Icon size={18} />
                  </a>
                ))}
                <span className="ml-2 font-mono text-[11px] uppercase tracking-wider text-gn-500">Professional profile</span>
              </div>
            </div>

            <aside>
              <div className="relative aspect-4/5 overflow-hidden bg-gn-800">
                <Image src={profileImage} alt="Masiika Christine Thembo" fill className="object-cover object-top" sizes="(max-width: 1024px) 100vw, 40vw" />
              </div>
              <p className="mt-6 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-accent">Core value proposition</p>
              <p className="mt-2 font-serif text-[19px] font-semibold leading-snug text-black">
                &ldquo;Building sustainable digital ecosystems that promote inclusive growth, gender equality, and good governance through
                evidence-based policy and robust technical mastery.&rdquo;
              </p>
              <dl className="mt-6 border-t border-black/15">
                {PROFILE.map((stat) => (
                  <div key={stat.label} className="grid grid-cols-[110px_1fr] gap-4 border-b border-black/15 py-3">
                    <dt className="font-mono text-[11px] uppercase tracking-wider text-gn-500">{stat.label}</dt>
                    <dd className="text-[14px] font-medium text-black">{stat.val}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </div>
      </section>

      {/* ══ SECTION: COMPETENCIES ══ */}
      <section id="competencies" className="scroll-mt-36 bg-bg-light">
        <div className="container-max py-14 lg:py-20">
          <SectionLabel>Expertise</SectionLabel>
          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <SectionHeading>
              Expertise across the <span className="text-accent">digital security</span> spectrum.
            </SectionHeading>
            <p className="text-[17px] leading-relaxed text-gn-400">
              Masiika&rsquo;s work spans granular digital forensics and incident response through to national policy and regional
              governance frameworks.
            </p>
          </div>

          {/* Four disciplines, read like a contents page */}
          <ol className="mt-12 border-t-2 border-black">
            {COMPETENCIES.map((c, i) => (
              <li key={c.title} className="grid grid-cols-[48px_1fr] gap-x-4 gap-y-5 border-b border-black/15 py-8 md:grid-cols-[96px_1fr] lg:grid-cols-[120px_1.3fr_1fr] lg:gap-10">
                <span className="font-mono text-[28px] font-semibold leading-none text-accent md:text-[44px] lg:text-[56px]">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-serif text-[clamp(24px,2.4vw,30px)] font-semibold leading-tight text-black">{c.title}</h3>
                  <p className="mt-3 text-[16px] leading-relaxed text-gn-400">{c.desc}</p>
                </div>
                <div className="col-start-2 lg:col-start-auto">
                  <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-gn-500">Focus areas</p>
                  <ul className="mt-2 border-t border-black/10">
                    {c.items.map((item) => (
                      <li key={item} className="border-b border-black/10 py-2 text-[15px] font-medium text-gn-200">{item}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>

          {/* Toolkit and philosophy */}
          <div className="mt-14 grid bg-bg-dark text-white lg:grid-cols-[1.25fr_1fr]">
            <div className="p-8 lg:p-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/45">Toolkit</p>
              <div className="mt-5 grid gap-8 sm:grid-cols-2">
                {TOOLKIT.map((group) => (
                  <div key={group.label}>
                    <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.12em] text-accent">{group.label}</p>
                    <ul className="mt-3 border-t border-white/15">
                      {group.items.map((item) => (
                        <li key={item} className="border-b border-white/15 py-2.5 font-mono text-[14px] text-white/80">{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <figure className="flex flex-col justify-center border-t border-white/10 p-8 lg:border-l lg:border-t-0 lg:p-12">
              <blockquote className="font-serif text-[clamp(22px,2.4vw,30px)] font-semibold leading-snug">
                <span className="text-accent">&ldquo;</span>Technology is the engine of progress, but security is the bridge that makes the
                journey possible.<span className="text-accent">&rdquo;</span>
              </blockquote>
              <figcaption className="mt-6 font-mono text-[11px] uppercase tracking-[0.12em] text-white/45">
                Masiika Christine Thembo · Strategic philosophy
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ══ SECTION: AFFILIATIONS ══ */}
      <section id="affiliations" className="scroll-mt-36 bg-white">
        <div className="container-max py-14 lg:py-20">
          <SectionLabel>Network</SectionLabel>
          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <SectionHeading>
              A strategic <span className="text-accent">network</span>.
            </SectionHeading>
            <p className="text-[16px] leading-relaxed text-gn-400">
              Collaborating with leading public institutions and private enterprises to architect secure digital futures across Africa and
              beyond. Select an organisation for details.
            </p>
          </div>

          <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
            {organisations.map((org) => (
              <li key={org.name}>
                <button type="button" onClick={() => setSelectedOrg(org)} className="group block w-full text-left">
                  <span className="relative block aspect-[3/2] border border-black/10 bg-white transition-colors group-hover:border-black/25">
                    <span className="hud-frame absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden />
                    {org.logo ? (
                      <Image src={org.logo} alt="" fill className="object-contain p-6 grayscale transition duration-300 group-hover:grayscale-0" sizes="(max-width: 640px) 50vw, 25vw" />
                    ) : null}
                  </span>
                  <span className="mt-3 block font-serif text-[17px] font-semibold leading-tight text-black group-hover:text-accent">{org.name}</span>
                  <span className="mt-1 block font-mono text-[11px] uppercase leading-snug tracking-wide text-gn-500">{org.role}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ══ SECTION: EXPERIENCE ══ */}
      <section id="experience" className="scroll-mt-36 bg-white">
        <div className="container-max py-14 lg:py-20">
          <SectionLabel>Journey</SectionLabel>
          <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
            <div>
              <div className="lg:sticky lg:top-40">
                <SectionHeading>
                  A decade of <span className="text-accent">impact</span>.
                </SectionHeading>
                <p className="mt-4 text-[16px] leading-relaxed text-gn-400">
                  From technical forensics to national security strategy, Masiika has consistently delivered measurable results in
                  high-stakes environments.
                </p>
                <dl className="mt-8 border-t border-black/15">
                  <div className="flex items-center gap-4 border-b border-black/15 py-4">
                    <Award className="h-5 w-5 shrink-0 text-accent" aria-hidden />
                    <div>
                      <dt className="font-mono text-[11px] uppercase tracking-wider text-gn-500">Key milestone</dt>
                      <dd className="text-[15px] font-medium text-black">National Information Security Framework</dd>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 border-b border-black/15 py-4">
                    <Fingerprint className="h-5 w-5 shrink-0 text-accent" aria-hidden />
                    <div>
                      <dt className="font-mono text-[11px] uppercase tracking-wider text-gn-500">Specialisation</dt>
                      <dd className="text-[15px] font-medium text-black">Advanced digital and mobile forensics</dd>
                    </div>
                  </div>
                </dl>
              </div>
            </div>

            <ol className="border-t border-black/15">
              {EXPERIENCE.map((exp) => (
                <li key={exp.company} className="grid gap-3 border-b border-black/15 py-8 md:grid-cols-[150px_1fr] md:gap-8">
                  <p className="font-mono text-[12px] uppercase tracking-wide text-accent">{exp.period}</p>
                  <div>
                    <h3 className="font-serif text-[22px] font-semibold leading-tight text-black">{exp.role}</h3>
                    <p className="mt-1 font-mono text-[12px] uppercase tracking-wide text-gn-400">{exp.company}</p>
                    <p className="mt-3 text-[16px] leading-relaxed text-gn-400">{exp.desc}</p>
                    <ul className="mt-4 space-y-2">
                      {exp.impact.map((impact) => (
                        <li key={impact} className="flex gap-3 text-[15px] leading-relaxed text-gn-200">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden />
                          {impact}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ══ SECTION: RECOGNITION ══ */}
      <section id="recognition" className="relative scroll-mt-36 overflow-hidden bg-bg-dark text-white">
        <div className="tech-grid-dark absolute inset-0" aria-hidden />
        <div className="container-max relative py-14 lg:py-20">
          <SectionLabel dark>Recognition</SectionLabel>
          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <SectionHeading light>
              Thought leadership &amp; <span className="text-accent">recognition</span>.
            </SectionHeading>
            <p className="text-[17px] leading-relaxed text-white/60">
              Awards, credentials and the stages where Masiika has shaped the conversation on cybersecurity in Africa.
            </p>
          </div>

          <div className="mt-12 grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
            <div>
              {/* Awards, newest first */}
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent">Awards</p>
              <ol className="mt-3 border-t-2 border-white/80">
                {AWARDS.map((award) => (
                  <li key={award.title} className="grid gap-4 border-b border-white/15 py-7 sm:grid-cols-[100px_1fr]">
                    <span className="font-mono text-[34px] font-semibold leading-none text-accent">{award.year}</span>
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/45">{award.by}</p>
                      <h3 className="mt-2 font-serif text-[clamp(22px,2.4vw,28px)] font-semibold leading-tight">{award.title}</h3>
                      <p className="mt-3 text-[16px] leading-relaxed text-white/65">{award.citation}</p>
                      {award.href && (
                        <a href={award.href} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block border-b border-accent pb-0.5 text-[14px] font-semibold hover:text-accent">
                          View profile &rarr;
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ol>

              {/* Credentials */}
              <div className="mt-10 grid gap-10 sm:grid-cols-2">
                {CREDENTIALS.map((group) => (
                  <div key={group.title}>
                    <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent">{group.title}</p>
                    <ul className="mt-3 border-t border-white/15">
                      {group.items.map((item) => (
                        <li key={item} className="border-b border-white/15 py-2.5 text-[15px] text-white/80">{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent">Speaking &amp; media</p>
              <ol className="mt-3 border-t-2 border-white/80">
                {SPEAKING.map((talk, i) => (
                  <li key={talk.title} className="grid grid-cols-[40px_1fr] border-b border-white/15 py-5">
                    <span className="font-mono text-[13px] text-white/35">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-wider text-white/45">{talk.event}</p>
                      <h4 className="mt-1.5 font-serif text-[20px] font-semibold leading-snug">{talk.title}</h4>
                      <p className="mt-1 text-[14px] text-white/55">{talk.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <a href="/media" className="mt-6 inline-block border-b border-accent pb-0.5 text-[14px] font-semibold hover:text-accent">
                Explore the media archive &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION: CONNECT ══ */}
      <section id="connect" className="scroll-mt-36 bg-bg-light">
        <div className="container-max py-14 lg:py-20">
          <SectionLabel>Contact</SectionLabel>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
            <div>
              <SectionHeading>
                Let&rsquo;s start a <span className="text-accent">conversation</span>.
              </SectionHeading>
              <p className="mt-4 text-[17px] leading-relaxed text-gn-400">
                Available for national strategy development, security assessments, speaking engagements, and academic research collaborations.
              </p>
              <dl className="mt-8 border-t border-black/15">
                {[
                  { Icon: Mail, label: "Direct email", value: "christinethembo@gmail.com", href: "mailto:christinethembo@gmail.com" },
                  { Icon: Globe, label: "Based in", value: "Kampala, Uganda" },
                  { Icon: Linkedin, label: "Network", value: "Founder, CyberLuncheon", href: "https://linkedin.com/in/christinemasika" },
                ].map(({ Icon, label, value, href }) => (
                  <div key={label} className="flex items-center gap-4 border-b border-black/15 py-4">
                    <Icon className="h-5 w-5 shrink-0 text-accent" aria-hidden />
                    <div className="min-w-0">
                      <dt className="font-mono text-[11px] uppercase tracking-wider text-gn-500">{label}</dt>
                      <dd className="break-words font-serif text-[19px] font-semibold text-black">
                        {href ? <a href={href} className="hover:text-accent">{value}</a> : value}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
            <InquiryForm />
          </div>
        </div>
      </section>

      {/* ── FOOTER STRIP ── */}
      <div className="border-t border-white/10 bg-bg-dark text-white">
        <div className="container-max flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-serif text-[24px] font-semibold">Masiika Christine Thembo</p>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-white/45">Cyber resilience · Sustainable development · Global governance</p>
          </div>
          <nav aria-label="Profile sections" className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[12px] uppercase tracking-wider text-white/60">
            {TABS.map((t) => (
              <a key={t.id} href={`#${t.id}`} className="hover:text-accent">{t.label}</a>
            ))}
            <a href="https://linkedin.com/in/christinemasika" target="_blank" rel="noopener noreferrer" className="hover:text-accent">LinkedIn</a>
          </nav>
        </div>
      </div>

      <AnimatePresence>
        {selectedOrg && <OrgOverlay org={selectedOrg} onClose={() => setSelectedOrg(null)} />}
      </AnimatePresence>
    </div>
  );
}
