import Image from "next/image";
import Link from "next/link";
import { CATEGORY_LABELS } from "@/data/siteContent";
import type { ResolvedProject } from "@/lib/resolve-project";
import { placeholderGradient } from "@/lib/placeholder";

export function ProjectCard({ project }: { project: ResolvedProject }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block transition-transform duration-150 ease-out focus-visible:outline-none active:scale-[0.98]"
    >
      <div
        className="relative aspect-[16/10] overflow-hidden rounded-sm"
        style={
          project.thumbnailUrl
            ? undefined
            : { background: placeholderGradient(project.slug) }
        }
      >
        {project.thumbnailUrl ? (
          <Image
            src={project.thumbnailUrl}
            alt=""
            fill
            quality={90}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <span className="grain" />
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-foreground/25 transition-all duration-300 ease-out group-hover:scale-110 group-hover:border-foreground/60">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 translate-x-px fill-foreground/70"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-lg font-semibold leading-tight transition-colors duration-200 group-hover:text-foreground">
            {project.title}
          </h3>
          <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted">
            {CATEGORY_LABELS[project.category]}
            {project.client ? ` — ${project.client}` : ""}
          </p>
        </div>
        <span className="shrink-0 text-xs uppercase tracking-[0.14em] text-muted">
          {project.year}
        </span>
      </div>
    </Link>
  );
}
