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
    <div className="card-hover group overflow-hidden rounded-xl border border-light-border bg-light-card">
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image src={photo} alt={`${name}, ${title}`} fill className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
      </div>
      <div className="p-4">
        <h3 className="font-display text-lg text-brand-green">{name}</h3>
        <p className="text-sm text-brand-medium">{title}</p>
        <p className="mt-1 text-xs font-medium uppercase tracking-wider text-brand-amber">{division}</p>
        {linkedIn && (
          <a href={linkedIn} target="_blank" rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-sm text-brand-muted hover:text-brand-amber transition-colors"
            aria-label={`${name} on LinkedIn`}>
            <Linkedin className="h-4 w-4" /> LinkedIn
          </a>
        )}
      </div>
    </div>
  );
}
