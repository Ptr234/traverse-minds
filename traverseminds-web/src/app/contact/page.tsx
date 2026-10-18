import { ContactForm } from "@/components/contact/ContactForm";
import { WhatsAppButton } from "@/components/contact/WhatsAppButton";
import { AfricaMap } from "@/components/ui/AfricaMap";
import { PageTransition } from "@/components/ui/PageTransition";
import { SectionBar } from "@/components/magazine/SectionBar";
import { PageHeader } from "@/components/magazine/PageHeader";
import { SectionHeader } from "@/components/magazine/primitives";

const EMAIL = "traversemindsug@gmail.com";

const DETAILS = [
  { label: "Email", value: EMAIL, href: `mailto:${EMAIL}`, note: "For formal enquiries and proposals" },
  { label: "Location", value: "Kampala, Uganda", note: "Serving all African countries" },
  { label: "Response time", value: "Within one working day", note: "Urgent? Use WhatsApp" },
];

export default function ContactPage() {
  return (
    <PageTransition>
      <SectionBar />
      <PageHeader
        crumbs={[{ name: "Home", href: "/" }, { name: "Contact", href: "/contact" }]}
        kicker="Contact"
        title="Get in touch"
        dek="Whether you need a security assessment, want to attend an event, or have a research partnership in mind."
      />

      {/* Form and details */}
      <section className="bg-bg-light">
        <div className="container-max py-14 lg:py-20">
          <SectionHeader title="Send us a message" />
          <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
            <div className="border border-black/10 bg-white p-6 lg:p-8">
              <ContactForm />
            </div>
            <aside>
              <dl className="border-t-2 border-black">
                {DETAILS.map((d) => (
                  <div key={d.label} className="border-b border-black/15 py-5">
                    <dt className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-accent">{d.label}</dt>
                    <dd className="mt-1.5 font-serif text-[20px] font-semibold text-black">
                      {d.href ? <a href={d.href} className="break-words hover:text-accent">{d.value}</a> : d.value}
                    </dd>
                    <dd className="mt-0.5 text-[14px] text-gn-400">{d.note}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 border border-black/10 bg-white p-6">
                <p className="font-serif text-[20px] font-semibold text-black">Prefer WhatsApp?</p>
                <p className="mt-1 text-[14px] text-gn-400">The fastest way to reach us.</p>
                <div className="mt-4">
                  <WhatsAppButton />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section className="bg-white">
        <div className="container-max py-14 lg:py-20">
          <SectionHeader title="Coverage" />
          <div className="mb-8 grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <h2 className="font-serif text-[clamp(28px,3.6vw,44px)] font-semibold leading-[1.1] text-black">Serving Africa.</h2>
            <p className="text-[17px] leading-relaxed text-gn-400">Headquartered in Kampala, working with organisations across the continent.</p>
          </div>
          <AfricaMap />
        </div>
      </section>

      {/* Press */}
      <section className="relative overflow-hidden bg-bg-dark text-white">
        <div className="tech-grid-dark absolute inset-0" aria-hidden />
        <div className="container-max relative py-14 lg:py-20">
          <SectionHeader title="Press" dark />
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div>
              <h2 className="font-serif text-[clamp(28px,3.6vw,44px)] font-semibold leading-[1.1]">Press and media enquiries.</h2>
              <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-white/65">For press enquiries, interview requests or expert commentary, email us directly.</p>
            </div>
            <a href={`mailto:${EMAIL}`} className="inline-block self-start break-words border-b border-accent pb-1 font-serif text-[22px] font-semibold hover:text-accent lg:justify-self-end">
              {EMAIL}
            </a>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
