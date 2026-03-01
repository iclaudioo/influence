"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  target: number;
  suffix?: string;
  duration?: number;
};

export function AnimatedCounter({
  target,
  suffix = "",
  duration = 2000,
}: Props) {
  const [count, setCount] = useState(0);
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

  return (
    <span ref={ref} className="text-5xl md:text-6xl font-bold text-white">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}
