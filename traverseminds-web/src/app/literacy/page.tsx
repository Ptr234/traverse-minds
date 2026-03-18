import { Metadata } from "next";
import { Hero } from "@/components/literacy/Hero";
import { ProgrammeListing } from "@/components/literacy/ProgrammeListing";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Digital Literacy | Building a Cyber-Safe Generation in Uganda",
  description: "Practical digital safety training for schools, SMEs, and government agencies.",
};

export default function LiteracyPage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <ProgrammeListing />

      {/* Organisation Booking */}
      <section className="relative bg-primary section-padding overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
        <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 h-96 w-96 rounded-full border-40 border-white/3 pointer-events-none" />

        <div className="container-max relative z-10">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Train your <span className="text-gradient-accent">entire organisation</span>
            </h2>
            <p className="mt-5 text-base text-white/50 leading-relaxed">
              Cybersecurity is a team effort. We provide tailored on-site
              training for government departments and corporate teams,
              focused on the specific threats relevant to your sector.
            </p>
            <div className="mt-10">
              <Button variant="primary" size="lg" href="/contact?subject=literacy-org">
                Request Bulk Training Quote
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Community Outreach */}
      <section className="relative bg-white section-padding overflow-hidden">
        <div className="absolute inset-0 dot-grid-light opacity-30 pointer-events-none" />

        <div className="container-max relative z-10 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary tracking-tight">
            Community Outreach
          </h2>
          <p className="mt-5 mx-auto max-w-2xl text-base text-brand-medium/60 leading-relaxed">
            As part of our civic mission, we run free digital safety workshops
            in local languages for community groups and senior citizens.
            Want us to visit your community?
          </p>
          <div className="mt-10">
            <Button variant="outline" size="lg" href="/contact?subject=community-outreach">
              Invite Us to Your Community
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
