export const dynamic = "force-static";

export async function GET() {
  // TODO: Replace with Sanity CMS data
  const posts = [
    {
      title: "The Top 5 Cyber Threats Facing Ugandan Banks in 2026",
      slug: "top-5-cyber-threats-ugandan-banks-2026",
      excerpt: "From ransomware to insider threats, the most pressing cybersecurity risks facing Uganda's financial sector.",
      date: "2026-03-12",
    },
    {
      title: "What We Learned at the First Cyber Luncheon Kampala",
      slug: "first-cyber-luncheon-kampala",
      excerpt: "Thirty cybersecurity professionals gathered for our inaugural Cyber Luncheon. Here's what they discussed.",
      date: "2026-03-08",
    },
    {
      title: "A Plain-English Guide to Uganda's PDPA 2019",
      slug: "plain-english-guide-uganda-pdpa-2019",
      excerpt: "Uganda's data protection law explained in plain language for organisations that need to comply.",
      date: "2026-03-01",
    },
  ];

  const siteUrl = "https://traverseminds.ug";

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Traverse Minds Africa Blog</title>
    <link>${siteUrl}/blog</link>
    <description>Cybersecurity analysis, event recaps, policy explainers, and data-driven research from Traverse Minds Africa.</description>
    <language>en</language>
    <atom:link href="${siteUrl}/blog/rss.xml" rel="self" type="application/rss+xml"/>
    ${posts
      .map(
        (post) => `
    <item>
      <title>${post.title}</title>
      <link>${siteUrl}/blog/${post.slug}</link>
      <guid>${siteUrl}/blog/${post.slug}</guid>
      <description>${post.excerpt}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`
      )
      .join("")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
