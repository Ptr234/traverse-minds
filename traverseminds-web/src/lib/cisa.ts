// CISA Known Exploited Vulnerabilities catalog (US Government work, public domain) — fetched at build time.
// https://www.cisa.gov/known-exploited-vulnerabilities-catalog

const KEV_URL = "https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json";

type KevEntry = {
  cveID: string;
  vendorProject: string;
  product: string;
  vulnerabilityName: string;
  dateAdded: string;
  shortDescription: string;
  knownRansomwareCampaignUse: "Known" | "Unknown";
};

type KevCatalog = {
  catalogVersion: string;
  dateReleased: string;
  count: number;
  vulnerabilities: KevEntry[];
};

export type Severity = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";

export type ThreatWatchItem = {
  cveId: string;
  vendor: string;
  product: string;
  name: string;
  description: string;
  dateAdded: string;
  ransomware: boolean;
  cvss?: { score: number; severity: Severity };
};

// NVD CVE API 2.0 (US Government work, public domain). Unauthenticated limit: 5 requests / 30s.
// https://nvd.nist.gov/developers/vulnerabilities
const NVD_URL = "https://services.nvd.nist.gov/rest/json/cves/2.0";

type NvdMetric = { cvssData: { baseScore: number; baseSeverity?: string }; baseSeverity?: string };

async function fetchCvss(cveId: string): Promise<ThreatWatchItem["cvss"]> {
  try {
    const res = await fetch(`${NVD_URL}?cveId=${cveId}`, {
      signal: AbortSignal.timeout(15000),
      next: { revalidate: 86400 },
    });
    if (!res.ok) return undefined;
    const data = await res.json();
    const metrics: Record<string, NvdMetric[]> = data?.vulnerabilities?.[0]?.cve?.metrics ?? {};
    // Prefer the newest CVSS version available
    const metric = (metrics.cvssMetricV40 ?? metrics.cvssMetricV31 ?? metrics.cvssMetricV30 ?? [])[0];
    if (!metric) return undefined;
    const severity = (metric.cvssData.baseSeverity ?? metric.baseSeverity)?.toUpperCase() as Severity | undefined;
    return severity ? { score: metric.cvssData.baseScore, severity } : undefined;
  } catch {
    return undefined;
  }
}

/** Fetch CVSS scores sequentially, spaced to stay under NVD's unauthenticated rate limit. */
async function withCvss(items: ThreatWatchItem[]): Promise<ThreatWatchItem[]> {
  const out: ThreatWatchItem[] = [];
  for (const [i, item] of items.entries()) {
    if (i > 0) await new Promise((r) => setTimeout(r, 6500));
    out.push({ ...item, cvss: await fetchCvss(item.cveId) });
  }
  return out;
}

export type ThreatWatchData = {
  catalogDate: string;
  total: number;
  addedLast30Days: number;
  ransomwareLinked: number;
  latest: ThreatWatchItem[];
};

/** Returns null if CISA is unreachable, so callers can hide the section instead of failing the build. */
export async function getThreatWatch(limit = 6, { cvss = true }: { cvss?: boolean } = {}): Promise<ThreatWatchData | null> {
  try {
    const res = await fetch(KEV_URL, { signal: AbortSignal.timeout(30000) });
    if (!res.ok) throw new Error(`CISA KEV: HTTP ${res.status}`);
    const catalog = (await res.json()) as KevCatalog;

    const releasedAt = new Date(catalog.dateReleased);
    const since = new Date(releasedAt.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const sorted = [...catalog.vulnerabilities].sort((a, b) => b.dateAdded.localeCompare(a.dateAdded));

    return {
      catalogDate: catalog.dateReleased.slice(0, 10),
      total: catalog.vulnerabilities.length,
      addedLast30Days: sorted.filter((v) => v.dateAdded >= since).length,
      ransomwareLinked: catalog.vulnerabilities.filter((v) => v.knownRansomwareCampaignUse === "Known").length,
      latest: await (cvss ? withCvss : async (x: ThreatWatchItem[]) => x)(
        sorted.slice(0, limit).map((v) => ({
          cveId: v.cveID,
          vendor: v.vendorProject,
          product: v.product,
          name: v.vulnerabilityName,
          description: v.shortDescription,
          dateAdded: v.dateAdded,
          ransomware: v.knownRansomwareCampaignUse === "Known",
        }))
      ),
    };
  } catch (error) {
    console.warn("Threat watch unavailable:", error);
    return null;
  }
}
