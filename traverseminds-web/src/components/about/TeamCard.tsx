import Image from "next/image";
import { Linkedin } from "lucide-react";
import { Kicker } from "@/components/magazine/primitives";

interface TeamCardProps {
  name: string;
  title: string;
  division: string;
  photo: string;
  linkedIn?: string;
}

/** Portrait on top, name and role below (magazine card). */
export function TeamCard({ name, title, division, photo, linkedIn }: TeamCardProps) {
  return (
    <article className="group">
      <div className="tech-card relative aspect-4/5 overflow-hidden bg-gn-800">
        <Image
          src={photo}
          alt={`${name}, ${title}`}
          fill
          className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>
      {division && <Kicker className="mt-4">{division}</Kicker>}
      <div className="mt-1.5 flex items-start justify-between gap-3">
        <h3 className="font-serif text-[21px] font-semibold leading-tight text-black">{name}</h3>
        {linkedIn && (
          <a
            href={linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 text-gn-400 transition-colors hover:text-accent"
            aria-label={`${name} on LinkedIn`}
          >
            <Linkedin className="h-4 w-4" />
          </a>
        )}
      </div>
      <p className="mt-1 text-[15px] text-gn-400">{title}</p>
    </article>
  );
}
