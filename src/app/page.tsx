import Link from "next/link";
import { HeroReel } from "@/components/HeroReel";
import { ProjectCard } from "@/components/ProjectCard";
import { about } from "@/data/siteContent";
import { getFeaturedProjects } from "@/lib/content";
import { buildHighlightClips } from "@/lib/highlight-clips";
import { resolveProjects } from "@/lib/resolve-project";

const SELECTED_WORK_COUNT = 3;

export default async function HomePage() {
  const selectedProjects = getFeaturedProjects().slice(0, SELECTED_WORK_COUNT);
  const featured = await resolveProjects(selectedProjects, { needsDuration: true });
  const clips = buildHighlightClips(featured);

  return (
    <>
      <section className="relative flex min-h-dvh flex-col justify-end overflow-hidden">
        <HeroReel clips={clips} />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20 pt-40 md:px-10 md:pb-28">
          <p className="mb-6 text-xs uppercase tracking-[0.2em] text-muted">
            {about.role} — {about.location}
          </p>
          <h1
            className="hero-name-shimmer w-fit font-display font-extrabold uppercase leading-[0.98] tracking-tight drop-shadow-[0_12px_30px_rgba(0,0,0,0.55)]"
            style={{ fontSize: "var(--text-display)" }}
          >
            {about.name}
          </h1>

          <div className="mt-10 flex flex-col gap-6 border-t border-border pt-8 md:flex-row md:items-end md:justify-between">
            <p className="max-w-sm text-sm leading-relaxed text-muted">
              {about.shortBio}
            </p>
            <Link
              href="/work"
              className="shrink-0 text-xs font-medium uppercase tracking-[0.18em] underline decoration-border-strong underline-offset-8 transition-all duration-200 hover:decoration-foreground active:scale-[0.97]"
            >
              View All Work
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted">
              Selected Work
            </p>
            <h2 className="font-display max-w-xl text-3xl font-bold leading-[0.95] md:text-4xl">
              Bazı Projeler
            </h2>
          </div>
          <Link
            href="/work"
            className="shrink-0 text-xs font-medium uppercase tracking-[0.18em] text-muted transition-all duration-200 hover:text-foreground active:scale-[0.97]"
          >
            View All Work →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </>
  );
}
