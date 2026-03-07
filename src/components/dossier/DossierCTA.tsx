"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { LeadCaptureForm } from "@/components/ui/LeadCaptureForm";

export function DossierCTA() {
  const t = useTranslations("dossier");

  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-navy relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.h2
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal text-white"
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {t("ctaTitle")}
          </motion.h2>

          <motion.p
            className="font-sans text-base text-white/60 mt-4 max-w-lg mx-auto"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {t("ctaSubtitle")}
          </motion.p>

          <motion.div
            className="mt-10 max-w-md mx-auto"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <LeadCaptureForm
              variant="lead_magnet"
              darkMode
              leadSource="homepage"
              accentColor="#d55d25"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
