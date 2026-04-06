"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Twitter, Linkedin, Mail, Play, BookOpen, Award, CheckCircle2, Globe, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const TABS = [
  { id: "about",    label: "About" },
  { id: "work",     label: "Competencies" },
  { id: "experience", label: "Experience" },
  { id: "thinking", label: "Recognition" },
  { id: "connect",  label: "Connect" },
];

const COMPETENCIES = [
  { 
    title: "Digital Governance & Policy", 
    desc: "National Cybersecurity Strategy Development, Data Protection Frameworks (GDPR/AU), and Public-Private Partnership Development.",
    items: ["National Strategy", "Regulatory Compliance", "PPP Development"]
  },
  { 
    title: "National Security & Risk Management", 
    desc: "Critical Infrastructure Protection, Threat Intelligence, and Security Audits (ISO 27001, NIST, COBIT).",
    items: ["CIP & Incident Response", "Vulnerability & Pentesting", "Digital Forensics"]
  },
  { 
    title: "Capacity Building", 
    desc: "Technical training design, institutional strengthening, and gender-inclusive STEM initiatives.",
    items: ["Training Design", "Mentorship Programs", "Knowledge Transfer"]
  },
  { 
    title: "Project Leadership", 
    desc: "Agile management of multidisciplinary teams (30+ staff), budget oversight, and stakeholder relations.",
    items: ["Agile Management", "Strategic Planning", "Change Management"]
  },
];

const EXPERIENCE = [
  {
    company: "Uganda Investment Authority",
    role: "Information Security Specialist",
    period: "Dec 2023 - Present",
    desc: "Leading cybersecurity initiatives for Uganda's primary investment promotion agency.",
    impact: [
      "Reduced security exposure by 60% across 15+ government portals.",
      "Developed policy frameworks for regional cybersecurity harmonization.",
      "Ensured business continuity for critical government digital services."
    ]
  },
  {
    company: "Traverse Security / Think Tank",
    role: "Researcher Lead & Cyber Advisor",
    period: "Jan 2022 - Present",
    desc: "Advancing cybersecurity policy and conducting applied research on emerging economies.",
    impact: [
      "Designed penetration testing frameworks for FINTECH regulatory compliance.",
      "Facilitated 20+ training sessions for legal professionals on cyber law.",
      "Produced technical materials on threat modeling for African operational contexts."
    ]
  },
  {
    company: "TMFE Group, Sydney",
    role: "Cyber Security Consultant (Remote)",
    period: "Nov 2020 - Mar 2021",
    desc: "Strategic guidance for international digital transformation initiatives.",
    impact: [
      "Authored 6 technical papers on IoT security and ML applications.",
      "Developed information security programs for emerging technology adoption.",
      "Established best practices for remote security operations across distributed teams."
    ]
  },
  {
    company: "Applied Principles Consulting",
    role: "Digital Forensics Analyst & Lead IT Ops",
    period: "Jul 2019 - Aug 2020",
    desc: "Strengthening financial sector stability through advanced security services.",
    impact: [
      "Managed 15+ investigations recovering $2M+ in fraudulent assets.",
      "Pioneered mobile forensics methodologies adopted by regional agencies.",
      "Contributed to 40% revenue growth through innovative service offerings."
    ]
  },
  {
    company: "Ngyero Design & Kikorongo Safari Lodge",
    role: "Founder & CEO",
    period: "2018 - Present",
    desc: "Entrepreneurship driving sustainable development and local economic growth.",
    impact: [
      "Created 30+ direct employment opportunities in rural Uganda.",
      "Designed 15 unique facilities across 15 hectares with eco-focus.",
      "Managed multidisciplinary teams of 30+ professionals."
    ]
  },
  {
    company: "NITA-U",
    role: "Information Security Graduate Trainee",
    period: "Oct 2016 - Sept 2017",
    desc: "Contributing to national digital transformation and resilience strategy.",
    impact: [
      "Co-developed the National Information Security Framework (NISF).",
      "Established national CERT capabilities and threat intelligence feeds.",
      "Trained 300+ government personnel on encryption and cyber hygiene."
    ]
  },
  {
    company: "Centenary Bank",
    role: "Information Security Intern",
    period: "Mar 2016 - May 2016",
    desc: "Securing digital banking infrastructure for financial inclusion.",
    impact: [
      "Reduced fraudulent ATM transactions by 35% using behavioral analytics.",
      "Implemented encryption protocols safeguarding customer financial data."
    ]
  }
];

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
}

function Eyebrow({ children, className }: EyebrowProps) {
  return <p className={cn("eyebrow-accent mb-2.5", className)}>{children}</p>;
}

interface BigHeadingProps {
  children: React.ReactNode;
  light?: boolean;
  className?: string;
}

function BigHeading({ children, light = false, className = "" }: BigHeadingProps) {
  return (
    <h2 className={cn(
      "font-display text-[clamp(26px,3.5vw,40px)] font-bold leading-[1.15] mb-5.5",
      light ? "text-white" : "text-gn-100",
      className
    )}>
      {children}
    </h2>
  );
}

interface TabBarProps {
  active: string;
  onChange: (id: string) => void;
}

function TabBar({ active, onChange }: TabBarProps) {
  return (
    <div className="sticky top-0 z-50 bg-white border-b border-border-light">
      <div className="mx-auto flex max-w-295 px-8 overflow-x-auto scrollbar-hide">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            className={cn(
              "bg-none border-none cursor-pointer px-6.5 pt-4.5 pb-3.5 text-[13px] font-bold tracking-wider uppercase transition-colors duration-150 font-sans whitespace-nowrap",
              active === t.id ? "text-accent border-b-3 border-accent" : "text-gn-500 border-b-3 border-transparent"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function SectionAnchor({ id }: { id: string }) {
  return <div id={id} className="scroll-mt-14" />;
}

export default function MeetChristinePage() {
  const [activeTab, setActiveTab] = useState("about");

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveTab(e.target.id); }),
      { rootMargin: "-20% 0px -70% 0px" }
    );
    TABS.forEach(t => { const el = document.getElementById(t.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="font-sans text-gn-100 bg-white">

      {/* ── HERO ── */}
      <section className="grid md:grid-cols-2 min-h-screen bg-bg-dark">
        <div className="relative overflow-hidden min-h-[50vh] md:min-h-screen">
          <Image
            src={`${basePath}/Christine.jpg`}
            alt="Masiika Christine Thembo"
            fill
            priority
            className="object-cover object-[50%_8%]"
          />
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-transparent to-[rgba(33,36,41,0.92)] md:block hidden" />
        </div>

        <div className="flex flex-col justify-center p-8 md:p-16 lg:pl-13 bg-bg-dark">
          <p className="eyebrow-accent mb-5 text-accent uppercase tracking-widest font-bold text-xs">
            Senior Cybersecurity & Digital Governance Specialist
          </p>
          <h1 className="font-display text-[clamp(40px,5vw,72px)] font-bold text-white leading-[0.95] tracking-tight mb-9 uppercase">
            Masiika<br />Christine Thembo
          </h1>
          <p className="text-lg leading-relaxed text-white/65 max-w-115 mb-12">
            Multilingual cybersecurity leader with 8+ years advancing digital transformation, governance, and inclusive development across Africa&apos;s public and private sectors.
          </p>

          <div className="flex gap-10 mb-13 border-t border-white/12 pt-9">
            {[{ v: "8+", l: "Years Exp" }, { v: "Top 50", l: "Women in Cyber" }, { v: "SDG", l: "Advocate" }].map(s => (
              <div key={s.l}>
                <p className="font-display text-3xl font-bold text-white mb-0">{s.v}</p>
                <p className="text-[11px] tracking-widest uppercase text-white/40 mt-1.5 mb-0">{s.l}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-3.5 flex-wrap">
            <Button onClick={() => scrollTo("connect")} variant="primary" size="lg" className="uppercase tracking-wider">
              Work with Masiika
            </Button>
            <Button onClick={() => scrollTo("thinking")} variant="outline-dark" size="lg" className="uppercase tracking-wider text-white/80">
              Recognition
            </Button>
          </div>
        </div>
      </section>

      <TabBar active={activeTab} onChange={id => { setActiveTab(id); scrollTo(id); }} />

      {/* ══ ABOUT ══ */}
      <SectionAnchor id="about" />
      <section className="py-22 bg-white">
        <div className="mx-auto grid max-w-295 items-start gap-x-20 px-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Eyebrow>Executive Summary</Eyebrow>
            <BigHeading>Bridging technology, policy, and sustainable development</BigHeading>

            <p className="text-[19px] leading-relaxed text-gn-400 mb-8 italic font-display">
              &quot;I believe Africa&apos;s digital future depends on building sustainable ecosystems that promote inclusive growth, gender equality, and good governance.&quot;
            </p>
            
            <div className="space-y-6 text-base leading-loose text-gn-400 mb-10">
              <p>
                Masiika Christine Thembo is a recognized expert in cyber resilience, digital infrastructure protection, and capacity building with a proven impact in emerging economies. Recently featured among <strong>Africa&apos;s Top 50 Women in Cybersecurity</strong>, she has demonstrated mastery in policy development and multi-stakeholder partnerships.
              </p>
              <p>
                Her work bridges the technical with the tactical, ensuring technology serves the public interest in alignment with UN Sustainable Development Goals 5, 8, 9, and 16. She leads institutional strengthening initiatives that have reduced security exposure by 60% for national agencies.
              </p>
              <div className="bg-bg-light p-6 border-l-4 border-accent">
                <p className="font-bold text-gn-100 uppercase tracking-widest text-xs mb-3">Core Value Proposition</p>
                <p className="text-[15px] italic leading-relaxed">
                  Building sustainable digital ecosystems that promote inclusive growth, gender equality, and good governance through evidence-based policy and robust technical mastery.
                </p>
              </div>
            </div>

            <div className="flex gap-2.5 items-center">
              <span className="text-[12px] font-bold tracking-widest uppercase text-gn-500 mr-4">Follow</span>
              {[
                { Icon: Twitter, label: "Twitter" }, 
                { Icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/christinemasika" }, 
                { Icon: Mail, label: "Email", href: "mailto:christinethembo@gmail.com" }
              ].map(({ Icon, label, href = "#" }) => (
                <a key={label} href={href} title={label} className="flex h-10 w-10 items-center justify-center border border-border-light text-gn-500 transition-all hover:bg-accent hover:border-accent hover:text-white">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div className="mt-12 lg:mt-0">
            <div className="relative mb-8 aspect-3/4 w-full overflow-hidden rounded-sm editorial-card">
              <Image src={`${basePath}/Christine.jpg`} alt="Masiika Christine Thembo" fill className="object-cover object-[50%_8%]" />
            </div>
            <div className="bg-bg-dark rounded-sm overflow-hidden shadow-2xl border border-white/5">
              <div className="p-6 bg-white/5 border-b border-white/5 flex items-center justify-between">
                <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-accent m-0 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  Fast Facts
                </p>
                <div className="flex gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                  <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                  <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                </div>
              </div>
              <div className="p-1 sm:p-2">
                {[
                  { icon: <BookOpen size={14} />, label: "Education", value: "MA Policy (Candidate) · PGD Security Mgmt · B.IT (Hons)" },
                  { icon: <Award size={14} />, label: "Credentials", value: "CHFI · EnCase · CIIP · Digital Identity · Cyber Essentials" },
                  { icon: <Users size={14} />, label: "Leadership", value: "President (Women in Design UG) · Founder (CyberLuncheon)" },
                  { icon: <Globe size={14} />, label: "Founded", value: "Traverse Minds · Ngyero Design · Kikorongo Safari Lodge" },
                  { icon: <CheckCircle2 size={14} />, label: "Impact", value: "300+ personnel trained · $2M+ recovered · 60% risk reduction" },
                ].map((row, i) => (
                  <div key={row.label} className={cn(
                    "group p-5 flex flex-col gap-2 transition-colors",
                    i !== 4 ? "border-b border-white/5" : "",
                    "hover:bg-white/[0.02]"
                  )}>
                    <div className="flex items-center gap-2.5">
                      <span className="text-accent/60 group-hover:text-accent transition-colors">
                        {row.icon}
                      </span>
                      <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/40 m-0">
                        {row.label}
                      </p>
                    </div>
                    <p className="text-[13px] text-white/90 m-0 font-medium leading-relaxed pl-6.5">
                      {row.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ COMPETENCIES ══ */}
      <SectionAnchor id="work" />
      <section className="bg-bg-light py-24">
        <div className="mx-auto max-w-295 px-8">
          <div className="max-w-2xl mb-16">
            <Eyebrow>Core Competencies</Eyebrow>
            <BigHeading>Mastery across the digital spectrum</BigHeading>
            <p className="text-gn-400 text-lg leading-relaxed">
              Masiika&apos;s expertise spans from low-level digital forensics and incident response to high-level national strategy and regional policy harmonization.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {COMPETENCIES.map((c, i) => (
              <div key={i} className="bg-white p-10 border border-border-light shadow-sm hover:shadow-md transition-shadow group">
                <h3 className="text-xl font-bold text-gn-100 mb-4 group-hover:text-accent transition-colors">{c.title}</h3>
                <p className="text-gn-400 text-[15px] leading-relaxed mb-8">{c.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {c.items.map(item => (
                    <span key={item} className="text-[10px] font-bold uppercase tracking-widest bg-bg-light px-3 py-1.5 text-gn-500 border border-border-light">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-bg-dark p-12 text-white overflow-hidden relative">
            <div className="relative z-10 grid lg:grid-cols-2 gap-12">
              <div>
                <p className="text-accent text-[10px] font-bold tracking-[0.3em] uppercase mb-6">Technical Proficiencies</p>
                <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <p className="text-white/40 text-[10px] font-bold tracking-widest uppercase mb-3">Programming</p>
                    <p className="text-sm font-medium">Python, C++, SQL</p>
                  </div>
                  <div>
                    <p className="text-white/40 text-[10px] font-bold tracking-widest uppercase mb-3">Security Tools</p>
                    <p className="text-sm font-medium">Nmap, Metasploit, Burp Suite, OWASP ZAP, Splunk</p>
                  </div>
                  <div>
                    <p className="text-white/40 text-[10px] font-bold tracking-widest uppercase mb-3">Forensics</p>
                    <p className="text-sm font-medium">EnCase, Axiom, Cellebrite, FTK</p>
                  </div>
                  <div>
                    <p className="text-white/40 text-[10px] font-bold tracking-widest uppercase mb-3">Frameworks</p>
                    <p className="text-sm font-medium">NIST, ISO 27001, COBIT, GDPR</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center border-l border-white/10 lg:pl-12">
                <p className="font-display text-2xl italic mb-6 text-white/90">
                  &quot;Technology is a tool for progress, but evidence is the anchor that keeps it serving the people.&quot;
                </p>
                <p className="text-accent text-xs font-bold tracking-widest uppercase">— Masiika Christine Thembo</p>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -mr-32 -mt-32" />
          </div>
        </div>
      </section>

      {/* ══ EXPERIENCE ══ */}
      <SectionAnchor id="experience" />
      <section className="bg-white py-24 px-8">
        <div className="mx-auto max-w-295">
          <Eyebrow>Professional Experience</Eyebrow>
          <BigHeading>A decade of digital impact</BigHeading>
          
          <div className="mt-16 space-y-px bg-border-light border border-border-light overflow-hidden">
            {EXPERIENCE.map((exp, i) => (
              <div key={i} className="bg-white p-10 md:p-12 grid lg:grid-cols-[300px_1fr] gap-10 hover:bg-bg-light/50 transition-colors">
                <div>
                  <p className="text-accent font-bold tracking-widest uppercase text-[10px] mb-2">{exp.period}</p>
                  <h3 className="text-lg font-bold text-gn-100 mb-1">{exp.role}</h3>
                  <p className="text-gn-500 font-medium text-sm">{exp.company}</p>
                </div>
                <div>
                  <p className="text-gn-400 leading-relaxed mb-6">{exp.desc}</p>
                  <ul className="grid sm:grid-cols-2 gap-4 list-none p-0 m-0">
                    {exp.impact.map((item, idx) => (
                      <li key={idx} className="flex gap-3 text-sm text-gn-100 leading-snug">
                        <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ THINKING & RECOGNITION ══ */}
      <SectionAnchor id="thinking" />
      <section className="bg-bg-dark py-24 text-white">
        <div className="mx-auto max-w-295 px-8">
          <div className="grid lg:grid-cols-[1fr_400px] gap-20">
            <div>
              <p className="text-accent text-[10px] font-bold tracking-[0.3em] uppercase mb-6">Thought Leadership</p>
              <h2 className="font-display text-4xl font-bold mb-12">Global Recognition & Speaking</h2>
              
              <div className="space-y-10">
                {[
                  { event: "(ISC)² Keynote (2021)", title: "Mentoring Women in Cybersecurity", detail: "Global audience of 2,000+ professionals." },
                  { event: "Africa Tech Summit (2019)", title: "Cybersecurity Challenges in Africa", detail: "Expert panelist on regional digital transformation." },
                  { event: "Bowmans & Citibank Fintech (2018)", title: "Digital Economy Transformation", detail: "Leveraging technology for financial inclusion." },
                  { event: "Kipya Cyber Security (2018)", title: "Blockchain in Digital Forensics", detail: "Exploring emerging investigative technologies." },
                ].map((s, i) => (
                  <div key={i} className="border-l border-white/10 pl-8 relative">
                    <div className="absolute left-0 top-0 w-1 h-8 bg-accent -translate-x-1/2" />
                    <p className="text-accent font-bold text-[10px] tracking-widest uppercase mb-2">{s.event}</p>
                    <h4 className="text-xl font-bold mb-1">{s.title}</h4>
                    <p className="text-white/50 text-sm">{s.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white/5 p-10 border border-white/10">
                <Award className="text-accent mb-6" size={32} />
                <h3 className="text-lg font-bold mb-4">Top 50 in Africa</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  Featured in the <strong>African Women in Cybersecurity Book 2020</strong> as one of the most influential professionals on the continent.
                </p>
                <div className="pt-6 border-t border-white/10">
                  <p className="text-white/40 text-[10px] font-bold tracking-widest uppercase mb-2">Recognition</p>
                  <p className="text-xs italic leading-loose">
                    &quot;Recognized for demonstrated mastery in policy development, institutional strengthening, and multi-stakeholder partnerships.&quot;
                  </p>
                </div>
              </div>

              <div className="bg-white/5 p-10 border border-white/10">
                <BookOpen className="text-accent mb-6" size={32} />
                <h3 className="text-lg font-bold mb-4">Education & Certs</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-white/40 text-[10px] font-bold tracking-widest uppercase mb-1">MA Policy Analysis</p>
                    <p className="text-xs">Uganda Management Institute (Candidate)</p>
                  </div>
                  <div>
                    <p className="text-white/40 text-[10px] font-bold tracking-widest uppercase mb-1">B.IT (Honors) Security</p>
                    <p className="text-xs">Multimedia University, Malaysia</p>
                  </div>
                  <div className="pt-4 flex flex-wrap gap-2">
                    {["CHFI", "EnCase", "CIIP", "ISO 27001"].map(c => (
                      <span key={c} className="text-[9px] font-bold border border-white/20 px-2 py-1 rounded-full">{c}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PODCAST PREVIEW ── */}
      <section className="bg-white py-24 overflow-hidden border-b border-border-light">
        <div className="mx-auto grid max-w-295 md:grid-cols-2 gap-20 px-8">
          <div className="flex flex-col justify-center">
            <Eyebrow>Media</Eyebrow>
            <BigHeading>Facts & Figures</BigHeading>
            <p className="text-base leading-relaxed text-gn-400 mb-9">
              Every two weeks Masiika dissects technology, data, and democracy in Africa with practitioners, policymakers, and researchers shaping the region&apos;s digital agenda.
            </p>
            <div className="flex gap-4">
              <Button variant="primary" href="/media" size="lg" className="uppercase tracking-widest">
                <Play size={14} className="mr-2" /> Listen now
              </Button>
              <Button variant="outline" href="/media" size="lg" className="uppercase tracking-widest">
                All Episodes
              </Button>
            </div>
          </div>
          <div className="relative aspect-video rounded-sm overflow-hidden shadow-2xl">
            <Image src={`${basePath}/Christine.jpg`} alt="Podcast" fill className="object-cover grayscale opacity-50" />
            <div className="absolute inset-0 bg-accent/20 mix-blend-multiply" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
                <Play size={24} className="text-accent fill-accent ml-1" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CONNECT ══ */}
      <SectionAnchor id="connect" />
      <section className="bg-white py-24">
        <div className="mx-auto max-w-295 px-8 grid lg:grid-cols-2 gap-20">
          <div>
            <Eyebrow>Collaborate</Eyebrow>
            <BigHeading>Contact & Inquiries</BigHeading>
            <p className="text-lg text-gn-400 mb-12">
              National strategy development, security assessments, speaking engagements, or academic research collaborations.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-bg-light flex items-center justify-center rounded-sm text-accent"><Mail size={20} /></div>
                <div>
                  <p className="text-[10px] font-bold tracking-widest uppercase text-gn-500 mb-1">Email</p>
                  <p className="text-gn-100 font-medium">christinethembo@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-bg-light flex items-center justify-center rounded-sm text-accent"><Globe size={20} /></div>
                <div>
                  <p className="text-[10px] font-bold tracking-widest uppercase text-gn-500 mb-1">Location</p>
                  <p className="text-gn-100 font-medium">Kampala, Uganda</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-bg-light flex items-center justify-center rounded-sm text-accent"><Linkedin size={20} /></div>
                <div>
                  <p className="text-[10px] font-bold tracking-widest uppercase text-gn-500 mb-1">Network</p>
                  <p className="text-gn-100 font-medium">CyberLuncheon Founder</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-bg-light p-10 md:p-12">
            <h3 className="font-display text-2xl font-bold mb-8">Work with Masiika</h3>
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest uppercase">Name</label>
                  <input type="text" className="w-full bg-white border border-border-light p-3 text-sm focus:border-accent outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest uppercase">Email</label>
                  <input type="email" className="w-full bg-white border border-border-light p-3 text-sm focus:border-accent outline-none" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-widest uppercase">Subject</label>
                <input type="text" className="w-full bg-white border border-border-light p-3 text-sm focus:border-accent outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-widest uppercase">Message</label>
                <textarea rows={4} className="w-full bg-white border border-border-light p-3 text-sm focus:border-accent outline-none resize-none"></textarea>
              </div>
              <Button variant="primary" className="w-full uppercase tracking-widest py-4">Send Message</Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer strip */}
      <div className="bg-bg-dark text-white py-12 px-8 text-center border-t border-white/5">
        <p className="text-xl font-display font-bold mb-2">Masiika Christine Thembo</p>
        <p className="text-xs text-white/40 tracking-widest uppercase">Traverse Minds · Cyber Resilience · Sustainable Development</p>
      </div>

    </div>
  );
}
