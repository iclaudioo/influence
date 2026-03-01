"use client";

import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeUp, staggerContainer } from "@/lib/animations";

type Props = {
  namespace: string;
  accentColor: string;
};

export function ChallengeSection({ namespace, accentColor }: Props) {
  const t = useTranslations(namespace);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const challenges = t.raw("challenge.items") as Array<{
    title: string;
    description: string;
  }>;

  return (
    <section className="bg-off-white section-padding">
      <Container>
        <SectionHeading
          eyebrow={t("challenge.eyebrow")}
          title={t("challenge.title")}
          light={false}
          accentColor={accentColor}
        />

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
        >
          {challenges.map((challenge, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              className="bg-white rounded-2xl p-8 shadow-lg shadow-navy/5"
            >
              <h3 className="text-xl font-bold text-navy mb-3">
                {challenge.title}
              </h3>
              <p className="text-navy/70">{challenge.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
