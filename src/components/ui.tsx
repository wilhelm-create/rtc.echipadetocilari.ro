import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`py-14 sm:py-20 ${className}`}>
      {children}
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-sm font-semibold uppercase tracking-[0.14em] text-rtc-coral">
      {children}
    </p>
  );
}

export function SectionTitle({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`mt-3 max-w-3xl font-display text-3xl font-bold tracking-tight text-rtc-green sm:text-4xl ${className}`}
    >
      {children}
    </h2>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  external?: boolean;
  className?: string;
}) {
  const base =
    "inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-200";
  const styles = {
    primary: "bg-rtc-coral text-white hover:bg-rtc-coral/90 shadow-sm",
    secondary: "bg-rtc-green text-white hover:bg-rtc-green-light",
    outline:
      "border-2 border-rtc-green text-rtc-green hover:bg-rtc-green hover:text-white",
  }[variant];

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} ${styles} ${className}`}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
    </Link>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="bg-rtc-green text-white">
      <Container className="py-14 sm:py-20">
        <Eyebrow>
          <span className="text-rtc-peach">{eyebrow}</span>
        </Eyebrow>
        <h1 className="mt-3 max-w-3xl font-display text-3xl font-bold tracking-tight sm:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            {description}
          </p>
        ) : null}
      </Container>
    </div>
  );
}

export function CtaBanner() {
  return (
    <Section className="!py-0">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-rtc-green px-6 py-12 sm:px-12 sm:py-16">
          <div className="relative z-10 max-w-xl">
            <Eyebrow>
              <span className="text-rtc-peach">Programează-ți primul antrenament</span>
            </Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
              Ești gata să intri în joc?
            </h2>
            <p className="mt-4 text-white/80">
              Hai la Clubul de Tenis RTC — antrenori certificați, terenuri
              moderne și o comunitate care te motivează.
            </p>
            <div className="mt-8">
              <ButtonLink href="/contact#formular" variant="primary">
                Programează un antrenament
              </ButtonLink>
            </div>
          </div>
          <div className="pointer-events-none absolute -right-8 bottom-0 hidden h-full w-1/2 sm:block">
            <Image
              src="/images/cta.png"
              alt=""
              fill
              className="object-contain object-bottom"
              sizes="40vw"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}

export function TestimonialGrid({
  items,
}: {
  items: readonly {
    quote: string;
    text: string;
    author: string;
    role: string;
  }[];
}) {
  return (
    <div className="mt-10 grid gap-6 md:grid-cols-3">
      {items.map((t) => (
        <blockquote
          key={t.author}
          className="flex h-full flex-col rounded-2xl border border-rtc-green/10 bg-white p-6 shadow-sm"
        >
          <p className="font-display text-lg font-semibold text-rtc-green">
            „{t.quote}”
          </p>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-rtc-muted">
            {t.text}
          </p>
          <footer className="mt-6 border-t border-rtc-green/10 pt-4 text-sm font-medium text-rtc-green">
            — {t.author}, {t.role}
          </footer>
        </blockquote>
      ))}
    </div>
  );
}

export function StatsGrid({
  items,
}: {
  items: readonly {
    value: number;
    suffix: string;
    label: string;
    description: string;
  }[];
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((s) => (
        <div
          key={s.label}
          className="rounded-2xl border border-rtc-green/10 bg-white p-6 text-center shadow-sm"
        >
          <p className="font-display text-4xl font-bold text-rtc-coral">
            {s.value}
            {s.suffix}
          </p>
          <h3 className="mt-2 font-display text-base font-semibold text-rtc-green">
            {s.label}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-rtc-muted">
            {s.description}
          </p>
        </div>
      ))}
    </div>
  );
}
