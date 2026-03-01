"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { reveal } from "@/lib/animations";

export function CTABanner() {
  const t = useTranslations("ctaBanner");

  return (
    <section className="bg-off-white section-padding">
      <Container>
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-normal tracking-[-0.04em] text-navy">
            {t("title")}
          </h2>

          <div className="mt-8 flex justify-center">
            <Button href="/contact" className="text-lg px-12 py-4">
              {t("cta")}
            </Button>
          </div>

          <p className="mt-4 text-navy/40 text-sm">{t("phone")}</p>
        </motion.div>
      </Container>
    </section>
  );
}
