import type { Metadata } from "next";
import Image from "next/image";
import {
  ButtonLink,
  Container,
  Eyebrow,
  PageHero,
  Section,
  SectionTitle,
} from "@/components/ui";
import { facilities, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Rezervă teren",
  description:
    "Rezervă teren de tenis la Clubul RTC: 2 terenuri outdoor din zgură și 1 teren indoor. Bulevardul Basarabia 73-79, București.",
  alternates: { canonical: "/rezerva-teren" },
};

const highlights = [
  "Două terenuri outdoor din zgură, acoperite cu un dom în sezonul rece",
  "Un teren indoor din zgură, disponibil indiferent de condițiile meteorologice",
  "Terenuri renovate recent, pentru orice nivel de joc",
  "Programe care facilitează socializarea și dezvoltarea abilităților",
];

export default function RezervaTerenPage() {
  return (
    <>
      <PageHero
        eyebrow="Facilități de nivel mondial"
        title="Facilități concepute pentru campioni"
        description="Terenurile Clubului de Tenis RTC îmbină facilități premium, confort și echipamente profesionale pentru orice nivel de joc."
      />

      <Section>
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            {["/images/facilities/teren1.webp", "/images/facilities/teren2.webp", "/images/facilities/teren3.webp"].map(
              (src, i) => (
                <div
                  key={src}
                  className="relative aspect-[4/3] overflow-hidden rounded-2xl"
                >
                  <Image
                    src={src}
                    alt={`Teren de tenis Clubul RTC ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              ),
            )}
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <Eyebrow>Mai mult decât tenis</Eyebrow>
              <SectionTitle>Facilități care susțin stilul tău de viață</SectionTitle>
              <ul className="mt-6 space-y-3">
                {highlights.map((h) => (
                  <li
                    key={h}
                    className="flex gap-3 text-sm leading-relaxed text-rtc-muted sm:text-base"
                  >
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-rtc-coral" />
                    {h}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <ButtonLink href={site.booksport} external variant="primary">
                  Rezervă teren pe Booksport
                </ButtonLink>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image
                src="/images/gallery/gallery05.jpg"
                alt="Teren de tenis modern"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Eyebrow>De ce jucătorii adoră clubul nostru</Eyebrow>
          <SectionTitle>
            Conceput pentru confort, performanță și comunitate
          </SectionTitle>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {facilities.map((f) => (
              <article
                key={f.title}
                className="overflow-hidden rounded-2xl border border-rtc-green/10 bg-white shadow-sm"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={f.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display font-bold text-rtc-green">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm text-rtc-muted">{f.description}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <Eyebrow>Un spațiu pentru fiecare jucător</Eyebrow>
              <SectionTitle>Terenuri adaptate stilurilor de joc</SectionTitle>
              <p className="mt-4 text-rtc-muted">
                Gama noastră de terenuri se potrivește tuturor nivelurilor — de
                la jocuri relaxate la meciuri competitive.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-rtc-muted sm:text-base">
                <li>• 2 terenuri outdoor din zgură</li>
                <li>• 1 teren de tenis indoor din zgură</li>
                <li>• Terenuri și echipamente de ultimă generație</li>
                <li>• Accent pe disciplină, strategie și fitness</li>
              </ul>
            </div>
            <div className="rounded-3xl border border-rtc-green/10 bg-rtc-cream p-6 sm:p-8">
              <Eyebrow>Locație & hartă</Eyebrow>
              <SectionTitle className="!text-2xl">
                Ușor de găsit, ușor de adorat
              </SectionTitle>
              <ul className="mt-6 space-y-4 text-sm text-rtc-muted sm:text-base">
                <li>
                  <strong className="text-rtc-green">Adresă:</strong>{" "}
                  {site.address}
                </li>
                <li>
                  <strong className="text-rtc-green">Telefon:</strong>{" "}
                  <a href={site.phoneHref} className="hover:text-rtc-coral">
                    {site.phone}
                  </a>
                </li>
                <li>
                  <strong className="text-rtc-green">Email:</strong>{" "}
                  <a
                    href={`mailto:${site.email}`}
                    className="hover:text-rtc-coral"
                  >
                    {site.email}
                  </a>
                </li>
              </ul>
              <div className="mt-6">
                <ButtonLink href={site.booksport} external>
                  Rezervă acum
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
