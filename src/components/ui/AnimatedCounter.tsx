"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

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
  const [isCounting, setIsCounting] = useState(false);
  const [burstScale, setBurstScale] = useState(1);
  const ref = useRef<HTMLSpanElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          observer.disconnect();
          setIsCounting(true);

          // GSAP counter animation
          const counter = { value: 0 };
          const durationSec = duration / 1000;

          const tl = gsap.timeline();

          // Animate counter
          tl.to(counter, {
            value: target,
            duration: durationSec,
            ease: "power4.out",
            onUpdate: () => {
              setCount(Math.round(counter.value));
            },
            onComplete: () => {
              setIsCounting(false);
              // Burst pulse
              setBurstScale(1.08);
              setTimeout(() => setBurstScale(1), 200);
            },
          });

          // Animate ring in sync
          if (ringRef.current) {
            gsap.fromTo(
              ringRef.current,
              { strokeDashoffset: CIRCUMFERENCE },
              {
                strokeDashoffset: CIRCUMFERENCE * 0.25,
                duration: durationSec,
                ease: "power4.out",
              }
            );
          }

          setRingProgress(0.75);
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
          ref={ringRef}
          cx="40"
          cy="40"
          r="36"
          fill="none"
          stroke={strokeColor}
          strokeWidth="2"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE}
          strokeLinecap="round"
        />
      </svg>
      <span
        ref={ref}
        style={{
          color: accentColor || "#ffffff",
          filter: isCounting ? "blur(0.5px)" : "blur(0px)",
          transform: `scale(${burstScale})`,
          transition: "filter 0.3s ease-out, transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        className="relative z-10 text-5xl md:text-6xl font-bold tabular-nums"
      >
        {count.toLocaleString()}
        {suffix}
      </span>
    </div>
  );
}
