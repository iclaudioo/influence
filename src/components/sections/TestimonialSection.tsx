"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { fadeIn } from "@/lib/animations";

export function TestimonialSection() {
  const t = useTranslations("testimonial");

  return (
    <section className="bg-off-white section-padding relative overflow-hidden">
      {/* Subtle radial glow */}
      <div
        className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(15,163,177,0.06) 0%, transparent 60%)" }}
      />

      <Container>
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {/* Quote text */}
          <blockquote className="border-l-4 border-labs pl-8">
            <p className="text-2xl md:text-3xl font-serif text-navy italic leading-relaxed">
              {t("quote")}
            </p>
          </blockquote>

          {/* Attribution */}
          <div className="mt-8 pl-8">
            <p className="font-bold text-navy">{t("name")}</p>
            <p className="text-navy/60">
              {t("title")}, {t("company")}
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
