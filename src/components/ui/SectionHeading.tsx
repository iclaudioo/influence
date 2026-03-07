"use client";

import React from "react";
import { motion } from "motion/react";
import { clipRevealUp, blurFadeUp } from "@/lib/animations";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
  light?: boolean;
  accentColor?: string;
  gradient?: boolean;
  /** Vary heading size for editorial rhythm: "lg" for hero moments, "md" default, "sm" for supporting */
  size?: "lg" | "md" | "sm";
  /** Use serif font for eyebrow */
  serifEyebrow?: boolean;
};

const sizeMap = {
  lg: "text-4xl md:text-5xl lg:text-6xl",
  md: "text-3xl md:text-4xl lg:text-[3.25rem]",
  sm: "text-2xl md:text-3xl lg:text-4xl",
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
  light = false,
  accentColor,
  gradient = false,
  size = "md",
  serifEyebrow = false,
}: Props) {
  const textColor = light ? "text-white" : "text-[#1d1d1f]";
  const eyebrowColor = accentColor
    ? undefined
    : light
      ? "text-white/50"
      : "text-[#6e6e73]";

  const titleClasses = `${sizeMap[size]} font-bold tracking-tight leading-[1.1] mb-4 ${
    gradient && light ? "text-gradient-orange" : textColor
  }`;

  return (
    <motion.div
      className={centered ? "text-center" : ""}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {eyebrow && (
        <motion.div
          variants={blurFadeUp}
          className={`mb-5 flex items-center ${centered ? "justify-center" : ""}`}
        >
          {!centered && (
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="inline-block w-8 h-px mr-3 origin-left"
              style={{
                background: accentColor
                  ? `linear-gradient(90deg, ${accentColor}, transparent)`
                  : light
                    ? "linear-gradient(90deg, rgba(255,255,255,0.3), transparent)"
                    : "linear-gradient(90deg, rgba(29,29,31,0.2), transparent)",
              }}
            />
          )}
          <p
            className={`text-xs uppercase tracking-[0.2em] font-medium ${serifEyebrow ? "font-serif italic normal-case tracking-[0.05em] text-sm" : ""} ${eyebrowColor ?? ""}`}
            style={accentColor ? { color: accentColor } : undefined}
          >
            {eyebrow}
          </p>
          {centered && (
            <>
              <span className="sr-only"> </span>
            </>
          )}
        </motion.div>
      )}
      <motion.h2 variants={clipRevealUp} className={titleClasses}>
        {title}
      </motion.h2>
      {description && (
        <motion.p
          variants={blurFadeUp}
          className={`text-lg leading-relaxed opacity-60 max-w-2xl ${textColor} ${centered ? "mx-auto" : ""}`}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
