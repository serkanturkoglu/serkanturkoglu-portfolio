import type { Metadata } from "next";
import { WorkGrid } from "@/components/WorkGrid";
import { about } from "@/data/siteContent";
import { getAllProjects } from "@/lib/content";
import { resolveProjects } from "@/lib/resolve-project";

const title = `Work — ${about.name}`;
const description = "Music videos, commercials, and fashion films.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/work" },
  openGraph: { title, description, url: "/work" },
  twitter: { card: "summary_large_image", title, description },
};

export default async function WorkPage() {
  const resolved = await resolveProjects(getAllProjects());

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-36 md:px-10 md:pb-32 md:pt-44">
      <div className="mb-16 max-w-2xl">
        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted">
          Work
        </p>
        <h1 className="font-display text-3xl font-bold leading-[0.95] md:text-5xl">
          Music videos, commercials, and fashion films.
        </h1>
      </div>

      <WorkGrid projects={resolved} />
    </div>
  );
}
