"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { fadeIn } from "@/lib/animations";

export function TestimonialSection() {
  const t = useTranslations("testimonial");

  return (
    <section className="bg-off-white section-padding">
      <Container>
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Decorative opening quote */}
          <span
            className="block text-8xl leading-none font-serif text-navy/10 select-none"
            aria-hidden="true"
          >
            &ldquo;
          </span>

          {/* Quote text */}
          <blockquote className="-mt-8">
            <p className="text-2xl md:text-3xl font-medium text-navy text-center italic max-w-4xl mx-auto">
              {t("quote")}
            </p>
          </blockquote>

          {/* Attribution */}
          <div className="mt-8">
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
