"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import {
  phaseTextEnter,
  phaseImageEnter,
  phaseAccentLine,
  phaseStagger,
  phaseChildFadeIn,
  phaseMaskMorph,
} from "@/lib/animations";

interface MethodePhaseProps {
  number: string;
  name: string;
  color: string;
  headline: string;
  body: string;
  isActive: boolean;
  children?: ReactNode;
}

export function MethodePhase({
  number,
  name,
  color,
  headline,
  body,
  isActive,
  children,
}: MethodePhaseProps) {
  const imageRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const imageParallaxY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [40, -40]);
  const imageInnerScale = useTransform(scrollYProgress, [0, 0.5, 1], prefersReducedMotion ? [1, 1, 1] : [1.15, 1.05, 1.15]);

  return (
    <section
      className={`min-h-screen flex items-center py-24 ${
        !isActive ? "pointer-events-none select-none" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          style={{ perspective: 600 }}
        >
          {/* Left column — text */}
          <motion.div
            variants={phaseTextEnter}
            animate={isActive ? "active" : "inactive"}
            className="relative"
          >
            {/* Service-kleur left border */}
            <motion.div
              className="absolute left-0 top-0 bottom-0 w-1 rounded-full"
              style={{ backgroundColor: color }}
              animate={{ scaleY: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Watermark nummer */}
            <span
              className="absolute -left-4 -top-8 font-serif text-[200px] leading-none opacity-[0.03] select-none pointer-events-none"
              aria-hidden="true"
            >
              {number}
            </span>
            {/* Number + name label */}
            <motion.div
              className="flex items-center gap-3 pl-6"
              variants={phaseStagger}
              animate={isActive ? "active" : "inactive"}
            >
              <motion.span
                className="font-mono text-[11px] tracking-[0.25em] uppercase font-medium"
                style={{ color }}
                variants={phaseChildFadeIn}
              >
                {number}
              </motion.span>
              <motion.div
                className="h-px w-6"
                style={{ backgroundColor: color, originX: 0 }}
                variants={phaseAccentLine}
              />
              <motion.span
                className="font-mono text-[11px] tracking-[0.25em] uppercase font-medium"
                style={{ color }}
                variants={phaseChildFadeIn}
              >
                {name}
              </motion.span>
            </motion.div>

            {/* C2: Reduced headline size for proper hierarchy */}
            <h3 className="font-serif text-3xl md:text-4xl leading-[1.12] mt-6 text-[#1d1d1f] pl-6">
              {headline}
            </h3>

            <p className="font-sans text-base md:text-lg text-[#6e6e73] font-light mt-5 max-w-md leading-relaxed pl-6">
              {body}
            </p>

            {/* Accent line */}
            <motion.div
              className="h-px w-16 mt-8 ml-6"
              style={{ backgroundColor: `${color}40`, originX: 0 }}
              variants={phaseAccentLine}
              animate={isActive ? "active" : "inactive"}
            />
          </motion.div>

          {/* Right column — visualization */}
          <motion.div
            ref={imageRef}
            className="relative"
            variants={phaseImageEnter}
            animate={isActive ? "active" : "inactive"}
          >
            {/* Colored border accent */}
            <div
              className="absolute -inset-1 rounded-lg opacity-[0.08]"
              style={{ border: `1px solid ${color}` }}
            />
            <motion.div
              className="relative overflow-hidden"
              variants={phaseMaskMorph}
              animate={isActive ? "active" : "inactive"}
            >
              <motion.div style={{ y: imageParallaxY, scale: imageInnerScale }}>
                {children}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
