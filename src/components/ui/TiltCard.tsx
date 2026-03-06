"use client";

import type { ReactNode, CSSProperties } from "react";
import { useTilt } from "@/hooks/useTilt";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  glowColor?: string;
  maxRotation?: number;
}

export function TiltCard({
  children,
  className = "",
  style,
  glowColor,
  maxRotation = 8,
}: TiltCardProps) {
  const { ref: tiltRef, style: tiltStyle, glowStyle } = useTilt<HTMLDivElement>({ maxRotation, glowColor });

  return (
    <div
      ref={tiltRef}
      className={className}
      style={{ ...style, ...tiltStyle }}
    >
      {/* Cursor-following glow overlay */}
      {glowColor && (
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-300"
          style={glowStyle}
        />
      )}
      {children}
    </div>
  );
}
