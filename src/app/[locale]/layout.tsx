import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { MotionConfig } from "motion/react";
import { routing } from "@/i18n/routing";
import { vastagoGrotesk, libreCaslon } from "@/lib/fonts";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://influence.be"),
  title: {
    default: "Influence Circle | Reputation Architects",
    template: "%s | Influence Circle",
  },
  description:
    "Van onzichtbaar naar onmisbaar. Influence Circle helpt Europese C-level leiders hun reputatie strategisch op te bouwen.",
  openGraph: {
    type: "website",
    siteName: "Influence Circle",
    title: "Influence Circle | Reputation Architects",
    description:
      "Van onzichtbaar naar onmisbaar. Influence Circle helpt Europese C-level leiders hun reputatie strategisch op te bouwen.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Influence Circle | Reputation Architects",
    description:
      "Van onzichtbaar naar onmisbaar. Influence Circle helpt Europese C-level leiders hun reputatie strategisch op te bouwen.",
  },
  alternates: {
    languages: {
      nl: "https://influence.be",
      en: "https://influence.be/en",
    },
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Influence Circle",
  url: "https://influence.be",
  description:
    "Reputation Architects voor Europese C-level leiders.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Antwerpen",
    addressCountry: "BE",
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${vastagoGrotesk.variable} ${libreCaslon.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-navy text-white">
        <NextIntlClientProvider messages={messages}>
          <MotionConfig reducedMotion="user">
            <Navbar />
            <main>
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
          </MotionConfig>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
