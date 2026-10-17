import { sanityClient } from "@/sanity/client";

export type CitedStatistic = {
  _id: string;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  context?: string;
  period: string;
  asOf: string;
  sourceOrg: string;
  sourceTitle: string;
  sourceUrl: string;
  sourcePage?: string;
};

/** Cited figures entered in Sanity for one page. Empty array if none or Sanity is unreachable. */
export async function getStatistics(placement: string, limit = 8): Promise<CitedStatistic[]> {
  try {
    return await sanityClient.fetch<CitedStatistic[]>(
      `*[_type == "statistic" && $placement in placements] | order(coalesce(order, 999) asc, asOf desc)[0...$limit]{
        _id, label, value, prefix, suffix, decimals, context, period, asOf,
        sourceOrg, sourceTitle, sourceUrl, sourcePage
      }`,
      { placement, limit }
    );
  } catch {
    return [];
  }
}

export function formatStatistic(s: CitedStatistic) {
  const decimals = s.decimals ?? 0;
  const number = s.value.toLocaleString("en-GB", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  return `${s.prefix ?? ""}${number}${s.suffix ?? ""}`;
}
