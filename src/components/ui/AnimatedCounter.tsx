"use client";

import { useEffect, useRef, useState } from "react";

const CIRCUMFERENCE = 2 * Math.PI * 36; // ~226.19

type Props = {
  target: number;
  suffix?: string;
  duration?: number;
  accentColor?: string;
};

export function AnimatedCounter({
  target,
  suffix = "",
  duration = 2000,
  accentColor,
}: Props) {
  const [count, setCount] = useState(0);
  const [ringProgress, setRingProgress] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          observer.disconnect();

          // Trigger ring animation
          setRingProgress(0.75);

          const startTime = performance.now();

          function animate(currentTime: number) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease-out cubic for a smooth deceleration
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);

            setCount(current);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          }

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [target, duration]);

  const strokeColor = accentColor || "#ffffff";

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        className="absolute w-24 h-24 -rotate-90"
        viewBox="0 0 80 80"
      >
        <circle
          cx="40"
          cy="40"
          r="36"
          fill="none"
          stroke={strokeColor}
          strokeWidth="2"
          opacity="0.15"
        />
        <circle
          cx="40"
          cy="40"
          r="36"
          fill="none"
          stroke={strokeColor}
          strokeWidth="2"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - ringProgress)}
          strokeLinecap="round"
          className="transition-[stroke-dashoffset] duration-[2000ms] ease-out"
        />
      </svg>
      <span
        ref={ref}
        style={{ color: accentColor || "#ffffff" }}
        className="relative z-10 text-5xl md:text-6xl font-bold"
      >
        {count.toLocaleString()}
        {suffix}
      </span>
    </div>
  );
}
