"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const steps = [
  { nameKey: "step01Name", color: "#d55d25" },
  { nameKey: "step02Name", color: "#D7263D" },
  { nameKey: "step03Name", color: "#A855F7" },
  { nameKey: "step04Name", color: "#E8A317" },
] as const;

export function ReputationModel() {
  const t = useTranslations("dossier");
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-15%" });
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 0.7, 1],
    prefersReducedMotion ? [0, 0, 0, 0, 0] : [4, 1, 0, -1, -4]
  );

  return (
    <section ref={sectionRef} className="py-40 px-6 lg:px-8 relative">
      <div className="max-w-5xl mx-auto text-center" ref={containerRef}>
        {/* 4 words in large typography */}
        <motion.div style={{ perspective: 800 }}>
          <motion.div
            className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-4"
            style={{ rotateX }}
          >
            {steps.map((step, index) => (
              <div key={step.nameKey} className="flex items-center gap-4">
                <motion.span
                  className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal"
                  style={{ color: step.color }}
                  initial={{ opacity: 0, y: 24, scale: 0.9 }}
                  animate={
                    isInView
                      ? { opacity: 1, y: 0, scale: 1 }
                      : { opacity: 0, y: 24, scale: 0.9 }
                  }
                  transition={{
                    duration: 0.6,
                    delay: index * 0.2,
                    ease: [0.16, 1, 0.3, 1],
                    scale: { type: "spring", stiffness: 300, damping: 15, delay: index * 0.2 },
                  }}
                >
                  {t(step.nameKey)}
                </motion.span>

                {/* Arrow separator — not after last */}
                {index < steps.length - 1 && (
                  <motion.span
                    className="hidden md:block text-[#a1a1a6] text-2xl font-light"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.2 + 0.1,
                    }}
                  >
                    →
                  </motion.span>
                )}
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Description */}
        <motion.p
          className="font-sans text-lg md:text-xl text-[#6e6e73] text-center mt-12 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          {t("modelTransition")}
        </motion.p>

        {/* Payoff */}
        <motion.p
          className="font-serif text-xl md:text-2xl text-[#1d1d1f] text-center mt-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7, delay: 1 }}
        >
          {t("modelPayoff")}
        </motion.p>

        {/* CTA */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 text-sm text-[#6e6e73] hover:text-labs transition-colors duration-300"
          >
            {t("modelCta")}
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
