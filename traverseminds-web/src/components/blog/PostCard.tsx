import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";

const divisionColors: Record<string, string> = {
  security: "bg-[#0D3B2E]",
  events: "bg-[#E8912A]",
  "public-record": "bg-[#185FA5]",
  literacy: "bg-[#3B6D11]",
  media: "bg-[#E05C3A]",
  thinktank: "bg-[#0F6E56]",
};

const divisionLabels: Record<string, string> = {
  security: "Security",
  events: "Events",
  "public-record": "Public Record Africa",
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
      className="group flex flex-col"
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
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col pt-4">
        <span className={`self-start px-3 py-1 text-xs font-semibold text-white ${divisionColors[division] || "bg-accent"}`} style={{ borderRadius: 999 }}>
          {divisionLabels[division] || division}
        </span>
        <h3 className="mt-3 font-display text-lg leading-snug md:text-xl" style={{ color: "#000" }}>{title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed" style={{ color: "#515459" }}>{excerpt}</p>

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
