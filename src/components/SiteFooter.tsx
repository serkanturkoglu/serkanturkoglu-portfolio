import Link from "next/link";
import { about, footer as footerContent } from "@/data/siteContent";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-16 md:px-10 md:py-20">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Link
            href="/contact"
            className="group inline-block transition-transform duration-150 active:scale-[0.99]"
          >
            <p className="font-display text-balance text-2xl font-semibold leading-tight transition-colors duration-200 group-hover:text-muted md:max-w-md md:text-3xl">
              {footerContent.headline}
            </p>
          </Link>
          <a
            href={`mailto:${about.email}`}
            className="text-sm font-medium uppercase tracking-[0.18em] underline decoration-border-strong underline-offset-8 transition-colors duration-200 hover:decoration-foreground active:opacity-70"
          >
            {about.email}
          </a>
        </div>

        <div className="flex flex-col gap-4 border-t border-border pt-8 text-xs uppercase tracking-[0.14em] text-muted md:flex-row md:items-center md:justify-between">
          <span>
            &copy; {year} {about.name}. {about.location}.
          </span>

          <div className="flex items-center gap-6">
            <Link href="/work" className="transition-colors duration-200 hover:text-foreground active:opacity-70">
              Work
            </Link>
            <Link href="/about" className="transition-colors duration-200 hover:text-foreground active:opacity-70">
              About
            </Link>
            <Link href="/contact" className="transition-colors duration-200 hover:text-foreground active:opacity-70">
              Contact
            </Link>
            {about.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-200 hover:text-foreground active:opacity-70"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
