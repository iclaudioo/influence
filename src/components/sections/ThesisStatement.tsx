"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { reveal } from "@/lib/animations";

export function ThesisStatement() {
  const t = useTranslations("painPoints");

  return (
    <section className="bg-off-white py-24 md:py-32">
      <Container>
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Gold accent line */}
          <div className="flex justify-center mb-8">
            <div className="w-12 h-px bg-gold" />
          </div>

          <p className="font-serif text-3xl md:text-4xl text-navy leading-snug">
            {t("solution")}
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
