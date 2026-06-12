"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { 
  Twitter, 
  Linkedin, 
  Mail, 
  BookOpen, 
  Award, 
  CheckCircle2, 
  Globe, 
  ExternalLink, 
  ArrowRight,
  Shield,
  Zap,
  Cpu,
  Fingerprint
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");

const TABS = [
  { id: "about",        label: "About" },
  { id: "competencies", label: "Expertise" },
  { id: "affiliations", label: "Network" },
  { id: "experience",   label: "Journey" },
  { id: "recognition",  label: "Recognition" },
  { id: "connect",      label: "Connect" },
];

const ORGANISATIONS = [
  { 
    name: "Uganda Investment Authority", 
    logo: "/logo/uganda-investment-authority-uia-logo-png_seeklogo-548098.png",
    link: "https://www.ugandainvest.go.ug/", 
    role: "Information Security Specialist",
    desc: "Leading cybersecurity initiatives for Uganda's primary investment promotion agency. Strengthened national digital infrastructure by implementing vulnerability management across 15+ government portals, reducing exposure by 60%."
  },
  { 
    name: "Centenary Bank", 
    logo: "/logo/centenary-bank-logo.png", 
    link: "https://www.centenarybank.co.ug/", 
    role: "Cyber Security Consultant",
    desc: "Conducted deep-dive security assessments and penetration testing for mobile banking platforms, ensuring compliance with Bank of Uganda's stringent cybersecurity guidelines."
  },
  { 
    name: "Tilenga Project", 
    logo: "/logo/Tilengalogo.png", 
    link: "#", 
    role: "Information Security Advisor",
    desc: "Providing strategic security guidance for critical infrastructure digital systems in the energy sector, focusing on threat modeling and industrial control systems (ICS) protection."
  },
  { 
    name: "Applied Principles Consulting", 
    logo: "/logo/Appliedprincipleslogo.png",
    link: "#", 
    role: "Digital Forensics Analyst & Lead IT Security Operations",
    desc: "Managed 15+ digital forensic investigations in financial fraud cases, recovering $2M+ in assets. Led cross-sector security assessments spanning banking, telecommunications, and government."
  },
  { 
    name: "NITA-U", 
    logo: "/logo/NITA.LOGOS8-07.png", 
    link: "https://www.nita.go.ug/", 
    role: "Information Security Graduate Trainee",
    desc: "Co-developed the National Information Security Framework (NISF) and established national CERT capabilities. Trained 300+ government personnel on encryption and web application security."
  },
  { 
    name: "Kikorongo Safari Lodge", 
    logo: "/logo/kikorongologo.png", 
    link: "https://kikorongosafarilodge.com", 
    role: "Founder & CEO",
    desc: "Established a luxury eco-tourism venture creating 30+ direct employment opportunities. Designed 15 unique accommodation facilities across 15 hectares, promoting environmental conservation."
  },
  { 
    name: "TMFE Group, Sydney", 
    logo: "/logo/logo-TMFE-Black.svg", 
    link: "#", 
    role: "Cyber Security Consultant",
    desc: "Provided strategic cybersecurity guidance for digital transformation initiatives. Authored 6 technical papers on IoT security, ML applications, and threat modeling for C-suite decision-making."
  },
];

const COMPETENCIES = [
  { 
    title: "Digital Governance & Policy", 
    icon: <Globe className="w-6 h-6" />,
    desc: "Architecting national cybersecurity strategies and data protection frameworks (GDPR, AU Convention) to foster secure digital economies.",
    items: ["National Strategy", "Regulatory Compliance", "PPP Development", "Multi-stakeholder Engagement"]
  },
  { 
    title: "National Security & Risk", 
    icon: <Shield className="w-6 h-6" />,
    desc: "Critical Infrastructure Protection, threat intelligence analysis, and high-stakes security audits (ISO 27001, NIST, COBIT).",
    items: ["Incident Response", "Vulnerability Assessment", "Digital Forensics", "Business Continuity"]
  },
  { 
    title: "Capacity Building", 
    icon: <Cpu className="w-6 h-6" />,
    desc: "Designing technical training and gender-inclusive STEM initiatives to strengthen institutional resilience and knowledge transfer.",
    items: ["Technical Training", "Mentorship Programs", "Institutional Strengthening", "STEM Advocacy"]
  },
  { 
    title: "Project Management & Leadership", 
    icon: <Zap className="w-6 h-6" />,
    desc: "Leading multidisciplinary teams of 30+ staff in agile environments to deliver complex security and development projects.",
    items: ["Agile Management", "Budget Management", "Stakeholder Relations", "Change Management"]
  },
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

function OrgOverlay({ org, onClose }: { org: typeof ORGANISATIONS[0], onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-100 flex items-center justify-center p-6 bg-bg-dark/80 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white max-w-lg w-full overflow-hidden shadow-2xl relative"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gn-500 hover:text-accent transition-colors"
        >
          <Zap size={20} className="rotate-45" />
        </button>
        
        <div className="p-10">
          <div className="relative h-16 w-32 mb-8">
            {org.logo ? (
              <Image src={`${basePath}${org.logo}`} alt={org.name} fill className="object-contain object-left" />
            ) : (
              <p className="text-xl font-display font-bold text-gn-100">{org.name}</p>
            )}
          </div>
          
          <p className="text-accent text-[10px] font-bold tracking-[0.3em] uppercase mb-2">{org.role}</p>
          <h3 className="text-2xl font-display font-bold text-gn-100 mb-6">{org.name}</h3>
          
          <p className="text-gn-400 leading-relaxed font-light mb-10">
            {org.desc}
          </p>
          
          <div className="flex gap-4 pt-8 border-t border-border-light">
            {org.link !== "#" && (
              <Button href={org.link} variant="primary" size="sm" className="px-6 rounded-none">
                Visit Website <ExternalLink size={14} className="ml-2" />
              </Button>
            )}
            <Button onClick={onClose} variant="ghost" size="sm" className="px-6 rounded-none uppercase tracking-widest text-[10px]">
              Close Details
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function SectionLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-center gap-3 mb-6", className)}>
      <div className="w-8 h-px bg-accent/40" />
      <span className="eyebrow-accent">{children}</span>
    </div>
  );
}

function SectionHeading({ children, light = false, className = "" }: { children: React.ReactNode; light?: boolean; className?: string }) {
  return (
    <h2 className={cn(
      "font-display text-[clamp(32px,5vw,56px)] font-bold leading-[1.05] tracking-tight mb-8",
      light ? "text-white" : "text-gn-100",
      className
    )}>
      {children}
    </h2>
  );
}

function TabBar({ active, onChange }: { active: string; onChange: (id: string) => void }) {
  return (
    <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border-light overflow-hidden">
      <div className="mx-auto flex max-w-310 px-8 overflow-x-auto scrollbar-hide py-1">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            className={cn(
              "relative px-6 py-4 text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-300 whitespace-nowrap",
              active === t.id ? "text-accent" : "text-gn-500 hover:text-gn-200"
            )}
          >
            {t.label}
            {active === t.id && (
              <motion.div 
                layoutId="activeTab"
                className="absolute bottom-0 left-6 right-6 h-0.5 bg-accent"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function MeetChristinePage() {
  const [activeTab, setActiveTab] = useState("about");
  const [selectedOrg, setSelectedOrg] = useState<typeof ORGANISATIONS[0] | null>(null);

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
    <div className="bg-white selection:bg-accent/20 selection:text-accent">
      
      {/* ── HERO SECTION ── */}
      <section className="relative min-h-screen grid lg:grid-cols-[1fr_1fr] items-stretch overflow-hidden bg-bg-dark">
        {/* Left Side: Image */}
        <div className="relative h-[50vh] sm:h-[60vh] lg:h-auto overflow-hidden group">
          <Image
            src={`${basePath}/christine.jpg`}
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
      <section id="about" className="section-padding overflow-hidden relative">
        {/* Background Watermark */}
        <div className="absolute top-40 -left-20 pointer-events-none select-none opacity-[0.03] font-display text-[120px] sm:text-[180px] lg:text-[240px] font-bold leading-none -rotate-12 whitespace-nowrap">
          RESILIENCE
        </div>

        <div className="container-max grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-20 items-start relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <SectionLabel>Mission & Vision</SectionLabel>
            <SectionHeading>
              Empowering Africa through <span className="text-accent">evidence-based</span> digital resilience.
            </SectionHeading>
            
            <div className="space-y-12 text-lg text-gn-400 font-light leading-relaxed">
              <div className="relative pl-12">
                <span className="absolute left-0 top-0 text-7xl font-display text-accent/20 leading-none select-none">&ldquo;</span>
                <p className="text-2xl font-display text-gn-100 italic leading-snug">
                  Digital transformation is not just about tools; it&rsquo;s about creating secure ecosystems where innovation thrives, governance is transparent, and no one is left behind.
                </p>
              </div>

              <div className="grid sm:grid-cols-3 gap-8 pt-4">
                {[
                  { title: "Strategic Policy", desc: "Crafting national frameworks that align technology with public interest." },
                  { title: "Cyber Protection", desc: "Hardening critical infrastructure against evolving global threats." },
                  { title: "Inclusive Growth", desc: "Bridging the digital divide with gender-equitable STEM initiatives." }
                ].map((pillar, i) => (
                  <div key={i} className="space-y-3">
                    <p className="text-[10px] font-bold tracking-widest text-accent uppercase">Pillar {i + 1}</p>
                    <h4 className="text-sm font-bold text-gn-100">{pillar.title}</h4>
                    <p className="text-[13px] leading-relaxed text-gn-500">{pillar.desc}</p>
                  </div>
                ))}
              </div>
              
              <div className="space-y-6">
                <p>
                  Masiika Christine Thembo is a recognized authority in cyber resilience and national security frameworks. Her work at the <span className="text-gn-100 font-medium border-b border-accent/20">Uganda Investment Authority</span> and <span className="text-gn-100 font-medium border-b border-accent/20">NITA-U</span> has been instrumental in hardening national digital infrastructure and harmonizing cybersecurity policies across borders.
                </p>
                <p>
                  Named among Africa&rsquo;s <span className="text-gn-100 font-medium">Top 50 Women in Cybersecurity</span>, Masiika brings a unique blend of deep technical mastery—from digital forensics to threat intelligence—and strategic policy insight. She is a tireless advocate for UN Sustainable Development Goals, specifically focusing on gender equality in STEM and decent economic growth.
                </p>
              </div>
            </div>

            <div className="mt-12 sm:mt-16 flex items-center gap-6 sm:gap-8">
              <div className="flex gap-3">
                {[
                  { Icon: Linkedin, href: "https://linkedin.com/in/christinemasika" },
                  { Icon: Twitter, href: "#" },
                  { Icon: Mail, href: "mailto:christinethembo@gmail.com" }
                ].map(({ Icon, href }, i) => (
                  <a key={i} href={href} className="w-12 h-12 flex items-center justify-center border border-border-light text-gn-400 hover:bg-accent hover:border-accent hover:text-white transition-all duration-300">
                    <Icon size={18} />
                  </a>
                ))}
              </div>
              <div className="h-px flex-1 bg-border-light" />
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-gn-500">Professional Profile</p>
            </div>
          </motion.div>

          <div className="relative">
            <div className="editorial-card-lg p-0 bg-bg-light overflow-hidden border-none shadow-2xl">
              <div className="p-8 space-y-8">
                <div>
                  <p className="text-[10px] font-bold tracking-widest text-accent uppercase mb-4">Core Value Proposition</p>
                  <p className="text-gn-100 text-lg font-display font-medium leading-relaxed italic">
                    &ldquo;Building sustainable digital ecosystems that promote inclusive growth, gender equality, and good governance through evidence-based policy and robust technical mastery.&rdquo;
                  </p>
                </div>
                
                <div className="space-y-6 pt-8 border-t border-border-light">
                  {[
                    { label: "Recognition", val: "Ascent Top 100 Career Women in Africa 2026" },
                    { label: "Leadership", val: "President, Women in Design UG" },
                    { label: "Community", val: "Founder, CyberLuncheon" },
                    { label: "Impact", val: "$2M+ Asset Recovery in Forensics" }
                  ].map(stat => (
                    <div key={stat.label} className="flex justify-between items-baseline gap-4">
                      <p className="text-[10px] font-bold tracking-widest text-gn-500 uppercase">{stat.label}</p>
                      <div className="h-px flex-1 bg-border-light border-dotted border-b" />
                      <p className="text-sm font-medium text-gn-100">{stat.val}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="aspect-4/5 relative grayscale hover:grayscale-0 transition-all duration-700">
                <Image src={`${basePath}/christine.jpg`} alt="Masiika" fill className="object-cover object-[50%_15%]" />
                <div className="absolute inset-0 bg-accent/10 mix-blend-overlay" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION: COMPETENCIES ══ */}
      <section id="competencies" className="bg-bg-dark py-20 lg:py-32 text-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,76,0,0.05)_0%,transparent_70%)]" />
        
        <div className="container-max relative z-10">
          <div className="max-w-3xl mb-16 lg:mb-24">
            <SectionLabel className="mb-8">Technical Authority</SectionLabel>
            <SectionHeading light>Expertise across the <span className="text-accent">digital security</span> spectrum.</SectionHeading>
            <p className="text-xl text-white/50 font-light leading-relaxed">
              Masiika&rsquo;s mastery spans from granular digital forensics and incident response to high-level national policy orchestration and regional governance frameworks.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
            {COMPETENCIES.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-bg-dark p-10 hover:bg-white/2 transition-all duration-500 group"
              >
                <div className="mb-8 text-accent group-hover:scale-110 transition-transform duration-500 origin-left">
                  {c.icon}
                </div>
                <h3 className="text-xl font-bold font-display mb-4 text-white group-hover:text-accent transition-colors">{c.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-8 h-20 line-clamp-3">
                  {c.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {c.items.map(item => (
                    <span key={item} className="text-[9px] font-bold tracking-widest uppercase py-1.5 px-3 bg-white/5 border border-white/5 text-white/60">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 lg:mt-32 grid lg:grid-cols-[1fr_400px] gap-12 lg:gap-20 items-center">
            <div className="editorial-card-dark border-white/5 bg-white/2 p-8 lg:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px] -mr-32 -mt-32" />
              <div className="grid sm:grid-cols-2 gap-12 relative z-10">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-accent mb-6">Security Stack</p>
                  <ul className="space-y-4 font-mono text-sm text-white/60 list-none p-0 m-0">
                    <li className="flex items-center gap-3"><div className="w-1 h-1 bg-accent" /> Nmap / Metasploit</li>
                    <li className="flex items-center gap-3"><div className="w-1 h-1 bg-accent" /> Burp Suite / OWASP</li>
                    <li className="flex items-center gap-3"><div className="w-1 h-1 bg-accent" /> EnCase / Axiom / FTK</li>
                    <li className="flex items-center gap-3"><div className="w-1 h-1 bg-accent" /> Python / SQL / C++</li>
                  </ul>
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-accent mb-6">Framework Mastery</p>
                  <ul className="space-y-4 font-mono text-sm text-white/60 list-none p-0 m-0">
                    <li className="flex items-center gap-3"><div className="w-1 h-1 bg-accent" /> ISO 27001 / NIST</li>
                    <li className="flex items-center gap-3"><div className="w-1 h-1 bg-accent" /> COBIT / CIS</li>
                    <li className="flex items-center gap-3"><div className="w-1 h-1 bg-accent" /> GDPR / AU Data Act</li>
                    <li className="flex items-center gap-3"><div className="w-1 h-1 bg-accent" /> Agile / Scrum</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="text-center lg:text-left">
              <p className="text-3xl font-display font-light italic leading-snug mb-8">
                &ldquo;Technology is the engine of progress, but security is the bridge that makes the journey possible.&rdquo;
              </p>
              <div className="flex items-center gap-4 justify-center lg:justify-start">
                <div className="w-10 h-px bg-accent" />
                <p className="text-[10px] font-bold tracking-widest uppercase text-accent">Strategic Philosophy</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION: AFFILIATIONS ══ */}
      <section id="affiliations" className="section-padding bg-bg-light border-b border-border-light">
        <div className="container-max">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-10">
            <div className="max-w-2xl">
              <SectionLabel>Collaborations</SectionLabel>
              <SectionHeading>Strategic Global <span className="text-accent">Network</span>.</SectionHeading>
              <p className="text-lg text-gn-400 font-light max-w-xl">
                Collaborating with leading public institutions and private enterprises to architect secure digital futures across Africa and beyond.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              {["National Strategy", "Critical Infrastructure", "Executive Advisory"].map(tag => (
                <div key={tag} className="flex items-center gap-3">
                  <CheckCircle2 size={16} className="text-accent" />
                  <span className="text-[11px] font-bold tracking-widest uppercase text-gn-100">{tag}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-px bg-border-light border border-border-light">
            {ORGANISATIONS.map((org, i) => (
              <div
                key={i}
                onClick={() => setSelectedOrg(org)}
                className="group relative bg-white aspect-square p-8 flex flex-col items-center justify-center text-center transition-all duration-500 hover:bg-white cursor-pointer"
              >
                <div className="relative w-full h-full transition-all duration-700 group-hover:scale-105">
                  {org.logo ? (
                    <Image src={`${basePath}${org.logo}`} alt={org.name} fill className="object-contain" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-xs font-bold text-gn-500">{org.name}</span>
                    </div>
                  )}
                </div>
                <div className="absolute inset-x-0 bottom-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                  <p className="text-[8px] font-bold tracking-widest text-accent uppercase leading-tight px-4">{org.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION: EXPERIENCE ══ */}
      <section id="experience" className="section-padding bg-white">
        <div className="container-max">
          <div className="grid lg:grid-cols-[400px_1fr] gap-12 lg:gap-20">
            <div>
              <div className="sticky top-32">
                <SectionLabel>The Journey</SectionLabel>
                <SectionHeading>A Decade of <span className="text-accent">Impact</span>.</SectionHeading>
                <p className="text-lg text-gn-400 font-light mb-12">
                  Charting a path from technical forensics to national security strategy, Masiika has consistently delivered measurable results in high-stakes environments.
                </p>
                
                <div className="space-y-6 pt-12 border-t border-border-light">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-bg-light flex items-center justify-center text-accent"><Award size={20} /></div>
                    <div>
                      <p className="text-[10px] font-bold tracking-widest text-gn-500 uppercase">Key Milestone</p>
                      <p className="text-sm font-medium text-gn-100">National Information Security Framework</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-bg-light flex items-center justify-center text-accent"><Fingerprint size={20} /></div>
                    <div>
                      <p className="text-[10px] font-bold tracking-widest text-gn-500 uppercase">Specialization</p>
                      <p className="text-sm font-medium text-gn-100">Advanced Digital Forensics & Mobile</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-12">
              {EXPERIENCE.map((exp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative pl-12 pb-12 border-l border-border-light last:pb-0"
                >
                  <div className="absolute left-0 top-0 w-3 h-3 bg-white border-2 border-accent rounded-full -translate-x-1/2 group-hover:bg-accent transition-colors" />
                  
                  <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-xl font-bold font-display text-gn-100 group-hover:text-accent transition-colors">{exp.role}</h3>
                      <p className="text-sm font-medium text-gn-400 uppercase tracking-widest mt-1">{exp.company}</p>
                    </div>
                    <p className="text-[10px] font-bold tracking-widest text-accent uppercase bg-accent/5 px-3 py-1">{exp.period}</p>
                  </div>
                  
                  <p className="text-base text-gn-400 font-light leading-relaxed mb-8 max-w-2xl">
                    {exp.desc}
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {exp.impact.map((impact, idx) => (
                      <div key={idx} className="flex gap-4 p-5 bg-bg-light/50 border border-border-light hover:border-accent/20 hover:bg-white transition-all duration-300">
                        <div className="w-1.5 h-1.5 bg-accent/40 rounded-full mt-2 shrink-0" />
                        <p className="text-sm text-gn-200 leading-relaxed font-medium">{impact}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION: RECOGNITION ══ */}
      <section id="recognition" className="section-padding bg-bg-dark text-white relative overflow-hidden">
        <div className="container-max relative z-10">
          <div className="grid lg:grid-cols-[1fr_500px] gap-12 lg:gap-20 items-center">
            <div>
              <SectionLabel>Accolades</SectionLabel>
              <SectionHeading light>Thought Leadership & <span className="text-accent">Recognition</span>.</SectionHeading>
              
              {/* 2026 Ascent Recognition — primary */}
              <a
                href="https://ascentclubglobal.com/ascent-top-100/christine-masiika-thembo/"
                target="_blank"
                rel="noopener noreferrer"
                className="block editorial-card-dark bg-accent p-8 lg:p-12 mb-6 border-none text-white relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-[80px] -mr-32 -mt-32" />
                <Award className="w-16 h-16 mb-8 text-white/40" />
                <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/60 mb-3">Ascent Club Global · 2026</p>
                <h3 className="text-3xl font-display font-bold mb-4 uppercase tracking-tight">Top 100 Career Women in Africa</h3>
                <p className="text-xl font-light leading-relaxed mb-8 text-white/90 italic">
                  &ldquo;Power, Presence &amp; Prestige — recognised among Africa&rsquo;s most influential women shaping the continent&rsquo;s future.&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-px bg-white/40" />
                    <p className="text-[10px] font-bold tracking-[0.3em] uppercase">View Profile</p>
                  </div>
                  <ArrowRight size={16} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
              </a>

              {/* Africa's Top 50 Women in Cyber 2020 */}
              <div className="bg-white/5 border border-white/10 p-8 mb-12">
                <Award className="w-8 h-8 mb-4 text-accent" />
                <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/40 mb-2">African Women in Cybersecurity · 2020</p>
                <h3 className="text-xl font-display font-bold mb-3">Africa&rsquo;s Top 50 Women in Cyber</h3>
                <p className="text-sm font-light leading-relaxed text-white/60 italic">
                  &ldquo;Recognized for demonstrated mastery in policy development, institutional strengthening, and multi-stakeholder partnerships.&rdquo;
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-8">
                {[
                  { icon: <BookOpen className="text-accent" />, title: "Education", detail: "MA Policy Development & Analysis (UMI) · PGD Security Management (UMI) · B.IT (Hons) Security Technology (MMU)" },
                  { icon: <Shield className="text-accent" />, title: "Certifications", detail: "CHFI · EnCase Forensics · CIIP · Digital Identity · Cyber Essentials & IASME · ISO 27001" }
                ].map((item, i) => (
                  <div key={i} className="bg-white/5 p-8 border border-white/10 hover:border-accent/40 transition-all duration-300">
                    <div className="mb-6">{item.icon}</div>
                    <h4 className="text-sm font-bold uppercase tracking-widest mb-3 text-white">{item.title}</h4>
                    <p className="text-sm text-white/50 leading-relaxed font-light">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-10">
              <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-accent mb-8">Speaking & Media</p>
              {[
                { event: "(ISC)² Keynote", title: "Mentoring Women in Cybersecurity", detail: "Global audience of 2,000+ professionals." },
                { event: "Africa Tech Summit", title: "Cybersecurity Challenges in Africa", detail: "Expert panelist on regional digital transformation." },
                { event: "Bowmans & Citibank Fintech", title: "Digital Economy Transformation", detail: "Leveraging technology for financial inclusion." },
                { event: "Kipya Cyber Security", title: "Blockchain in Digital Forensics", detail: "Exploring emerging investigative technologies." }
              ].map((s, i) => (
                <div key={i} className="group border-b border-white/5 pb-8 last:border-none">
                  <p className="text-accent text-[9px] font-bold tracking-[0.2em] uppercase mb-2 opacity-60 group-hover:opacity-100 transition-opacity">{s.event}</p>
                  <h4 className="text-xl font-display font-bold mb-2 group-hover:text-accent transition-colors">{s.title}</h4>
                  <p className="text-sm text-white/40 font-light">{s.detail}</p>
                </div>
              ))}
              
              <div className="pt-12">
                <Button variant="outline-dark" href="/media" className="w-full justify-between group">
                  EXPLORE FULL MEDIA ARCHIVE
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION: CONNECT ══ */}
      <section id="connect" className="section-padding bg-white relative overflow-hidden">
        <div className="container-max relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-32">
            <div>
              <SectionLabel>Contact</SectionLabel>
              <SectionHeading>Let&rsquo;s start a <span className="text-accent">Conversation</span>.</SectionHeading>
              <p className="text-lg sm:text-xl text-gn-400 font-light mb-12 sm:mb-16 leading-relaxed">
                Available for national strategy development, security assessments, speaking engagements, or academic research collaborations.
              </p>

              <div className="space-y-10 sm:space-y-12">
                <div className="flex items-start gap-5 sm:gap-8">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-bg-light flex items-center justify-center text-accent shrink-0"><Mail size={24} /></div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-gn-500 mb-2">Direct Email</p>
                    <a href="mailto:christinethembo@gmail.com" className="text-lg sm:text-2xl font-display font-bold text-gn-100 hover:text-accent transition-colors wrap-break-word">
                      christinethembo@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-5 sm:gap-8">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-bg-light flex items-center justify-center text-accent shrink-0"><Globe size={24} /></div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-gn-500 mb-2">Base of Operations</p>
                    <p className="text-xl sm:text-2xl font-display font-bold text-gn-100">Kampala, Uganda</p>
                  </div>
                </div>
                <div className="flex items-start gap-5 sm:gap-8">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-bg-light flex items-center justify-center text-accent shrink-0"><Linkedin size={24} /></div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-gn-500 mb-2">Professional Network</p>
                    <p className="text-xl sm:text-2xl font-display font-bold text-gn-100">CyberLuncheon Founder</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="editorial-card-lg p-6 sm:p-12 bg-bg-light border-none">
              <h3 className="text-2xl font-display font-bold mb-8 sm:mb-10 text-gn-100">Work with Masiika</h3>
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold tracking-widest uppercase text-gn-500">Full Name</label>
                    <input type="text" className="w-full bg-white border-b border-border-light p-4 text-gn-100 focus:border-accent outline-none transition-colors" placeholder="Jane Doe" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold tracking-widest uppercase text-gn-500">Email Address</label>
                    <input type="email" className="w-full bg-white border-b border-border-light p-4 text-gn-100 focus:border-accent outline-none transition-colors" placeholder="jane@example.com" />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-gn-500">Subject / Interest</label>
                  <select className="w-full bg-white border-b border-border-light p-4 text-gn-100 focus:border-accent outline-none transition-colors appearance-none">
                    <option>Strategic Security Consultation</option>
                    <option>Speaking Engagement</option>
                    <option>Policy Research Collaboration</option>
                    <option>Media Inquiry</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-gn-500">Your Message</label>
                  <textarea rows={4} className="w-full bg-white border-b border-border-light p-4 text-gn-100 focus:border-accent outline-none transition-colors resize-none" placeholder="Tell me about your project..."></textarea>
                </div>
                <Button variant="primary" size="xl" className="w-full bg-accent hover:bg-gn-100 border-none rounded-none uppercase tracking-widest py-6">
                  Send Inquiry
                </Button>
              </form>
            </div>
          </div>
        </div>
        
        {/* Background Accent */}
        <div className="absolute bottom-0 right-0 w-125 h-125 bg-accent/5 rounded-full blur-[120px] -mr-250 -mb-250" />
      </section>

      {/* ── FOOTER STRIP ── */}
      <footer className="bg-bg-dark text-white py-20 px-8 relative overflow-hidden">
        <div className="container-max relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
          <div>
            <p className="text-3xl font-display font-bold mb-4">Masiika Christine Thembo</p>
            <p className="text-sm text-white/40 tracking-[0.3em] uppercase">Cyber Resilience · Sustainable Development · Global Governance</p>
          </div>
          <div className="flex gap-12">
            <div>
              <p className="text-[10px] font-bold tracking-widest text-white/20 uppercase mb-4">Quick Navigation</p>
              <div className="flex flex-col gap-2">
                <a href="#about" className="text-xs text-white/60 hover:text-accent transition-colors">About</a>
                <a href="#competencies" className="text-xs text-white/60 hover:text-accent transition-colors">Expertise</a>
                <a href="#connect" className="text-xs text-white/60 hover:text-accent transition-colors">Contact</a>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-widest text-white/20 uppercase mb-4">Network</p>
              <div className="flex flex-col gap-2">
                <a href="https://linkedin.com/in/christinemasika" target="_blank" className="text-xs text-white/60 hover:text-accent transition-colors">LinkedIn</a>
                <a href="#" className="text-xs text-white/60 hover:text-accent transition-colors">Twitter</a>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
      </footer>

      <AnimatePresence>
        {selectedOrg && (
          <OrgOverlay org={selectedOrg} onClose={() => setSelectedOrg(null)} />
        )}
      </AnimatePresence>

    </div>
  );
}
