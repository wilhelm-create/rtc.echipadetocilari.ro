import type { Metadata } from "next";
import Image from "next/image";
import {
  ButtonLink,
  Container,
  CtaBanner,
  Eyebrow,
  PageHero,
  Section,
  SectionTitle,
  StatsGrid,
  TestimonialGrid,
} from "@/components/ui";
import { coaches, stats, testimonials } from "@/lib/site";

export const metadata: Metadata = {
  title: "Despre noi",
  description:
    "Cunoaște echipa de antrenori a Clubului de Tenis RTC — experiență națională și internațională, certificări PTR și pregătire personalizată.",
  alternates: { canonical: "/despre-noi" },
};

const philosophy = [
  {
    title: "Antrenament personalizat în funcție de obiectivele individuale",
    image: "/images/why/backhand.jpg",
  },
  {
    title: "Încurajare și dezvoltare a rezistenței mentale",
    image: "/images/why/player.jpg",
  },
  {
    title: "Monitorizare constantă a performanței și feedback regulat",
    image: "/images/why/ace.jpg",
  },
];

export default function DespreNoiPage() {
  return (
    <>
      <PageHero
        eyebrow="Cunoaște experții"
        title="Echipa noastră profesionistă de antrenori"
        description="La Clubul de Tenis RTC ne mândrim cu antrenorii noștri experimentați și certificați, care aduc energie, expertiză și încurajare în fiecare sesiune."
      />

      <Section>
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {coaches.map((c) => (
              <article
                key={c.name}
                className="overflow-hidden rounded-2xl border border-rtc-green/10 bg-white shadow-sm"
              >
                <div className="relative aspect-[4/5] bg-rtc-green/5">
                  <Image
                    src={c.image}
                    alt={c.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <h2 className="font-display text-xl font-bold text-rtc-green">
                    {c.name}
                  </h2>
                  <p className="mt-1 text-sm font-semibold text-rtc-coral">
                    {c.role}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-rtc-muted">
                    {c.bio}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <Eyebrow>Mai mult decât tehnică</Eyebrow>
          <SectionTitle>Filosofia antrenorilor noștri</SectionTitle>
          <p className="mt-4 max-w-3xl text-rtc-muted">
            Credem că tenisul este mai mult decât un joc — este o disciplină
            care învață concentrarea, respectul și reziliența. Stilul nostru de
            antrenorat echilibrează dezvoltarea abilităților tehnice cu spiritul
            sportiv și motivația pozitivă.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {philosophy.map((item) => (
              <div
                key={item.title}
                className="overflow-hidden rounded-2xl border border-rtc-green/10"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <p className="p-5 text-sm font-semibold text-rtc-green">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <StatsGrid items={stats} />
          <div className="mt-14">
            <TestimonialGrid items={testimonials} />
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container className="text-center">
          <Eyebrow>Învață de la cei mai buni</Eyebrow>
          <SectionTitle className="mx-auto">
            Rezervă un antrenament cu antrenorii noștri
          </SectionTitle>
          <p className="mx-auto mt-4 max-w-xl text-rtc-muted">
            Începe să-ți îmbunătățești jocul sub îndrumarea unui antrenor care
            îți înțelege potențialul.
          </p>
          <div className="mt-8 flex justify-center">
            <ButtonLink href="/contact#formular">
              Întâlnește-ți antrenorul acum
            </ButtonLink>
          </div>
        </Container>
      </Section>

      <Section>
        <CtaBanner />
      </Section>
    </>
  );
}
