"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Link } from "@/i18n/navigation";
import { staggerContainer, blurFadeUp } from "@/lib/animations";
import { TiltCard } from "@/components/ui/TiltCard";

const pillars = [
  {
    key: 0,
    color: "#d55d25",
    href: "/labs",
    image: "/images/generated/pillars/labs-pillar.png",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M12 4v9L6.5 25a2 2 0 001.8 3h15.4a2 2 0 001.8-3L20 13V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M10 4h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="14" cy="20" r="1.5" fill="currentColor" opacity="0.4" />
        <circle cx="19" cy="22" r="1" fill="currentColor" opacity="0.3" />
      </svg>
    ),
  },
  {
    key: 1,
    color: "#D7263D",
    href: "/circle",
    image: "/images/generated/pillars/circle-pillar.png",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="16" cy="16" r="6" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <circle cx="16" cy="16" r="2" fill="currentColor" opacity="0.5" />
      </svg>
    ),
  },
  {
    key: 2,
    color: "#A855F7",
    href: "/studio",
    image: "/images/generated/pillars/studio-pillar.png",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="6" width="24" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M13 12l7 4-7 4V12z" fill="currentColor" opacity="0.4" />
      </svg>
    ),
  },
  {
    key: 3,
    color: "#E8A317",
    href: "/academy",
    image: "/images/generated/pillars/academy-pillar.png",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 4L4 11l12 7 12-7L16 4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M6 14v8l10 6 10-6v-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export function PillarGrid() {
  const t = useTranslations("pillars");

  return (
    <section className="section-padding relative overflow-hidden bg-[#FAFAFA]">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] pointer-events-none opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(213,93,37,0.1)_0%,transparent_70%)]" />
      </div>

      <Container>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          centered
          light={false}
          size="lg"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto mt-14"
        >
          {pillars.map((pillar) => (
            <motion.div
              key={pillar.key}
              variants={blurFadeUp}
              className=""
            >
              <Link href={pillar.href} className="block h-full">
                <TiltCard
                  glowColor={pillar.color}
                  className="relative overflow-hidden rounded-2xl p-8 h-full group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/[0.06]"
                  style={{
                    background: `linear-gradient(135deg, ${pillar.color}08 0%, ${pillar.color}03 100%)`,
                    border: `1px solid ${pillar.color}18`,
                  }}
                >
                  {/* Hover-reveal background image */}
                  <div className="absolute inset-0 overflow-hidden rounded-2xl" aria-hidden="true">
                    <Image src={pillar.image} alt="" fill className="object-cover opacity-0 group-hover:opacity-[0.08] transition-opacity duration-700 mix-blend-luminosity" sizes="(max-width: 768px) 100vw, 50vw" />
                  </div>

                  {/* Grid-dot pattern for Labs featured card */}
                  {pillar.key === 0 && (
                    <svg className="absolute inset-0 w-full h-full opacity-[0.04]" aria-hidden="true">
                      <pattern id="grid-dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                        <circle cx="16" cy="16" r="1" fill={pillar.color} />
                      </pattern>
                      <rect width="100%" height="100%" fill="url(#grid-dots)" />
                    </svg>
                  )}

                  {/* Corner glow */}
                  <div
                    className="absolute -top-20 -right-20 w-56 h-56 rounded-full opacity-0 group-hover:opacity-20 transition-all duration-700"
                    style={{ background: `radial-gradient(circle, ${pillar.color}, transparent)` }}
                  />

                  {/* Shimmer line on hover */}
                  <div
                    className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${pillar.color}40, transparent)`,
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: `${pillar.color}12`,
                        color: pillar.color,
                      }}
                    >
                      {pillar.icon}
                    </div>

                    <h3 className="text-xl font-bold text-[#1d1d1f] mb-2">
                      {t(`items.${pillar.key}.name`)}
                    </h3>
                    <p className="text-[#6e6e73] leading-relaxed text-sm">
                      {t(`items.${pillar.key}.description`)}
                    </p>

                    {/* Link with arrow */}
                    <div className="mt-5 flex items-center gap-2 text-sm font-semibold transition-all duration-300 group-hover:gap-3" style={{ color: pillar.color }}>
                      {t(`items.${pillar.key}.link`)}
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      >
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </TiltCard>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
