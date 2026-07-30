import Image from "next/image";
import Link from "next/link";
import { nav, site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-rtc-green/10 bg-rtc-green text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="space-y-4">
          <Link href="/" className="inline-flex items-center gap-3">
            <Image
              src="/images/logo.webp"
              alt=""
              width={48}
              height={48}
              className="h-12 w-12 rounded-full bg-white object-cover"
            />
            <span className="font-display text-lg font-bold">{site.name}</span>
          </Link>
          <p className="text-sm leading-relaxed text-white/75">
            Mai mult decât un sport — un stil de viață. Antrenamente pentru
            copii, juniori și adulți în București.
          </p>
        </div>

        <div>
          <h2 className="font-display text-sm font-bold uppercase tracking-wider text-rtc-peach">
            Navigare
          </h2>
          <ul className="mt-4 space-y-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-white/80 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm font-bold uppercase tracking-wider text-rtc-peach">
            Contact
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            <li>
              <a href={site.phoneHref} className="hover:text-white">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-white">
                {site.email}
              </a>
            </li>
            <li>{site.address}</li>
            <li>Program: {site.hours}</li>
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm font-bold uppercase tracking-wider text-rtc-peach">
            Urmărește-ne
          </h2>
          <ul className="mt-4 flex flex-wrap gap-3">
            <li>
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-white/10 px-4 text-sm font-medium transition-colors hover:bg-white/20"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-white/10 px-4 text-sm font-medium transition-colors hover:bg-white/20"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href={site.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-white/10 px-4 text-sm font-medium transition-colors hover:bg-white/20"
              >
                TikTok
              </a>
            </li>
          </ul>
          <p className="mt-6 text-sm text-white/70">
            Rămâi la curent cu noutățile clubului pe rețelele sociale.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-4 py-6 text-sm text-white/60 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <p>
            Copyright © {year} {site.name}. Toate drepturile rezervate.
          </p>
          <p>
            Creat cu pasiune de{" "}
            <a
              href={site.agency.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-rtc-peach hover:text-white"
            >
              {site.agency.name}
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
