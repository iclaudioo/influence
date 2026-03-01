"use client";

import React from "react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { fadeUp, staggerContainer } from "@/lib/animations";

type Props = {
  namespace: string;
  accentColor: string;
};

export function ServiceHero({ namespace, accentColor }: Props) {
  const t = useTranslations(namespace);

  return (
    <section className="relative min-h-[70vh] flex items-center pt-24 bg-navy overflow-hidden">
      {/* Gradient overlay toward accent color */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, transparent 50%, ${accentColor}15 100%)`,
        }}
      />

      <Container className="relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <motion.p
            variants={fadeUp}
            className="mb-4 text-sm uppercase tracking-[0.15em] font-medium"
            style={{ color: accentColor }}
          >
            {t("hero.eyebrow")}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6"
          >
            {t("hero.title")}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-white/70 max-w-2xl"
          >
            {t("hero.subtitle")}
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
