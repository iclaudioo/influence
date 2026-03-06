"use client";

import { useRef, useEffect, useState, type CSSProperties } from "react";

interface TiltOptions {
  maxRotation?: number;
  perspective?: number;
  scale?: number;
  glowColor?: string;
}

export function useTilt<T extends HTMLElement = HTMLElement>(
  options: TiltOptions = {}
) {
  const {
    maxRotation = 8,
    perspective = 1000,
    scale = 1.02,
    glowColor,
  } = options;

  const ref = useRef<T>(null);
  const [style, setStyle] = useState<CSSProperties>({});
  const [glowStyle, setGlowStyle] = useState<CSSProperties>({});

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = ref.current;
    if (!el) return;

    function onMouseMove(e: MouseEvent) {
      const rect = el!.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      const rotateY = (x - 0.5) * maxRotation * 2;
      const rotateX = (0.5 - y) * maxRotation * 2;

      setStyle({
        transform: `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px) scale(${scale})`,
        transition: "transform 0.15s ease-out",
      });

      if (glowColor) {
        setGlowStyle({
          background: `radial-gradient(circle at ${x * 100}% ${y * 100}%, ${glowColor}15, transparent 60%)`,
          opacity: 1,
        });
      }
    }

    function onMouseLeave() {
      setStyle({
        transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)`,
        transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
      });

      if (glowColor) {
        setGlowStyle({
          opacity: 0,
          transition: "opacity 0.5s ease-out",
        });
      }
    }

    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseleave", onMouseLeave);

    return () => {
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [maxRotation, perspective, scale, glowColor]);

  return { ref, style, glowStyle };
}
