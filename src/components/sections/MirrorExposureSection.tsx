"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { stagger, reveal } from "@/lib/animations";

const stepNumbers = ["01", "02", "03", "04"];

export function MirrorExposureSection() {
  const t = useTranslations("mirror");

  const steps = [0, 1, 2, 3] as const;

  return (
    <section className="bg-navy section-padding">
      <Container>
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            light
            serif
          />
        </motion.div>

        <motion.p
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-white/70 mt-4 max-w-2xl mb-12"
        >
          {t("description")}
        </motion.p>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-0"
        >
          {steps.map((i) => (
            <motion.div
              key={i}
              variants={reveal}
              className="border-t border-white/10 py-8"
            >
              <div className="grid grid-cols-[80px_1fr] md:grid-cols-[120px_1fr] gap-4 items-start">
                <span className="font-serif text-4xl md:text-5xl text-gold/40">
                  {stepNumbers[i]}
                </span>
                <div>
                  <p className="font-semibold text-white text-lg mb-1">
                    {t(`steps.${i}.title`)}
                  </p>
                  <p className="text-white/60">
                    {t(`steps.${i}.description`)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
