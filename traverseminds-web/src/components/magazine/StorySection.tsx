import type { Story } from "@/lib/content";
import { SectionHeader, StoryCard } from "./primitives";

/**
 * A titled section of stories. "feature": one large story and the rest in a column beside it.
 * "grid": an even three-column grid.
 */
export function StorySection({
  title,
  href,
  stories,
  layout = "grid",
  background = "white",
}: {
  title: string;
  href?: string;
  stories: Story[];
  layout?: "feature" | "grid";
  background?: "white" | "paper";
}) {
  if (stories.length === 0) return null;
  const [first, ...rest] = stories;

  return (
    <section className={background === "paper" ? "bg-gn-900" : "bg-white"}>
      <div className="container-max py-12">
        <SectionHeader title={title} href={href} />
        {layout === "feature" ? (
          <div className="grid grid-cols-1 gap-x-10 gap-y-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <StoryCard story={first} size="lg" />
            </div>
            <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1 lg:border-l lg:border-black/15 lg:pl-10">
              {rest.slice(0, 3).map((s) => (
                <div key={s.href} className="lg:border-b lg:border-black/10 lg:pb-8 lg:last:border-b-0 lg:last:pb-0">
                  <StoryCard story={{ ...s, image: null }} size="sm" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {stories.slice(0, 6).map((s) => (
              <StoryCard key={s.href} story={s} size="md" />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
