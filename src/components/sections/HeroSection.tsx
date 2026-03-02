"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SpiralAnimation } from "@/components/ui/SpiralAnimation";
import { BackgroundCircles } from "@/components/ui/BackgroundCircles";
import {
  heroStagger,
  fadeUp,
  blurIn,
  scaleIn,
} from "@/lib/animations";

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-navy pt-24 overflow-hidden"
    >
      {/* Spiral animation background */}
      <div className="absolute inset-0 pointer-events-none">
        <SpiralAnimation />
      </div>

      {/* Background circles */}
      <BackgroundCircles variant="orange" />

      {/* Content */}
      <Container>
        <motion.div
          variants={heroStagger}
          initial="hidden"
          animate="visible"
          className="relative z-10 text-center max-w-4xl mx-auto"
        >
          <motion.p
            variants={fadeUp}
            className="text-sm uppercase tracking-[0.15em] font-medium text-[#d55d25] mb-4"
          >
            {t("eyebrow")}
          </motion.p>

          <motion.h1
            variants={blurIn}
            className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-[-0.04em] text-gradient-orange"
          >
            {t("title")}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mt-6"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            variants={scaleIn}
            className="mt-8 flex gap-4 flex-wrap justify-center"
          >
            <Button href="/contact" accentColor="#d55d25">
              {t("cta")}
            </Button>
            <Button href="/about" variant="secondary">
              {t("ctaSecondary")}
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
