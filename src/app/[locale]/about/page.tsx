"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { CTABanner } from "@/components/sections/CTABanner";
import { fadeUp, staggerContainer } from "@/lib/animations";

export default function AboutPage() {
  const t = useTranslations("about");

  const values = t.raw("values.items") as {
    title: string;
    description: string;
  }[];

  return (
    <>
      {/* Hero */}
      <section className="bg-navy min-h-[60vh] flex items-center pt-24">
        <Container>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <motion.p variants={fadeUp} className="eyebrow text-white/70 mb-4">
              {t("hero.eyebrow")}
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-6xl font-bold tracking-[-0.02em]"
            >
              {t("hero.title")}
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-lg md:text-xl text-white/80 mt-6 max-w-xl"
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
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div variants={fadeUp}>
              <SectionHeading
                eyebrow={t("mission.eyebrow")}
                title={t("mission.title")}
                centered
                light={false}
              />
            </motion.div>
            <motion.p
              variants={fadeUp}
              className="text-lg text-navy/70 mt-6 max-w-2xl mx-auto"
            >
              {t("mission.description")}
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* Values */}
      <section className="bg-navy section-padding">
        <Container>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeUp}>
              <SectionHeading
                eyebrow={t("values.eyebrow")}
                title={t("values.title")}
                centered
                light
              />
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-4xl mx-auto">
              {values.map(
                (
                  value: { title: string; description: string },
                  i: number
                ) => (
                  <motion.div key={i} variants={fadeUp}>
                    <Card hover>
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
