"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { CaseStudyCard } from "@/components/ui/CaseStudyCard";
import { stagger, reveal } from "@/lib/animations";

export function CaseStudySection() {
  const t = useTranslations("caseStudies");

  return (
    <section className="bg-navy section-padding">
      <Container>
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="eyebrow text-gold/60 mb-4 flex items-center">
            <span className="inline-block w-6 h-0.5 mr-3 bg-gold/40" />
            {t("eyebrow")}
          </p>
          <h2 className="font-serif font-normal tracking-[-0.04em] text-4xl md:text-5xl text-white">
            {t("title")}
          </h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-6"
        >
          {/* Featured card — 3 cols */}
          <div className="lg:col-span-3">
            <CaseStudyCard
              metric={t("items.0.metric")}
              client={t("items.0.client")}
              result={t("items.0.result")}
              featured
            />
          </div>

          {/* Stacked cards — 2 cols */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <CaseStudyCard
              metric={t("items.1.metric")}
              client={t("items.1.client")}
              result={t("items.1.result")}
            />
            <CaseStudyCard
              metric={t("items.2.metric")}
              client={t("items.2.client")}
              result={t("items.2.result")}
            />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
