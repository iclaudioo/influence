"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Link } from "@/i18n/navigation";
import { fadeUp, staggerContainer } from "@/lib/animations";

const pillars = [
  { key: 0, color: "#0FA3B1", href: "/labs" },
  { key: 1, color: "#D7263D", href: "/circle" },
  { key: 2, color: "#A855F7", href: "/studio" },
  { key: 3, color: "#E8A317", href: "/academy" },
] as const;

export function PillarGrid() {
  const t = useTranslations("pillars");

  return (
    <section className="bg-off-white section-padding">
      <Container>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          centered
          light={false}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-12"
        >
          {pillars.map((pillar) => (
            <motion.div key={pillar.key} variants={fadeUp}>
              <Link href={pillar.href} className="block h-full">
                <Card accentColor={pillar.color} hover className="h-full">
                  <h3 className="text-xl font-bold text-navy">
                    {t(`items.${pillar.key}.name`)}
                  </h3>
                  <p className="text-navy/70 mt-2">
                    {t(`items.${pillar.key}.description`)}
                  </p>
                  <p
                    className="mt-4 font-semibold"
                    style={{ color: pillar.color }}
                  >
                    {t(`items.${pillar.key}.link`)} &rarr;
                  </p>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
