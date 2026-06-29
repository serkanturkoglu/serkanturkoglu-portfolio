"use client";

import { useLayoutEffect, useMemo, useState } from "react";
import {
  CATEGORY_LABELS,
  CATEGORY_ORDER,
  type ProjectCategory,
} from "@/data/siteContent";
import type { ResolvedProject } from "@/lib/resolve-project";
import { ProjectCard } from "@/components/ProjectCard";

type Filter = "all" | ProjectCategory;

function isCategory(value: string): value is ProjectCategory {
  return (CATEGORY_ORDER as string[]).includes(value);
}

export function WorkGrid({ projects }: { projects: ResolvedProject[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  // Lets header dropdown links like /work#music-video land on the right
  // tab. This is a one-time sync from the URL (a client-only external
  // source the server can't see), not state derived from props/render, so
  // the setState-in-effect lint rule doesn't apply here.
  useLayoutEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (isCategory(hash)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFilter(hash);
    }
  }, []);

  const filtered = useMemo(
    () =>
      filter === "all"
        ? projects
        : projects.filter((project) => project.category === filter),
    [projects, filter]
  );

  const tabs: { id: Filter; label: string }[] = [
    { id: "all", label: "All" },
    ...CATEGORY_ORDER.map((category) => ({
      id: category,
      label: CATEGORY_LABELS[category],
    })),
  ];

  return (
    <div>
      <div
        role="tablist"
        aria-label="Filter projects by category"
        className="flex flex-wrap gap-x-8 gap-y-1 border-b border-border pb-6"
      >
        {tabs.map((tab) => {
          const active = tab.id === filter;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(tab.id)}
              className={`py-3 text-xs font-medium uppercase tracking-[0.16em] transition-all duration-200 ease-out active:scale-95 ${
                active
                  ? "border-b border-foreground text-foreground"
                  : "border-b border-transparent text-muted hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="py-20 text-center text-sm uppercase tracking-[0.14em] text-muted">
          No projects in this category yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-x-8 gap-y-14 pt-12 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
