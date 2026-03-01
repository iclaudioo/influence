"use client";

import { useState } from "react";
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
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="bg-navy-light/50 py-8 border-b border-labs/20">
      <Container>
        <p className="text-sm uppercase tracking-[0.15em] font-medium text-white/50 text-center mb-6">
          {t("label")}
        </p>
      </Container>

      <div
        className="overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div
          className="flex w-max"
          style={{
            animation: "marquee 30s linear infinite",
            animationPlayState: isPaused ? "paused" : "running",
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* First set of logos */}
          {placeholderLogos.map((logo, i) => (
            <div
              key={`a-${i}`}
              className="flex-shrink-0 mx-10 flex items-center justify-center"
            >
              <span className="text-white/40 hover:text-white/70 transition-opacity duration-300 text-lg font-semibold tracking-wide whitespace-nowrap select-none">
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
              <span className="text-white/40 hover:text-white/70 transition-opacity duration-300 text-lg font-semibold tracking-wide whitespace-nowrap select-none">
                {logo}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
