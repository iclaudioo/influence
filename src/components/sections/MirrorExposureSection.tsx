"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { fadeUp, staggerContainer, springScale } from "@/lib/animations";

const ACCENT = "#D7263D";

export function MirrorExposureSection() {
  const t = useTranslations("mirror");
  const svgRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: svgRef,
    offset: ["start end", "center center"],
  });

  const steps = [0, 1, 2, 3] as const;

  // Fixed hook calls for each circle (not in a loop)
  const circ4 = 2 * Math.PI * (40 + 4 * 40);
  const circ3 = 2 * Math.PI * (40 + 3 * 40);
  const circ2 = 2 * Math.PI * (40 + 2 * 40);
  const circ1 = 2 * Math.PI * (40 + 1 * 40);

  const dash4 = useTransform(scrollYProgress, [0.1, 0.4], [circ4, 0]);
  const dash3 = useTransform(scrollYProgress, [0.2, 0.5], [circ3, 0]);
  const dash2 = useTransform(scrollYProgress, [0.3, 0.6], [circ2, 0]);
  const dash1 = useTransform(scrollYProgress, [0.4, 0.7], [circ1, 0]);

  const circleData = [
    { i: 4, circ: circ4, dash: dash4 },
    { i: 3, circ: circ3, dash: dash3 },
    { i: 2, circ: circ2, dash: dash2 },
    { i: 1, circ: circ1, dash: dash1 },
  ];

  return (
    <section className="bg-navy section-padding grain relative">
      {/* Red background glow */}
      <div
        className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(215,38,61,0.15) 0%, transparent 60%)" }}
      />

      <Container className="relative z-10">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left column — concentric circles diagram */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="hidden lg:flex items-center justify-center"
            ref={svgRef}
          >
            <div className="relative w-full max-w-md aspect-square">
              <svg
                viewBox="0 0 400 400"
                className="w-full h-full"
                aria-hidden="true"
              >
                {/* Outermost to innermost — draw-in on scroll */}
                {circleData.map(({ i, circ, dash }) => {
                  const strokeWidth = 0.5 + (4 - i) * 0.5;
                  const opacity = 0.08 + (4 - i) * 0.14;
                  return (
                    <motion.circle
                      key={i}
                      cx="200"
                      cy="200"
                      r={40 + i * 40}
                      fill="none"
                      stroke={ACCENT}
                      strokeWidth={strokeWidth}
                      strokeDasharray={circ}
                      style={{
                        opacity,
                        strokeDashoffset: dash,
                      }}
                    />
                  );
                })}

                {/* Center filled circle — pulsing glow */}
                <circle cx="200" cy="200" r="12" fill={ACCENT} opacity="0.9">
                  <animate attributeName="r" values="12;15;12" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.9;0.5;0.9" dur="2s" repeatCount="indefinite" />
                </circle>

                {/* Step labels at cardinal positions — springScale staggered */}
                {steps.map((i) => {
                  const positions = [
                    { x: 200, y: 38 },
                    { x: 362, y: 200 },
                    { x: 200, y: 362 },
                    { x: 38, y: 200 },
                  ];
                  return (
                    <motion.g
                      key={i}
                      variants={springScale}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 * i }}
                    >
                      <circle
                        cx={positions[i].x}
                        cy={positions[i].y}
                        r="16"
                        fill={ACCENT}
                        opacity="0.8"
                      />
                      <text
                        x={positions[i].x}
                        y={positions[i].y}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill="white"
                        fontSize="12"
                        fontWeight="bold"
                      >
                        {i + 1}
                      </text>
                    </motion.g>
                  );
                })}
              </svg>
            </div>
          </motion.div>

          {/* Right column — content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeUp}>
              <SectionHeading
                eyebrow={t("eyebrow")}
                title={t("title")}
                light
                size="md"
              />
            </motion.div>

            <motion.p variants={fadeUp} className="text-white/80 mt-4">
              {t("description")}
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 space-y-6">
              {steps.map((i) => (
                <div key={i} className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                    style={{ backgroundColor: ACCENT }}
                  >
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-white">
                      {t(`steps.${i}.title`)}
                    </p>
                    <p className="text-sm text-white/60">
                      {t(`steps.${i}.description`)}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="mt-8">
              <Button href="/contact" accentColor={ACCENT}>{t("cta")}</Button>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
