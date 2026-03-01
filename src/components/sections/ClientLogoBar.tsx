"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";

const placeholderLogos = [
  "Client 1",
  "Client 2",
  "Client 3",
  "Client 4",
  "Client 5",
  "Client 6",
];

export function ClientLogoBar() {
  const t = useTranslations("clients");

  return (
    <section className="bg-navy-light/50 py-8">
      <Container>
        <p className="text-sm uppercase tracking-[0.15em] font-medium text-white/50 text-center mb-6">
          {t("label")}
        </p>
      </Container>

      <div className="overflow-hidden">
        <div className="animate-marquee flex w-max">
          {/* First set of logos */}
          {placeholderLogos.map((logo, i) => (
            <div
              key={`a-${i}`}
              className="flex-shrink-0 mx-10 flex items-center justify-center"
            >
              <span className="text-white/20 text-lg font-semibold tracking-wide whitespace-nowrap select-none">
                {logo}
              </span>
            </div>
          ))}

          {/* Duplicate set for seamless loop */}
          {placeholderLogos.map((logo, i) => (
            <div
              key={`b-${i}`}
              className="flex-shrink-0 mx-10 flex items-center justify-center"
            >
              <span className="text-white/20 text-lg font-semibold tracking-wide whitespace-nowrap select-none">
                {logo}
              </span>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
