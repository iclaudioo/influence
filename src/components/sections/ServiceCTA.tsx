"use client";

import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { fadeUp, staggerContainer } from "@/lib/animations";

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
      {/* Gradient overlay toward accent color */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, transparent 50%, ${accentColor}15 100%)`,
        }}
      />

      <Container className="relative z-10">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center"
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-4xl font-bold text-white text-center"
          >
            {t("cta.title")}
          </motion.h2>

          <motion.div variants={fadeUp} className="mt-8">
            <Button
              variant="primary"
              href="/contact"
              accentColor={accentColor}
            >
              {t("cta.button")}
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
