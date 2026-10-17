import { TeamCard } from "./TeamCard";
import { SectionHeader } from "@/components/magazine/primitives";
import type { TeamContent } from "@/content/team";

/** Team members are edited in Sanity (Team Member) and passed in by the About page. */
export function TeamGrid({ teamMembers }: { teamMembers: TeamContent[] }) {
  return (
    <section id="team" className="bg-white">
      <div className="container-max py-14 lg:py-20">
        <SectionHeader title="Our people" />
        <div className="grid gap-10 lg:grid-cols-[1fr_2.2fr] lg:gap-14">
          <div>
            <h2 className="font-serif text-[clamp(26px,3vw,36px)] font-semibold leading-tight text-black">Meet the team.</h2>
            <p className="mt-4 text-[16px] leading-relaxed text-gn-400">
              Local experts building for Africa. Team profiles are updated as we grow.
            </p>
          </div>
          <ul className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <li key={member.name}>
                <TeamCard {...member} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
