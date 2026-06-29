export interface ParsedVimeoUrl {
  id: string;
  hash?: string;
}

export interface VimeoOEmbed {
  title: string;
  description?: string;
  thumbnailUrl?: string;
  durationSeconds?: number;
}

/**
 * Accepts vimeo.com/123456789, vimeo.com/123456789/abcdef1234 (unlisted
 * videos), or player.vimeo.com/video/123456789?h=abcdef1234.
 */
export function parseVimeoUrl(url: string): ParsedVimeoUrl | null {
  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("player.vimeo.com")) {
      const match = parsed.pathname.match(/\/video\/(\d+)/);
      if (!match) return null;
      return { id: match[1], hash: parsed.searchParams.get("h") ?? undefined };
    }

    if (parsed.hostname.includes("vimeo.com")) {
      const segments = parsed.pathname.split("/").filter(Boolean);
      const id = segments.find((segment) => /^\d+$/.test(segment));
      if (!id) return null;
      const hash = segments.find(
        (segment) => segment !== id && /^[a-zA-Z0-9]+$/.test(segment)
      );
      return { id, hash };
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Fetches the title/thumbnail/description Vimeo already has for a video via
 * its public oEmbed endpoint — no API key needed. Returns null on any
 * failure (private video, typo, offline) so callers can fall back to
 * manually authored content instead of breaking the build.
 */
export async function fetchVimeoOEmbed(
  url: string
): Promise<VimeoOEmbed | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    // Without an explicit width, Vimeo's oEmbed defaults to a small
    // thumbnail (often ~640px wide) that looks pixelated once it's
    // stretched across a full-bleed hero or a large card. Requesting a
    // bigger width gets back the largest size Vimeo has for that video.
    const response = await fetch(
      `https://vimeo.com/api/oembed.json?width=1920&url=${encodeURIComponent(url)}`,
      { signal: controller.signal, cache: "force-cache" }
    );
    clearTimeout(timeout);

    if (!response.ok) return null;

    const data = await response.json();
    return {
      title: data.title,
      description: data.description,
      thumbnailUrl: data.thumbnail_url,
      durationSeconds: data.duration,
    };
  } catch {
    return null;
  }
}
