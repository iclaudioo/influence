"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { FounderSection } from "@/components/sections/FounderSection";
import { CTABanner } from "@/components/sections/CTABanner";
import { reveal, stagger } from "@/lib/animations";

export default function AboutPage() {
  const t = useTranslations("about");

  const values = t.raw("values.items") as {
    title: string;
    description: string;
  }[];

  return (
    <>
      {/* Hero */}
      <section className="bg-navy min-h-[70vh] flex items-center pt-24">
        <Container>
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <motion.div variants={reveal} className="mb-4">
              <div className="w-8 h-px bg-gold" />
            </motion.div>
            <motion.p variants={reveal} className="eyebrow text-gold/60 mb-4">
              {t("hero.eyebrow")}
            </motion.p>
            <motion.h1
              variants={reveal}
              className="font-serif text-5xl md:text-6xl font-normal tracking-[-0.04em]"
            >
              {t("hero.title")}
            </motion.h1>
            <motion.p
              variants={reveal}
              className="text-lg md:text-xl text-white/70 mt-6 max-w-xl"
            >
              {t("hero.subtitle")}
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* Mission */}
      <section className="bg-off-white section-padding">
        <Container>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div variants={reveal}>
              <SectionHeading
                eyebrow={t("mission.eyebrow")}
                title={t("mission.title")}
                centered
                light={false}
                serif
              />
            </motion.div>
            {/* Pull-quote style description */}
            <motion.p
              variants={reveal}
              className="font-serif text-2xl md:text-3xl text-navy/80 mt-8 leading-relaxed"
            >
              {t("mission.description")}
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* Founder */}
      <FounderSection />

      {/* Values */}
      <section className="bg-navy section-padding">
        <Container>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={reveal}>
              <SectionHeading
                eyebrow={t("values.eyebrow")}
                title={t("values.title")}
                centered
                light
                serif
              />
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-4xl mx-auto">
              {values.map(
                (
                  value: { title: string; description: string },
                  i: number
                ) => (
                  <motion.div key={i} variants={reveal}>
                    <Card hover accentColor="#C4A265">
                      <h3 className="text-xl font-bold text-navy">
                        {value.title}
                      </h3>
                      <p className="text-navy/70 mt-2">{value.description}</p>
                    </Card>
                  </motion.div>
                )
              )}
            </div>
          </motion.div>
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
