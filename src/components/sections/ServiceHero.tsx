"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { motion, useSpring, useTransform } from "motion/react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { BackgroundCircles } from "@/components/ui/BackgroundCircles";
import { SplitText } from "@/components/ui/SplitText";
import { heroStagger, fadeUp } from "@/lib/animations";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { useMousePositionRef } from "@/hooks/useMousePosition";

type Props = {
  namespace: string;
  accentColor: string;
  featured?: boolean;
  networkNodes?: boolean;
  gradientMesh?: boolean;
  layeredBlocks?: boolean;
  animatedCircles?: "labs" | "circle" | "studio" | "academy" | "gold" | "orange";
  backgroundImage?: string;
  breadcrumbLabel?: string;
  breadcrumbHref?: string;
};

export function ServiceHero({ namespace, accentColor, featured, networkNodes, gradientMesh, layeredBlocks, animatedCircles, backgroundImage, breadcrumbLabel, breadcrumbHref }: Props) {
  const t = useTranslations(namespace);
  const mouse = useMousePositionRef(0.06);

  const mouseXSpring = useSpring(0, { stiffness: 50, damping: 20 });
  const mouseYSpring = useSpring(0, { stiffness: 50, damping: 20 });

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

  const bgX = useTransform(mouseXSpring, [-1, 1], [12, -12]);
  const bgY = useTransform(mouseYSpring, [-1, 1], [12, -12]);
  const contentX = useTransform(mouseXSpring, [-1, 1], [-3, 3]);
  const contentY = useTransform(mouseYSpring, [-1, 1], [-3, 3]);

  return (
    <section
      className={`relative ${featured ? 'min-h-screen' : 'min-h-[70vh]'} flex items-center pt-24 overflow-hidden`}
      style={{
        background: `radial-gradient(ellipse at 30% 70%, ${accentColor}10 0%, transparent 50%), radial-gradient(ellipse at 70% 30%, ${accentColor}06 0%, transparent 50%), linear-gradient(180deg, var(--color-navy) 0%, var(--color-navy-dark) 100%)`,
      }}
    >
      {/* Background image — deepest parallax layer */}
      {backgroundImage && (
        <motion.div className="absolute inset-0 pointer-events-none" style={{ x: bgX, y: bgY }} aria-hidden="true">
          <Image src={backgroundImage} alt="" fill className="object-cover opacity-[0.12] mix-blend-luminosity" sizes="100vw" />
        </motion.div>
      )}

      {/* Featured: grid-dot SVG pattern (Labs) — with parallax */}
      {featured && (
        <motion.div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{ x: bgX, y: bgY }}>
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]">
            <pattern id="grid-dots-hero" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1.5" fill={accentColor} />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid-dots-hero)" />
          </svg>
        </motion.div>
      )}

      {/* Network nodes visual (Circle) — with parallax */}
      {networkNodes && (
        <motion.div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true" style={{ x: bgX, y: bgY }}>
          <svg className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-[0.10]" viewBox="0 0 400 400">
            <circle cx="200" cy="80" r="6" fill={accentColor} />
            <circle cx="320" cy="160" r="8" fill={accentColor} />
            <circle cx="280" cy="300" r="5" fill={accentColor} />
            <circle cx="120" cy="280" r="7" fill={accentColor} />
            <circle cx="80" cy="160" r="6" fill={accentColor} />
            <circle cx="200" cy="200" r="10" fill={accentColor} />
            <line x1="200" y1="80" x2="320" y2="160" stroke={accentColor} strokeWidth="1" opacity="0.4" />
            <line x1="320" y1="160" x2="280" y2="300" stroke={accentColor} strokeWidth="1" opacity="0.4" />
            <line x1="280" y1="300" x2="120" y2="280" stroke={accentColor} strokeWidth="1" opacity="0.4" />
            <line x1="120" y1="280" x2="80" y2="160" stroke={accentColor} strokeWidth="1" opacity="0.4" />
            <line x1="80" y1="160" x2="200" y2="80" stroke={accentColor} strokeWidth="1" opacity="0.4" />
            <line x1="200" y1="200" x2="200" y2="80" stroke={accentColor} strokeWidth="1" opacity="0.2" />
            <line x1="200" y1="200" x2="320" y2="160" stroke={accentColor} strokeWidth="1" opacity="0.2" />
            <line x1="200" y1="200" x2="280" y2="300" stroke={accentColor} strokeWidth="1" opacity="0.2" />
            <line x1="200" y1="200" x2="120" y2="280" stroke={accentColor} strokeWidth="1" opacity="0.2" />
            <line x1="200" y1="200" x2="80" y2="160" stroke={accentColor} strokeWidth="1" opacity="0.2" />
            <circle cx="200" cy="200" r="20" fill="none" stroke={accentColor} strokeWidth="1" opacity="0.15">
              <animate attributeName="r" values="20;30;20" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.15;0.04;0.15" dur="3s" repeatCount="indefinite" />
            </circle>
          </svg>
        </motion.div>
      )}

      {/* Gradient mesh visual (Studio) */}
      {gradientMesh && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full opacity-[0.08]"
            style={{ background: `radial-gradient(circle, ${accentColor}, transparent 70%)` }} />
          <div className="absolute bottom-10 left-10 w-[300px] h-[200px] rounded-[50%] opacity-[0.06] rotate-12"
            style={{ background: `radial-gradient(ellipse, ${accentColor}, transparent 70%)` }} />
          <div className="absolute top-1/3 right-1/4 w-[250px] h-[250px] rounded-full opacity-[0.04] -rotate-6"
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
                height: '2px',
                right: `${60 + i * 15}px`,
                top: `${35 + i * 8}%`,
                background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
                opacity: 0.04 + i * 0.02,
              }}
            />
          ))}
        </div>
      )}

      {/* Animated circles visual */}
      {animatedCircles && (
        <BackgroundCircles variant={animatedCircles} />
      )}

      {/* Top gradient for navbar blend */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-navy-dark/30 to-transparent pointer-events-none z-10" />

      <Container className="relative z-10">
        <motion.div
          variants={heroStagger}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
          style={{ x: contentX, y: contentY }}
        >
          {/* Breadcrumb */}
          {breadcrumbLabel && (
            <motion.div variants={fadeUp}>
              <Breadcrumb
                items={[
                  { label: "Home", href: "/" },
                  { label: breadcrumbLabel, href: breadcrumbHref },
                ]}
              />
            </motion.div>
          )}

          {/* Eyebrow with line */}
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-5">
            <span
              className="h-px w-8"
              style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)` }}
            />
            <p
              className="text-xs uppercase tracking-[0.2em] font-medium"
              style={{ color: accentColor }}
            >
              {t("hero.eyebrow")}
            </p>
          </motion.div>

          <SplitText
            as="h1"
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-[-0.03em] text-white leading-[1.05] mb-6"
          >
            {t("hero.title")}
          </SplitText>

          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed font-light"
          >
            {t("hero.subtitle")}
          </motion.p>
        </motion.div>
      </Container>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-navy to-transparent pointer-events-none z-10" />
    </section>
  );
}
