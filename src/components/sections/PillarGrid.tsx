"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Link } from "@/i18n/navigation";
import { scaleRotate, staggerContainer } from "@/lib/animations";

const pillars = [
  { key: 0, color: "#d55d25", href: "/labs" },
  { key: 1, color: "#D7263D", href: "/circle" },
  { key: 2, color: "#A855F7", href: "/studio" },
  { key: 3, color: "#E8A317", href: "/academy" },
] as const;

export function PillarGrid() {
  const t = useTranslations("pillars");

  return (
    <section className="bg-navy section-padding grain relative">
      <Container>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          centered
          light={true}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12"
        >
          {pillars.map((pillar) => (
            <motion.div
              key={pillar.key}
              variants={scaleRotate}
              className={pillar.key === 0 ? "md:col-span-2 md:row-span-2" : ""}
            >
              <Link href={pillar.href} className="block h-full">
                <div
                  className="relative overflow-hidden rounded-2xl p-8 backdrop-blur-xl border transition-all duration-300 hover:-translate-y-2 h-full group"
                  style={{
                    backgroundColor: `${pillar.color}10`,
                    borderColor: `${pillar.color}25`,
                    boxShadow: `0 0 40px ${pillar.color}15`,
                  }}
                >
                  {/* Grid-dot pattern for Labs featured card */}
                  {pillar.key === 0 && (
                    <svg className="absolute inset-0 w-full h-full opacity-[0.06]" aria-hidden="true">
                      <pattern id="grid-dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                        <circle cx="16" cy="16" r="1" fill={pillar.color} />
                      </pattern>
                      <rect width="100%" height="100%" fill="url(#grid-dots)" />
                    </svg>
                  )}

                  {/* Corner glow */}
                  <div
                    className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-10 group-hover:opacity-25 transition-opacity duration-500"
                    style={{ background: `radial-gradient(circle, ${pillar.color}, transparent)` }}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white">
                      {t(`items.${pillar.key}.name`)}
                    </h3>
                    <p className="text-white/60 mt-2">
                      {t(`items.${pillar.key}.description`)}
                    </p>
                    <p className="mt-4 font-semibold" style={{ color: pillar.color }}>
                      {t(`items.${pillar.key}.link`)} &rarr;
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
