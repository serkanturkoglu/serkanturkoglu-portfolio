import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { VimeoEmbed } from "@/components/VimeoEmbed";
import { CATEGORY_LABELS, about } from "@/data/siteContent";
import { getAllProjects, getProjectBySlug, getProjectSlug } from "@/lib/content";
import { resolveProject } from "@/lib/resolve-project";

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: getProjectSlug(project) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  const resolved = await resolveProject(project);
  const title = `${resolved.title} — ${about.name}`;
  const url = `/work/${resolved.slug}`;

  return {
    title,
    description: resolved.description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: resolved.description,
      url,
      images: resolved.thumbnailUrl ? [resolved.thumbnailUrl] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: resolved.description,
      images: resolved.thumbnailUrl ? [resolved.thumbnailUrl] : undefined,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const resolved = await resolveProject(project);

  const info: { label: string; value: string }[] = [
    { label: "Category", value: CATEGORY_LABELS[resolved.category] },
    { label: "Year", value: String(resolved.year) },
    ...(resolved.client ? [{ label: "Client", value: resolved.client }] : []),
    ...(resolved.role ? [{ label: "Role", value: resolved.role }] : []),
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-36 md:px-10 md:pb-32 md:pt-44">
      <Link
        href="/work"
        className="mb-10 inline-block text-xs font-medium uppercase tracking-[0.18em] text-muted transition-all duration-200 hover:text-foreground active:scale-95"
      >
        ← All Work
      </Link>

      <h1 className="font-display max-w-3xl text-3xl font-bold leading-[1.05] sm:text-4xl sm:leading-[0.95] md:text-6xl">
        {resolved.title}
      </h1>

      <div className="mt-12">
        <VimeoEmbed
          vimeoId={resolved.vimeoId}
          vimeoHash={resolved.vimeoHash}
          title={resolved.title}
          seed={resolved.slug}
        />
      </div>

      <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-[1fr_280px]">
        <p className="max-w-2xl text-lg leading-relaxed text-muted">
          {resolved.description}
        </p>

        <dl className="flex flex-col gap-5 border-t border-border pt-6 md:border-t-0 md:border-l md:pl-10 md:pt-0">
          {info.map((item) => (
            <div key={item.label}>
              <dt className="text-xs uppercase tracking-[0.16em] text-muted">
                {item.label}
              </dt>
              <dd className="mt-1 text-sm">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
