"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Replace with real error reporting (Sentry, etc.) when one is wired up.
    // Left as a plain console call so failures are at least visible in
    // server/deployment logs instead of silently swallowed.
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-36 md:px-10 md:pb-32 md:pt-44">
      <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted">
        Error
      </p>
      <h1 className="font-display max-w-2xl text-3xl font-bold leading-[0.95] md:text-5xl">
        Something went wrong.
      </h1>
      <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">
        That wasn&apos;t supposed to happen. Try again, or head back to the
        homepage.
      </p>

      <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-border pt-8">
        <button
          type="button"
          onClick={reset}
          className="text-xs font-medium uppercase tracking-[0.18em] underline decoration-border-strong underline-offset-8 transition-all duration-200 hover:decoration-foreground active:scale-[0.97]"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="text-xs font-medium uppercase tracking-[0.18em] underline decoration-border-strong underline-offset-8 transition-all duration-200 hover:decoration-foreground active:scale-[0.97]"
        >
          Home
        </Link>
      </div>
    </div>
  );
}
