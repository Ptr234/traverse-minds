// World Bank Open Data (CC BY 4.0) — fetched at build time.
// Docs: https://datahelpdesk.worldbank.org/knowledgebase/articles/889392

const API = "https://api.worldbank.org/v2";

export const SNAPSHOT_COUNTRIES = [
  { iso3: "UGA", name: "Uganda" },
  { iso3: "KEN", name: "Kenya" },
  { iso3: "TZA", name: "Tanzania" },
  { iso3: "RWA", name: "Rwanda" },
] as const;

export const SNAPSHOT_INDICATORS = [
  { id: "IT.NET.USER.ZS", label: "Internet users", unit: "% of population", decimals: 1, suffix: "%" },
  { id: "IT.CEL.SETS.P2", label: "Mobile subscriptions", unit: "per 100 people", decimals: 0, suffix: "" },
  { id: "FX.OWN.TOTL.ZS", label: "Bank or mobile-money account", unit: "% of adults (15+)", decimals: 1, suffix: "%" },
  { id: "EG.ELC.ACCS.ZS", label: "Access to electricity", unit: "% of population", decimals: 1, suffix: "%" },
  { id: "IT.NET.BBND.P2", label: "Fixed broadband", unit: "subscriptions per 100 people", decimals: 1, suffix: "" },
] as const;

export type IndicatorId = (typeof SNAPSHOT_INDICATORS)[number]["id"];

export type CountryValue = { iso3: string; name: string; value: number; year: string };

export type IndicatorData = (typeof SNAPSHOT_INDICATORS)[number] & { values: CountryValue[] };

type WbRow = { countryiso3code: string; date: string; value: number | null };

async function fetchIndicator(id: string): Promise<CountryValue[]> {
  const codes = SNAPSHOT_COUNTRIES.map((c) => c.iso3).join(";");
  // mrnev=1 → most recent non-empty value per country
  const res = await fetch(`${API}/country/${codes}/indicator/${id}?format=json&mrnev=1&per_page=50`, {
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) throw new Error(`World Bank ${id}: HTTP ${res.status}`);

  const [, rows] = (await res.json()) as [unknown, WbRow[] | null];
  if (!rows) throw new Error(`World Bank ${id}: no data`);

  return SNAPSHOT_COUNTRIES.flatMap((c) => {
    const row = rows.find((r) => r.countryiso3code === c.iso3 && r.value !== null);
    return row ? [{ iso3: c.iso3, name: c.name, value: row.value as number, year: row.date }] : [];
  });
}

/** Returns null if the API is unreachable, so callers can hide the section instead of failing the build. */
export async function getDigitalSnapshot(): Promise<IndicatorData[] | null> {
  try {
    const results = await Promise.all(SNAPSHOT_INDICATORS.map((i) => fetchIndicator(i.id)));
    return SNAPSHOT_INDICATORS.map((indicator, i) => ({ ...indicator, values: results[i] }));
  } catch (error) {
    console.warn("Digital snapshot unavailable:", error);
    return null;
  }
}

export type TrendSeries = { iso3: string; name: string; points: { year: number; value: number }[] };

/** Yearly time series for one indicator across the snapshot countries. Null if the API is unreachable. */
export async function getIndicatorTrend(id: string, fromYear = 2000): Promise<TrendSeries[] | null> {
  try {
    const codes = SNAPSHOT_COUNTRIES.map((c) => c.iso3).join(";");
    const toYear = new Date().getFullYear();
    const res = await fetch(
      `${API}/country/${codes}/indicator/${id}?format=json&date=${fromYear}:${toYear}&per_page=500`,
      { signal: AbortSignal.timeout(15000) }
    );
    if (!res.ok) throw new Error(`World Bank ${id}: HTTP ${res.status}`);
    const [, rows] = (await res.json()) as [unknown, WbRow[] | null];
    if (!rows) throw new Error(`World Bank ${id}: no data`);

    return SNAPSHOT_COUNTRIES.map((c) => ({
      iso3: c.iso3,
      name: c.name,
      points: rows
        .filter((r) => r.countryiso3code === c.iso3 && r.value !== null)
        .map((r) => ({ year: Number(r.date), value: r.value as number }))
        .sort((a, b) => a.year - b.year),
    })).filter((s) => s.points.length > 1);
  } catch (error) {
    console.warn("Indicator trend unavailable:", error);
    return null;
  }
}

export function formatValue(value: number, decimals: number, suffix: string) {
  return `${value.toLocaleString("en-GB", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`;
}
