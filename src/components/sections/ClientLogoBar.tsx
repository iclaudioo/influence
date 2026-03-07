"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";

const placeholderLogos = [
  { name: "NEXUS GROUP", mark: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="2" width="7" height="7" fill="currentColor" opacity="0.6" /><rect x="11" y="11" width="7" height="7" fill="currentColor" opacity="0.6" /><rect x="11" y="2" width="7" height="7" fill="currentColor" opacity="0.3" /></svg> },
  { name: "APEX VENTURES", mark: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><polygon points="10,2 18,18 2,18" fill="currentColor" opacity="0.6" /></svg> },
  { name: "PRISM CO", mark: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><polygon points="10,1 19,6 19,14 10,19 1,14 1,6" fill="currentColor" opacity="0.5" /></svg> },
  { name: "ATLAS PARTNERS", mark: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" opacity="0.6" /><path d="M10 2 L10 18 M2 10 L18 10" stroke="currentColor" strokeWidth="1" opacity="0.3" /></svg> },
  { name: "NOVA INDUSTRIES", mark: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2 L12 8 L18 8 L13 12 L15 18 L10 14 L5 18 L7 12 L2 8 L8 8 Z" fill="currentColor" opacity="0.5" /></svg> },
  { name: "ZENITH GLOBAL", mark: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M2 16 L18 16 L2 4 L18 4" stroke="currentColor" strokeWidth="1.5" opacity="0.6" /></svg> },
  { name: "HELIX MEDIA", mark: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" opacity="0.5" /><circle cx="13" cy="13" r="5" stroke="currentColor" strokeWidth="1.5" opacity="0.5" /></svg> },
  { name: "VERTEX CAPITAL", mark: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M2 2 L10 18 L18 2" stroke="currentColor" strokeWidth="1.5" opacity="0.6" /><path d="M6 10 L14 10" stroke="currentColor" strokeWidth="1" opacity="0.3" /></svg> },
];

export function ClientLogoBar() {
  const t = useTranslations("clients");
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="relative py-16 overflow-hidden bg-[#FAFAFA]">
      {/* Top divider */}
      <div className="absolute top-0 inset-x-0 divider-gradient" />

      <Container>
        <div className="flex items-center justify-center gap-3 mb-10">
          <span className="inline-block w-8 h-px bg-gradient-to-r from-transparent to-black/20" />
          <p className="text-[10px] uppercase tracking-[0.25em] font-medium text-[#a1a1a6]">
            {t("label")}
          </p>
          <span className="inline-block w-8 h-px bg-gradient-to-l from-transparent to-black/20" />
        </div>
      </Container>

      <div
        className="overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        }}
      >
        <div
          className="flex w-max items-center"
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
              className="flex-shrink-0 mx-10"
            >
              <div
                className="px-8 py-3 rounded-full border border-black/[0.06] backdrop-blur-sm transition-all duration-500 hover:border-black/[0.12] hover:bg-black/[0.04] hover:scale-105 group"
                style={{ background: "rgba(0,0,0,0.02)" }}
              >
                <span className="flex items-center gap-2.5 text-[#a1a1a6] grayscale group-hover:text-[#1d1d1f] group-hover:grayscale-0 transition-all duration-500 text-sm font-medium tracking-[0.15em] whitespace-nowrap select-none">
                  {logo.mark}
                  {logo.name}
                </span>
              </div>
            </div>
          ))}

          {/* Duplicate set for seamless loop */}
          {placeholderLogos.map((logo, i) => (
            <div
              key={`b-${i}`}
              className="flex-shrink-0 mx-10"
            >
              <div
                className="px-8 py-3 rounded-full border border-black/[0.06] backdrop-blur-sm transition-all duration-500 hover:border-black/[0.12] hover:bg-black/[0.04] hover:scale-105 group"
                style={{ background: "rgba(0,0,0,0.02)" }}
              >
                <span className="flex items-center gap-2.5 text-[#a1a1a6] grayscale group-hover:text-[#1d1d1f] group-hover:grayscale-0 transition-all duration-500 text-sm font-medium tracking-[0.15em] whitespace-nowrap select-none">
                  {logo.mark}
                  {logo.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 inset-x-0 divider-gradient" />
    </section>
  );
}
