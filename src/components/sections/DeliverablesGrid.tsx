"use client";

import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { fadeUp, staggerContainer } from "@/lib/animations";

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
    <section className="bg-off-white section-padding">
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
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12"
        >
          {items.map((item, index) => (
            <motion.div key={index} variants={fadeUp}>
              <Card accentColor={accentColor} hover={true}>
                <h3 className="text-xl font-bold text-navy">{item.title}</h3>
                <p className="text-navy/70 mt-2">{item.description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
