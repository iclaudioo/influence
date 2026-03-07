"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { wordReveal, charReveal, clipWordReveal } from "@/lib/animations";

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
  /** Split mode: word (default), character, or clipWord */
  mode?: "word" | "character" | "clipWord";
}

export function SplitText({
  children,
  className = "",
  as: Tag = "h1",
  variants,
  once = true,
  trigger = "whileInView",
  delay = 0,
  mode = "word",
}: SplitTextProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <Tag className={className}>{children}</Tag>;
  }

  const triggerProps =
    trigger === "animate"
      ? { initial: "hidden" as const, animate: "visible" as const }
      : { initial: "hidden" as const, whileInView: "visible" as const, viewport: { once, amount: 0.3 } };

  if (mode === "character") {
    const chars = children.split("");
    const containerVariants: Variants = variants?.container ?? {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.02,
          delayChildren: delay,
        },
      },
    };
    const charVariants = variants?.word ?? charReveal;

    return (
      <Tag className={className}>
        <motion.span
          variants={containerVariants}
          {...triggerProps}
          className="inline"
        >
          {chars.map((char, i) => (
            <motion.span
              key={i}
              variants={charVariants}
              className="inline-block"
              style={{ whiteSpace: char === " " ? "pre" : undefined }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.span>
      </Tag>
    );
  }

  if (mode === "clipWord") {
    const words = children.split(" ");
    const containerVariants: Variants = variants?.container ?? {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.06,
          delayChildren: delay,
        },
      },
    };
    const wordVariants = variants?.word ?? clipWordReveal;

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

  // Default: word mode
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
