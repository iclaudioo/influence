"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useSpring, useTransform } from "motion/react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SpiralAnimation } from "@/components/ui/SpiralAnimation";
import { BackgroundCircles } from "@/components/ui/BackgroundCircles";
import { SplitText } from "@/components/ui/SplitText";
import {
  heroStagger,
  fadeUp,
  scaleIn,
  blurFadeUp,
} from "@/lib/animations";
import { useMousePositionRef } from "@/hooks/useMousePosition";

export function HeroSection() {
  const t = useTranslations("hero");
  const mouse = useMousePositionRef(0.06);

  // Spring-based motion values for smooth parallax
  const mouseXSpring = useSpring(0, { stiffness: 50, damping: 20 });
  const mouseYSpring = useSpring(0, { stiffness: 50, damping: 20 });

  // Update spring values from mouse ref via RAF
  useEffect(() => {
    let rafId: number;
    function update() {
      mouseXSpring.set(mouse.current.x);
      mouseYSpring.set(mouse.current.y);
      rafId = requestAnimationFrame(update);
    }
    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, [mouseXSpring, mouseYSpring, mouse]);

  // Parallax layers
  const bgX = useTransform(mouseXSpring, [-1, 1], [15, -15]);
  const bgY = useTransform(mouseYSpring, [-1, 1], [15, -15]);
  const orbitalX = useTransform(mouseXSpring, [-1, 1], [8, -8]);
  const orbitalY = useTransform(mouseYSpring, [-1, 1], [8, -8]);
  const contentX = useTransform(mouseXSpring, [-1, 1], [-4, 4]);
  const contentY = useTransform(mouseYSpring, [-1, 1], [-4, 4]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden mesh-gradient-hero">
      {/* Background image — deepest parallax layer */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ x: bgX, y: bgY }} aria-hidden="true">
        <Image src="/images/generated/heroes/homepage-hero.png" alt="" fill className="object-cover opacity-[0.10] mix-blend-luminosity" sizes="100vw" priority />
      </motion.div>

      {/* Spiral animation background — parallax layer 1 (deepest) */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ x: bgX, y: bgY }}
      >
        <SpiralAnimation />
      </motion.div>

      {/* Background circles — parallax layer 1 */}
      <motion.div style={{ x: bgX, y: bgY }}>
        <BackgroundCircles variant="orange" />
      </motion.div>

      {/* Orbital accent rings — parallax layer 2 */}
      <motion.div
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
        style={{ x: orbitalX, y: orbitalY }}
      >
        <div className="w-[700px] h-[700px] rounded-full border border-white/[0.03] animate-orbital" />
        <div className="absolute w-[500px] h-[500px] rounded-full border border-labs/[0.06] animate-orbital-reverse" />
        {/* Accent dots on orbital */}
        <div className="absolute w-[700px] h-[700px] animate-orbital">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-labs/40" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-academy/30" />
        </div>
      </motion.div>

      {/* Top gradient fade for navbar blending */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-navy-dark/50 to-transparent pointer-events-none z-10" />

      {/* Content — parallax layer 3 (foreground, moves opposite) */}
      <Container>
        <motion.div
          variants={heroStagger}
          initial="hidden"
          animate="visible"
          className="relative z-10 text-center max-w-5xl mx-auto pt-24"
          style={{ x: contentX, y: contentY }}
        >
          {/* Eyebrow with decorative line */}
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-labs/60" />
            <p className="text-sm uppercase tracking-[0.2em] font-medium text-labs">
              {t("eyebrow")}
            </p>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-labs/60" />
          </motion.div>

          {/* Main title — word-by-word split reveal, delayed to play after eyebrow */}
          <SplitText
            as="h1"
            className="text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] font-bold tracking-[-0.04em] leading-[0.9] text-gradient-orange"
            trigger="animate"
            delay={0.3}
          >
            {t("title")}
          </SplitText>

          {/* Subtitle with refined opacity */}
          <motion.p
            variants={blurFadeUp}
            className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mt-8 leading-relaxed font-light"
          >
            {t("subtitle")}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={scaleIn}
            className="mt-10 flex gap-4 flex-wrap justify-center"
          >
            <Button href="/contact" accentColor="#d55d25">
              {t("cta")}
            </Button>
            <Button href="/about" variant="secondary">
              {t("ctaSecondary")}
            </Button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="mt-20 flex flex-col items-center gap-2"
          >
            <span className="text-[10px] uppercase tracking-[0.25em] text-white/30 font-medium">Scroll</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent"
            />
          </motion.div>
        </motion.div>
      </Container>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-navy to-transparent pointer-events-none z-10" />
    </section>
  );
}
