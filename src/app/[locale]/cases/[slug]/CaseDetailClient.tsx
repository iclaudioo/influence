"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Button } from "@/components/ui/Button";
import { fadeUp, fadeIn, staggerContainer } from "@/lib/animations";

type Props = {
  title: string;
  clientName: string;
  clientRole: string;
  clientCompany: string;
  clientLogoUrl: string | null;
  challenge: string | null;
  solution: string | null;
  quote: string | null;
  results: { label: string; value: number; suffix: string }[];
  accentColor: string;
  challengeLabel: string;
  approachLabel: string;
  resultsLabel: string;
  similarResultLabel: string;
  bookCallLabel: string;
};

export function CaseDetailClient({
  title,
  clientName,
  clientRole,
  clientCompany,
  clientLogoUrl,
  challenge,
  solution,
  quote,
  results,
  accentColor,
  challengeLabel,
  approachLabel,
  resultsLabel,
  similarResultLabel,
  bookCallLabel,
}: Props) {
  return (
    <>
      {/* Hero / Client header */}
      <section className="bg-navy min-h-[50vh] flex items-center pt-24 pb-12 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, transparent 50%, ${accentColor}15 100%)`,
          }}
        />
        <Container className="relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            {/* Client info */}
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
              {clientLogoUrl ? (
                <Image
                  src={clientLogoUrl}
                  alt={clientCompany}
                  width={48}
                  height={48}
                  className="rounded-lg object-contain"
                />
              ) : (
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg"
                  style={{ backgroundColor: `${accentColor}30` }}
                >
                  {clientCompany?.charAt(0) || "C"}
                </div>
              )}
              <div>
                <p className="font-semibold text-white">{clientName}</p>
                <p className="text-sm text-white/60">
                  {clientRole}, {clientCompany}
                </p>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6"
            >
              {title}
            </motion.h1>
          </motion.div>
        </Container>
      </section>

      {/* Challenge */}
      {challenge && (
        <section className="section-padding bg-navy">
          <Container>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="max-w-3xl"
            >
              <motion.div variants={fadeUp}>
                <SectionHeading
                  eyebrow={challengeLabel}
                  title={challengeLabel}
                  accentColor={accentColor}
                />
              </motion.div>
              <motion.p
                variants={fadeUp}
                className="text-lg text-white/70 mt-6 leading-relaxed"
              >
                {challenge}
              </motion.p>
            </motion.div>
          </Container>
        </section>
      )}

      {/* Approach */}
      {solution && (
        <section className="section-padding bg-[#0a2540]">
          <Container>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="max-w-3xl"
            >
              <motion.div variants={fadeUp}>
                <SectionHeading
                  eyebrow={approachLabel}
                  title={approachLabel}
                  accentColor={accentColor}
                />
              </motion.div>
              <motion.p
                variants={fadeUp}
                className="text-lg text-white/70 mt-6 leading-relaxed"
              >
                {solution}
              </motion.p>
            </motion.div>
          </Container>
        </section>
      )}

      {/* Results */}
      {results.length > 0 && (
        <section className="section-padding bg-navy relative overflow-hidden">
          {/* Subtle glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at center, ${accentColor}08 0%, transparent 60%)`,
            }}
          />
          <Container className="relative z-10">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={fadeUp}>
                <SectionHeading
                  eyebrow={resultsLabel}
                  title={resultsLabel}
                  accentColor={accentColor}
                  centered
                />
              </motion.div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 mt-12 max-w-4xl mx-auto text-center">
                {results.map((metric, i) => (
                  <motion.div key={i} variants={fadeUp}>
                    <AnimatedCounter
                      target={metric.value}
                      suffix={metric.suffix}
                      accentColor={accentColor}
                    />
                    <p className="text-sm text-white/60 uppercase tracking-wide mt-3">
                      {metric.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </Container>
        </section>
      )}

      {/* Pull quote */}
      {quote && (
        <section className="section-padding bg-[#0a2540] relative overflow-hidden">
          <div
            className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${accentColor}0f 0%, transparent 60%)`,
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
              <blockquote
                className="border-l-4 pl-8"
                style={{ borderColor: accentColor }}
              >
                <p className="text-2xl md:text-3xl font-serif text-white italic leading-relaxed">
                  &ldquo;{quote}&rdquo;
                </p>
              </blockquote>
              <div className="mt-8 pl-8">
                <p className="font-bold text-white">{clientName}</p>
                <p className="text-white/60">
                  {clientRole}, {clientCompany}
                </p>
              </div>
            </motion.div>
          </Container>
        </section>
      )}

      {/* CTA */}
      <section className="section-padding bg-navy relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, transparent 50%, ${accentColor}15 100%)`,
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
              {similarResultLabel}
            </motion.h2>
            <motion.div variants={fadeUp} className="mt-8">
              <Button variant="primary" href="/contact" accentColor={accentColor}>
                {bookCallLabel}
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
