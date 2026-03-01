"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { staggerSlow, reveal, revealSlow } from "@/lib/animations";

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-navy pt-24">
      <Container>
        <motion.div
          variants={staggerSlow}
          initial="hidden"
          animate="visible"
          className="relative z-10 text-center max-w-4xl mx-auto"
        >
          {/* Gold accent line */}
          <motion.div variants={reveal} className="flex justify-center mb-6">
            <div className="w-12 h-px bg-gold" />
          </motion.div>

          <motion.p
            variants={reveal}
            className="text-sm uppercase tracking-[0.15em] font-medium text-gold mb-6"
          >
            {t("eyebrow")}
          </motion.p>

          <motion.h1
            variants={revealSlow}
            className="font-serif text-6xl md:text-7xl font-normal tracking-[-0.04em] text-white"
          >
            {t("title")}
          </motion.h1>

          <motion.p
            variants={reveal}
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mt-6"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            variants={reveal}
            className="mt-10 flex gap-4 flex-wrap justify-center"
          >
            <Button href="/contact">{t("cta")}</Button>
            <Button href="/about" variant="secondary" accentColor="#C4A265">
              {t("ctaSecondary")}
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
