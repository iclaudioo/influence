"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import {
  heroStaggerSequential,
  heroDescriptionReveal,
  heroButtonReveal,
} from "@/lib/animations";
import { Link } from "@/i18n/navigation";
import { SplitText } from "@/components/ui/SplitText";

export function DossierHero() {
  const t = useTranslations("dossier");
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 50]);
  const headlineScale = useTransform(scrollYProgress, [0, 0.5], [1, prefersReducedMotion ? 1 : 1.04]);

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center justify-center relative dot-grid">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-48 w-full text-center">
        <motion.div
          variants={heroStaggerSequential}
          initial="hidden"
          animate="visible"
        >
          <motion.div style={{ y: headlineY, scale: headlineScale }}>
            <SplitText
              as="h1"
              mode="character"
              trigger="animate"
              delay={0.8}
              className="font-serif text-5xl md:text-7xl lg:text-[96px] font-normal leading-[1.05] text-[#1d1d1f]"
            >
              {t("heroTitle")}
            </SplitText>
          </motion.div>

          <motion.p
            className="font-sans text-lg md:text-xl text-[#6e6e73] font-light mt-8 max-w-xl mx-auto leading-relaxed"
            variants={heroDescriptionReveal}
          >
            {t("heroSubtitle")}
          </motion.p>

          <motion.div variants={heroButtonReveal} className="mt-12">
            <Link
              href="/labs"
              className="group inline-flex items-center gap-3 rounded-full bg-labs px-8 py-4 text-white font-semibold text-sm transition-all duration-300 hover:brightness-110 shadow-[0_0_30px_rgba(213,93,37,0.2)] hover:shadow-[0_0_40px_rgba(213,93,37,0.3)] focus-visible:ring-2 focus-visible:ring-[#1d1d1f] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              {t("heroCta")}
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
