import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "@/components/ContactForm";
import {
  Container,
  Eyebrow,
  PageHero,
  Section,
  SectionTitle,
} from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactează Clubul de Tenis RTC: programări, informații despre programe și rezervări. Bulevardul Basarabia 73-79, București.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Club de Tenis RTC"
        title="Hai să luăm legătura"
        description="Indiferent dacă ai întrebări despre programele noastre sau ai nevoie de ajutor cu rezervarea, suntem bucuroși să te ajutăm."
      />

      <Section>
        <Container>
          <div className="grid gap-6 sm:grid-cols-3">
            <ContactCard
              title="Trimite-ne un email"
              value={site.email}
              href={`mailto:${site.email}`}
            />
            <ContactCard
              title="Sună-ne"
              value={site.phone}
              href={site.phoneHref}
            />
            <ContactCard title="Program" value={site.hours} />
          </div>

          <div className="mt-14 grid gap-10 lg:grid-cols-2">
            <div>
              <Eyebrow>Formular</Eyebrow>
              <SectionTitle>Scrie-ne un mesaj</SectionTitle>
              <p className="mt-3 text-rtc-muted">
                Completează formularul și te contactăm cât mai curând.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>

            <div>
              <Eyebrow>Locația clubului</Eyebrow>
              <SectionTitle>Vino pe la sediul nostru</SectionTitle>
              <p className="mt-3 text-rtc-muted">
                Vino să vezi terenurile, să cunoști antrenorii și să afli mai
                multe despre ce oferim.
              </p>
              <div className="mt-6 rounded-2xl border border-rtc-green/10 bg-white p-6 shadow-sm">
                <h3 className="font-display font-bold text-rtc-green">
                  Ne găsești la adresa
                </h3>
                <p className="mt-2 text-rtc-muted">{site.address}</p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-rtc-coral hover:underline"
                >
                  Deschide în Google Maps →
                </a>
              </div>

              <div className="mt-6 overflow-hidden rounded-2xl border border-rtc-green/10">
                <div className="relative aspect-[16/10]">
                  <Image
                    src="/images/facilities/teren2.webp"
                    alt="Teren de tenis Clubul RTC"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-display text-lg font-bold text-rtc-green">
                  Urmărește-ne și conectează-te cu noi
                </h3>
                <ul className="mt-4 flex flex-wrap gap-3">
                  <SocialLink href={site.social.facebook} label="Facebook" />
                  <SocialLink href={site.social.instagram} label="Instagram" />
                  <SocialLink href={site.social.tiktok} label="TikTok" />
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

function ContactCard({
  title,
  value,
  href,
}: {
  title: string;
  value: string;
  href?: string;
}) {
  const content = (
    <>
      <h2 className="text-sm font-semibold uppercase tracking-wide text-rtc-coral">
        {title}
      </h2>
      <p className="mt-2 font-display text-lg font-bold text-rtc-green">
        {value}
      </p>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className="rounded-2xl border border-rtc-green/10 bg-white p-6 shadow-sm transition hover:border-rtc-coral/40"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="rounded-2xl border border-rtc-green/10 bg-white p-6 shadow-sm">
      {content}
    </div>
  );
}

function SocialLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-11 items-center rounded-full border border-rtc-green/15 px-4 text-sm font-medium text-rtc-green transition hover:border-rtc-coral hover:text-rtc-coral"
      >
        {label}
      </a>
    </li>
  );
}
