import Image from "next/image";
import Link from "next/link";
import {
  ButtonLink,
  Container,
  CtaBanner,
  Eyebrow,
  Section,
  SectionTitle,
  StatsGrid,
  TestimonialGrid,
} from "@/components/ui";
import {
  gallery,
  programs,
  site,
  stats,
  testimonials,
  whyUs,
} from "@/lib/site";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-rtc-green text-white">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="/images/gallery/gallery05.jpg"
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-rtc-green via-rtc-green/90 to-rtc-green/60" />
        </div>
        <Container className="relative grid items-center gap-10 py-16 sm:py-24 lg:grid-cols-2 lg:py-28">
          <div>
            <Eyebrow>
              <span className="text-rtc-peach">Descoperă-ți potențialul în tenis</span>
            </Eyebrow>
            <h1 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
              Crește-ți nivelul de joc alături de echipa noastră
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
              Bucură-te de o experiență de neuitat într-un mediu propice pentru
              performanța sportivă — programe pentru copii, juniori și adulți la{" "}
              {site.name}.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/contact#formular" variant="primary">
                Programează un antrenament
              </ButtonLink>
              <ButtonLink
                href="/programe"
                className="!border-white/40 !text-white hover:!bg-white hover:!text-rtc-green"
                variant="outline"
              >
                Vezi programele
              </ButtonLink>
            </div>
            <div className="mt-10 inline-flex items-center gap-3 rounded-2xl bg-white/10 px-5 py-4 backdrop-blur-sm">
              <span className="font-display text-3xl font-bold text-rtc-peach">
                350+
              </span>
              <span className="text-sm text-white/85">
                elevi care au crescut alături de noi
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-2xl sm:col-span-1 sm:row-span-2 sm:aspect-auto sm:min-h-[340px]">
              <Image
                src="/images/gallery/gallery01.jpg"
                alt="Antrenament de tenis la Clubul RTC"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
                priority
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-2xl">
              <Image
                src="/images/gallery/gallery02.jpg"
                alt="Jucător pe terenul de tenis"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 20vw"
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-2xl">
              <Image
                src="/images/gallery/gallery03.jpg"
                alt="Sesiune de coaching pe teren"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 20vw"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Programs preview */}
      <Section>
        <Container>
          <Eyebrow>Programe pentru fiecare nivel</Eyebrow>
          <SectionTitle>Programele noastre</SectionTitle>
          <p className="mt-4 max-w-2xl text-rtc-muted">
            De la primii pași pe teren până la turnee naționale — avem un plan
            pentru fiecare jucător.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {programs.slice(0, 6).map((p) => (
              <article
                key={p.slug}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-rtc-green/10 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={p.image}
                    alt=""
                    fill
                    className="object-cover transition duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-lg font-bold text-rtc-green">
                    {p.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-rtc-muted">
                    {p.short}
                  </p>
                  <Link
                    href="/programe"
                    className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-rtc-coral hover:underline"
                  >
                    Află mai mult →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* Why us */}
      <Section className="bg-white">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <Eyebrow>De ce să te antrenezi la Clubul de Tenis RTC?</Eyebrow>
              <SectionTitle>Mai mult decât un sport — e un stil de viață</SectionTitle>
              <p className="mt-4 text-rtc-muted">
                Combinăm expertiza antrenorilor, planuri personalizate și
                facilități moderne ca să te ajutăm să crești pe teren și în
                afara lui.
              </p>
              <div className="mt-8">
                <ButtonLink href="/contact#formular">
                  Programează un antrenament
                </ButtonLink>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {whyUs.map((item) => (
                <div
                  key={item.title}
                  className="overflow-hidden rounded-2xl border border-rtc-green/10 bg-rtc-cream"
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                  </div>
                  <p className="p-4 text-sm font-semibold leading-snug text-rtc-green">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Testimonials */}
      <Section>
        <Container>
          <Eyebrow>Povești de succes ale elevilor</Eyebrow>
          <SectionTitle>
            Descoperă cum sportivii noștri reușesc în joc și în viață
          </SectionTitle>
          <TestimonialGrid items={testimonials} />
        </Container>
      </Section>

      {/* Gallery */}
      <Section className="!pt-0">
        <Container>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
            {gallery.map((src, i) => (
              <div
                key={src}
                className={`relative overflow-hidden rounded-2xl ${
                  i === 0 ? "col-span-2 aspect-[2/1] md:col-span-1 md:aspect-square" : "aspect-square"
                }`}
              >
                <Image
                  src={src}
                  alt={`Galerie Clubul de Tenis RTC ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Stats */}
      <Section className="bg-white">
        <Container>
          <StatsGrid items={stats} />
        </Container>
      </Section>

      <div className="pb-14 sm:pb-20">
        <CtaBanner />
      </div>
    </>
  );
}
