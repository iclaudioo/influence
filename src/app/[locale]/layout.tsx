import type { ReactNode } from "react";
import Script from "next/script";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { vastagoGrotesk, libreCaslon, jetBrainsMono } from "@/lib/fonts";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { NavigationWrapper } from "@/components/layout/NavigationWrapper";
import { DossierHeader } from "@/components/dossier/DossierHeader";
import { DossierFooter } from "@/components/dossier/DossierFooter";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { PageTransition } from "@/components/layout/PageTransition";
import { PrivacyNotice } from "@/components/ui/PrivacyNotice";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { LenisProvider } from "@/hooks/useSmoothScroll";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

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
    <html lang={locale} className={`${vastagoGrotesk.variable} ${libreCaslon.variable} ${jetBrainsMono.variable}`}>
      <body className="font-sans antialiased bg-navy text-white">
        <NextIntlClientProvider messages={messages}>
          <MotionProvider>
          <LenisProvider>
            <CustomCursor />
            <NavigationWrapper
              dossier={<DossierHeader />}
              standard={<Navbar />}
            />
            <main>
              <PageTransition>{children}</PageTransition>
            </main>
            <ScrollToTop />
            <NavigationWrapper
              dossier={<DossierFooter />}
              standard={<Footer />}
            />
            <PrivacyNotice />
          </LenisProvider>
          </MotionProvider>
        </NextIntlClientProvider>
        <Script
          defer
          data-domain="influencecircle.com"
          src="https://plausible.io/js/script.tagged-events.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
