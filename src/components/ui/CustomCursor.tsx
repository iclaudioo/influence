"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const dotPos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    setIsVisible(true);

    function onMouseMove(e: MouseEvent) {
      target.current = { x: e.clientX, y: e.clientY };
    }

    function onMouseOver(e: MouseEvent) {
      const el = e.target as HTMLElement;
      const isInteractive = el.closest(
        "a, button, [role='button'], input, textarea, select, [data-cursor-hover]"
      );
      setIsHovering(!!isInteractive);
    }

    let rafId: number;

    function animate() {
      // Dot follows faster
      dotPos.current.x += (target.current.x - dotPos.current.x) * 0.15;
      dotPos.current.y += (target.current.y - dotPos.current.y) * 0.15;

      // Ring follows with more lag
      ringPos.current.x += (target.current.x - ringPos.current.x) * 0.08;
      ringPos.current.y += (target.current.y - ringPos.current.y) * 0.08;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotPos.current.x}px, ${dotPos.current.y}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`;
      }
      rafId = requestAnimationFrame(animate);
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Dot cursor */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{
          width: isHovering ? 6 : 8,
          height: isHovering ? 6 : 8,
          marginLeft: isHovering ? -3 : -4,
          marginTop: isHovering ? -3 : -4,
          borderRadius: "50%",
          backgroundColor: "#d55d25",
          opacity: 0.8,
          transition: "width 0.3s, height 0.3s, margin 0.3s",
        }}
      />
      {/* Trailing ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none mix-blend-difference"
        style={{
          width: isHovering ? 48 : 20,
          height: isHovering ? 48 : 20,
          marginLeft: isHovering ? -24 : -10,
          marginTop: isHovering ? -24 : -10,
          borderRadius: "50%",
          border: "1.5px solid rgba(213, 93, 37, 0.5)",
          backgroundColor: "transparent",
          opacity: isHovering ? 0.6 : 0.4,
          transition: "width 0.3s cubic-bezier(0.16,1,0.3,1), height 0.3s cubic-bezier(0.16,1,0.3,1), margin 0.3s cubic-bezier(0.16,1,0.3,1), opacity 0.3s",
        }}
      />
    </>
  );
}
