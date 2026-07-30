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
import { camps, testimonials } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tabere",
  description:
    "Tabere de tenis pentru copii la Clubul RTC: Tabăra Furnicuțelor și Tabăra Artiștilor Sportivi — sport, limbă, artă și joacă.",
  alternates: { canonical: "/tabere" },
};

export default function TaberePage() {
  return (
    <>
      <PageHero
        eyebrow="Descoperă taberele noastre"
        title="Tabere pentru fiecare copil și fiecare vis"
        description="Indiferent dacă e prima dată când ține o rachetă sau se pregătește pentru turnee competitive, taberele noastre ajută copiii să crească, să joace și să exceleze."
      />

      <Section>
        <Container className="space-y-16">
          {camps.map((camp, index) => (
            <article
              key={camp.title}
              className="grid items-center gap-8 lg:grid-cols-2"
            >
              <div
                className={`relative aspect-[4/3] overflow-hidden rounded-3xl ${
                  index % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <Image
                  src={camp.image}
                  alt={camp.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-rtc-coral">
                  {camp.tagline}
                </p>
                <h2 className="mt-2 font-display text-2xl font-bold text-rtc-green sm:text-3xl">
                  {camp.title}
                </h2>
                <p className="mt-4 leading-relaxed text-rtc-muted">
                  {camp.description}
                </p>
                <h3 className="mt-6 text-sm font-bold uppercase tracking-wide text-rtc-green">
                  Caracteristici cheie
                </h3>
                <ul className="mt-3 space-y-2">
                  {camp.features.map((f) => (
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
                    Detalii program
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
