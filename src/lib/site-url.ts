/**
 * Canonical production URL — used for metadataBase, the sitemap, and
 * robots.txt. Override it per-environment with a `SITE_URL` env var
 * (e.g. in Vercel project settings) once the real domain is live; this
 * fallback only matters for local builds where the env var isn't set.
 */
export const SITE_URL = (process.env.SITE_URL ?? "https://www.serkanturkoglu.com").replace(/\/$/, "");
