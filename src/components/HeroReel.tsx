"use client";

import Player from "@vimeo/player";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { HighlightClip } from "@/lib/highlight-clips";

const CLIP_DURATION_MS = 6000;
const FADE_MS = 500;
const SDK_CALL_TIMEOUT_MS = 2500;

/**
 * The Vimeo Player SDK's command promises (play/ready/setCurrentTime) can
 * occasionally never settle — e.g. when a postMessage acknowledgement gets
 * dropped. Racing against a timeout keeps one flaky call from freezing the
 * whole rotation forever.
 */
function withTimeout<T>(promise: Promise<T>, ms = SDK_CALL_TIMEOUT_MS): Promise<T | undefined> {
  return Promise.race([
    promise,
    new Promise<undefined>((resolve) => setTimeout(() => resolve(undefined), ms)),
  ]);
}

/** Fisher-Yates — gives each page load a different playback order. */
function shuffle<T>(list: T[]): T[] {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Full-bleed hero background that cycles through a short mid-clip of each
 * featured project — a self-assembling showreel. Add a `vimeoUrl` to a
 * featured project in projects.ts and it joins the rotation automatically.
 * With no linked videos yet, this just renders the grain/gradient
 * placeholder below.
 *
 * Each clip gets a fresh Player instance rather than `loadVideo()`-ing a
 * new id into the existing one — swapping ids on a live instance was
 * unreliable about re-checking embed permissions, so recreating per clip
 * (every few seconds, not performance-sensitive) is the safer path.
 */
export function HeroReel({ clips }: { clips: HighlightClip[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);
  const indexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const userPausedRef = useRef(false);

  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const root = rootRef.current;
    const mount = mountRef.current;
    if (!root || !mount || clips.length === 0) return;

    // The hero reel is muted, ambient background footage with its own
    // visible play/pause control — unlike flashing or rapid UI motion, we
    // play it regardless of prefers-reduced-motion so the feature actually
    // shows up for visitors who have that OS setting on.

    // Shuffled once per page load so the rotation order isn't the same
    // every visit. The poster image (first paint, before this runs) still
    // shows clips[0] — a one-time mismatch on the very first clip that
    // resolves itself the moment the player fades in.
    const order = shuffle(clips);

    let destroyed = false;
    let skipping = false;

    // Only the manual play/pause button stops the reel — it no longer
    // pauses itself when scrolled off-screen or when the tab loses focus,
    // since the brief auto-pause/resume read as the video "stopping".
    function isPaused() {
      return userPausedRef.current;
    }

    // If a clip turns out to be domain-restricted or removed, Vimeo's own
    // iframe shows a "Sorry, this video cannot be played" message — our
    // try/catch below can't suppress that. Jumping to the next clip right
    // away keeps it on screen for a moment instead of the full clip
    // duration.
    function handleClipError() {
      if (destroyed || skipping) return;
      skipping = true;
      if (timerRef.current) clearTimeout(timerRef.current);
      advance().finally(() => {
        skipping = false;
      });
    }

    async function mountClip(clip: HighlightClip) {
      const player = new Player(mount!, {
        id: clip.vimeoId,
        autoplay: !isPaused(),
        muted: true,
        loop: false,
        controls: false,
        title: false,
        byline: false,
        portrait: false,
        dnt: true,
        responsive: true,
      });
      player.on("error", handleClipError);
      playerRef.current = player;

      try {
        await withTimeout(player.ready());
        await withTimeout(player.setCurrentTime(clip.start));
        // Playback is already driven by the `autoplay` option above —
        // calling .play() again here was observed to hang indefinitely on
        // some clip swaps (an autoplay-policy / postMessage ack edge
        // case), so we don't double up on it.
      } catch {
        // Domain-restricted or removed clips just get skipped on the
        // next rotation instead of breaking the showreel.
      }
      if (!destroyed) setReady(true);
    }

    mountClip(order[0]);

    function scheduleNext() {
      timerRef.current = setTimeout(advance, CLIP_DURATION_MS);
    }

    async function advance() {
      if (destroyed || order.length < 2) {
        scheduleNext();
        return;
      }
      if (isPaused()) {
        scheduleNext();
        return;
      }

      setVisible(false);
      await new Promise((resolve) => setTimeout(resolve, FADE_MS));
      if (destroyed) return;

      const previous = playerRef.current;
      if (previous) await previous.destroy().catch(() => undefined);

      indexRef.current = (indexRef.current + 1) % order.length;
      await mountClip(order[indexRef.current]);

      if (!destroyed) setVisible(true);
      scheduleNext();
    }

    scheduleNext();

    return () => {
      destroyed = true;
      if (timerRef.current) clearTimeout(timerRef.current);
      playerRef.current?.destroy().catch(() => undefined);
    };
  }, [clips]);

  function togglePlayback() {
    const player = playerRef.current;
    if (!player) return;
    userPausedRef.current = !userPausedRef.current;
    setPlaying(!userPausedRef.current);
    if (userPausedRef.current) player.pause().catch(() => undefined);
    else player.play().catch(() => undefined);
  }

  const posterUrl = clips[0]?.thumbnailUrl;

  return (
    <div ref={rootRef} className="absolute inset-0 overflow-hidden bg-background">
      {clips.length === 0 ? (
        <div
          className="h-full w-full"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 0%, hsl(0 0% 19%) 0%, hsl(0 0% 9%) 60%, hsl(0 0% 6%) 100%)",
          }}
        />
      ) : (
        <>
          {posterUrl && (
            <Image
              src={posterUrl}
              alt=""
              fill
              priority
              quality={90}
              sizes="100vw"
              className="object-cover"
            />
          )}
          <div
            className={`absolute inset-0 transition-opacity duration-500 ease-out ${
              ready && visible ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              ref={mountRef}
              className="absolute left-1/2 top-1/2 h-[56.25vw] w-[100vw] min-h-[100vh] min-w-[177.78vh] -translate-x-1/2 -translate-y-1/2"
            />
          </div>
        </>
      )}

      <span className="grain" />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/35 to-background" />

      {ready && (
        <button
          type="button"
          onClick={togglePlayback}
          aria-label={playing ? "Pause showreel" : "Play showreel"}
          className="absolute bottom-6 right-6 flex h-11 w-11 items-center justify-center rounded-full border border-foreground/25 text-foreground/80 backdrop-blur-sm transition-all duration-200 hover:border-foreground/60 active:scale-90 md:bottom-10 md:right-10"
        >
          {playing ? (
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
              <path d="M6 5h4v14H6zm8 0h4v14h-4z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-4 w-4 translate-x-px fill-current" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      )}
    </div>
  );
}
