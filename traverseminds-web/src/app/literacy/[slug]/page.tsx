import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PageTransition } from "@/components/ui/PageTransition";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { getProgrammes } from "@/lib/cms";
import { LearningOutcomes } from "@/components/literacy/LearningOutcomes";
import { SectionBar } from "@/components/magazine/SectionBar";
import { PageHeader } from "@/components/magazine/PageHeader";

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
    title: `${programme.title} | Digital Literacy | Traverse Minds`,
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
            <div><dt className="text-[11px] font-bold uppercase tracking-wider text-gn-500">Duration</dt><dd className="mt-1 text-black">{programme.duration}</dd></div>
            <div><dt className="text-[11px] font-bold uppercase tracking-wider text-gn-500">Format</dt><dd className="mt-1 text-black">{programme.format}</dd></div>
            <div><dt className="text-[11px] font-bold uppercase tracking-wider text-gn-500">Audience</dt><dd className="mt-1 capitalize text-black">{programme.audience}</dd></div>
          </dl>
        </PageHeader>
        <figure className="container-max">
          <div className="relative aspect-[21/9] overflow-hidden bg-gn-800">
            <Image src={programme.image} alt={programme.title} fill priority className="object-cover" sizes="(max-width: 1280px) 100vw, 1240px" />
          </div>
        </figure>

        {/* Detailed Info */}
        <section className="py-20 bg-white">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              <div className="lg:col-span-7">
                <SectionReveal variant="fade-up">
                  <h2 className="font-display text-3xl font-bold text-primary mb-6">About this programme</h2>
                  <p className="text-lg text-brand-medium leading-relaxed mb-8">
                    {programme.longDescription}
                  </p>
                  
                  <div className="my-12 p-8 bg-gn-900 rounded-2xl border border-black/5">
                    <h3 className="font-display text-xl font-bold text-primary mb-6">What you&apos;ll cover</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {programme.topics.map((topic) => (
                        <div key={topic} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                          <span className="text-brand-medium">{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Secondary Image */}
                  <div className="relative h-[400px] w-full overflow-hidden rounded-2xl mb-12 shadow-lg">
                    <Image 
                      src={programme.secondaryImage} 
                      alt={`${programme.title} Training`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </SectionReveal>
              </div>

              <div className="lg:col-span-5">
                <SectionReveal variant="fade-up" delay={0.2}>
                  <div className="sticky top-32">
                    <h3 className="font-display text-2xl font-bold mb-8 text-primary">Learning Outcomes</h3>
                    <LearningOutcomes 
                      outcomes={programme.learningOutcomes} 
                      programmeTitle={programme.title}
                      audience={programme.audience}
                    />
                  </div>
                </SectionReveal>
              </div>
            </div>
          </div>
        </section>

        {/* Other Programmes */}
        <section className="py-20 bg-gn-900">
          <div className="container-max">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <p className="eyebrow text-accent mb-4">Explore More</p>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-primary">Other Training Tracks</h2>
              </div>
              <Button variant="outline" href="/literacy">
                View All Programmes
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {programmes.filter(p => p.slug !== slug).slice(0, 3).map((p) => (
                <Link 
                  key={p.slug} 
                  href={`/literacy/${p.slug}`}
                  className="group block bg-white rounded-xl overflow-hidden border border-black/5 hover:border-accent/30 transition-all duration-300 hover:shadow-xl"
                >
                  <div className="relative h-48">
                    <Image src={p.image} alt={p.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/20 transition-colors" />
                    <div className="absolute bottom-4 left-4">
                      <span className="px-2 py-1 rounded-md bg-white text-primary text-[10px] font-bold uppercase tracking-wider">
                        {p.audience}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-lg font-bold text-primary group-hover:text-accent transition-colors">{p.title}</h3>
                    <p className="mt-2 text-sm text-brand-medium line-clamp-2">{p.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
