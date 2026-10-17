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
    <div className="group">
      <div className="relative aspect-3/4 overflow-hidden">
        <Image
          src={photo}
          alt={`${name}, ${title}`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>

      <div className="pt-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-display text-lg font-bold text-primary">{name}</h3>
          {linkedIn && (
            <a
              href={linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-medium hover:text-accent transition-colors"
              aria-label={`${name} on LinkedIn`}
            >
              <Linkedin className="h-4 w-4" />
            </a>
          )}
        </div>
        <p className="text-sm text-brand-medium/60">{title}</p>
        <p className="mt-2 inline-block rounded-full bg-accent/10 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent">
          {division}
        </p>
      </div>
    </div>
  );
}
