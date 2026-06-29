import type { Project } from "@/data/siteContent";
import { getProjectSlug, resolvePublicImage } from "@/lib/content";
import { fetchVimeoOEmbed, parseVimeoUrl } from "@/lib/vimeo";

export interface ResolvedProject extends Project {
  slug: string;
  /** Local thumbnail if present, otherwise Vimeo's own thumbnail, otherwise undefined (gradient placeholder). */
  thumbnailUrl?: string;
  vimeoId?: string;
  vimeoHash?: string;
  durationSeconds?: number;
}

interface ResolveOptions {
  /** Needed for the homepage showreel's mid-video seek calculation. */
  needsDuration?: boolean;
}

/**
 * Title/description always come from `siteContent.ts` — Vimeo is only
 * consulted for the embed itself, and as a thumbnail/duration fallback so a
 * project with no local thumbnail still gets a real poster image instead of
 * the gradient placeholder.
 */
export async function resolveProject(
  project: Project,
  options: ResolveOptions = {}
): Promise<ResolvedProject> {
  const slug = getProjectSlug(project);
  const localThumbnail = resolvePublicImage(project.thumbnail);
  const parsed = project.vimeoUrl ? parseVimeoUrl(project.vimeoUrl) : null;

  const needsOEmbed = Boolean(project.vimeoUrl) && (!localThumbnail || options.needsDuration);
  const oembed = needsOEmbed ? await fetchVimeoOEmbed(project.vimeoUrl!) : null;

  return {
    ...project,
    slug,
    thumbnailUrl: localThumbnail ?? oembed?.thumbnailUrl,
    vimeoId: parsed?.id,
    vimeoHash: parsed?.hash,
    durationSeconds: oembed?.durationSeconds,
  };
}

export async function resolveProjects(
  list: Project[],
  options: ResolveOptions = {}
): Promise<ResolvedProject[]> {
  return Promise.all(list.map((project) => resolveProject(project, options)));
}
