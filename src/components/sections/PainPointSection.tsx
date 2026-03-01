"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeUp, staggerContainer } from "@/lib/animations";

export function PainPointSection() {
  const t = useTranslations("painPoints");

  const items = [0, 1, 2] as const;

  return (
    <section className="bg-off-white text-navy section-padding">
      <Container>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title=""
          centered
          light={false}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
        >
          {items.map((i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="bg-white rounded-2xl p-8 shadow-lg shadow-navy/5"
            >
              <h3 className="text-xl font-bold text-navy">
                {t(`items.${i}.title`)}
              </h3>
              <p className="text-navy/70 mt-3">
                {t(`items.${i}.description`)}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-lg font-semibold text-navy text-center mt-12"
        >
          {t("solution")}
        </motion.p>
      </Container>
    </section>
  );
}
