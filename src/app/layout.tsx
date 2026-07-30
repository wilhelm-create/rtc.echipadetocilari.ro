import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: `${site.name} | Tenis București`,
    template: `%s | ${site.shortName}`,
  },
  description: site.description,
  applicationName: site.shortName,
  keywords: [
    "tenis București",
    "club tenis",
    "antrenamente tenis",
    "tenis copii",
    "tenis juniori",
    "RTC tenis",
    "rezervare teren tenis",
    "cardio tenis",
  ],
  authors: [{ name: site.agency.name, url: site.agency.url }],
  openGraph: {
    type: "website",
    locale: "ro_RO",
    url: site.domain,
    siteName: site.name,
    title: `${site.name} | Tenis București`,
    description: site.description,
    images: [{ url: "/images/gallery/gallery05.jpg", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Tenis București`,
    description: site.description,
    images: ["/images/gallery/gallery05.jpg"],
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  name: site.name,
  description: site.description,
  url: site.domain,
  telephone: site.phone,
  email: site.email,
  image: `${site.domain}/images/logo.webp`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Bulevardul Basarabia 73 - 79",
    addressLocality: "București",
    addressCountry: "RO",
  },
  openingHours: "Mo-Su 07:00-21:00",
  sameAs: [site.social.facebook, site.social.instagram, site.social.tiktok],
  geo: {
    "@type": "GeoCoordinates",
    addressCountry: "RO",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ro"
      className={`${inter.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-rtc-cream text-foreground">
        <a href="#content" className="skip-link">
          Sari la conținut
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main id="content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
