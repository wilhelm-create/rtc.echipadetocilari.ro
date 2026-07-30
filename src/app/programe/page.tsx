import type { Metadata } from "next";
import Image from "next/image";
import {
  ButtonLink,
  Container,
  CtaBanner,
  PageHero,
  Section,
  TestimonialGrid,
} from "@/components/ui";
import { programs, testimonials } from "@/lib/site";

export const metadata: Metadata = {
  title: "Programe",
  description:
    "Programe de tenis pentru copii, juniori, adulți, lecții private, cardio tenis și antrenament competitiv la Clubul de Tenis RTC.",
  alternates: { canonical: "/programe" },
};

export default function ProgramePage() {
  return (
    <>
      <PageHero
        eyebrow="Explorează ofertele noastre"
        title="Programe pentru fiecare jucător și fiecare scop"
        description="Indiferent dacă ridici o rachetă pentru prima dată sau te pregătești pentru turnee competitive, programele noastre sunt concepute să te ajute să crești la fiecare nivel."
      />

      <Section>
        <Container className="space-y-16">
          {programs.map((p, index) => (
            <article
              key={p.slug}
              id={p.slug}
              className="scroll-mt-28 grid items-center gap-8 lg:grid-cols-2"
            >
              <div
                className={`relative aspect-[4/3] overflow-hidden rounded-3xl ${
                  index % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-rtc-coral">
                  {p.tagline}
                </p>
                <h2 className="mt-2 font-display text-2xl font-bold text-rtc-green sm:text-3xl">
                  {p.title}
                </h2>
                <p className="mt-4 leading-relaxed text-rtc-muted">
                  {p.description}
                </p>
                <h3 className="mt-6 text-sm font-bold uppercase tracking-wide text-rtc-green">
                  Caracteristici cheie
                </h3>
                <ul className="mt-3 space-y-2">
                  {p.features.map((f) => (
                    <li
                      key={f}
                      className="flex gap-2 text-sm leading-relaxed text-rtc-muted"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rtc-coral" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <ButtonLink href="/contact#formular">
                    Programează un antrenament
                  </ButtonLink>
                </div>
              </div>
            </article>
          ))}
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <TestimonialGrid items={testimonials} />
        </Container>
      </Section>

      <Section>
        <CtaBanner />
      </Section>
    </>
  );
}
