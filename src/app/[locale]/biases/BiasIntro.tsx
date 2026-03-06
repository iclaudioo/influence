"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { staggerContainer, blurFadeUp, fadeUp } from "@/lib/animations";

const ACCENT = "#d55d25";

export function BiasIntro() {
  const t = useTranslations("biases");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding relative overflow-hidden bg-[#f8f6f3]">
      {/* Subtle accent glow */}
      <div
        className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none opacity-[0.04]"
        style={{ background: `radial-gradient(circle, ${ACCENT}, transparent 70%)` }}
      />

      <Container>
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <motion.h2
            variants={blurFadeUp}
            className="text-3xl md:text-4xl font-bold tracking-[-0.02em] text-[#02182B] mb-10"
          >
            {t("intro.title")}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <motion.div variants={fadeUp}>
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 text-sm font-bold"
                style={{ backgroundColor: `${ACCENT}12`, color: ACCENT }}
              >
                S1
              </div>
              <h3 className="text-lg font-semibold text-[#02182B] mb-2">System 1</h3>
              <p className="text-[#02182B]/60 leading-relaxed text-sm">
                {t("intro.system1")}
              </p>
            </motion.div>

            <motion.div variants={fadeUp}>
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 text-sm font-bold"
                style={{ backgroundColor: `${ACCENT}12`, color: ACCENT }}
              >
                S2
              </div>
              <h3 className="text-lg font-semibold text-[#02182B] mb-2">System 2</h3>
              <p className="text-[#02182B]/60 leading-relaxed text-sm">
                {t("intro.system2")}
              </p>
            </motion.div>
          </div>

          <motion.div
            variants={blurFadeUp}
            className="rounded-xl p-6 border border-[#02182B]/10"
            style={{ backgroundColor: `${ACCENT}06` }}
          >
            <p className="text-[#02182B]/70 leading-relaxed">
              {t("intro.relevance")}
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
