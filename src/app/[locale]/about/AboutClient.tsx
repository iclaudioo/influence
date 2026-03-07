"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useInView } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { BackgroundCircles } from "@/components/ui/BackgroundCircles";
import { fadeUp, fadeIn, staggerContainer } from "@/lib/animations";
import { colors } from "@/lib/constants";

const ACCENT = colors.circle;
const statColors = [colors.labs, colors.circle, colors.studio, colors.academy];

export function AboutClient({ serverSections }: { serverSections?: React.ReactNode }) {
  const t = useTranslations("about");
  const st = useTranslations("stats");
  const tt = useTranslations("testimonial");

  const values = t.raw("values.items") as {
    title: string;
    description: string;
  }[];

  const approach = t.raw("approach.steps") as {
    title: string;
    description: string;
  }[];

  const stats = st.raw("items") as {
    value: number;
    suffix: string;
    label: string;
  }[];

  const valuesRef = useRef<HTMLDivElement>(null);
  const valuesInView = useInView(valuesRef, { once: true, margin: "-100px" });
  const approachRef = useRef<HTMLDivElement>(null);
  const approachInView = useInView(approachRef, {
    once: true,
    margin: "-100px",
  });

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center pt-24 bg-white overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <Image src="/images/generated/heroes/about-hero.png" alt="" fill className="object-cover opacity-[0.06] mix-blend-multiply" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-white" />
        </div>

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, transparent 50%, ${ACCENT}15 100%)`,
          }}
        />

        {/* Network nodes visual */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <svg
            className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-[0.12]"
            viewBox="0 0 400 400"
          >
            <circle cx="200" cy="80" r="6" fill={ACCENT} />
            <circle cx="320" cy="160" r="8" fill={ACCENT} />
            <circle cx="280" cy="300" r="5" fill={ACCENT} />
            <circle cx="120" cy="280" r="7" fill={ACCENT} />
            <circle cx="80" cy="160" r="6" fill={ACCENT} />
            <circle cx="200" cy="200" r="10" fill={ACCENT} />
            <line
              x1="200"
              y1="80"
              x2="320"
              y2="160"
              stroke={ACCENT}
              strokeWidth="1"
              opacity="0.5"
            />
            <line
              x1="320"
              y1="160"
              x2="280"
              y2="300"
              stroke={ACCENT}
              strokeWidth="1"
              opacity="0.5"
            />
            <line
              x1="280"
              y1="300"
              x2="120"
              y2="280"
              stroke={ACCENT}
              strokeWidth="1"
              opacity="0.5"
            />
            <line
              x1="120"
              y1="280"
              x2="80"
              y2="160"
              stroke={ACCENT}
              strokeWidth="1"
              opacity="0.5"
            />
            <line
              x1="80"
              y1="160"
              x2="200"
              y2="80"
              stroke={ACCENT}
              strokeWidth="1"
              opacity="0.5"
            />
            <line
              x1="200"
              y1="200"
              x2="200"
              y2="80"
              stroke={ACCENT}
              strokeWidth="1"
              opacity="0.3"
            />
            <line
              x1="200"
              y1="200"
              x2="320"
              y2="160"
              stroke={ACCENT}
              strokeWidth="1"
              opacity="0.3"
            />
            <line
              x1="200"
              y1="200"
              x2="280"
              y2="300"
              stroke={ACCENT}
              strokeWidth="1"
              opacity="0.3"
            />
            <line
              x1="200"
              y1="200"
              x2="120"
              y2="280"
              stroke={ACCENT}
              strokeWidth="1"
              opacity="0.3"
            />
            <line
              x1="200"
              y1="200"
              x2="80"
              y2="160"
              stroke={ACCENT}
              strokeWidth="1"
              opacity="0.3"
            />
            <circle
              cx="200"
              cy="200"
              r="20"
              fill="none"
              stroke={ACCENT}
              strokeWidth="1"
              opacity="0.2"
            >
              <animate
                attributeName="r"
                values="20;30;20"
                dur="3s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.2;0.05;0.2"
                dur="3s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </div>

        <BackgroundCircles variant="circle" />

        <Container className="relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <motion.p
              variants={fadeUp}
              className="mb-4 text-sm uppercase tracking-[0.15em] font-medium"
              style={{ color: ACCENT }}
            >
              {t("hero.eyebrow")}
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#1d1d1f] mb-6"
            >
              {t("hero.title")}
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-lg md:text-xl text-[#6e6e73] max-w-2xl"
            >
              {t("hero.subtitle")}
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* Mission */}
      <section className="bg-off-white section-padding">
        <Container>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeUp}>
              <SectionHeading
                eyebrow={t("mission.eyebrow")}
                title={t("mission.title")}
                centered
                light={false}
                accentColor={ACCENT}
              />
            </motion.div>
            <motion.p
              variants={fadeUp}
              className="text-lg text-navy/70 mt-6 max-w-2xl mx-auto text-center leading-relaxed"
            >
              {t("mission.description")}
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* Stats Bar */}
      <section className="grain relative overflow-hidden bg-navy section-padding">
        {statColors.map((color, i) => (
          <div
            key={i}
            className="absolute pointer-events-none"
            style={{
              width: "300px",
              height: "300px",
              left: `${i * 25}%`,
              top: "50%",
              transform: "translateY(-50%)",
              background: `radial-gradient(circle, ${color}12 0%, transparent 60%)`,
            }}
          />
        ))}
        <Container>
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <div key={i}>
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  accentColor={statColors[i]}
                />
                <p className="text-sm text-white/60 uppercase tracking-wide mt-2">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Approach */}
      <section className="bg-off-white section-padding">
        <Container>
          <SectionHeading
            eyebrow={t("approach.eyebrow")}
            title={t("approach.title")}
            light={false}
            accentColor={ACCENT}
          />

          {/* Desktop: horizontal */}
          <motion.div
            ref={approachRef}
            variants={staggerContainer}
            initial="hidden"
            animate={approachInView ? "visible" : "hidden"}
            className="hidden md:flex items-start mt-16"
          >
            {approach.map((step, index) => (
              <React.Fragment key={index}>
                <motion.div variants={fadeUp} className="flex-1 text-center">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold text-white mx-auto mb-4"
                    style={{ backgroundColor: ACCENT }}
                  >
                    {index + 1}
                  </div>
                  <h3 className="font-semibold text-navy text-lg mb-2">
                    {step.title}
                  </h3>
                  <p className="text-navy/70 text-sm max-w-[200px] mx-auto">
                    {step.description}
                  </p>
                </motion.div>
                {index < approach.length - 1 && (
                  <div className="flex items-center pt-6 px-2">
                    <div
                      className="h-px w-12 lg:w-20"
                      style={{ backgroundColor: ACCENT }}
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </motion.div>

          {/* Mobile: vertical */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={approachInView ? "visible" : "hidden"}
            className="md:hidden mt-12 space-y-0"
          >
            {approach.map((step, index) => (
              <React.Fragment key={index}>
                <motion.div
                  variants={fadeUp}
                  className="flex items-start gap-4"
                >
                  <div className="flex flex-col items-center">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold text-white shrink-0"
                      style={{ backgroundColor: ACCENT }}
                    >
                      {index + 1}
                    </div>
                  </div>
                  <div className="pt-2 pb-8">
                    <h3 className="font-semibold text-navy text-lg mb-1">
                      {step.title}
                    </h3>
                    <p className="text-navy/70 text-sm">{step.description}</p>
                  </div>
                </motion.div>
                {index < approach.length - 1 && (
                  <div className="flex">
                    <div className="w-12 flex justify-center -mt-6 -mb-2">
                      <div
                        className="w-px h-8"
                        style={{ backgroundColor: ACCENT }}
                      />
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </motion.div>
        </Container>
      </section>

      <SectionDivider color={ACCENT} />

      {/* Values */}
      <section className="bg-off-white section-padding">
        <Container>
          <motion.div
            ref={valuesRef}
            variants={staggerContainer}
            initial="hidden"
            animate={valuesInView ? "visible" : "hidden"}
          >
            <motion.div variants={fadeUp}>
              <SectionHeading
                eyebrow={t("values.eyebrow")}
                title={t("values.title")}
                centered
                light={false}
                accentColor={ACCENT}
              />
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-4xl mx-auto">
              {values.map((value, i) => (
                <motion.div key={i} variants={fadeUp}>
                  <Card hover accentColor={ACCENT}>
                    <h3 className="text-xl font-bold text-navy">
                      {value.title}
                    </h3>
                    <p className="text-navy/70 mt-2">{value.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Testimonial */}
      <section className="bg-off-white section-padding relative overflow-hidden">
        <div
          className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${ACCENT}0f 0%, transparent 60%)`,
          }}
        />
        <Container>
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <blockquote className="border-l-4 pl-8" style={{ borderColor: ACCENT }}>
              <p className="text-2xl md:text-3xl font-serif text-navy italic leading-relaxed">
                {tt("quote")}
              </p>
            </blockquote>
            <div className="mt-8 pl-8">
              <p className="font-bold text-navy">{tt("name")}</p>
              <p className="text-navy/60">
                {tt("title")}, {tt("company")}
              </p>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Server-rendered sections: MediaMentions, LinkedIn, Team preview */}
      {serverSections}

      {/* CTA */}
      <section className="relative bg-navy section-padding overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, transparent 50%, ${ACCENT}15 100%)`,
          }}
        />
        <Container className="relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-bold text-white"
            >
              {t("cta.title")}
            </motion.h2>
            <motion.div variants={fadeUp} className="mt-8">
              <Button variant="primary" href="/contact" accentColor={ACCENT}>
                {t("cta.button")}
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
