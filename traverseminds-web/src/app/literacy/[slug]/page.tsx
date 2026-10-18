import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageTransition } from "@/components/ui/PageTransition";
import { getProgrammes } from "@/lib/cms";
import { LearningOutcomes } from "@/components/literacy/LearningOutcomes";
import { SectionBar } from "@/components/magazine/SectionBar";
import { PageHeader } from "@/components/magazine/PageHeader";
import { SectionHeader } from "@/components/magazine/primitives";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const programmes = await getProgrammes();
  return programmes.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const programme = (await getProgrammes()).find((p) => p.slug === slug);

  if (!programme) return { title: "Programme Not Found" };

  return {
    title: `${programme.title} | Digital Literacy`,
    description: programme.description,
  };
}

export default async function ProgrammePage({ params }: Props) {
  const { slug } = await params;
  const programmes = await getProgrammes();
  const programme = programmes.find((p) => p.slug === slug);

  if (!programme) notFound();

  return (
    <PageTransition>
      <div className="flex flex-col">
        <SectionBar />
        <PageHeader
          crumbs={[
            { name: "Home", href: "/" },
            { name: "Literacy", href: "/literacy" },
            { name: programme.title, href: `/literacy/${slug}` },
          ]}
          kicker={`${programme.audience} training`}
          title={programme.title}
          dek={programme.description}
        >
          <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-3 border-y border-black/15 py-4 text-[14px]">
            <div><dt className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-gn-500">Duration</dt><dd className="mt-1 text-black">{programme.duration}</dd></div>
            <div><dt className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-gn-500">Format</dt><dd className="mt-1 text-black">{programme.format}</dd></div>
            <div><dt className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-gn-500">Audience</dt><dd className="mt-1 capitalize text-black">{programme.audience}</dd></div>
          </dl>
        </PageHeader>
        <figure className="container-max">
          <div className="relative aspect-[21/9] overflow-hidden bg-gn-800">
            <Image src={programme.image} alt={programme.title} fill priority className="object-cover" sizes="(max-width: 1280px) 100vw, 1240px" />
          </div>
        </figure>

        {/* About, topics and outcomes */}
        <section className="bg-white">
          <div className="container-max py-14 lg:py-20">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <SectionHeader title="About this programme" />
                <p className="font-serif text-[clamp(19px,1.8vw,22px)] leading-relaxed text-gn-200">{programme.longDescription}</p>

                <div className="mt-12">
                  <SectionHeader title="What you'll cover" />
                  <ul className="grid gap-px bg-black/10 sm:grid-cols-2">
                    {programme.topics.map((topic) => (
                      <li key={topic} className="flex items-start gap-3 bg-white py-3 pr-4">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden />
                        <span className="text-[16px] text-gn-200">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <figure className="relative mt-12 aspect-[16/9] overflow-hidden bg-gn-800">
                  <Image src={programme.secondaryImage} alt={`${programme.title} training session`} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 60vw" />
                </figure>
              </div>

              <aside className="lg:col-span-5">
                <div className="lg:sticky lg:top-28">
                  <SectionHeader title="Learning outcomes" />
                  <LearningOutcomes outcomes={programme.learningOutcomes} programmeTitle={programme.title} audience={programme.audience} />
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Other programmes */}
        <section className="bg-bg-light">
          <div className="container-max py-14 lg:py-20">
            <SectionHeader title="Other training tracks" href="/literacy" linkLabel="All programmes" />
            <ul className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-3">
              {programmes.filter((p) => p.slug !== slug).slice(0, 3).map((p) => (
                <li key={p.slug}>
                  <Link href={`/literacy/${p.slug}`} className="group block">
                    <div className="tech-card relative aspect-[3/2] overflow-hidden bg-gn-800">
                      <Image src={p.image} alt="" fill className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" sizes="(max-width: 768px) 100vw, 33vw" />
                    </div>
                    <p className="mt-4 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-accent">For {p.audience}</p>
                    <h3 className="mt-1.5 font-serif text-[22px] font-semibold leading-tight text-black group-hover:text-accent">{p.title}</h3>
                    <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-gn-400">{p.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
