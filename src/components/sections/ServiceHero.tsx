"use client";

import React from "react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { fadeUp, staggerContainer } from "@/lib/animations";

type Props = {
  namespace: string;
  accentColor: string;
  featured?: boolean;
  networkNodes?: boolean;
  gradientMesh?: boolean;
  layeredBlocks?: boolean;
};

export function ServiceHero({ namespace, accentColor, featured, networkNodes, gradientMesh, layeredBlocks }: Props) {
  const t = useTranslations(namespace);

  return (
    <section
      className={`relative ${featured ? 'min-h-screen' : 'min-h-[70vh]'} flex items-center pt-24 bg-navy overflow-hidden${featured ? ' grain' : ''}`}
    >
      {/* Gradient overlay toward accent color */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, transparent 50%, ${accentColor}${featured ? '25' : '15'} 100%)`,
        }}
      />

      {/* Featured: grid-dot SVG pattern (Labs) */}
      {featured && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg className="absolute inset-0 w-full h-full opacity-[0.06]">
            <pattern id="grid-dots-hero" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1.5" fill={accentColor} />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid-dots-hero)" />
          </svg>
        </div>
      )}

      {/* Network nodes visual (Circle) */}
      {networkNodes && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <svg className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-[0.12]" viewBox="0 0 400 400">
            {/* Nodes */}
            <circle cx="200" cy="80" r="6" fill={accentColor} />
            <circle cx="320" cy="160" r="8" fill={accentColor} />
            <circle cx="280" cy="300" r="5" fill={accentColor} />
            <circle cx="120" cy="280" r="7" fill={accentColor} />
            <circle cx="80" cy="160" r="6" fill={accentColor} />
            <circle cx="200" cy="200" r="10" fill={accentColor} />
            {/* Connection lines */}
            <line x1="200" y1="80" x2="320" y2="160" stroke={accentColor} strokeWidth="1" opacity="0.5" />
            <line x1="320" y1="160" x2="280" y2="300" stroke={accentColor} strokeWidth="1" opacity="0.5" />
            <line x1="280" y1="300" x2="120" y2="280" stroke={accentColor} strokeWidth="1" opacity="0.5" />
            <line x1="120" y1="280" x2="80" y2="160" stroke={accentColor} strokeWidth="1" opacity="0.5" />
            <line x1="80" y1="160" x2="200" y2="80" stroke={accentColor} strokeWidth="1" opacity="0.5" />
            <line x1="200" y1="200" x2="200" y2="80" stroke={accentColor} strokeWidth="1" opacity="0.3" />
            <line x1="200" y1="200" x2="320" y2="160" stroke={accentColor} strokeWidth="1" opacity="0.3" />
            <line x1="200" y1="200" x2="280" y2="300" stroke={accentColor} strokeWidth="1" opacity="0.3" />
            <line x1="200" y1="200" x2="120" y2="280" stroke={accentColor} strokeWidth="1" opacity="0.3" />
            <line x1="200" y1="200" x2="80" y2="160" stroke={accentColor} strokeWidth="1" opacity="0.3" />
            {/* Pulsing outer rings on center node */}
            <circle cx="200" cy="200" r="20" fill="none" stroke={accentColor} strokeWidth="1" opacity="0.2">
              <animate attributeName="r" values="20;30;20" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.2;0.05;0.2" dur="3s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>
      )}

      {/* Gradient mesh visual (Studio) */}
      {gradientMesh && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full opacity-[0.1]"
            style={{ background: `radial-gradient(circle, ${accentColor}, transparent 70%)` }} />
          <div className="absolute bottom-10 left-10 w-[300px] h-[200px] rounded-[50%] opacity-[0.08] rotate-12"
            style={{ background: `radial-gradient(ellipse, ${accentColor}, transparent 70%)` }} />
          <div className="absolute top-1/3 right-1/4 w-[250px] h-[250px] rounded-full opacity-[0.06] -rotate-6"
            style={{ background: `radial-gradient(circle, ${accentColor}, transparent 60%)` }} />
        </div>
      )}

      {/* Layered blocks visual (Academy) */}
      {layeredBlocks && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i}
              className="absolute rounded-sm"
              style={{
                width: `${280 - i * 30}px`,
                height: '3px',
                right: `${60 + i * 15}px`,
                top: `${35 + i * 8}%`,
                backgroundColor: accentColor,
                opacity: 0.06 + i * 0.03,
              }}
            />
          ))}
        </div>
      )}

      <Container className="relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <motion.p
            variants={fadeUp}
            className={`mb-4 text-sm uppercase tracking-[0.15em] font-medium ${featured ? 'font-mono tracking-widest' : ''}`}
            style={{ color: accentColor }}
          >
            {t("hero.eyebrow")}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6"
          >
            {t("hero.title")}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-white/70 max-w-2xl"
          >
            {t("hero.subtitle")}
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
