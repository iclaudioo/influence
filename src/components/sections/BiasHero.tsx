"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { heroStagger, fadeUp, blurFadeUp } from "@/lib/animations";

const ACCENT = "#d55d25";

export function BiasHero() {
  const t = useTranslations("biases");

  return (
    <section
      className="relative min-h-[70vh] flex items-center pt-24 overflow-hidden"
      style={{
        background: `radial-gradient(ellipse at 30% 70%, ${ACCENT}10 0%, transparent 50%), radial-gradient(ellipse at 70% 30%, ${ACCENT}06 0%, transparent 50%), linear-gradient(180deg, var(--color-navy) 0%, var(--color-navy-dark) 100%)`,
      }}
    >
      {/* Brain network SVG decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <svg
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.08]"
          viewBox="0 0 500 500"
        >
          {/* Nodes */}
          <circle cx="250" cy="100" r="6" fill={ACCENT} />
          <circle cx="380" cy="170" r="8" fill={ACCENT} />
          <circle cx="400" cy="310" r="5" fill={ACCENT} />
          <circle cx="320" cy="400" r="7" fill={ACCENT} />
          <circle cx="180" cy="400" r="6" fill={ACCENT} />
          <circle cx="100" cy="310" r="5" fill={ACCENT} />
          <circle cx="120" cy="170" r="7" fill={ACCENT} />
          <circle cx="250" cy="250" r="10" fill={ACCENT} />
          {/* Secondary nodes */}
          <circle cx="310" cy="130" r="4" fill={ACCENT} opacity="0.6" />
          <circle cx="190" cy="130" r="4" fill={ACCENT} opacity="0.6" />
          <circle cx="340" cy="350" r="4" fill={ACCENT} opacity="0.6" />
          <circle cx="160" cy="350" r="4" fill={ACCENT} opacity="0.6" />

          {/* Outer connections */}
          <line x1="250" y1="100" x2="380" y2="170" stroke={ACCENT} strokeWidth="1" opacity="0.3" />
          <line x1="380" y1="170" x2="400" y2="310" stroke={ACCENT} strokeWidth="1" opacity="0.3" />
          <line x1="400" y1="310" x2="320" y2="400" stroke={ACCENT} strokeWidth="1" opacity="0.3" />
          <line x1="320" y1="400" x2="180" y2="400" stroke={ACCENT} strokeWidth="1" opacity="0.3" />
          <line x1="180" y1="400" x2="100" y2="310" stroke={ACCENT} strokeWidth="1" opacity="0.3" />
          <line x1="100" y1="310" x2="120" y2="170" stroke={ACCENT} strokeWidth="1" opacity="0.3" />
          <line x1="120" y1="170" x2="250" y2="100" stroke={ACCENT} strokeWidth="1" opacity="0.3" />

          {/* Hub connections */}
          <line x1="250" y1="250" x2="250" y2="100" stroke={ACCENT} strokeWidth="1" opacity="0.15" />
          <line x1="250" y1="250" x2="380" y2="170" stroke={ACCENT} strokeWidth="1" opacity="0.15" />
          <line x1="250" y1="250" x2="400" y2="310" stroke={ACCENT} strokeWidth="1" opacity="0.15" />
          <line x1="250" y1="250" x2="320" y2="400" stroke={ACCENT} strokeWidth="1" opacity="0.15" />
          <line x1="250" y1="250" x2="180" y2="400" stroke={ACCENT} strokeWidth="1" opacity="0.15" />
          <line x1="250" y1="250" x2="100" y2="310" stroke={ACCENT} strokeWidth="1" opacity="0.15" />
          <line x1="250" y1="250" x2="120" y2="170" stroke={ACCENT} strokeWidth="1" opacity="0.15" />

          {/* Secondary connections */}
          <line x1="310" y1="130" x2="250" y2="100" stroke={ACCENT} strokeWidth="0.5" opacity="0.2" />
          <line x1="310" y1="130" x2="380" y2="170" stroke={ACCENT} strokeWidth="0.5" opacity="0.2" />
          <line x1="190" y1="130" x2="250" y2="100" stroke={ACCENT} strokeWidth="0.5" opacity="0.2" />
          <line x1="190" y1="130" x2="120" y2="170" stroke={ACCENT} strokeWidth="0.5" opacity="0.2" />
          <line x1="340" y1="350" x2="400" y2="310" stroke={ACCENT} strokeWidth="0.5" opacity="0.2" />
          <line x1="340" y1="350" x2="320" y2="400" stroke={ACCENT} strokeWidth="0.5" opacity="0.2" />
          <line x1="160" y1="350" x2="100" y2="310" stroke={ACCENT} strokeWidth="0.5" opacity="0.2" />
          <line x1="160" y1="350" x2="180" y2="400" stroke={ACCENT} strokeWidth="0.5" opacity="0.2" />

          {/* Animated pulse at center */}
          <circle cx="250" cy="250" r="20" fill="none" stroke={ACCENT} strokeWidth="1" opacity="0.12">
            <animate attributeName="r" values="20;35;20" dur="4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.12;0.03;0.12" dur="4s" repeatCount="indefinite" />
          </circle>
          <circle cx="250" cy="250" r="40" fill="none" stroke={ACCENT} strokeWidth="0.5" opacity="0.06">
            <animate attributeName="r" values="40;55;40" dur="4s" repeatCount="indefinite" begin="1s" />
            <animate attributeName="opacity" values="0.06;0.01;0.06" dur="4s" repeatCount="indefinite" begin="1s" />
          </circle>
        </svg>
      </div>

      {/* Top gradient for navbar blend */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-navy-dark/30 to-transparent pointer-events-none z-10" />

      <Container className="relative z-10">
        <motion.div
          variants={heroStagger}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-5">
            <span
              className="h-px w-8"
              style={{ background: `linear-gradient(90deg, ${ACCENT}, transparent)` }}
            />
            <p
              className="text-xs uppercase tracking-[0.2em] font-medium"
              style={{ color: ACCENT }}
            >
              {t("hero.eyebrow")}
            </p>
          </motion.div>

          <motion.h1
            variants={blurFadeUp}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-[-0.03em] text-white leading-[1.05] mb-6"
          >
            {t("hero.title")}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed font-light"
          >
            {t("hero.subtitle")}
          </motion.p>
        </motion.div>
      </Container>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-navy to-transparent pointer-events-none z-10" />
    </section>
  );
}
