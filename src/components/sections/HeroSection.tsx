"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { fadeUp, staggerContainer } from "@/lib/animations";

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-screen flex items-center bg-navy pt-24 overflow-hidden">
      <Container>
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left column */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.p
              variants={fadeUp}
              className="text-sm uppercase tracking-[0.15em] font-medium text-white/70 mb-4"
            >
              {t("eyebrow")}
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-[-0.02em] text-white"
            >
              {t("title")}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg md:text-xl text-white/80 max-w-xl mt-6"
            >
              {t("subtitle")}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex gap-4 flex-wrap"
            >
              <Button href="/contact">{t("cta")}</Button>
              <Button href="/about" variant="secondary">
                {t("ctaSecondary")}
              </Button>
            </motion.div>
          </motion.div>

          {/* Right column — animated ripple */}
          <div className="hidden lg:block">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <svg
                viewBox="0 0 500 500"
                className="w-full h-full"
                aria-hidden="true"
              >
                {[1, 2, 3, 4, 5].map((i) => (
                  <circle
                    key={i}
                    cx="250"
                    cy="250"
                    r={50 + i * 45}
                    fill="none"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="1"
                    className="hero-ripple"
                    style={{
                      animationDelay: `${i * 1.2}s`,
                      opacity: 0.6 - i * 0.1,
                    }}
                  />
                ))}

                {/* Center dot */}
                <circle cx="250" cy="250" r="6" fill="rgba(255,255,255,0.3)" />
              </svg>

            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
