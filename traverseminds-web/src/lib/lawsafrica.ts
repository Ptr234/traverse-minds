// Laws.Africa Knowledge Base API — Uganda legislation and judgments, fetched at build time.
// https://developers.laws.africa/knowledge-bases/quick-start
// Requires LAWS_AFRICA_TOKEN (server-side only; never expose with a NEXT_PUBLIC_ prefix).
// Every result is shown with a link to its source on ULII, per Laws.Africa's guidance.

const API = "https://api.laws.africa/ai/v1/knowledge-bases";

type KbResult = {
  content: { text?: string };
  metadata: {
    title: string;
    portion_title?: string;
    public_url: string;
    portion_public_url?: string;
    expression_date?: string;
    blurb?: string;
  };
};

export type LegalTopic = {
  /** The question a client would ask, shown as the card heading */
  question: string;
  /** Search text sent to the Knowledge Base */
  query: string;
};

export type LegislationAnswer = {
  question: string;
  act: string;
  /** Human-readable citation, e.g. "s. 23 (Notification of data security breaches)" */
  section: string;
  excerpt: string;
  url: string;
};

/** "23. Notification of data security breaches" -> "s. 23 (Notification of data security breaches)" */
function formatSection(portionTitle = "") {
  const match = portionTitle.match(/^(\d+[A-Z]?)\.\s*(.+)$/);
  return match ? `s. ${match[1]} (${match[2]})` : portionTitle;
}

export type CaseSummary = {
  title: string;
  court: string;
  date: string;
  summary: string;
  url: string;
};

async function retrieve(kb: string, body: object): Promise<KbResult[]> {
  const token = process.env.LAWS_AFRICA_TOKEN;
  if (!token) throw new Error("LAWS_AFRICA_TOKEN not set");
  const res = await fetch(`${API}/${kb}/retrieve`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(30000),
    // Sandbox allows 100 calls/day — cache so local reloads and repeat builds don't burn the quota
    cache: "force-cache",
  });
  if (!res.ok) throw new Error(`Laws.Africa ${kb}: HTTP ${res.status}`);
  return (await res.json()).results ?? [];
}

/** Tidy the spacing Laws.Africa leaves around defined terms, then trim to a readable excerpt. */
function excerpt(text = "", max = 340) {
  const clean = text
    .replace(/\s+/g, " ")
    .replace(/\s+([,.;:)’])/g, "$1")
    .replace(/([(‘])\s+/g, "$1")
    .trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

/** Splits "Party v Party (Case No) [2023] UGCC 18 (9 March 2023)" into a short title and court citation. */
function splitCaseTitle(full: string) {
  // Court codes can be mixed case, e.g. UGCommC, UGHCACD
  const match = full.match(/^(.*?)\s*\((?:[^()]|\([^()]*\))*\)\s*(\[\d{4}\]\s*[A-Za-z]+\s*\d+)/);
  return match ? { title: match[1].trim(), court: match[2].replace(/\s+/g, " ") } : { title: full, court: "" };
}

/** Top statutory provision for each question. Returns null if the API or token is unavailable. */
export async function getLegislationAnswers(topics: LegalTopic[]): Promise<LegislationAnswer[] | null> {
  try {
    const answers = await Promise.all(
      topics.map(async (topic) => {
        const [top] = await retrieve("legislation-ug", {
          text: topic.query,
          top_k: 1,
          filters: { principal: true, repealed: false },
        });
        if (!top) return null;
        return {
          question: topic.question,
          act: top.metadata.title,
          section: formatSection(top.metadata.portion_title),
          excerpt: excerpt(top.content.text),
          url: top.metadata.portion_public_url ?? top.metadata.public_url,
        };
      })
    );
    return answers.filter((a): a is LegislationAnswer => a !== null);
  } catch (error) {
    console.warn("Laws.Africa legislation unavailable:", error instanceof Error ? error.message : error);
    return null;
  }
}

/** Top judgment for each query, using Laws.Africa's case summaries. Returns null if unavailable. */
export async function getCaseSummaries(queries: string[]): Promise<CaseSummary[] | null> {
  try {
    const cases = await Promise.all(
      queries.map(async (query) => {
        const [top] = await retrieve("judgments-ug", { text: query, top_k: 1 });
        if (!top) return null;
        const { title, court } = splitCaseTitle(top.metadata.title);
        return {
          title,
          court,
          date: top.metadata.expression_date ?? "",
          summary: top.metadata.blurb || excerpt(top.content.text, 220),
          url: top.metadata.public_url,
        };
      })
    );
    // The same case can match two queries — show it once
    const seen = new Set<string>();
    return cases.filter((c): c is CaseSummary => c !== null && !seen.has(c.url) && !!seen.add(c.url));
  } catch (error) {
    console.warn("Laws.Africa judgments unavailable:", error instanceof Error ? error.message : error);
    return null;
  }
}

// Curated for Traverse Security's clients — each query was checked to land on the intended provision or case.
export const DATA_LAW_TOPICS: LegalTopic[] = [
  { question: "Do we need consent to collect personal data?", query: "consent to collect personal data" },
  { question: "What must we do after a data breach?", query: "personal data breach notification" },
  { question: "Can we store or process data outside Uganda?", query: "transfer of personal data outside Uganda" },
  { question: "What security must a data processor provide?", query: "security measures to secure the integrity of personal data" },
  { question: "Is unauthorised access to a system a crime?", query: "unauthorised access to a computer" },
  { question: "Are electronic records legally binding?", query: "legal recognition of electronic signatures and electronic records" },
];

export const DATA_LAW_CASES = [
  "blanket tax notices demanding bank account data privacy",
  "electronic evidence seized without warrant inadmissible",
  "employee images used in advertising without consent data protection",
  "unauthorised access and electronic fraud conviction URA systems",
];
