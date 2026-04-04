# Traverse Minds UG — Step-by-Step Build Plan

> **Rule:** Nothing proceeds until the current step is fully complete and signed off.
> One step. One focus. No multitasking across divisions.

---

## The Principle

Every great company that looks like it does many things well
started by doing **one thing** so well it was impossible to ignore.

Traverse Minds has six divisions. The website will eventually have eleven pages.
None of that matters yet. What matters is:

- What generates the first shilling of revenue or the first committed relationship?
- What proves the model is real — not just on paper?

That is Step 1. Everything else is Steps 2–10.

---

## Before Anything: Foundation (Step 0)

**Status: Must be complete before any division work begins.**

This is the infrastructure that every other step depends on.
It is not glamorous. Do it once, do it right.

### 0.1 Domain & Hosting

- [ ] Confirm `traverseminds.ug` domain is active and pointing correctly
- [ ] Create GitHub repository (private, `traverseminds-web`)
- [ ] Create Vercel project connected to GitHub repo
- [ ] Set up Cloudflare in front of Vercel (DNS, CDN, SSL)
- [ ] Confirm site loads at `https://traverseminds.ug` (even a placeholder page)

### 0.2 Design Tokens

Before writing a single line of page code, lock these in:

- [ ] Colour palette confirmed (green `#0D3B2E`, amber `#E8912A`, off-white `#F6F4EF`)
- [ ] Typography confirmed (DM Serif Display for headings, IBM Plex Sans for body)
- [ ] Tailwind config file written with all tokens
- [ ] One component built and approved: the Button
- [ ] One component built and approved: the Navigation bar (desktop + mobile)

### 0.3 Sanity CMS

- [ ] Sanity project created and connected to Next.js
- [ ] Studio accessible at `traverseminds.ug/studio`
- [ ] At least one non-technical team member can log in and create a post

### 0.4 Email Infrastructure

- [ ] Resend account created, domain verified (`@traverseminds.ug`)
- [ ] Test email sends successfully from `hello@traverseminds.ug`
- [ ] HubSpot free CRM set up with one pipeline: **Enquiries**

### 0.5 Legal Minimum

- [ ] Privacy Policy drafted (reference Uganda PDPA 2019)
- [ ] Privacy Policy page live at `/privacy`
- [ ] Cookie consent banner implemented

**Step 0 is DONE when:** The site loads, emails send, CMS works,
and a non-developer can add content without asking for help.

---

## Step 1 — Choose Your Lead Division

**This is the most important decision in the entire build.**

Pick the one division that can produce a real outcome
(cash, signed commitment, or undeniable traction) within 60 days.

### Option A: Traverse Security

**Choose this if:** You have at least 2–3 warm leads —
people who have verbally expressed interest in a security audit,
penetration test, or compliance review.

**What "done" looks like:**

- `/security` page live with all 6 services described
- Enquiry form working and routing to HubSpot
- Capability statement PDF downloadable (email-gated)
- At least 1 discovery call booked through the site

**Time to complete:** 2–3 weeks

---

### Option B: Cyber Luncheon (Events)

**Choose this if:** You know at least 10–15 people in Kampala
(CISOs, tech leads, regulators, founders) who would attend
an intimate, high-quality lunch discussion about cyber threats.

**What "done" looks like:**

- `/events/cyber-luncheon` page live
- Event date, venue, and agenda confirmed
- RSVP form working
- 20+ confirmed RSVPs from the right people
- At least 1 sponsor or co-host confirmed

**Time to complete:** 2–3 weeks (website) + event planning in parallel

---

### Option C: Public Record EA (Waitlist)

**Choose this if:** You have direct relationships with journalists,
law firms, researchers, or government staff who have explicitly
said they would pay for better access to public documents.

**What "done" looks like:**

- `/public-record` landing page live (no backend product yet)
- Waitlist form live with persona selector
- 100+ waitlist signups from genuine target users
- At least 3 user interviews conducted with waitlist signups

**Time to complete:** 1–2 weeks for the page

---

### Option D: Think Tank (Credibility)

**Choose this if:** You have a near-complete research report
ready to publish, or a confirmed relationship with a donor,
OGP partner, or government ministry.

**What "done" looks like:**

- `/think-tank` page live
- First full research report published and downloadable
- Report shared with at least 50 target readers
- At least 1 media mention or expert citation

**Time to complete:** 3–4 weeks (page + report formatting)

---

## Step 2 — Homepage

**Only begins after Step 1 is complete.**

The homepage is not a starting point — it is a summary of
what already exists. Building it before Step 1 is done means
building a shop window for an empty shop.

### What the homepage must do at this stage

It only needs to reflect whatever Step 1 produced.
If Step 1 was Security: the homepage leads with Security.
If Step 1 was the Cyber Luncheon: the homepage leads with the event.

### Sections to build (in this order)

1. **Navigation** — already built in Step 0
2. **Hero** — headline, sub-headline, 1 primary CTA linking to Step 1 page
3. **What we do** — 3–4 sentence paragraph, no division grid yet
4. **The one thing** — feature block for your Step 1 division
5. **Newsletter signup** — single email field, above footer
6. **Footer** — links, social, legal

### What is NOT on the homepage yet

- Division grid (other 5 divisions don't exist yet)
- Podcast section (Media not built yet)
- Think Tank reports (Think Tank not built yet)
- Trust logo strip (earn the logos first)
- Team photos (About page not built yet)

**Step 2 is DONE when:** A stranger lands on the homepage,
understands in 8 seconds what Traverse Minds does,
and knows exactly what to click next.

---

## Step 3 — About Page

**Only begins after Step 2 is complete.**

This page closes the trust gap. Institutional buyers —
banks, government agencies, international donors —
will always visit `/about` before making contact.

### Sections to build

1. Mission statement (large type, DM Serif)
2. The model — explain why one company, six divisions (even if only 1–2 are live)
3. Founding story — honest, specific, Kampala-rooted
4. Team — real photos, real bios, real LinkedIn links
5. Legal / registration details (company number, registered address)
6. CTA — book an intro call (Calendly embed)

### What is NOT on the About page yet

- Partner/client logos (earn them first)
- Division ecosystem diagram (too early — only 1 division is live)

**Step 3 is DONE when:** A Bank of Uganda procurement officer
reads this page and decides Traverse Minds is a serious company
worth meeting.

---

## Step 4 — Contact Page

**Only begins after Step 3 is complete.**

Simple. No distractions.

### What to build

1. Smart enquiry form:
   - Name, organisation, email, phone
   - Division selector (only show divisions that are live)
   - Message / brief
   - Consent checkbox (PDPA)
2. WhatsApp click-to-chat link (essential — more effective than email in Uganda)
3. Office location (even if it's a co-working space address)
4. Response time commitment ("We respond within 1 business day")

### Functions

- [ ] Form submits to Resend (email notification) + HubSpot (deal created)
- [ ] Auto-reply sent to enquirer with confirmation and next steps
- [ ] WhatsApp link opens pre-filled message

**Step 4 is DONE when:** You have received and responded to
at least 3 real enquiries through the form.

---

## Step 5 — Second Division

**Only begins after Steps 1–4 are complete and producing results.**

Choose the next division based on what Step 1 taught you:

- If Security generated clients → add Events (Cyber Luncheon) to bring those clients together
- If Events generated community → add Security or Think Tank to monetise that community
- If Public Record EA generated waitlist signups → start building the actual product
- If Think Tank generated credibility → add Security to convert that credibility into revenue

### The pattern for every new division page

1. Write the content first (in a Google Doc) — get it approved before touching code
2. Build the page in Next.js using existing components where possible
3. Add the new Sanity schema if needed
4. Test the form/function end-to-end (form → email → HubSpot)
5. Update the homepage to include the division
6. Update the navigation mega-menu
7. Publish

**Step 5 is DONE when:** The second division page is live,
its primary function works, and it has produced at least 1 real outcome.

---

## Step 6 — Blog

**Only begins after at least 2 divisions are live.**

The blog is the SEO engine. It has no value until there is
something worth writing about — which only exists after Step 1–5.

### Minimum viable blog at launch

- 3 seed articles (one per active division)
- Each article: 800–1,200 words, real data, original analysis
- Each article: properly tagged, SEO title + description set in Sanity
- RSS feed at `/blog/rss.xml`

### What makes a good first article for each division

| Division | First article topic |
| --- | --- |
| Security | "The top 5 cyber threats facing Ugandan banks in 2026" |
| Events | "What we learned at the first Cyber Luncheon Kampala" |
| Public Record EA | "Why Uganda's public data is scattered — and what we're doing about it" |
| Literacy | "The most common phishing attacks targeting Ugandan SMEs" |
| Think Tank | "A plain-English guide to Uganda's PDPA 2019" |
| Media | "Why we started a podcast about East African policy data" |

**Step 6 is DONE when:** All 3 seed articles are published,
indexed by Google Search Console, and at least 1 has been
shared externally (LinkedIn, WhatsApp, newsletter).

---

## Step 7 — Remaining Divisions

**Built one at a time, in order of strategic priority.**

Use the same pattern from Step 5 for each:

### Remaining divisions (in likely order)

1. **Traverse Media / Podcast** — requires at least 1 recorded episode before the page launches
2. **Digital Literacy** — requires at least 1 confirmed programme before the page launches
3. **Think Tank** — requires at least 1 completed, reviewed report before the page launches

> Never build a division page for something that doesn't exist yet.
> A page for a product with no product destroys credibility faster
> than having no page at all.

---

## Step 8 — Careers Page

**Only after the company has something real to offer.**

A careers page before you have real work to show is a red flag —
it signals ambition without evidence.

Launch the careers page when:

- [ ] At least 3 divisions are live and producing real outcomes
- [ ] You have at least 1 genuine open role to fill
- [ ] The company culture section can reference real things that happened

---

## Step 9 — SEO & Analytics Hardening

**After all core pages are live.**

This is not glamorous but it compounds. An hour spent on this
in Month 3 pays dividends for 3 years.

- [ ] Google Search Console set up and sitemap submitted
- [ ] PostHog analytics installed (event tracking on all forms and CTAs)
- [ ] All pages have unique meta titles and descriptions (set in Sanity)
- [ ] All blog posts and reports have structured data (Article, BlogPosting)
- [ ] All events have structured data (Event schema)
- [ ] Core Web Vitals passing: LCP < 2.5s, CLS < 0.1
- [ ] Google Business Profile created and verified (Kampala)

---

## Step 10 — Public Record EA Product

**Separate from the website. Only after:**

- The waitlist has 200+ genuine signups
- At least 3 user interviews confirm willingness to pay
- Legal opinion obtained on data aggregation per country
- A developer is fully available (not the same person building the main site)

The product launches at `records.traverseminds.ug` —
it is a separate application, not a page on the main site.

---

## What "Finished" Means for Each Step

| Step | Finished when |
| --- | --- |
| 0 — Foundation | Site loads, emails send, CMS works, privacy policy live |
| 1 — Lead Division | Page live + primary function working + 1 real outcome produced |
| 2 — Homepage | Stranger understands the company in 8 seconds |
| 3 — About | Institutional buyer trusts the company after reading it |
| 4 — Contact | 3 real enquiries received and responded to |
| 5 — Second Division | Page live + function working + 1 real outcome |
| 6 — Blog | 3 articles published, indexed, shared externally |
| 7 — Remaining Divisions | Each built only when the real-world thing exists |
| 8 — Careers | At least 1 genuine open role posted |
| 9 — SEO Hardening | GSC live, all structured data passing, CWV green |
| 10 — Public Record EA | 200+ waitlist + legal clearance + dedicated developer |

---

## The Non-Negotiable Rules

1. **No step begins before the previous step is signed off.**
2. **No division page launches without a real product or service behind it.**
3. **No team page without real photos of real people.**
4. **No trust logos without permission from those organisations.**
5. **No blog post without original data or original analysis.**
6. **No Public Record EA product without legal clearance per country.**
7. **WhatsApp is always the primary contact method. Email is secondary.**

---

## Current Status (March 2026)

| Item | Status |
| --- | --- |
| Vision & strategy | Complete |
| Master plan document | Complete |
| Domain (traverseminds.ug) | Registered (503 — not yet live) |
| Step 0 — Foundation | Not started |
| Step 1 — Lead Division | Not decided |
| Everything else | Waiting |

---

**Next action:** Decide Step 1.
Pick the division. Define what "done" looks like for it.
Start nothing else until that decision is made.

---

*Traverse Minds UG · Built for Africa · Driven by Evidence*
*Kampala, Uganda · traverseminds.ug*
