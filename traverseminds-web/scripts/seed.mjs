// Traverse Minds Africa — Sanity seed script
// Run: node scripts/seed.mjs
import { createClient } from "@sanity/client";
import { createReadStream, readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.resolve(__dirname, "../public");

const client = createClient({
  projectId: "f5v11nkd",
  dataset: "production",
  apiVersion: "2026-03-17",
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
});

// ─── helpers ─────────────────────────────────────────────────────────────────

async function uploadImage(relPath, filename) {
  const abs = path.join(PUBLIC, relPath);
  console.log(`  uploading image: ${filename}`);
  try {
    const asset = await client.assets.upload("image", createReadStream(abs), { filename });
    return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
  } catch (e) {
    console.error(`  failed to upload ${filename}:`, e.message);
    return null;
  }
}

async function upsert(doc) {
  return client.createOrReplace(doc);
}

function block(text) {
  return {
    _type: "block",
    _key: Math.random().toString(36).slice(2),
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: Math.random().toString(36).slice(2), text, marks: [] }],
  };
}

// ─── upload images ────────────────────────────────────────────────────────────

console.log("\n[1/6] Uploading images...");

const imgs = {};
const uploads = [
  ["imagestouse/div-cybersecurity.jpeg",   "div-cybersecurity"],
  ["imagestouse/div-think-tank.jpeg",      "div-think-tank"],
  ["imagestouse/div-events.jpeg",          "div-events"],
  ["imagestouse/div-literacy.jpeg",        "div-literacy"],
  ["imagestouse/div-media.jpeg",           "div-media"],
  ["imagestouse/div-public-record.jpeg",   "div-public-record"],
  ["imagestouse/div-whatwedo.jpeg",        "div-whatwedo"],
  ["imagestouse/Digital Literacy.jpeg",    "digital-literacy"],
  ["imagestouse/Events.jpeg",              "events-photo"],
  ["imagestouse/Think Tank.jpeg",          "think-tank-photo"],
  ["imagestouse/Media.jpeg",               "media-photo"],
  ["imagestouse/This for public records.jpeg", "public-records-photo"],
  ["imagestouse/Use this for cybersecurity.jpeg", "cybersecurity-photo"],
  ["imagestouse/tra.jpeg",                 "tra-photo"],
  ["christine-masika.jpg",                 "christine-masika"],
];

for (const [rel, key] of uploads) {
  imgs[key] = await uploadImage(rel, key + path.extname(rel));
}

// ─── author ───────────────────────────────────────────────────────────────────

console.log("\n[2/6] Seeding author...");

const authorDoc = await upsert({
  _id: "author-christine",
  _type: "author",
  name: "Masiika Christine Thembo",
  slug: { _type: "slug", current: "masiika-christine-thembo" },
  role: "Founder & CEO",
  photo: imgs["christine-masika"],
  bio: "Founder and CEO of Traverse Minds Africa. Cybersecurity strategist, digital policy advocate, and civic-tech entrepreneur building Africa's integrated digital infrastructure.",
});
console.log("  author:", authorDoc._id);

// ─── team member ─────────────────────────────────────────────────────────────

console.log("\n[3/6] Seeding team members...");

const christineMember = await upsert({
  _id: "team-christine",
  _type: "teamMember",
  name: "Masiika Christine Thembo",
  slug: { _type: "slug", current: "masiika-christine-thembo" },
  title: "Founder & CEO",
  division: "leadership",
  photo: imgs["christine-masika"],
  bio: [
    block("Masiika Christine Thembo is the Founder and CEO of Traverse Minds Africa, the continent's integrated civic-tech company spanning cybersecurity, public records, digital literacy, events, media, and policy research."),
    block("With over a decade of experience in digital governance, Christine has led cybersecurity assessments for major Ugandan financial institutions, advised on data protection frameworks, and built partnerships across 54 African states."),
  ],
  linkedIn: "https://linkedin.com/in/christinemasika",
  isActive: true,
  sortOrder: 1,
});
console.log("  team member:", christineMember._id);

// ─── blog posts ───────────────────────────────────────────────────────────────

console.log("\n[4/6] Seeding blog posts...");

const posts = [
  {
    _id: "post-cyber-threats-banks",
    title: "The Top 5 Cyber Threats Facing Ugandan Banks in 2026",
    slug: "top-5-cyber-threats-ugandan-banks-2026",
    division: "security",
    publishedAt: "2026-03-12T08:00:00Z",
    readTime: "6 min read",
    excerpt: "Uganda's banking sector is digitising rapidly — but the attack surface is expanding just as fast. Based on our assessments across multiple financial institutions, here are the five threats keeping CISOs up at night.",
    image: imgs["cybersecurity-photo"],
    body: [
      block("Uganda's banking sector is undergoing rapid digital transformation. Mobile banking, internet banking, and agent banking have expanded financial access across the country — but they've also expanded the attack surface for cybercriminals."),
      block("Based on our security assessments across multiple Ugandan financial institutions in 2025–2026, here are the five most pressing cyber threats we're seeing."),
      block("1. Ransomware Targeting Core Banking Systems"),
      block("Ransomware attacks on financial institutions have increased by over 300% across Africa in the past two years. Attackers are specifically targeting core banking systems, knowing that downtime costs banks millions in lost transactions and regulatory penalties."),
      block("2. Mobile Banking API Vulnerabilities"),
      block("As banks rush to deploy mobile banking solutions, API security is often an afterthought. We've found critical vulnerabilities in mobile banking APIs that could allow attackers to access customer accounts, initiate unauthorised transfers, or extract personal data."),
      block("3. Insider Threats and Privileged Access Abuse"),
      block("Not all threats come from outside. Insider threats — whether malicious or negligent — remain one of the most difficult risks to manage. Banks with weak access controls and no privileged access monitoring are particularly vulnerable."),
      block("4. Social Engineering and Business Email Compromise"),
      block("Phishing attacks targeting bank employees have become more sophisticated. Business email compromise schemes targeting treasury and finance teams are costing Ugandan organisations significant sums."),
      block("5. Compliance Gaps with Bank of Uganda Regulations"),
      block("Bank of Uganda's cybersecurity guidelines require supervised institutions to maintain specific security controls. Many banks are not fully compliant, leaving them exposed to both cyber attacks and regulatory action."),
    ],
    tags: ["cybersecurity", "banking", "uganda", "ransomware"],
  },
  {
    _id: "post-uganda-pdpa",
    title: "Understanding Uganda's Data Protection and Privacy Act 2019",
    slug: "understanding-uganda-pdpa-2019",
    division: "thinktank",
    publishedAt: "2026-02-20T08:00:00Z",
    readTime: "8 min read",
    excerpt: "Three years after enactment, the Uganda PDPA remains unevenly implemented. This explainer breaks down what organisations must do and where enforcement is heading.",
    image: imgs["think-tank-photo"],
    body: [
      block("The Uganda Data Protection and Privacy Act 2019 (PDPA) came into force in February 2019, establishing the country's first comprehensive data protection framework. Three years on, compliance remains uneven — and enforcement is beginning to accelerate."),
      block("What the PDPA Requires"),
      block("The Act applies to any person or organisation that collects, processes, or stores personal data in Uganda. Key obligations include: appointing a data protection officer, implementing technical and organisational security measures, obtaining informed consent before collecting personal data, and honouring data subject rights including access, correction, and deletion."),
      block("Enforcement Landscape"),
      block("The Personal Data Protection Office (PDPO) — established under NITA-U — is the enforcement body. It has the power to investigate complaints, issue compliance notices, and impose penalties. Fines of up to UGX 250 million or 2% of annual revenue can be levied for serious breaches."),
      block("What Organisations Must Do Now"),
      block("Conduct a data mapping exercise to understand what personal data you hold and where it flows. Review your privacy notices, consent mechanisms, and retention policies. Appoint or designate a Data Protection Officer. Document your processing activities and establish a breach notification procedure."),
      block("Our think tank provides detailed PDPA readiness assessments and policy gap analysis. Contact our team for a confidential review."),
    ],
    tags: ["data-protection", "policy", "uganda", "pdpa", "compliance"],
  },
  {
    _id: "post-public-records-africa",
    title: "Why Africa Needs Its Own Public Records Infrastructure",
    slug: "why-africa-needs-public-records-infrastructure",
    division: "public-record",
    publishedAt: "2026-01-15T08:00:00Z",
    readTime: "7 min read",
    excerpt: "Across East Africa, basic public documents — company registrations, land titles, court orders — are fragmented, inaccessible, or held behind costly bureaucratic barriers. Public Record Africa is building the infrastructure to change that.",
    image: imgs["public-records-photo"],
    body: [
      block("In Uganda, verifying whether a company is legitimately registered takes an in-person visit to the Uganda Registration Services Bureau — or knowing someone who can navigate the system on your behalf. In Kenya, land searches require physical presence at the lands registry. Across the region, the story is the same: public records are public in name only."),
      block("The Cost of Inaccessible Records"),
      block("When public records are hard to access, the consequences cascade. Corruption thrives in opacity. Due diligence becomes prohibitively expensive for SMEs. Journalists investigating fraud lack the document trail needed to build their stories. Courts operate without full information. Citizens cannot hold institutions accountable."),
      block("What Public Record Africa Is Building"),
      block("Public Record Africa is an AI-powered platform that indexes, digitises, and makes searchable the public documents of East and Central Africa. Starting with Uganda, Kenya, Tanzania, Rwanda, and Burundi, we are building the infrastructure layer that researchers, journalists, legal professionals, and policymakers need."),
      block("Our initial focus is the Uganda Gazette — decades of public notices, company registrations, land declarations, and statutory instruments, now being indexed and made searchable for the first time."),
      block("Private beta access is available now. Join the waitlist at traverseminds.ug/public-record."),
    ],
    tags: ["public-records", "africa", "civic-tech", "transparency", "open-data"],
  },
  {
    _id: "post-digital-literacy-schools",
    title: "Digital Literacy: Building Cyber Safety for Uganda's Next Generation",
    slug: "digital-literacy-cyber-safety-uganda-schools",
    division: "literacy",
    publishedAt: "2026-01-05T08:00:00Z",
    readTime: "5 min read",
    excerpt: "Uganda's schools are connecting to the internet at an unprecedented rate. Without parallel investment in digital literacy, we risk producing a generation of connected but vulnerable citizens.",
    image: imgs["digital-literacy"],
    body: [
      block("Uganda had over 23 million internet users in 2025, with the fastest growth among 15–24 year-olds. But connectivity without literacy creates risk: young people accessing the internet without understanding phishing, privacy, misinformation, or safe online behaviour."),
      block("Our Digital Literacy Programme"),
      block("Traverse Digital Literacy works directly with schools, SMEs, government agencies, and NGOs to deliver practical cyber safety education. Our programmes are curriculum-aligned, delivered by certified trainers, and adapted to the Ugandan context."),
      block("For schools, we offer a five-day intensive covering: online safety and privacy, recognising misinformation, safe social media use, password hygiene, and what to do when something goes wrong online."),
      block("For SMEs, our two-week programme covers: securing business communications, protecting customer data, basic incident response, and PDPA compliance essentials."),
      block("Impact So Far"),
      block("In 2025, we trained over 2,400 learners across 18 institutions in Kampala, Wakiso, and Mbarara districts. 94% of participants reported increased confidence in recognising online threats after completing the programme."),
      block("If your school or organisation is interested in our literacy programmes, visit traverseminds.ug/literacy or contact hello@traverseminds.ug."),
    ],
    tags: ["digital-literacy", "education", "uganda", "cyber-safety", "schools"],
  },
];

for (const p of posts) {
  const doc = await upsert({
    _id: p._id,
    _type: "post",
    title: p.title,
    slug: { _type: "slug", current: p.slug },
    author: { _type: "reference", _ref: "team-christine" },
    division: p.division,
    publishedAt: p.publishedAt,
    readTime: p.readTime,
    excerpt: p.excerpt,
    featuredImage: p.image,
    body: p.body,
    tags: p.tags,
  });
  console.log("  post:", doc._id);
}

// ─── research reports ─────────────────────────────────────────────────────────

console.log("\n[5/6] Seeding research reports...");

const reports = [
  {
    _id: "report-cybersecurity-east-africa-2026",
    title: "State of Cybersecurity in East Africa 2026",
    slug: "state-of-cybersecurity-east-africa-2026",
    abstract: "A comprehensive assessment of the cybersecurity landscape across Uganda, Kenya, Tanzania, Rwanda, and Burundi. Examines threat actors, regulatory frameworks, institutional capacity, and priority recommendations for governments and private sector.",
    topics: ["cybersecurity", "civic-tech"],
    publicationDate: "2026-01-01",
    image: imgs["div-cybersecurity"],
    countryCoverage: ["uganda", "kenya", "tanzania", "rwanda", "burundi"],
  },
  {
    _id: "report-uganda-pdpa-implementation",
    title: "Uganda PDPA 2019: Implementation Challenges and Recommendations",
    slug: "uganda-pdpa-implementation-challenges-2025",
    abstract: "Three years after the Uganda Data Protection and Privacy Act came into force, this report examines compliance rates across sectors, enforcement actions taken by the Personal Data Protection Office, and makes 12 concrete recommendations for strengthening implementation.",
    topics: ["data-protection", "ai-governance"],
    publicationDate: "2025-11-15",
    image: imgs["div-think-tank"],
    countryCoverage: ["uganda"],
  },
  {
    _id: "report-open-government-great-lakes",
    title: "Open Government Data in the Great Lakes Region",
    slug: "open-government-data-great-lakes-2025",
    abstract: "An analysis of open government data policies and practices across Uganda, Kenya, Rwanda, and Burundi. Benchmarks against OGP commitments, identifies gaps in public data accessibility, and recommends a regional framework for interoperable open data.",
    topics: ["open-gov", "civic-tech"],
    publicationDate: "2025-09-30",
    image: imgs["think-tank-photo"],
    countryCoverage: ["uganda", "kenya", "rwanda", "burundi"],
  },
];

for (const r of reports) {
  const doc = await upsert({
    _id: r._id,
    _type: "report",
    title: r.title,
    slug: { _type: "slug", current: r.slug },
    abstract: r.abstract,
    authors: [{ _type: "reference", _ref: "author-christine", _key: Math.random().toString(36).slice(2) }],
    topics: r.topics,
    publicationDate: r.publicationDate,
    featuredImage: r.image,
    countryCoverage: r.countryCoverage,
  });
  console.log("  report:", doc._id);
}

// ─── events ───────────────────────────────────────────────────────────────────

console.log("\n[5b] Seeding events...");

const events = [
  {
    _id: "event-cyber-luncheon-june-2026",
    title: "Cyber Luncheon Kampala — June 2026",
    slug: "cyber-luncheon-kampala-june-2026",
    type: "luncheon",
    date: "2026-06-26T12:00:00Z",
    endDate: "2026-06-26T15:00:00Z",
    location: "Kampala, Uganda",
    description: [
      block("Join Uganda's senior cybersecurity, banking, and government leaders for the Traverse Minds Cyber Luncheon — the region's premier intimate gathering for decision-makers shaping Africa's digital security posture."),
      block("This invitation-only luncheon brings together CISOs, CTOs, regulators, and policy leaders to discuss the most pressing cybersecurity challenges and opportunities facing East Africa's institutions in 2026."),
      block("Topics for discussion include: Bank of Uganda cybersecurity regulations update, AI-powered threat detection for African institutions, Building a national cyber incident response capability, and Public-private partnerships in digital security."),
    ],
    image: imgs["events-photo"],
    capacity: 60,
    isFeatured: true,
    isPast: false,
  },
  {
    _id: "event-think-tank-symposium-2026",
    title: "Think Tank Symposium: Digital Governance in Africa",
    slug: "think-tank-symposium-digital-governance-2026",
    type: "conference",
    date: "2026-09-18T09:00:00Z",
    endDate: "2026-09-18T17:00:00Z",
    location: "Kampala, Uganda",
    description: [
      block("The Traverse Minds Think Tank Symposium brings together researchers, policymakers, civil society, and technologists to discuss critical questions in African digital governance."),
      block("Themes include: AI governance frameworks for Africa, Data protection enforcement in practice, Public records accessibility and the right to information, and Open government data as economic infrastructure."),
    ],
    image: imgs["think-tank-photo"],
    capacity: 150,
    isFeatured: false,
    isPast: false,
  },
];

for (const e of events) {
  const doc = await upsert({
    _id: e._id,
    _type: "event",
    title: e.title,
    slug: { _type: "slug", current: e.slug },
    type: e.type,
    date: e.date,
    endDate: e.endDate,
    location: e.location,
    description: e.description,
    thumbnail: e.image,
    capacity: e.capacity,
    isFeatured: e.isFeatured,
    isPast: e.isPast,
  });
  console.log("  event:", doc._id);
}

// ─── programmes ───────────────────────────────────────────────────────────────

console.log("\n[5c] Seeding digital literacy programmes...");

const programmes = [
  {
    _id: "prog-cyber-safety-schools",
    title: "Cyber Safety for Schools",
    slug: "cyber-safety-for-schools",
    image: imgs["digital-literacy"],
    audience: "schools",
    format: "in-person",
    level: "beginner",
    duration: "5 days",
    description: "A five-day curriculum-aligned programme delivered directly to secondary schools across Uganda. Covers online safety, privacy, misinformation, password hygiene, safe social media use, and what to do when something goes wrong online. Delivered by certified trainers in a language students understand.",
    isActive: true,
    nextCohortDate: "2026-07-14",
    maxEnrolments: 200,
  },
  {
    _id: "prog-digital-security-smes",
    title: "Digital Security for SMEs",
    slug: "digital-security-for-smes",
    image: imgs["div-literacy"],
    audience: "smes",
    format: "hybrid",
    level: "intermediate",
    duration: "2 weeks",
    description: "A two-week hybrid programme designed for small and medium enterprises. Covers securing business communications, protecting customer data, basic incident response, PDPA compliance essentials, and building a security-conscious team culture. Includes a business security audit.",
    isActive: true,
    nextCohortDate: "2026-08-04",
    maxEnrolments: 30,
  },
  {
    _id: "prog-govt-cyber-awareness",
    title: "Government Cyber Awareness Programme",
    slug: "government-cyber-awareness-programme",
    image: imgs["tra-photo"],
    audience: "government",
    format: "in-person",
    level: "intermediate",
    duration: "3 days",
    description: "A tailored three-day intensive for government agencies and public institutions. Covers identifying phishing and social engineering, securing official communications, safe use of government systems, data handling obligations under Uganda PDPA, and incident reporting procedures. Can be delivered on-site at your ministry or agency.",
    isActive: true,
    nextCohortDate: "2026-07-07",
    maxEnrolments: 50,
  },
];

for (const p of programmes) {
  const doc = await upsert({
    _id: p._id,
    _type: "programme",
    title: p.title,
    slug: { _type: "slug", current: p.slug },
    featuredImage: p.image,
    audience: p.audience,
    format: p.format,
    level: p.level,
    duration: p.duration,
    description: p.description,
    isActive: p.isActive,
    nextCohortDate: p.nextCohortDate,
    maxEnrolments: p.maxEnrolments,
  });
  console.log("  programme:", doc._id);
}

// ─── job listings ─────────────────────────────────────────────────────────────

console.log("\n[6/6] Seeding job listings...");

const jobs = [
  {
    _id: "job-senior-security-analyst",
    title: "Senior Security Analyst",
    division: "security",
    type: "full-time",
    location: "Kampala, Uganda",
    description: "We are looking for a Senior Security Analyst to join Traverse Security. You will lead penetration testing engagements, conduct vulnerability assessments for financial institutions and government clients, and support ISO 27001 and Bank of Uganda compliance audits.\n\nRequirements:\n- 4+ years of hands-on penetration testing experience\n- OSCP, CEH, or equivalent certification\n- Experience with African regulatory frameworks (Bank of Uganda, Uganda PDPA) is a strong advantage\n- Excellent written and verbal communication skills\n- Ability to produce clear, actionable security reports for non-technical audiences\n\nWhat we offer:\n- Competitive compensation\n- Exposure to high-profile clients across East Africa\n- Training and certification support\n- A mission-driven team building for the continent",
    deadline: "2026-07-31",
    isActive: true,
    hiringManagerEmail: "hello@traverseminds.ug",
  },
  {
    _id: "job-research-associate-thinktank",
    title: "Research Associate — Think Tank",
    division: "thinktank",
    type: "contract",
    location: "Kampala, Uganda (hybrid)",
    description: "The Traverse Minds Think Tank is seeking a Research Associate to support our policy research programme on digital governance, data protection, and civic technology in Africa.\n\nResponsibilities:\n- Conduct primary and secondary research on digital policy topics\n- Draft policy briefs, reports, and working papers\n- Engage with government, civil society, and international partners\n- Support the organisation of the Think Tank Symposium and other convenings\n\nRequirements:\n- Master's degree in law, public policy, international relations, or related field\n- Strong research and writing skills demonstrated through published work or thesis\n- Understanding of African data protection frameworks\n- Fluency in English; French or Swahili is an advantage",
    deadline: "2026-07-15",
    isActive: true,
    hiringManagerEmail: "hello@traverseminds.ug",
  },
  {
    _id: "job-digital-literacy-trainer",
    title: "Digital Literacy Trainer",
    division: "literacy",
    type: "contract",
    location: "Kampala, Uganda (field-based)",
    description: "Traverse Digital Literacy is hiring certified trainers to deliver our cyber safety curriculum to schools, SMEs, and government agencies across Uganda.\n\nResponsibilities:\n- Deliver 3–5 day training programmes at client sites\n- Adapt materials to the specific needs of each audience\n- Facilitate interactive sessions and hands-on exercises\n- Submit training reports and participant feedback\n\nRequirements:\n- Degree in education, IT, computer science, or related field\n- Prior experience in training delivery or facilitation\n- Basic cybersecurity knowledge (certification is an advantage)\n- Excellent interpersonal and presentation skills\n- Willingness to travel within Uganda",
    deadline: "2026-08-15",
    isActive: true,
    hiringManagerEmail: "hello@traverseminds.ug",
  },
];

for (const j of jobs) {
  const doc = await upsert({
    _id: j._id,
    _type: "jobListing",
    title: j.title,
    division: j.division,
    type: j.type,
    location: j.location,
    description: j.description,
    deadline: j.deadline,
    isActive: j.isActive,
    hiringManagerEmail: j.hiringManagerEmail,
  });
  console.log("  job:", doc._id);
}

console.log("\nSeed complete.\n");
