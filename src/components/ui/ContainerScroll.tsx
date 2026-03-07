"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from "motion/react";

interface ContainerScrollProps {
  children: React.ReactNode;
  scrollHeight?: string;
  initialScale?: number;
  initialBorderRadius?: number;
  initialInsetY?: number;
  initialInsetX?: number;
  behindColor?: string;
  className?: string;
}

export function ContainerScroll({
  children,
  scrollHeight = "150vh",
  initialScale = 0.85,
  initialBorderRadius = 20,
  initialInsetY = 60,
  initialInsetX = 24,
  behindColor = "transparent",
  className,
}: ContainerScrollProps) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [initialScale, 1]);
  const borderRadius = useTransform(
    scrollYProgress,
    [0, 1],
    [initialBorderRadius, 0]
  );
  const insetY = useTransform(scrollYProgress, [0, 0.85], [initialInsetY, 0]);
  const insetX = useTransform(scrollYProgress, [0, 0.85], [initialInsetX, 0]);

  const clipPath = useMotionTemplate`inset(${insetY}px ${insetX}px round ${borderRadius}px)`;

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={containerRef}
      style={{ height: scrollHeight, backgroundColor: behindColor }}
    >
      <div className="sticky top-0 z-10 h-screen">
        <motion.div
          className={className}
          style={{
            scale,
            clipPath,
            willChange: "transform, clip-path",
            height: "100%",
          }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
