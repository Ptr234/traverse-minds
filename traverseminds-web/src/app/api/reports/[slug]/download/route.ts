import { NextRequest, NextResponse } from "next/server";
import { sanityClient } from "@/sanity/client";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const report = await sanityClient.fetch<{ title: string; pdfUrl: string } | null>(
    `*[_type == "report" && slug.current == $slug][0]{
      title,
      "pdfUrl": pdfFile.asset->url
    }`,
    { slug }
  );

  if (!report?.pdfUrl) {
    return NextResponse.json({ error: "Report not found" }, { status: 404 });
  }

  const upstream = await fetch(report.pdfUrl);
  if (!upstream.ok) {
    return NextResponse.json({ error: "Failed to fetch PDF" }, { status: 502 });
  }

  const filename = `${report.title.replace(/[^a-zA-Z0-9\s-]/g, "").trim().replace(/\s+/g, "-")}-Traverse-Minds.pdf`;

  return new NextResponse(upstream.body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "public, max-age=86400",
    },
  });
}
