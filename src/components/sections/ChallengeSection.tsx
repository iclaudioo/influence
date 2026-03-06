"use client";

import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { blurFadeUp, staggerContainer } from "@/lib/animations";

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
    <section className="bg-off-white section-padding relative overflow-hidden">
      {/* Subtle accent glow */}
      <div
        className="absolute bottom-0 right-0 w-[300px] h-[300px] pointer-events-none"
        style={{ background: `radial-gradient(circle, ${accentColor}04 0%, transparent 60%)` }}
      />

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
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
        >
          {challenges.map((challenge, index) => (
            <motion.div
              key={index}
              variants={blurFadeUp}
              className="group relative bg-white rounded-2xl p-8 shadow-md shadow-navy/[0.03] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Accent border */}
              <div
                className="absolute inset-y-0 left-0 w-[3px] rounded-l-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: accentColor }}
              />
              {/* Index number */}
              <span
                className="text-[10px] font-bold tracking-widest mb-3 block"
                style={{ color: `${accentColor}70` }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-lg font-bold text-navy mb-2">
                {challenge.title}
              </h3>
              <p className="text-navy/55 text-sm leading-relaxed">{challenge.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
