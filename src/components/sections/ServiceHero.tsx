"use client";

import React, { useId } from "react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { stagger, reveal } from "@/lib/animations";

type Props = {
  namespace: string;
  accentColor: string;
};

export function ServiceHero({ namespace, accentColor }: Props) {
  const t = useTranslations(namespace);
  const patternId = useId();

  return (
    <section className="relative min-h-[70vh] flex items-center pt-24 bg-navy overflow-hidden">
      {/* Subtle accent gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, transparent 50%, ${accentColor}15 100%)`,
        }}
      />

      {/* Subtle dot pattern */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]">
          <pattern id={patternId} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="1" fill={accentColor} />
          </pattern>
          <rect width="100%" height="100%" fill={`url(#${patternId})`} />
        </svg>
      </div>

      <Container className="relative z-10">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* Thin accent line above eyebrow */}
          <motion.div variants={reveal} className="mb-4">
            <div className="w-8 h-px" style={{ backgroundColor: accentColor }} />
          </motion.div>

          <motion.p
            variants={reveal}
            className="mb-4 text-sm uppercase tracking-[0.15em] font-medium"
            style={{ color: accentColor }}
          >
            {t("hero.eyebrow")}
          </motion.p>

          <motion.h1
            variants={reveal}
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-normal tracking-[-0.04em] text-white mb-6"
          >
            {t("hero.title")}
          </motion.h1>

          <motion.p
            variants={reveal}
            className="text-lg md:text-xl text-white/70 max-w-2xl mb-8"
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div variants={reveal}>
            <Button href="/contact" accentColor={accentColor}>
              {t("hero.cta")}
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
