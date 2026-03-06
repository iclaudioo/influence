"use client";

import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { blurFadeUp, staggerContainer } from "@/lib/animations";

type Props = {
  namespace: string;
  accentColor: string;
};

export function ServiceCTA({ namespace, accentColor }: Props) {
  const t = useTranslations(namespace);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative bg-navy section-padding overflow-hidden">
      {/* Multi-layer gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, ${accentColor}15 0%, transparent 60%), linear-gradient(135deg, transparent 50%, ${accentColor}08 100%)`,
        }}
      />

      {/* Concentric rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${150 + i * 120}px`,
              height: `${150 + i * 120}px`,
              border: `1px solid ${accentColor}08`,
            }}
          />
        ))}
      </div>

      <Container className="relative z-10">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center max-w-2xl mx-auto"
        >
          <motion.h2
            variants={blurFadeUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.1]"
          >
            {t("cta.title")}
          </motion.h2>

          <motion.div variants={blurFadeUp} className="mt-10">
            <div className="relative group inline-block">
              <div
                className="absolute -inset-1 rounded-full blur-xl transition-all duration-500 opacity-40 group-hover:opacity-60"
                style={{ backgroundColor: `${accentColor}30` }}
              />
              <div className="relative">
                <Button
                  variant="primary"
                  href="/contact"
                  accentColor={accentColor}
                >
                  {t("cta.button")}
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
