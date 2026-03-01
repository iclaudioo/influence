import React from "react";

type Props = {
  children: React.ReactNode;
  accentColor?: string;
  className?: string;
  hover?: boolean;
  variant?: "dark" | "light";
};

export function Card({
  children,
  accentColor,
  className = "",
  hover = false,
  variant = "light",
}: Props) {
  const isDark = variant === "dark";

  const baseClasses = isDark
    ? "relative overflow-hidden rounded-2xl bg-[#0a2540]/80 backdrop-blur-xl border border-white/10 p-8"
    : "relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg shadow-navy/5";

  const hoverClasses = hover
    ? isDark
      ? "transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
      : "transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-navy/10"
    : "";

  const hoverGlowStyle: React.CSSProperties =
    hover && accentColor
      ? { boxShadow: `0 0 40px ${accentColor}15` }
      : {};

  return (
    <div
      className={`${baseClasses} ${hoverClasses} ${className}`}
      style={hoverGlowStyle}
    >
      {/* Accent bar: top gradient for dark, left solid for light */}
      {accentColor && isDark && (
        <div
          className="absolute inset-x-0 top-0 h-0.5"
          style={{
            background: `linear-gradient(90deg, ${accentColor}, ${accentColor}00)`,
          }}
        />
      )}
      {accentColor && !isDark && (
        <div
          className="absolute inset-y-0 left-0 w-1 rounded-l-2xl"
          style={{ backgroundColor: accentColor }}
        />
      )}
      {children}
    </div>
  );
}
