"use client";

import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { reveal, stagger } from "@/lib/animations";

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
    <section className="bg-navy section-padding">
      <Container>
        <SectionHeading
          eyebrow={t("process.eyebrow")}
          title={t("process.title")}
          light={true}
          accentColor={accentColor}
        />

        {/* Desktop: horizontal layout */}
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="hidden md:flex items-start mt-16"
        >
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <motion.div variants={reveal} className="flex-1 text-center">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-serif text-2xl text-white mx-auto mb-4"
                  style={{ backgroundColor: accentColor }}
                >
                  {index + 1}
                </div>
                <h3 className="font-semibold text-white text-lg mb-2">
                  {step.title}
                </h3>
                <p className="text-white/70 text-sm max-w-[200px] mx-auto">
                  {step.description}
                </p>
              </motion.div>

              {index < steps.length - 1 && (
                <div className="flex items-center pt-5 px-2">
                  <div
                    className="h-px w-12 lg:w-20"
                    style={{ backgroundColor: accentColor }}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </motion.div>

        {/* Mobile: vertical layout */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="md:hidden mt-12 space-y-0"
        >
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <motion.div variants={reveal} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-serif text-2xl text-white shrink-0"
                    style={{ backgroundColor: accentColor }}
                  >
                    {index + 1}
                  </div>
                </div>
                <div className="pt-1 pb-8">
                  <h3 className="font-semibold text-white text-lg mb-1">
                    {step.title}
                  </h3>
                  <p className="text-white/70 text-sm">{step.description}</p>
                </div>
              </motion.div>

              {index < steps.length - 1 && (
                <div className="flex">
                  <div className="w-10 flex justify-center -mt-6 -mb-2">
                    <div
                      className="w-px h-8"
                      style={{ backgroundColor: accentColor }}
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
