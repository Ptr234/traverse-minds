import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, BookOpen, CheckCircle2, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PageTransition } from "@/components/ui/PageTransition";
import { SectionReveal, RevealItem } from "@/components/ui/SectionReveal";
import { TextReveal } from "@/components/ui/TextReveal";
import { programmes } from "@/lib/programmes";
import { LearningOutcomes } from "@/components/literacy/LearningOutcomes";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return programmes.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const programme = programmes.find((p) => p.slug === slug);

  if (!programme) return { title: "Programme Not Found" };

  return {
    title: `${programme.title} | Digital Literacy | Traverse Minds`,
    description: programme.description,
  };
}

export default async function ProgrammePage({ params }: Props) {
  const { slug } = await params;
  const programme = programmes.find((p) => p.slug === slug);

  if (!programme) notFound();

  return (
    <PageTransition>
      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center pt-24 pb-16 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src={programme.image}
              alt={programme.title}
              fill
              className="object-cover"
              priority
            />
            <div 
              className="absolute inset-0" 
              style={{ background: "linear-gradient(to right, rgba(13, 59, 46, 0.95) 0%, rgba(13, 59, 46, 0.8) 50%, rgba(13, 59, 46, 0.4) 100%)" }} 
            />
          </div>

          <div className="container-max relative z-10">
            <Link 
              href="/literacy" 
              className="inline-flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Literacy Programmes
            </Link>
            
            <div className="max-w-3xl">
              <span className="inline-block px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-bold uppercase tracking-widest mb-4">
                {programme.audience} Training
              </span>
              <TextReveal
                as="h1"
                variant="fade-up"
                className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
              >
                {programme.title}
              </TextReveal>
              <p className="mt-6 text-xl text-white/80 leading-relaxed max-w-2xl">
                {programme.description}
              </p>

              <div className="mt-10 flex flex-wrap gap-6">
                <div className="flex items-center gap-3 text-white">
                  <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-white/50 font-bold">Duration</p>
                    <p className="font-medium">{programme.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-white/50 font-bold">Format</p>
                    <p className="font-medium">{programme.format}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-white/50 font-bold">Target Audience</p>
                    <p className="font-medium capitalize">{programme.audience}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

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
