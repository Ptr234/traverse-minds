import Image from "next/image";
import { Linkedin } from "lucide-react";

interface TeamCardProps {
  name: string;
  title: string;
  division: string;
  photo: string;
  linkedIn?: string;
}

export function TeamCard({ name, title, division, photo, linkedIn }: TeamCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border-light bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-elevated">
      <div className="relative aspect-3/4 overflow-hidden">
        <Image
          src={photo}
          alt={`${name}, ${title}`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Hover overlay content */}
        {linkedIn && (
          <a
            href={linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 text-primary opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-accent hover:text-white"
            aria-label={`${name} on LinkedIn`}
          >
            <Linkedin className="h-4 w-4" />
          </a>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-display text-lg font-bold text-primary">{name}</h3>
        <p className="text-sm text-brand-medium/60">{title}</p>
        <p className="mt-2 inline-block rounded-full bg-accent/10 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent">
          {division}
        </p>
      </div>
    </div>
  );
}
