"use client";

import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { blurFadeUp, staggerContainer } from "@/lib/animations";

type Props = {
  namespace: string;
  accentColor: string;
};

export function DeliverablesGrid({ namespace, accentColor }: Props) {
  const t = useTranslations(namespace);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const items = t.raw("deliverables.items") as Array<{
    title: string;
    description: string;
  }>;

  return (
    <section className="bg-off-white section-padding relative overflow-hidden">
      {/* Subtle accent glow */}
      <div
        className="absolute top-0 right-0 w-[400px] h-[400px] pointer-events-none"
        style={{ background: `radial-gradient(circle, ${accentColor}04 0%, transparent 60%)` }}
      />

      <Container>
        <SectionHeading
          eyebrow={t("deliverables.eyebrow")}
          title={t("deliverables.title")}
          light={false}
          accentColor={accentColor}
        />

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12"
        >
          {items.map((item, index) => (
            <motion.div key={index} variants={blurFadeUp}>
              <Card accentColor={accentColor} hover={true}>
                {/* Index number */}
                <span
                  className="text-xs font-bold tracking-widest mb-3 block"
                  style={{ color: `${accentColor}80` }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg font-bold text-navy mb-2">{item.title}</h3>
                <p className="text-navy/60 text-sm leading-relaxed">{item.description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
