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
    ? "relative overflow-hidden rounded-2xl bg-navy-light/60 backdrop-blur-xl border border-white/[0.06] p-8"
    : "relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg shadow-navy/5";

  const hoverClasses = hover
    ? "transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group"
    : "";

  return (
    <div
      className={`${baseClasses} ${hoverClasses} ${className}`}
      style={hover && accentColor ? { boxShadow: `0 0 40px ${accentColor}10` } : undefined}
    >
      {/* Top gradient accent bar for dark variant */}
      {accentColor && isDark && (
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent 10%, ${accentColor}50, transparent 90%)`,
          }}
        />
      )}
      {/* Left solid accent for light variant */}
      {accentColor && !isDark && (
        <div
          className="absolute inset-y-0 left-0 w-[3px] rounded-l-2xl"
          style={{ backgroundColor: accentColor }}
        />
      )}
      {/* Hover corner glow for dark variant */}
      {hover && isDark && accentColor && (
        <div
          className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${accentColor}12, transparent)` }}
        />
      )}
      {/* Hover subtle top shimmer */}
      {hover && (
        <div
          className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: accentColor
              ? `linear-gradient(90deg, transparent, ${accentColor}25, transparent)`
              : "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
