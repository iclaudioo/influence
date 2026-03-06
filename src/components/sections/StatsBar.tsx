"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { staggerContainer, counterReveal } from "@/lib/animations";

type StatItem = {
  value: number;
  suffix: string;
  label: string;
};

const statColors = ["#d55d25", "#D7263D", "#A855F7", "#E8A317"];

export function StatsBar() {
  const t = useTranslations("stats");
  const items = t.raw("items") as StatItem[];
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);

  return (
    <motion.section
      ref={sectionRef}
      style={{ opacity }}
      className="grain relative overflow-hidden section-padding"
    >
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, rgba(10,37,64,0.8) 0%, rgba(2,24,43,1) 100%)",
        }}
      />

      {/* Ambient color spots */}
      {statColors.map((color, i) => (
        <div
          key={i}
          className="absolute pointer-events-none"
          style={{
            width: "250px",
            height: "250px",
            left: `${10 + i * 22}%`,
            top: "50%",
            transform: "translateY(-50%)",
            background: `radial-gradient(circle, ${color}08 0%, transparent 60%)`,
          }}
        />
      ))}

      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 text-center"
        >
          {items.map((stat, i) => (
            <motion.div key={i} variants={counterReveal} className="group">
              <AnimatedCounter
                target={stat.value}
                suffix={stat.suffix}
                accentColor={statColors[i]}
              />
              <p className="text-xs text-white/40 uppercase tracking-[0.15em] mt-3 font-medium group-hover:text-white/60 transition-colors duration-300">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </motion.section>
  );
}
