"use client";

import { useEffect } from "react";
import { motion, useSpring, useTransform } from "motion/react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SplitText } from "@/components/ui/SplitText";
import { blurFadeUp } from "@/lib/animations";
import { useMousePositionRef } from "@/hooks/useMousePosition";

export function CTABanner() {
  const t = useTranslations("ctaBanner");
  const mouse = useMousePositionRef(0.06);

  const mouseXSpring = useSpring(0, { stiffness: 40, damping: 20 });
  const mouseYSpring = useSpring(0, { stiffness: 40, damping: 20 });

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

  // Parallax transforms for each ring (fixed hook calls, not in a loop)
  const ring1X = useTransform(mouseXSpring, [-1, 1], [-3, 3]);
  const ring1Y = useTransform(mouseYSpring, [-1, 1], [-3, 3]);
  const ring2X = useTransform(mouseXSpring, [-1, 1], [-6, 6]);
  const ring2Y = useTransform(mouseYSpring, [-1, 1], [-6, 6]);
  const ring3X = useTransform(mouseXSpring, [-1, 1], [-9, 9]);
  const ring3Y = useTransform(mouseYSpring, [-1, 1], [-9, 9]);
  const ring4X = useTransform(mouseXSpring, [-1, 1], [-12, 12]);
  const ring4Y = useTransform(mouseYSpring, [-1, 1], [-12, 12]);
  const ring5X = useTransform(mouseXSpring, [-1, 1], [-15, 15]);
  const ring5Y = useTransform(mouseYSpring, [-1, 1], [-15, 15]);

  const ringTransforms = [
    { x: ring1X, y: ring1Y },
    { x: ring2X, y: ring2Y },
    { x: ring3X, y: ring3Y },
    { x: ring4X, y: ring4Y },
    { x: ring5X, y: ring5Y },
  ];

  // Center glow follows mouse
  const glowX = useTransform(mouseXSpring, [-1, 1], [45, 55]);
  const glowY = useTransform(mouseYSpring, [-1, 1], [45, 55]);
  const glowBg = useTransform(
    [glowX, glowY],
    ([x, y]) => `radial-gradient(ellipse at ${x}% ${y}%, rgba(213,93,37,0.2) 0%, transparent 55%)`
  );

  return (
    <section className="section-padding relative overflow-hidden grain">
      {/* Multi-layer gradient background */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(135deg, #010f1c 0%, #0a2540 40%, #02182B 70%, #010f1c 100%)",
      }} />

      {/* Warm center glow — follows mouse */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: glowBg }}
      />

      {/* Secondary accent glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 80% 80%, rgba(232,163,23,0.06) 0%, transparent 50%)" }}
      />

      {/* Decorative concentric circles with parallax */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[1, 2, 3, 4, 5].map((i, idx) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-labs/[0.06]"
            style={{
              width: `${120 + i * 100}px`,
              height: `${120 + i * 100}px`,
              x: ringTransforms[idx].x,
              y: ringTransforms[idx].y,
            }}
          />
        ))}
      </div>

      {/* Animated orbital accent */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] animate-orbital-reverse">
          <div className="absolute top-0 left-1/2 w-1 h-1 rounded-full bg-labs/30" />
        </div>
      </div>

      <Container className="relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="text-center max-w-2xl mx-auto"
        >
          {/* Title — word-by-word split */}
          <SplitText
            as="h2"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.1]"
          >
            {t("title")}
          </SplitText>

          {/* CTA button with glow + pulse ring */}
          <motion.div variants={blurFadeUp} className="mt-10 flex justify-center">
            <div className="relative group">
              {/* Animated glow behind button */}
              <div className="absolute -inset-1 rounded-full bg-labs/20 blur-xl group-hover:bg-labs/30 transition-all duration-500 animate-breathing-glow" />
              {/* Pulse ring on hover */}
              <div className="absolute -inset-2 rounded-full border border-labs/0 group-hover:border-labs/20 group-hover:animate-[pulseRing_1.2s_ease-out_infinite] pointer-events-none" />
              <div className="relative">
                <Button href="/contact" className="text-lg px-12 py-4">{t("cta")}</Button>
              </div>
            </div>
          </motion.div>

          {/* Phone line */}
          <motion.p
            variants={blurFadeUp}
            className="mt-6 text-white/40 text-sm"
          >
            {t("phone")}
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
