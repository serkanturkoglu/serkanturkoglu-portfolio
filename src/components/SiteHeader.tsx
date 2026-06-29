"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CATEGORY_LABELS, CATEGORY_ORDER, about } from "@/data/siteContent";

const WORK_LINKS = [
  { href: "/work", label: "All Work" },
  ...CATEGORY_ORDER.map((category) => ({
    href: `/work#${category}`,
    label: CATEGORY_LABELS[category],
  })),
];

const navLink =
  "group relative py-2 text-xs font-medium uppercase tracking-[0.18em] text-foreground/75 transition-colors duration-200 hover:text-foreground";
const navUnderline = (
  <span className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-foreground transition-transform duration-200 ease-out group-hover:scale-x-100" />
);

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileWorkOpen, setMobileWorkOpen] = useState(false);
  const [workDropdownOpen, setWorkDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!workDropdownOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setWorkDropdownOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setWorkDropdownOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [workDropdownOpen]);

  function closeAll() {
    setMobileOpen(false);
    setMobileWorkOpen(false);
    setWorkDropdownOpen(false);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/40 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:px-10">
        <Link
          href="/"
          className="group -my-3 inline-flex items-center py-3 transition-opacity duration-150 active:opacity-60"
          onClick={closeAll}
        >
          <span className="relative font-display text-sm font-bold uppercase tracking-[0.12em]">
            {about.shortName}
            {navUnderline}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/" className={navLink} onClick={closeAll}>
            Home
            {navUnderline}
          </Link>

          <div
            ref={dropdownRef}
            className="relative flex items-center"
            onMouseEnter={() => setWorkDropdownOpen(true)}
            onMouseLeave={() => setWorkDropdownOpen(false)}
          >
            <Link
              href="/work"
              onClick={closeAll}
              className={`${navLink} flex items-center gap-1`}
            >
              Work
              {navUnderline}
            </Link>
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={workDropdownOpen}
              aria-label="Toggle work categories"
              onClick={() => setWorkDropdownOpen((v) => !v)}
              className="flex h-8 w-6 items-center justify-center text-foreground/75 transition-colors duration-200 hover:text-foreground active:scale-90"
            >
              <svg
                viewBox="0 0 24 24"
                className={`h-3 w-3 fill-current transition-transform duration-200 ${
                  workDropdownOpen ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              >
                <path d="M7 10l5 5 5-5z" />
              </svg>
            </button>

            <div
              role="menu"
              className={`absolute left-1/2 top-full w-48 -translate-x-1/2 pt-3 transition-all duration-200 ease-out ${
                workDropdownOpen
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none -translate-y-1 opacity-0"
              }`}
            >
              <div className="flex flex-col gap-1 rounded-sm border border-border bg-surface/95 p-2 backdrop-blur-md">
                {WORK_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    role="menuitem"
                    onClick={closeAll}
                    className="rounded-sm px-3 py-2.5 text-xs font-medium uppercase tracking-[0.14em] text-foreground/75 transition-colors duration-150 hover:bg-surface-hover hover:text-foreground active:scale-[0.97]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link href="/about" className={navLink} onClick={closeAll}>
            About
            {navUnderline}
          </Link>

          <Link
            href="/contact"
            onClick={closeAll}
            className="group relative overflow-hidden rounded-full border border-border-strong px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] transition-colors duration-300 hover:border-foreground active:scale-95"
          >
            <span className="absolute inset-0 origin-left scale-x-0 bg-foreground transition-transform duration-500 ease-out group-hover:scale-x-100" />
            <span className="relative text-foreground transition-colors duration-300 group-hover:text-background">
              Get in Touch
            </span>
          </Link>
        </nav>

        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          onClick={() => setMobileOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center md:hidden"
        >
          <span className="relative block h-3.5 w-5">
            <span
              className={`absolute inset-x-0 top-0 h-px bg-foreground transition-transform duration-200 ${
                mobileOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute inset-x-0 bottom-0 h-px bg-foreground transition-transform duration-200 ${
                mobileOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-nav"
        className={`overflow-hidden border-t border-border bg-background transition-[max-height] duration-300 ease-out md:hidden ${
          mobileOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-6 py-4">
          <Link
            href="/"
            onClick={closeAll}
            className="py-3 text-sm font-medium uppercase tracking-[0.18em] text-foreground/75 transition-colors duration-200 hover:text-foreground active:scale-[0.98]"
          >
            Home
          </Link>
          <div className="flex items-center justify-between">
            <Link
              href="/work"
              onClick={closeAll}
              className="py-3 text-sm font-medium uppercase tracking-[0.18em] text-foreground/75 transition-colors duration-200 hover:text-foreground active:scale-[0.98]"
            >
              Work
            </Link>
            <button
              type="button"
              aria-expanded={mobileWorkOpen}
              aria-label="Toggle work categories"
              onClick={() => setMobileWorkOpen((v) => !v)}
              className="flex h-11 w-11 items-center justify-center text-foreground/75 transition-colors duration-200 active:scale-90"
            >
              <svg
                viewBox="0 0 24 24"
                className={`h-3.5 w-3.5 fill-current transition-transform duration-200 ${
                  mobileWorkOpen ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              >
                <path d="M7 10l5 5 5-5z" />
              </svg>
            </button>
          </div>
          <div
            className={`overflow-hidden transition-[max-height] duration-300 ease-out ${
              mobileWorkOpen ? "max-h-60" : "max-h-0"
            }`}
          >
            <div className="flex flex-col gap-1 pb-2 pl-4">
              {WORK_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeAll}
                  className="py-2.5 text-xs font-medium uppercase tracking-[0.16em] text-foreground/75 transition-colors duration-200 hover:text-foreground active:scale-[0.98]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <Link
            href="/about"
            onClick={closeAll}
            className="py-3 text-sm font-medium uppercase tracking-[0.18em] text-foreground/75 transition-colors duration-200 hover:text-foreground active:scale-[0.98]"
          >
            About
          </Link>
          <Link
            href="/contact"
            onClick={closeAll}
            className="py-3 text-sm font-medium uppercase tracking-[0.18em] text-foreground/75 transition-all duration-300 hover:text-foreground hover:[text-shadow:0_0_18px_rgba(244,243,239,0.7)] active:scale-[0.98]"
          >
            Get in Touch
          </Link>
        </nav>
      </div>
    </header>
  );
}
