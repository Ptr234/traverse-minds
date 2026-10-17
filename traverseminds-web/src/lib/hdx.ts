// Humanitarian Data Exchange (OCHA) CKAN API — dataset metadata only; each dataset carries its own licence.
// https://data.humdata.org/faqs/devs

const API = "https://data.humdata.org/api/3/action/package_search";

type CkanDataset = {
  name: string;
  title: string;
  license_title?: string;
  metadata_modified: string;
  organization?: { title: string } | null;
};

type CkanFacetItem = { display_name: string; count: number };

export type OpenDataset = { title: string; url: string; publisher: string; licence: string; updated: string };

export type OpenDataLandscapeData = {
  total: number;
  publishers: { name: string; count: number }[];
  latest: OpenDataset[];
};

async function search(params: Record<string, string>) {
  const qs = new URLSearchParams({ fq: "groups:uga", ...params });
  const res = await fetch(`${API}?${qs}`, { signal: AbortSignal.timeout(20000) });
  if (!res.ok) throw new Error(`HDX: HTTP ${res.status}`);
  const json = await res.json();
  if (!json.success) throw new Error("HDX: request failed");
  return json.result;
}

/** Returns null if HDX is unreachable, so callers can hide the section instead of failing the build. */
export async function getOpenDataLandscape(): Promise<OpenDataLandscapeData | null> {
  try {
    const [facets, recent] = await Promise.all([
      search({ rows: "0", "facet.field": '["organization"]', "facet.limit": "8" }),
      // Skip HDX's own auto-generated API mirrors so the list shows real publications
      search({ fq: "groups:uga -organization:hdx-hapi", rows: "6", sort: "metadata_modified desc" }),
    ]);

    const items: CkanFacetItem[] = facets.search_facets?.organization?.items ?? [];

    return {
      total: facets.count,
      publishers: items
        .sort((a, b) => b.count - a.count)
        .map((i) => ({ name: i.display_name.replace(/\s*\(inactive\)$/i, ""), count: i.count })),
      latest: (recent.results as CkanDataset[]).map((d) => ({
        title: d.title,
        url: `https://data.humdata.org/dataset/${d.name}`,
        publisher: d.organization?.title ?? "Unknown publisher",
        licence: d.license_title ?? "See dataset",
        updated: d.metadata_modified.slice(0, 10),
      })),
    };
  } catch (error) {
    console.warn("Open data landscape unavailable:", error);
    return null;
  }
}
