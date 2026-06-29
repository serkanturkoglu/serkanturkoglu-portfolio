import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { about } from "@/data/siteContent";
import { resolvePublicImage } from "@/lib/content";
import { placeholderGradient } from "@/lib/placeholder";

const title = `About — ${about.name}`;

export const metadata: Metadata = {
  title,
  description: about.shortBio,
  alternates: { canonical: "/about" },
  openGraph: { title, description: about.shortBio, url: "/about" },
  twitter: { card: "summary_large_image", title, description: about.shortBio },
};

export default function AboutPage() {
  const profileImage = resolvePublicImage(about.profileImage);

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-36 md:px-10 md:pb-32 md:pt-44">
      <div className="mb-16 max-w-2xl">
        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted">
          About
        </p>
        <h1 className="font-display text-3xl font-bold leading-[0.95] md:text-5xl">
          {about.name}
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-[360px_1fr] md:gap-16">
        <div
          className="relative aspect-[4/5] overflow-hidden rounded-sm"
          style={profileImage ? undefined : { background: placeholderGradient("about-portrait") }}
        >
          {profileImage ? (
            <Image
              src={profileImage}
              alt={about.name}
              fill
              sizes="(min-width: 768px) 360px, 100vw"
              className="object-cover"
              priority
            />
          ) : (
            <span className="grain" />
          )}
        </div>

        <div className="flex flex-col gap-6">
          {about.longBio.map((paragraph, index) => (
            <p
              key={index}
              className="max-w-2xl text-lg leading-relaxed text-muted"
            >
              {paragraph}
            </p>
          ))}

          <div className="mt-4 flex flex-wrap gap-x-10 gap-y-4 border-t border-border pt-6 text-xs uppercase tracking-[0.16em] text-muted">
            <span>{about.location}</span>
            <span>{about.availability}</span>
          </div>

          <Link
            href="/contact"
            className="mt-2 inline-block w-fit text-xs font-medium uppercase tracking-[0.18em] underline decoration-border-strong underline-offset-8 transition-all duration-200 hover:decoration-foreground active:scale-[0.97]"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
}
