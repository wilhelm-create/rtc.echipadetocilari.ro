"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled
          ? "border-b border-rtc-green/10 bg-rtc-cream/95 shadow-sm backdrop-blur-md"
          : "bg-rtc-cream/90 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex min-h-11 min-w-11 items-center gap-3 rounded-lg"
          aria-label={`${site.name} — Acasă`}
        >
          <Image
            src="/images/logo.webp"
            alt=""
            width={48}
            height={48}
            className="h-11 w-11 rounded-full object-cover"
            priority
          />
          <span className="hidden font-display text-sm font-bold tracking-tight text-rtc-green sm:block sm:text-base">
            {site.shortName}
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Navigare principală"
        >
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200 ${
                  active
                    ? "bg-rtc-green text-white"
                    : "text-rtc-muted hover:bg-rtc-green/8 hover:text-rtc-green"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact#formular"
            className="hidden min-h-11 items-center rounded-full bg-rtc-coral px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-rtc-coral/90 sm:inline-flex"
          >
            Programează
          </Link>

          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-rtc-green/15 text-rtc-green lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">
              {open ? "Închide meniul" : "Deschide meniul"}
            </span>
            {open ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-rtc-green/10 bg-rtc-cream lg:hidden"
        >
          <nav
            className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6"
            aria-label="Navigare mobilă"
          >
            {nav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-xl px-4 py-3 text-base font-medium ${
                    active
                      ? "bg-rtc-green text-white"
                      : "text-rtc-muted hover:bg-rtc-green/8"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/contact#formular"
              className="mt-2 rounded-xl bg-rtc-coral px-4 py-3 text-center text-base font-semibold text-white"
            >
              Programează un antrenament
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
