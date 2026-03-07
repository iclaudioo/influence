"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeUp, staggerContainer, blurFadeUp } from "@/lib/animations";

const painIcons = [
  // Invisible / hidden
  <svg key="0" width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path d="M4 14h2M22 14h2M14 4v2M14 22v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    <circle cx="14" cy="14" r="7" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
    <path d="M11 17l6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>,
  // Scattered / no strategy
  <svg key="1" width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path d="M7 7l3 3M18 18l3 3M7 21l3-3M18 10l3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    <circle cx="14" cy="14" r="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M14 4v3M14 21v3M4 14h3M21 14h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>,
  // No ROI / measurement
  <svg key="2" width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect x="4" y="8" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 20l4-4 3 2 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 4h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
  </svg>,
];

export function PainPointSection() {
  const t = useTranslations("painPoints");

  const items = [0, 1, 2] as const;

  return (
    <section className="relative section-padding overflow-hidden bg-white">
      {/* Subtle red ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none" style={{
        background: "radial-gradient(ellipse, rgba(215,38,61,0.06) 0%, transparent 70%)",
      }} />

      <Container className="relative z-10">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title=""
          centered
          light={false}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14"
        >
          {items.map((i) => (
            <motion.div
              key={i}
              variants={blurFadeUp}
              className="group relative rounded-2xl p-8 overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(215,38,61,0.04) 0%, rgba(215,38,61,0.01) 100%)",
                border: "1px solid rgba(0,0,0,0.06)",
              }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
                background: "radial-gradient(ellipse at 50% 0%, rgba(215,38,61,0.08) 0%, transparent 70%)",
              }} />

              {/* Number */}
              <div className="flex items-center gap-4 mb-5 relative z-10">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-circle/80" style={{
                  backgroundColor: "rgba(215,38,61,0.10)",
                }}>
                  {painIcons[i]}
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#a1a1a6] font-medium font-serif">
                  0{i + 1}
                </span>
              </div>

              <h3 className="text-lg font-bold text-[#1d1d1f] relative z-10">
                {t(`items.${i}.title`)}
              </h3>
              <p className="text-[#6e6e73] mt-3 text-sm leading-relaxed relative z-10">
                {t(`items.${i}.description`)}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-lg font-semibold text-center mt-14 max-w-xl mx-auto"
        >
          <span className="text-gradient-warm">{t("solution")}</span>
        </motion.p>
      </Container>
    </section>
  );
}
