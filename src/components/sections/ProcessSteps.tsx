"use client";

import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeUp, staggerContainer, blurFadeUp } from "@/lib/animations";

type Props = {
  namespace: string;
  accentColor: string;
};

export function ProcessSteps({ namespace, accentColor }: Props) {
  const t = useTranslations(namespace);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = t.raw("process.steps") as Array<{
    title: string;
    description: string;
  }>;

  return (
    <section className="bg-[#FAFAFA] section-padding relative overflow-hidden">
      {/* Subtle ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{ background: `radial-gradient(ellipse, ${accentColor}06 0%, transparent 70%)` }}
      />

      <Container>
        <SectionHeading
          eyebrow={t("process.eyebrow")}
          title={t("process.title")}
          light={false}
          accentColor={accentColor}
          serifEyebrow
        />

        {/* Desktop: horizontal layout */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="hidden md:flex items-start mt-16"
        >
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <motion.div variants={blurFadeUp} className="flex-1 text-center group">
                {/* Step number with ring */}
                <div className="relative mx-auto mb-5 w-14 h-14">
                  <div
                    className="absolute inset-0 rounded-full opacity-20"
                    style={{ background: `radial-gradient(circle, ${accentColor}40, transparent)` }}
                  />
                  <div
                    className="relative w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold text-[#1d1d1f] border-2 transition-all duration-300 group-hover:scale-110"
                    style={{
                      borderColor: `${accentColor}40`,
                      backgroundColor: `${accentColor}15`,
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </div>
                <h3 className="font-semibold text-[#1d1d1f] text-base mb-2">
                  {step.title}
                </h3>
                <p className="text-[#6e6e73] text-sm max-w-[200px] mx-auto leading-relaxed">
                  {step.description}
                </p>
              </motion.div>

              {/* Connecting line between steps */}
              {index < steps.length - 1 && (
                <div className="flex items-center pt-7 px-2">
                  <div
                    className="h-px w-12 lg:w-20"
                    style={{
                      background: `linear-gradient(90deg, ${accentColor}30, ${accentColor}10)`,
                    }}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </motion.div>

        {/* Mobile: vertical layout */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="md:hidden mt-12 space-y-0"
        >
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <motion.div variants={fadeUp} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0 border-2"
                    style={{
                      borderColor: `${accentColor}40`,
                      backgroundColor: `${accentColor}15`,
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </div>
                <div className="pt-2 pb-8">
                  <h3 className="font-semibold text-[#1d1d1f] text-lg mb-1">
                    {step.title}
                  </h3>
                  <p className="text-[#6e6e73] text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>

              {index < steps.length - 1 && (
                <div className="flex">
                  <div className="w-12 flex justify-center -mt-6 -mb-2">
                    <div
                      className="w-px h-8"
                      style={{ background: `linear-gradient(180deg, ${accentColor}30, transparent)` }}
                    />
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
