import { Breadcrumbs, type Crumb } from "@/components/seo/Breadcrumbs";
import { Kicker } from "./primitives";

/** Section-front header: breadcrumb trail, kicker, large serif title, standfirst. */
export function PageHeader({
  crumbs,
  kicker,
  title,
  dek,
  children,
}: {
  crumbs: Crumb[];
  kicker?: string;
  title: string;
  dek?: string;
  /** Optional extras under the standfirst, e.g. filters or actions */
  children?: React.ReactNode;
}) {
  return (
    <header className="container-max w-full pt-8 pb-10">
      <Breadcrumbs items={crumbs} />
      {kicker && <Kicker className="mt-6">{kicker}</Kicker>}
      <h1 className="mt-3 max-w-4xl font-serif text-[40px] font-semibold leading-[1.05] tracking-[-0.01em] text-black md:text-[56px]">
        {title}
      </h1>
      {dek && <p className="mt-4 max-w-2xl text-[19px] leading-relaxed text-gn-400">{dek}</p>}
      {children}
    </header>
  );
}
