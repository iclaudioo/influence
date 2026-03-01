"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { stagger, reveal } from "@/lib/animations";

const services = [
  { key: 0, href: "/labs" },
  { key: 1, href: "/circle" },
  { key: 2, href: "/studio" },
  { key: 3, href: "/academy" },
] as const;

export function ServicesList() {
  const t = useTranslations("pillars");

  return (
    <section className="bg-navy section-padding">
      <Container>
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            light
            serif
          />
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 space-y-0"
        >
          {services.map((service) => (
            <motion.div key={service.key} variants={reveal}>
              <Link
                href={service.href}
                className="group block border-t border-white/10 py-8"
              >
                <div className="flex items-start gap-6">
                  {/* Gold left accent */}
                  <div className="w-1 self-stretch bg-gold/30 group-hover:bg-gold transition-colors duration-300 flex-shrink-0" />

                  <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {t(`items.${service.key}.name`)}
                      </h3>
                      <p className="text-white/60 max-w-lg">
                        {t(`items.${service.key}.description`)}
                      </p>
                    </div>
                    <span className="text-gold font-medium flex items-center gap-1 flex-shrink-0">
                      {t(`items.${service.key}.link`)}
                      <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                        &rarr;
                      </span>
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
