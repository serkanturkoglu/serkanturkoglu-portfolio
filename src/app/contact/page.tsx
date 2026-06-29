import type { Metadata } from "next";
import { about, contact } from "@/data/siteContent";

const title = `Contact — ${about.name}`;
const description = `Get in touch with ${about.name}.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  openGraph: { title, description, url: "/contact" },
  twitter: { card: "summary_large_image", title, description },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-36 md:px-10 md:pb-32 md:pt-44">
      <div className="max-w-2xl">
        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted">
          Contact
        </p>
        <h1 className="font-display text-4xl font-bold leading-[0.95] md:text-6xl">
          {contact.heading}
        </h1>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">
          {contact.intro}
        </p>
      </div>

      <div className="mt-16 flex flex-col gap-12 border-t border-border pt-12 md:flex-row md:items-start md:justify-between">
        <a
          href={`mailto:${about.email}`}
          className="font-display text-xl font-semibold leading-tight break-words underline decoration-border-strong underline-offset-8 transition-all duration-200 hover:decoration-foreground active:scale-[0.98] sm:text-3xl md:text-5xl"
        >
          {about.email}
        </a>

        <dl className="flex flex-col gap-8 text-xs uppercase tracking-[0.16em] text-muted">
          <div>
            <dt className="mb-2">Location</dt>
            <dd className="text-sm text-foreground">{about.location}</dd>
          </div>
          <div>
            <dt className="mb-2">Availability</dt>
            <dd className="text-sm text-foreground">{about.availability}</dd>
          </div>
          <div>
            <dt className="mb-2">Social</dt>
            <dd className="flex flex-col gap-1">
              {about.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-foreground underline decoration-border-strong underline-offset-4 transition-colors duration-200 hover:decoration-foreground active:opacity-70"
                >
                  {social.label}
                </a>
              ))}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
