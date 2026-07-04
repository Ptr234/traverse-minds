import { SectionReveal, RevealItem } from "@/components/ui/SectionReveal";
import { TextReveal } from "@/components/ui/TextReveal";

const modules = [
  {
    no: 1,
    name: "The Mirror",
    theme: "Identity",
    description: "Knowing who you are before the world tells you who to be.",
  },
  {
    no: 2,
    name: "The Instrument",
    theme: "How to Think",
    description: "The mind is a tool. Tools that aren't tuned daily go blunt.",
  },
  {
    no: 3,
    name: "The Workshop",
    theme: "Problem Solving",
    description: "Problems are raw material, not interruptions to the plan.",
  },
  {
    no: 4,
    name: "The Fork",
    theme: "Power of Choice",
    description: "Every life is just a long sequence of forks in the road.",
  },
  {
    no: 5,
    name: "The Compass",
    theme: "Finding Purpose",
    description: "Direction matters more than speed.",
  },
  {
    no: 6,
    name: "The Architecture",
    theme: "Habits",
    description: "What gets built when no one's watching is what eventually holds the weight.",
  },
  {
    no: 7,
    name: "The Root System",
    theme: "Family",
    description: "What feeds you underground shows up above ground eventually.",
  },
  {
    no: 8,
    name: "The Ledger",
    theme: "Money",
    description: "Money is just a record of decisions made earlier, unseen.",
  },
  {
    no: 9,
    name: "The Ripple",
    theme: "Influence & Growth",
    description: "Every life moves something else, whether or not it intends to.",
  },
  {
    no: 10,
    name: "The Horizon",
    theme: "Death & Legacy",
    description: "An honest look at the end clarifies how to spend the time before it.",
  },
];

export function ModulesShowcase() {
  return (
    <section
      style={{
        background: "#ffffff",
        borderTop: "1px solid rgba(0,0,0,0.3)",
        paddingTop: 80,
        paddingBottom: 80,
      }}
      className="relative overflow-hidden"
    >
      <div className="container-max relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p
            className="eyebrow"
            style={{ color: "#ff4c00", marginBottom: 16 }}
          >
            CURRICULUM FRAMEWORK
          </p>

          <TextReveal
            as="h2"
            variant="blur-in"
            className="font-display text-4xl md:text-5xl font-bold text-brand-charcoal mb-6"
          >
            The Ten Modules
          </TextReveal>

          <TextReveal
            as="p"
            variant="fade-up"
            delay={0.2}
            className="text-lg text-brand-medium"
          >
            Each module explores a critical dimension of character and
            capability, taught at both Foundation (14–18) and Execution (19–25)
            levels.
          </TextReveal>
        </div>

        <SectionReveal variant="fade-up" staggerChildren={0.05} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {modules.map((module) => (
            <RevealItem key={module.no} variant="scale-fade">
              <div
                className="h-full border bg-white p-6 flex flex-col"
                style={{
                  borderColor: "rgba(0,0,0,0.1)",
                  borderRadius: 8,
                  transition: "all 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)"
                }}
              >
                <div
                  className="h-10 w-10 flex items-center justify-center font-bold text-white text-sm mb-4 shrink-0"
                  style={{
                    background: "#ff4c00",
                    borderRadius: 4
                  }}
                >
                  {module.no}
                </div>

                <h3 className="font-display text-base font-bold text-black mb-2">
                  {module.name}
                </h3>

                <p
                  className="text-xs font-semibold mb-3"
                  style={{ color: "#ff4c00" }}
                >
                  {module.theme}
                </p>

                <p className="text-sm leading-relaxed" style={{ color: "#515459" }}>
                  {module.description}
                </p>
              </div>
            </RevealItem>
          ))}
        </SectionReveal>

        <div className="mt-16 border bg-white p-8" style={{ borderColor: "rgba(0,0,0,0.1)", borderRadius: 8 }}>
          <TextReveal
            as="h3"
            variant="fade-up"
            className="font-display text-2xl font-bold mb-3"
            style={{ color: "#000" }}
          >
            Two Tiers, Same Excellence
          </TextReveal>
          <p className="max-w-2xl mx-auto mb-6" style={{ color: "#515459" }}>
            <span className="font-semibold">Tier 1 (Foundation)</span> for ages 14–18 builds the core disciplines. <span className="font-semibold">Tier 2 (Execution)</span> for ages 19–25 deepens and applies these disciplines to real adult decisions and responsibilities. Graduates of Tier 1 advance to Tier 2 without repetition; new Tier 2 entrants receive a brief foundational orientation.
          </p>
        </div>
      </div>
    </section>
  );
}
