import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const divisionColors: Record<string, string> = {
  security: "bg-[#0D3B2E]",
  events: "bg-[#E8912A]",
  ai: "bg-[#185FA5]",
  literacy: "bg-[#3B6D11]",
  media: "bg-[#E05C3A]",
  thinktank: "bg-[#0F6E56]",
};

const divisionLabels: Record<string, string> = {
  security: "Security",
  events: "Events",
  ai: "Public Record Africa",
  literacy: "Literacy",
  media: "Media",
  thinktank: "Think Tank",
};

interface PostCardProps {
  title: string;
  slug: string;
  excerpt: string;
  division: string;
  date: string;
  readTime: string;
  image: string;
  author: { name: string; photo: string };
}

export function PostCard({ title, slug, excerpt, division, date, readTime, image, author }: PostCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group flex flex-col overflow-hidden border bg-white"
      style={{ borderRadius: 8, borderColor: "rgba(0,0,0,0.1)", transition: "all 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)", boxShadow: "0 4px 8px 0 rgba(0,0,0,0.1), 0 2px 2px 0 rgba(0,0,0,0.15), 0 1px 0 0 rgba(0,0,0,0.05)" }}
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-white/80 to-transparent" />

        {/* Division pill */}
        <span className={`absolute left-4 top-4 px-3 py-1 text-xs font-semibold text-white ${divisionColors[division] || "bg-accent"}`} style={{ borderRadius: 999 }}>
          {divisionLabels[division] || division}
        </span>

        {/* Title overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="font-display text-lg leading-snug md:text-xl" style={{ color: "#000" }}>{title}</h3>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col bg-white p-5">
        <p className="line-clamp-2 text-sm leading-relaxed" style={{ color: "#515459" }}>{excerpt}</p>

        {/* Author + meta */}
        <div className="mt-auto flex items-center justify-between pt-4">
          <div className="flex items-center gap-2">
            <div className="relative h-7 w-7 overflow-hidden rounded-full">
              <Image src={author.photo} alt={author.name} fill className="object-cover" sizes="28px" />
            </div>
            <span className="text-xs" style={{ color: "#515459" }}>{author.name}</span>
          </div>
          <div className="flex items-center gap-3 text-xs" style={{ color: "#919499" }}>
            <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{date}</span>
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{readTime}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
