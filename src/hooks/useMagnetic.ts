"use client";

import { useRef, useEffect, useState, type CSSProperties } from "react";

interface MagneticOptions {
  maxDistance?: number;
  returnDuration?: number;
}

export function useMagnetic<T extends HTMLElement = HTMLElement>(
  options: MagneticOptions = {}
) {
  const { maxDistance = 12, returnDuration = 400 } = options;
  const ref = useRef<T>(null);
  const [style, setStyle] = useState<CSSProperties>({});
  const isReducedMotion = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    isReducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (isReducedMotion.current || !ref.current) return;

    const el = ref.current;

    function onMouseMove(e: MouseEvent) {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      // Calculate distance and clamp
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const maxDist = Math.max(rect.width, rect.height);

      if (distance < maxDist) {
        const factor = Math.min(distance / maxDist, 1);
        const x = (deltaX / maxDist) * maxDistance * factor;
        const y = (deltaY / maxDist) * maxDistance * factor;

        setStyle({
          transform: `translate(${x}px, ${y}px)`,
          transition: "transform 0.15s ease-out",
        });
      }
    }

    function onMouseLeave() {
      setStyle({
        transform: "translate(0px, 0px)",
        transition: `transform ${returnDuration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
      });
    }

    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseleave", onMouseLeave);

    return () => {
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [maxDistance, returnDuration]);

  return { ref, style };
}
