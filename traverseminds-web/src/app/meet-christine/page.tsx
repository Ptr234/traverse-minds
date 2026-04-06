"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowRight, Twitter, Linkedin, Mail, Play, BookOpen, Shield } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const TABS = [
  { id: "about",    label: "About" },
  { id: "work",     label: "Work" },
  { id: "thinking", label: "Thinking" },
  { id: "connect",  label: "Connect" },
];

const DOMAINS = [
  { icon: <Shield size={22}/>,   title: "Cybersecurity",    desc: "Audits, incident response, and capacity-building to reduce digital risk across African organisations." },
  { icon: <BookOpen size={22}/>, title: "Civic Tech",       desc: "Technology that strengthens public institutions and improves citizen-facing services in Uganda." },
  { icon: "📊",                  title: "Policy Research",  desc: "Evidence-based analysis of Uganda's PDPA 2019, cross-border data flows, and African digital rights." },
  { icon: "📡",                  title: "Data Journalism",  desc: "Training newsrooms to investigate technology issues with data and hold power to account." },
  { icon: "🤖",                  title: "AI Governance",    desc: "Examining automation's intersection with public administration, elections, and economic opportunity." },
  { icon: "🔒",                  title: "Payment Security", desc: "Advising fintechs and regulators on unified security standards for cross-border mobile money." },
];

const ARTICLES = [
  { title: "Uganda's PDPA 2019: The road ahead",            category: "Policy",     desc: "An analysis of the implementation gaps in our national data protection framework.", image: "https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?q=80&w=900&auto=format&fit=crop" },
  { title: "The role of AI in African governance",          category: "Technology", desc: "How we can leverage automation while ensuring transparency and preserving local context.", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=900&auto=format&fit=crop" },
  { title: "Securing Africa's payment systems",        category: "Security",   desc: "Why cross-border interoperability requires a unified security standard.", image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=900&auto=format&fit=crop" },
  { title: "Open data and the accountability gap in Uganda",category: "Policy",     desc: "Why government datasets should be public — and what it takes to get there.", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=900&auto=format&fit=crop" },
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
      <div className="mx-auto flex max-w-295 px-8">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            className={cn(
              "bg-none border-none cursor-pointer px-6.5 pt-4.5 pb-3.5 text-[13px] font-bold tracking-wider uppercase transition-colors duration-150 font-sans",
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

interface SectionAnchorProps {
  id: string;
}

function SectionAnchor({ id }: SectionAnchorProps) {
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
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="font-sans text-gn-100 bg-white">

      {/* ── HERO — split layout: photo fills left, dark panel right ── */}
      <section className="grid md:grid-cols-2 min-h-screen bg-bg-dark">

        {/* Photo column — portrait, full, objectPosition shows face */}
        <div className="relative overflow-hidden min-h-[50vh] md:min-h-screen">
          <Image
            src={`${basePath}/Christine.jpg`}
            alt="Christine Masika"
            fill
            priority
            className="object-cover object-[50%_8%]"
          />
          {/* Right-edge fade into dark panel */}
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-transparent to-[rgba(33,36,41,0.92)] md:block hidden" />
        </div>

        {/* Text column */}
        <div className="flex flex-col justify-center p-8 md:p-16 lg:pl-13 bg-bg-dark">
          <p className="eyebrow-accent mb-5 text-accent">
            Founder & CEO · Traverse Minds
          </p>
          <h1 className="font-display text-[clamp(48px,6vw,88px)] font-bold text-white leading-[0.92] tracking-tight mb-9 uppercase">
            Meet<br />Christine
          </h1>
          <p className="text-lg leading-relaxed text-white/65 max-w-105 mb-12">
            Cybersecurity professional, civic-tech advocate, and founder of Traverse Minds — building digital resilience across Africa.
          </p>

          {/* Stats */}
          <div className="flex gap-10 mb-13 border-t border-white/12 pt-9">
            {[{ v: "6", l: "Divisions" }, { v: "2024", l: "Founded" }, { v: "Africa", l: "Focus region" }].map(s => (
              <div key={s.l}>
                <p className="font-display text-3xl font-bold text-white mb-0">{s.v}</p>
                <p className="text-[11px] tracking-widest uppercase text-white/40 mt-1.5 mb-0">{s.l}</p>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex gap-3.5 flex-wrap">
            <Button onClick={() => scrollTo("connect")} variant="primary" size="lg" className="uppercase tracking-wider">
              Work with Traverse
            </Button>
            <Button onClick={() => scrollTo("thinking")} variant="outline-dark" size="lg" className="uppercase tracking-wider text-white/80">
              Read insights
            </Button>
          </div>
        </div>
      </section>

      {/* ── TABS ── */}
      <TabBar active={activeTab} onChange={id => { setActiveTab(id); scrollTo(id); }} />

      {/* ══ ABOUT ══ */}
      <SectionAnchor id="about" />
      <section className="py-22 bg-white">
        <div className="mx-auto grid max-w-295 items-start gap-x-20 px-8 lg:grid-cols-[1.1fr_0.9fr]">

          {/* Bio */}
          <div>
            <Eyebrow>About Christine</Eyebrow>
            <BigHeading>Building Africa&apos;s digital future from the inside out</BigHeading>

            <p className="text-[19px] leading-relaxed text-gn-400 mb-6 italic font-display">
              &quot;I believe Africa&apos;s digital future depends on our ability to secure our own infrastructure and build technology that serves the public interest.&quot;
            </p>
            <p className="text-base leading-loose text-gn-400 mb-5">
              Christine Masika founded Traverse Minds in 2024 to address a specific, urgent gap: Uganda — and Africa more broadly — was rapidly digitising its economy and public services without the homegrown cybersecurity and civic-tech capacity to protect them.
            </p>
            <p className="text-base leading-loose text-gn-400 mb-5">
              With a background in computer science and strategic intelligence, Christine built Traverse into an integrated six-division powerhouse combining technical security consulting with deep policy research, data journalism, and AI governance work.
            </p>
            <p className="text-base leading-loose text-gn-400 mb-10">
              Beyond Traverse, she is a regular commentator on technology policy across Africa and an advocate for digital literacy in underserved communities. Her guiding principle: evidence over assumption, always.
            </p>

            {/* Pull quote */}
            <div className="border-l-4 border-accent pl-6 mb-10 py-0.5">
              <p className="font-display text-xl italic text-gn-100 leading-relaxed mb-2.5">
                &quot;Technology is a tool for progress, but evidence is the anchor that keeps it serving the people.&quot;
              </p>
              <cite className="text-xs not-italic font-bold tracking-widest uppercase text-accent">— Christine Masika</cite>
            </div>

            <div className="flex gap-2.5 items-center">
              <span className="text-[12px] font-bold tracking-widest uppercase text-gn-500 mr-2">Follow</span>
              {[{ Icon: Twitter, label: "Twitter" }, { Icon: Linkedin, label: "LinkedIn" }, { Icon: Mail, label: "Email", href: "mailto:hello@traverseminds.ug" }].map(({ Icon, label, href = "#" }) => (
                <a key={label} href={href} title={label} className="flex h-9.5 w-9.5 items-center justify-center border border-border-light text-gn-500 no-underline transition-all duration-150 hover:bg-accent hover:border-accent hover:text-white">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Sidebar: portrait + facts */}
          <div className="mt-12 lg:mt-0">
            {/* Portrait — 3:4 aspect, objectPosition shows face */}
            <div className="relative mb-7 aspect-3/4 w-full overflow-hidden rounded-sm bg-bg-light editorial-card">
              <Image
                src={`${basePath}/Christine.jpg`}
                alt="Christine Masika"
                fill
                className="object-cover object-[50%_8%]"
              />
            </div>
            {/* Facts table */}
            <div className="border border-border-light rounded-sm bg-white overflow-hidden shadow-card">
              {[
                { label: "Focus",     value: "Cybersecurity · Civic-Tech · Policy" },
                { label: "Education", value: "Computer Science & Strategic Intel" },
                { label: "Location",  value: "Kampala, Uganda" },
                { label: "Interests", value: "Data Journalism · AI Ethics · Digital Rights" },
                { label: "Founded",   value: "Traverse Minds, 2024" },
              ].map((row, i, arr) => (
                <div key={row.label} className={cn(
                  "grid grid-cols-[100px_1fr] gap-4 p-[15px_20px]",
                  i < arr.length - 1 ? "border-b border-border-light" : ""
                )}>
                  <p className="text-[11px] font-bold tracking-widest uppercase text-gn-500 m-0 pt-0.5">{row.label}</p>
                  <p className="text-sm text-gn-100 m-0 font-medium leading-relaxed">{row.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FULL-WIDTH DARK STATEMENT ── */}
      <section className="bg-bg-dark py-24 px-8">
        <div className="mx-auto max-w-215 text-center">
          <p className="font-display text-[clamp(22px,3.2vw,38px)] font-bold text-white leading-snug italic mb-5">
            &quot;Africa doesn&apos;t need to import its digital security. We have the talent, the context, and the urgency to build it here.&quot;
          </p>
          <p className="text-xs font-bold tracking-[0.12em] uppercase text-accent">— Christine Masika</p>
        </div>
      </section>

      {/* ══ WORK ══ */}
      <SectionAnchor id="work" />
      <section className="bg-bg-light py-22">
        <div className="mx-auto grid max-w-295 items-start gap-x-18 px-8 lg:grid-cols-[300px_1fr]">
          <div className="lg:sticky lg:top-20 mb-12 lg:mb-0">
            <Eyebrow>What Christine does</Eyebrow>
            <BigHeading>Six domains. One mission.</BigHeading>
            <p className="text-[15px] leading-relaxed text-gn-400 mb-8">
              At Traverse Minds, technical security consulting, civic technology, and policy research reinforce one another — each division building evidence and capacity the others need.
            </p>
            <Button variant="ghost" href="/about" className="uppercase tracking-widest p-0 hover:bg-transparent hover:text-accent group">
              About Traverse <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-border-light rounded-sm overflow-hidden shadow-card">
            {DOMAINS.map(d => (
              <div key={d.title} className="bg-white p-8 group hover:bg-bg-editorial-warm transition-colors duration-300">
                <div className="text-accent mb-3.5 flex">
                  {typeof d.icon === "string" ? <span className="text-[22px]">{d.icon}</span> : d.icon}
                </div>
                <h3 className="text-base font-bold text-gn-100 mb-2.5">{d.title}</h3>
                <p className="text-sm leading-relaxed text-gn-400 m-0">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ALTERNATING TIMELINE ── */}
      <section className="bg-white py-22">
        <div className="mx-auto max-w-295 px-8">
          <Eyebrow>Journey</Eyebrow>
          <BigHeading>How Christine got here</BigHeading>
          <div className="mt-12 relative">
            <div className="absolute left-1/2 top-0 bottom-0 hidden w-px -translate-x-1/2 bg-border-light md:block" />
            {[
              { year: "2016", side: "left",  text: "Began her computer science degree with a dual focus on software engineering and information security." },
              { year: "2019", side: "right", text: "Interned with a regional fintech, discovering first-hand how thin the security posture of Africa&apos;s digital payments infrastructure really was." },
              { year: "2021", side: "left",  text: "Joined an intelligence consultancy, honing skills in open-source intelligence, strategic analysis, and adversarial threat modelling." },
              { year: "2022", side: "right", text: "Co-authored Uganda&apos;s first independent civic-tech assessment, which informed the NITA-U digital strategy review." },
              { year: "2024", side: "left",  text: "Founded Traverse Minds Ltd, launching six integrated divisions spanning cybersecurity, civic tech, data journalism, and AI governance." },
            ].map((item) => (
              <div key={item.year} className="grid md:grid-cols-[1fr_60px_1fr] mb-0">
                {item.side === "left" ? (
                  <>
                    <div className="md:pr-10 pb-12 md:text-right">
                      <p className="text-[11px] font-bold tracking-widest uppercase text-accent mb-1.5">{item.year}</p>
                      <p className="text-[15px] leading-relaxed text-gn-400 m-0">{item.text}</p>
                    </div>
                    <div className="hidden md:flex justify-center pt-1">
                      <div className="w-3 h-3 rounded-full bg-accent border-[3px] border-white shadow-[0_0_0_1px_rgba(255,76,0,1)] shrink-0" />
                    </div>
                    <div className="hidden md:block" />
                  </>
                ) : (
                  <>
                    <div className="hidden md:block" />
                    <div className="hidden md:flex justify-center pt-1">
                      <div className="w-3 h-3 rounded-full bg-accent border-[3px] border-white shadow-[0_0_0_1px_rgba(255,76,0,1)] shrink-0" />
                    </div>
                    <div className="md:pl-10 pb-12">
                      <p className="text-[11px] font-bold tracking-widest uppercase text-accent mb-1.5">{item.year}</p>
                      <p className="text-[15px] leading-relaxed text-gn-400 m-0">{item.text}</p>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ THINKING ══ */}
      <SectionAnchor id="thinking" />
      <section className="bg-bg-light py-22">
        <div className="mx-auto max-w-295 px-8">
          <div className="flex justify-between items-end mb-12 flex-wrap gap-4">
            <div><Eyebrow>Insights</Eyebrow><BigHeading className="m-0">What I&apos;m thinking about</BigHeading></div>
            <Button variant="ghost" href="/blog" className="uppercase tracking-widest p-0 hover:bg-transparent hover:text-accent group">
              All insights <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Featured */}
          <Link href="/blog" className="no-underline grid md:grid-cols-2 mb-0.5 bg-white border border-border-light overflow-hidden rounded-sm editorial-card group">
            <div className="relative min-h-80">
              <Image src={ARTICLES[0].image} alt={ARTICLES[0].title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-10 md:p-11 flex flex-col justify-center">
              <p className="text-[10px] font-bold tracking-widest uppercase text-accent mb-3">{ARTICLES[0].category} · Featured</p>
              <h3 className="font-display text-[26px] font-bold text-gn-100 leading-tight mb-4 group-hover:text-accent transition-colors">{ARTICLES[0].title}</h3>
              <p className="text-[15px] text-gn-400 leading-relaxed mb-7">{ARTICLES[0].desc}</p>
              <span className="inline-flex items-center gap-2 text-[12px] font-bold text-accent tracking-widest uppercase">Read more <ArrowRight size={13} /></span>
            </div>
          </Link>

          {/* 3-up */}
          <div className="grid md:grid-cols-3 gap-px bg-border-light rounded-sm overflow-hidden shadow-card">
            {ARTICLES.slice(1).map(a => (
              <Link key={a.title} href="/blog" className="no-underline bg-white block group hover:bg-bg-editorial-warm transition-colors duration-300">
                <div className="relative aspect-16/10 overflow-hidden">
                  <Image src={a.image} alt={a.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5 px-5.5 pb-6.5">
                  <p className="text-[10px] font-bold tracking-widest uppercase text-accent mb-2">{a.category}</p>
                  <h3 className="font-display text-[17px] font-bold text-gn-100 leading-snug mb-2 group-hover:text-accent transition-colors">{a.title}</h3>
                  <p className="text-[13px] text-gn-400 leading-relaxed m-0">{a.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── PODCAST BANNER ── */}
      <section className="bg-bg-dark py-0 overflow-hidden">
        <div className="mx-auto grid max-w-295 md:grid-cols-2">
          <div className="p-8 md:p-18 md:pr-16 lg:pl-8">
            <Eyebrow>Podcast</Eyebrow>
            <BigHeading light>Facts & Figures</BigHeading>
            <p className="text-base leading-relaxed text-white/65 max-w-105 mb-9">
              Every two weeks Christine dissects technology, data, and democracy in Africa with practitioners, policymakers, and researchers shaping the region&apos;s digital agenda.
            </p>
            <Button variant="primary" href="/media" size="lg" className="uppercase tracking-widest bg-accent hover:bg-accent-hover text-white">
              <Play size={14} fill="#fff" /> Listen now
            </Button>
          </div>
          <div className="relative min-h-85 overflow-hidden">
            <Image
              src={`${basePath}/Christine.jpg`}
              alt="Facts and Figures podcast"
              fill
              className="object-cover object-[50%_12%] opacity-45"
            />
            <div className="absolute bottom-8 left-8 right-8 bg-black/75 p-5 px-6 rounded-sm backdrop-blur-md border border-white/10">
              <p className="text-[10px] font-bold tracking-widest uppercase text-accent mb-1.5">Latest episode</p>
              <p className="text-base font-bold text-white mb-1">AI & Electoral Integrity in Africa</p>
              <p className="text-[13px] text-white/50 m-0">48 min · April 2025</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CONNECT ══ */}
      <SectionAnchor id="connect" />
      <section className="bg-white py-22">
        <div className="mx-auto grid max-w-295 px-8 lg:grid-cols-2 gap-x-22">
          <div className="mb-16 lg:mb-0">
            <Eyebrow>Newsletter</Eyebrow>
            <BigHeading>Stay in the loop</BigHeading>
            <p className="text-base text-gn-400 leading-relaxed mb-8">
              Weekly analysis of Uganda&apos;s data protection landscape, notable cybersecurity incidents, and civic-tech developments across Africa — straight to your inbox.
            </p>
            <div className="flex mb-3">
              <input type="email" placeholder="Enter your email address" className="flex-1 p-[14px_18px] text-[15px] border border-border-light border-r-0 outline-none font-sans text-gn-100 bg-white focus:border-accent transition-colors" />
              <Button variant="primary" className="rounded-none uppercase tracking-widest whitespace-nowrap bg-accent hover:bg-accent-hover">Subscribe</Button>
            </div>
            <p className="text-[12px] text-gn-500">No spam. Unsubscribe any time.</p>
          </div>

          <div className="lg:border-l lg:border-border-light lg:pl-22">
            <Eyebrow>Collaborate</Eyebrow>
            <BigHeading>Work with Traverse</BigHeading>
            <p className="text-base text-gn-400 leading-relaxed mb-8">
              Security assessments, policy research, civic-tech development, or speaking engagements — Christine and the Traverse team are ready to engage.
            </p>
            <div className="flex gap-3 flex-wrap mb-10">
              <Button variant="primary" href="/contact" size="lg" className="uppercase tracking-widest">
                Get in touch
              </Button>
              <Button variant="outline" href="/about" size="lg" className="uppercase tracking-widest">
                Our divisions
              </Button>
            </div>
            <div className="pt-8 border-t border-border-light">
              {[{ label: "Email", value: "hello@traverseminds.ug" }, { label: "Location", value: "Kampala, Uganda" }, { label: "Focus", value: "Africa" }].map(row => (
                <div key={row.label} className="flex gap-5 mb-3">
                  <span className="text-[11px] font-bold tracking-widest uppercase text-gn-500 w-18 shrink-0">{row.label}</span>
                  <span className="text-sm text-gn-100">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer strip */}
      <div className="bg-bg-light border-t-4 border-accent py-11 px-8 text-center">
        <p className="text-[22px] font-display font-bold text-gn-100 mb-2">Traverse Minds</p>
        <p className="text-sm text-gn-400 m-0">Kampala, Uganda · hello@traverseminds.ug</p>
      </div>

    </div>
  );
}
