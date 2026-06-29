import { placeholderGradient } from "@/lib/placeholder";

export function VimeoEmbed({
  vimeoId,
  vimeoHash,
  title,
  seed,
}: {
  vimeoId?: string;
  vimeoHash?: string;
  title: string;
  seed: string;
}) {
  if (!vimeoId) {
    return (
      <div
        className="relative flex aspect-video items-center justify-center overflow-hidden rounded-sm"
        style={{ background: placeholderGradient(seed) }}
      >
        <span className="grain" />
        <div className="relative flex flex-col items-center gap-3 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-foreground/25">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 translate-x-px fill-foreground/70"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          <p className="text-xs uppercase tracking-[0.14em] text-muted">
            Video coming soon
          </p>
        </div>
      </div>
    );
  }

  const params = new URLSearchParams({ title: "0", byline: "0", portrait: "0" });
  if (vimeoHash) params.set("h", vimeoHash);

  return (
    <div className="relative aspect-video overflow-hidden rounded-sm bg-surface">
      <iframe
        src={`https://player.vimeo.com/video/${vimeoId}?${params.toString()}`}
        title={title}
        className="absolute inset-0 h-full w-full"
        allow="autoplay; fullscreen; picture-in-picture"
        loading="lazy"
        allowFullScreen
      />
    </div>
  );
}
