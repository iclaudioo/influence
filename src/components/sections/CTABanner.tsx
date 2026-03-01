"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { fadeUp } from "@/lib/animations";

export function CTABanner() {
  const t = useTranslations("ctaBanner");

  return (
    <section className="bg-navy section-padding relative overflow-hidden">
      {/* Decorative ripple SVG */}
      <svg
        className="absolute -right-32 top-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-[0.08]"
        viewBox="0 0 500 500"
        aria-hidden="true"
      >
        {[1, 2, 3, 4, 5].map((i) => (
          <circle
            key={i}
            cx="250"
            cy="250"
            r={40 + i * 45}
            fill="none"
            stroke="white"
            strokeWidth="1"
          />
        ))}
      </svg>

      <Container className="relative z-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            {t("title")}
          </h2>

          <div className="mt-8">
            <Button href="/contact">{t("cta")}</Button>
          </div>

          <p className="mt-4 text-white/60 text-sm">{t("phone")}</p>
        </motion.div>
      </Container>
    </section>
  );
}
