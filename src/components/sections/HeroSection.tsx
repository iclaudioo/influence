"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import {
  heroStagger,
  fadeUp,
  blurIn,
  scaleIn,
  slowFadeIn,
} from "@/lib/animations";

export function HeroSection() {
  const t = useTranslations("hero");
  const svgRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent) {
    if (!svgRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    svgRef.current.style.transform = `translate(${x}px, ${y}px)`;
  }

  // Generate dots at cardinal and diagonal positions on a ring
  const ringRadii = [80, 120, 160, 200, 240, 280];
  const dotRings = [1, 3, 5]; // rings 2, 4, 6 (0-indexed)
  const angles = [0, 45, 90, 135, 180, 225, 270, 315];

  const dots: { cx: number; cy: number; ring: number }[] = [];
  dotRings.forEach((ringIdx) => {
    const r = ringRadii[ringIdx];
    angles.forEach((angle) => {
      const rad = (angle * Math.PI) / 180;
      dots.push({
        cx: 300 + r * Math.cos(rad),
        cy: 300 + r * Math.sin(rad),
        ring: ringIdx,
      });
    });
  });

  // Generate connecting lines between some dots
  const connections: { x1: number; y1: number; x2: number; y2: number }[] = [];
  for (let i = 0; i < dots.length; i++) {
    for (let j = i + 1; j < dots.length; j++) {
      if (dots[i].ring !== dots[j].ring) {
        const dx = dots[i].cx - dots[j].cx;
        const dy = dots[i].cy - dots[j].cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          connections.push({
            x1: dots[i].cx,
            y1: dots[i].cy,
            x2: dots[j].cx,
            y2: dots[j].cy,
          });
        }
      }
    }
  }

  return (
    <section
      className="grain relative min-h-screen flex items-center justify-center bg-navy pt-24 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background glows */}
      <motion.div initial="hidden" animate="visible" variants={slowFadeIn}>
        {/* Labs teal glow — bottom right */}
        <div
          className="absolute bottom-0 right-0 w-[800px] h-[800px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 70% 70%, rgba(15,163,177,0.3) 0%, transparent 60%)",
          }}
        />
        {/* Studio purple glow — top left */}
        <div
          className="absolute top-0 left-0 w-[600px] h-[600px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 20% 20%, rgba(168,85,247,0.08) 0%, transparent 50%)",
          }}
        />
      </motion.div>

      {/* SVG expanding wave network — background visual */}
      <div
        ref={svgRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none transition-transform duration-200 ease-out"
      >
        <svg
          viewBox="0 0 600 600"
          className="w-[min(90vw,800px)] h-[min(90vw,800px)]"
          aria-hidden="true"
        >
          <g className="hero-ripple">
            {/* 6 concentric circles */}
            {ringRadii.map((r, i) => (
              <circle
                key={`ring-${i}`}
                cx="300"
                cy="300"
                r={r}
                fill="none"
                stroke="#0FA3B1"
                strokeWidth={2 - i * 0.25}
                opacity={0.2 - i * 0.025}
              />
            ))}

            {/* Dots at cardinal and diagonal points on rings 2, 4, 6 */}
            {dots.map((dot, i) => (
              <circle
                key={`dot-${i}`}
                cx={dot.cx}
                cy={dot.cy}
                r={2}
                fill="#0FA3B1"
                opacity={0.3}
              />
            ))}

            {/* Connecting lines between nearby dots */}
            {connections.map((line, i) => (
              <line
                key={`line-${i}`}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke="#0FA3B1"
                strokeWidth={0.5}
                opacity={0.08}
              />
            ))}
          </g>
        </svg>
      </div>

      {/* Content */}
      <Container>
        <motion.div
          variants={heroStagger}
          initial="hidden"
          animate="visible"
          className="relative z-10 text-center max-w-4xl mx-auto"
        >
          <motion.p
            variants={fadeUp}
            className="text-sm uppercase tracking-[0.15em] font-medium text-labs mb-4"
          >
            {t("eyebrow")}
          </motion.p>

          <motion.h1
            variants={blurIn}
            className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-[-0.04em] text-gradient-teal"
          >
            {t("title")}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mt-6"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            variants={scaleIn}
            className="mt-8 flex gap-4 flex-wrap justify-center"
          >
            <Button href="/contact" accentColor="#0FA3B1">
              {t("cta")}
            </Button>
            <Button href="/about" variant="secondary">
              {t("ctaSecondary")}
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
