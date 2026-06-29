import type { ResolvedProject } from "@/lib/resolve-project";

export interface HighlightClip {
  vimeoId: string;
  /** Seconds into the video where the hero montage should start playing. */
  start: number;
  thumbnailUrl?: string;
}

/**
 * Picks a starting point roughly in the middle of the video instead of
 * frame one, since intros/logos rarely make a good loop for a background
 * reel. Falls back to the very start if the duration isn't known yet.
 */
export function computeClipStart(durationSeconds: number | undefined, clipLength = 6): number {
  if (!durationSeconds || durationSeconds <= clipLength) return 0;
  return Math.max(0, Math.round(durationSeconds / 2 - clipLength / 2));
}

/**
 * Builds the hero montage playlist from whichever featured projects already
 * have a Vimeo link. Add a `vimeoUrl` to a featured project and it joins
 * the rotation automatically — no other code to touch.
 */
export function buildHighlightClips(projects: ResolvedProject[]): HighlightClip[] {
  return projects
    .filter((project): project is ResolvedProject & { vimeoId: string } =>
      Boolean(project.vimeoId)
    )
    .map((project) => ({
      vimeoId: project.vimeoId,
      start: computeClipStart(project.durationSeconds),
      thumbnailUrl: project.thumbnailUrl,
    }));
}
