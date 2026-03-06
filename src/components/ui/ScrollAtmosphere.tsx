"use client";

import { motion, useScroll, useTransform } from "motion/react";

function AtmosphereBlob({
  color,
  size,
  baseTop,
  speed,
  opacity,
  side,
  posX,
}: {
  color: string;
  size: number;
  baseTop: number;
  speed: number;
  opacity: number;
  side: "left" | "right";
  posX: number;
}) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 5000], [baseTop, baseTop + 5000 * speed]);
  const scale = useTransform(scrollY, [0, 2500, 5000], [1, 1.05, 0.98]);

  return (
    <motion.div
      className="absolute rounded-full will-change-transform"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color}, transparent 70%)`,
        opacity,
        ...(side === "right" ? { right: posX } : { left: posX }),
        y,
        scale,
      }}
    />
  );
}

const blobs = [
  { color: "#d55d25", size: 800, baseTop: -100, speed: -0.05, opacity: 0.04, side: "right" as const, posX: -200 },
  { color: "#D7263D", size: 600, baseTop: 400, speed: -0.08, opacity: 0.03, side: "left" as const, posX: -150 },
  { color: "#A855F7", size: 700, baseTop: 1200, speed: -0.06, opacity: 0.03, side: "right" as const, posX: -100 },
  { color: "#E8A317", size: 500, baseTop: 2000, speed: -0.04, opacity: 0.04, side: "left" as const, posX: -100 },
];

export function ScrollAtmosphere() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      {blobs.map((blob, i) => (
        <AtmosphereBlob key={i} {...blob} />
      ))}
    </div>
  );
}
