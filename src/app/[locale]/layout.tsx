import type { ReactNode } from "react";
import Script from "next/script";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { vastagoGrotesk, libreCaslon } from "@/lib/fonts";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { PageTransition } from "@/components/layout/PageTransition";
import { PrivacyNotice } from "@/components/ui/PrivacyNotice";
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
    <html lang={locale} className={`${vastagoGrotesk.variable} ${libreCaslon.variable}`}>
      <body className="font-sans antialiased bg-navy text-white">
        <NextIntlClientProvider messages={messages}>
          <CustomCursor />
          <Navbar />
          <main>
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <PrivacyNotice />
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
