"use client";

import { motion, type Variants } from "motion/react";
import { wordStagger, wordReveal } from "@/lib/animations";

interface SplitTextProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  variants?: { container?: Variants; word?: Variants };
  once?: boolean;
  /** Use "animate" for above-the-fold (hero), "whileInView" for scroll reveals */
  trigger?: "animate" | "whileInView";
  /** Delay before starting (useful when inside a stagger parent) */
  delay?: number;
}

export function SplitText({
  children,
  className = "",
  as: Tag = "h1",
  variants,
  once = true,
  trigger = "whileInView",
  delay = 0,
}: SplitTextProps) {
  const words = children.split(" ");

  const containerVariants: Variants = variants?.container ?? {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = variants?.word ?? wordReveal;

  const triggerProps =
    trigger === "animate"
      ? { initial: "hidden" as const, animate: "visible" as const }
      : { initial: "hidden" as const, whileInView: "visible" as const, viewport: { once, amount: 0.3 } };

  return (
    <Tag className={className}>
      <motion.span
        variants={containerVariants}
        {...triggerProps}
        className="inline"
      >
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden">
            <motion.span
              variants={wordVariants}
              className="inline-block"
            >
              {word}
              {i < words.length - 1 && "\u00A0"}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
