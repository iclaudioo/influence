"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { fadeUp } from "@/lib/animations";

export function CTABanner() {
  const t = useTranslations("ctaBanner");

  return (
    <section
      className="section-padding relative overflow-hidden grain"
      style={{ background: "linear-gradient(135deg, #02182B 0%, #0a2540 50%, #02182B 100%)" }}
    >
      {/* Bold orange glow center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(213,93,37,0.25) 0%, transparent 60%)" }}
      />

      {/* Decorative ripple SVG */}
      <svg
        className="absolute -right-32 top-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-[0.18]"
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
            stroke="#d55d25"
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

          <motion.div variants={fadeUp} className="mt-8 flex justify-center">
            <div className="animate-breathing-glow rounded-full">
              <Button href="/contact" className="text-lg px-12 py-4">{t("cta")}</Button>
            </div>
          </motion.div>

          <p className="mt-4 text-white/60 text-sm">{t("phone")}</p>
        </motion.div>
      </Container>
    </section>
  );
}
