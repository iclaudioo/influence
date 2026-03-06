"use client";

import { useEffect, useRef, useState } from "react";

interface MousePosition {
  x: number;
  y: number;
}

export function useMousePosition(lerp = 0.08): MousePosition {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });
  const posRef = useRef<MousePosition>({ x: 0, y: 0 });
  const target = useRef<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    function onMouseMove(e: MouseEvent) {
      target.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    }

    let rafId: number;
    function animate() {
      posRef.current = {
        x: posRef.current.x + (target.current.x - posRef.current.x) * lerp,
        y: posRef.current.y + (target.current.y - posRef.current.y) * lerp,
      };
      setPosition({ ...posRef.current });
      rafId = requestAnimationFrame(animate);
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [lerp]);

  return position;
}

// Reactive version using refs that can be read in motion values
export function useMousePositionRef(lerp = 0.08) {
  const position = useRef<MousePosition>({ x: 0, y: 0 });
  const target = useRef<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    function onMouseMove(e: MouseEvent) {
      target.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    }

    let rafId: number;

    function animate() {
      position.current = {
        x: position.current.x + (target.current.x - position.current.x) * lerp,
        y: position.current.y + (target.current.y - position.current.y) * lerp,
      };
      rafId = requestAnimationFrame(animate);
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [lerp]);

  return position;
}
