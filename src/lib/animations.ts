import type { Variants } from "motion/react";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const blurIn: Variants = {
  hidden: { opacity: 0, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export const scaleRotate: Variants = {
  hidden: { opacity: 0, scale: 0.9, rotate: -2 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const heroStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

export const slowFadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.2, ease: "easeOut" } },
};

// New enhanced variants

export const blurFadeUp: Variants = {
  hidden: { opacity: 0, y: 32, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export const springScale: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
};

export const cardHover = {
  rest: {
    y: 0,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

export const glowPulse: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: [0.4, 0.8, 0.4],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export const revealFromLeft: Variants = {
  hidden: { opacity: 0, x: -60, rotate: -1 },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export const testimonialStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

export const magneticHover = {
  rest: { x: 0, y: 0 },
  hover: {
    transition: { type: "spring", stiffness: 400, damping: 15 },
  },
};

export const counterReveal: Variants = {
  hidden: { opacity: 0, scale: 0.5, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 150, damping: 12, delay: 0.1 },
  },
};

// Premium upgrade variants

export const clipRevealUp: Variants = {
  hidden: { clipPath: "inset(100% 0 0 0)" },
  visible: {
    clipPath: "inset(0% 0 0 0)",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
  },
};

export const lineReveal: Variants = {
  hidden: { y: "110%", rotate: 3 },
  visible: {
    y: "0%",
    rotate: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export const morphScale: Variants = {
  hidden: { opacity: 0, scale: 0.92, borderRadius: "24px" },
  visible: {
    opacity: 1,
    scale: 1,
    borderRadius: "12px",
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export const tiltCard: Variants = {
  hidden: { opacity: 0, y: 40, rotateX: 8 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export const wordStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

export const wordReveal: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

// Shared easing constants
export const DOSSIER_EASE = {
  smooth: [0.16, 1, 0.3, 1] as const,
  sineInOut: [0.37, 0, 0.63, 1] as const,
  power3InOut: [0.61, 1, 0.88, 1] as const,
};

// Hero entrance variants

export const heroImageReveal: Variants = {
  hidden: { opacity: 0, y: "15%", scale: 1.12 },
  visible: {
    opacity: 1,
    y: "0%",
    scale: 1,
    transition: {
      opacity: { duration: 1, ease: DOSSIER_EASE.sineInOut },
      y: { duration: 1, ease: DOSSIER_EASE.sineInOut },
      scale: { duration: 6, ease: DOSSIER_EASE.sineInOut },
    },
  },
};

export const heroHeadlineReveal: Variants = {
  hidden: { opacity: 0, y: 40, clipPath: "inset(100% 0 0 0)" },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0% 0 0 0)",
    transition: { duration: 0.9, ease: DOSSIER_EASE.smooth },
  },
};

export const heroDescriptionReveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: DOSSIER_EASE.smooth },
  },
};

export const heroButtonReveal: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: DOSSIER_EASE.power3InOut },
  },
};

export const heroStaggerSequential: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.8,
    },
  },
};

// Methode phase variants

export const phaseStagger: Variants = {
  active: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
  inactive: {
    transition: { staggerChildren: 0.04 },
  },
};

export const phaseChildFadeIn: Variants = {
  active: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: DOSSIER_EASE.smooth },
  },
  inactive: {
    opacity: 0.15,
    y: 8,
    transition: { duration: 0.4, ease: DOSSIER_EASE.smooth },
  },
};

export const phaseTextEnter: Variants = {
  active: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: DOSSIER_EASE.smooth },
  },
  inactive: {
    opacity: 0.15,
    x: -20,
    rotateY: -2,
    filter: "blur(2px)",
    transition: { duration: 0.6, ease: DOSSIER_EASE.smooth },
  },
};

export const phaseImageEnter: Variants = {
  active: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.8, ease: DOSSIER_EASE.smooth },
  },
  inactive: {
    opacity: 0.15,
    x: 30,
    scale: 0.96,
    transition: { duration: 0.6, ease: DOSSIER_EASE.smooth },
  },
};

export const phaseAccentLine: Variants = {
  active: {
    scaleX: 1,
    transition: { duration: 0.6, delay: 0.25, ease: DOSSIER_EASE.smooth },
  },
  inactive: {
    scaleX: 0,
    transition: { duration: 0.4, ease: DOSSIER_EASE.smooth },
  },
};

// Dossier-specific variants

export const dossierStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export const dossierFadeIn: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export const dossierLineDrawH: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export const dossierLineDrawV: Variants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

// Container Scroll presets
export const CONTAINER_SCROLL = {
  dramatic: {
    scrollHeight: "160vh",
    initialScale: 0.82,
    initialBorderRadius: 24,
    initialInsetY: 80,
    initialInsetX: 40,
  },
  subtle: {
    scrollHeight: "140vh",
    initialScale: 0.92,
    initialBorderRadius: 16,
    initialInsetY: 40,
    initialInsetX: 16,
  },
  landing: {
    scrollHeight: "150vh",
    initialScale: 0.85,
    initialBorderRadius: 20,
    initialInsetY: 60,
    initialInsetX: 24,
  },
} as const;

// Masking: MethodePhase image container morph
export const phaseMaskMorph: Variants = {
  active: {
    borderRadius: "8px",
    transition: { duration: 0.8, ease: DOSSIER_EASE.smooth },
  },
  inactive: {
    borderRadius: "24px",
    transition: { duration: 0.6, ease: DOSSIER_EASE.smooth },
  },
};

// Character-level text reveal
export const charReveal: Variants = {
  hidden: { opacity: 0, filter: "blur(8px)", y: 8 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.4, ease: DOSSIER_EASE.smooth },
  },
};

// Clip-path per word
export const clipWordReveal: Variants = {
  hidden: { clipPath: "inset(100% 0 0 0)" },
  visible: {
    clipPath: "inset(0% 0 0 0)",
    transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
  },
};
