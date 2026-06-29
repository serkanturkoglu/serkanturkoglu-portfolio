import type { Metadata } from "next";
import Link from "next/link";
import { about } from "@/data/siteContent";

export const metadata: Metadata = {
  title: `404 — ${about.name}`,
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-36 md:px-10 md:pb-32 md:pt-44">
      <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted">
        404
      </p>
      <h1 className="font-display max-w-2xl text-3xl font-bold leading-[0.95] md:text-5xl">
        This page doesn&apos;t exist.
      </h1>
      <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">
        The page you&apos;re looking for may have been moved or never
        existed. Here are a couple of places to pick back up.
      </p>

      <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-border pt-8">
        <Link
          href="/"
          className="text-xs font-medium uppercase tracking-[0.18em] underline decoration-border-strong underline-offset-8 transition-all duration-200 hover:decoration-foreground active:scale-[0.97]"
        >
          Home
        </Link>
        <Link
          href="/work"
          className="text-xs font-medium uppercase tracking-[0.18em] underline decoration-border-strong underline-offset-8 transition-all duration-200 hover:decoration-foreground active:scale-[0.97]"
        >
          View All Work
        </Link>
      </div>
    </div>
  );
}
