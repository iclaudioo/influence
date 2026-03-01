"use client";

import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { reveal, stagger } from "@/lib/animations";

type Props = {
  namespace: string;
  accentColor: string;
};

export function ServiceCTA({ namespace, accentColor }: Props) {
  const t = useTranslations(namespace);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-navy section-padding">
      <Container>
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center"
        >
          <motion.h2
            variants={reveal}
            className="font-serif text-3xl md:text-4xl font-normal tracking-[-0.04em] text-white text-center"
          >
            {t("cta.title")}
          </motion.h2>

          <motion.div variants={reveal} className="mt-8">
            <Button
              variant="primary"
              href="/contact"
              accentColor={accentColor}
            >
              {t("cta.button")}
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
