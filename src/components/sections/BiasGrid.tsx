"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BiasCard } from "@/components/sections/BiasCard";
import { staggerContainer, blurFadeUp } from "@/lib/animations";

export function BiasGrid() {
  const t = useTranslations("biases");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const items = Array.from({ length: 8 }, (_, i) => ({
    key: t(`items.${i}.key`),
    title: t(`items.${i}.title`),
    oneliner: t(`items.${i}.oneliner`),
    description: t(`items.${i}.description`),
    application: t(`items.${i}.application`),
    service: t(`items.${i}.service`),
    serviceLabel: t(`items.${i}.serviceLabel`),
  }));

  return (
    <section className="section-padding relative overflow-hidden bg-[#FAFAFA]">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] pointer-events-none opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(213,93,37,0.1)_0%,transparent_70%)]" />
      </div>

      <Container>
        <SectionHeading
          eyebrow={t("grid.eyebrow")}
          title={t("grid.title")}
          centered
          light={false}
        />

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto mt-14"
        >
          {items.map((item, i) => (
            <motion.div
              key={item.key}
              variants={blurFadeUp}
              className={i === 0 ? "md:col-span-2 lg:col-span-2 lg:row-span-2" : ""}
            >
              <BiasCard item={item} featured={i === 0} />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
