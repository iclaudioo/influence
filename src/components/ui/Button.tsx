"use client";

import React from "react";
import { Link } from "@/i18n/navigation";

type ButtonProps = {
  variant?: "primary" | "secondary" | "ghost";
  href?: string;
  children: React.ReactNode;
  className?: string;
  accentColor?: string;
  onClick?: () => void;
  type?: "button" | "submit";
};

const baseStyles =
  "inline-flex items-center justify-center font-semibold transition-all duration-200 active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50";

const variantStyles = {
  primary: "rounded-full px-8 py-3",
  secondary: "rounded-full px-8 py-3 border-2",
  ghost: "group relative",
};

export function Button({
  variant = "primary",
  href,
  children,
  className = "",
  accentColor = "#0FA3B1",
  onClick,
  type = "button",
}: ButtonProps) {
  const classes = `${baseStyles} ${variantStyles[variant]} ${className}`;

  const inlineStyle: React.CSSProperties =
    variant === "primary"
      ? {
          backgroundColor: accentColor,
          color: "#ffffff",
          boxShadow: `0 0 30px ${accentColor}40`,
        }
      : variant === "secondary"
        ? {
            borderColor: accentColor,
            color: accentColor,
          }
        : {};

  const hoverClass =
    variant === "primary"
      ? "hover:brightness-110"
      : variant === "secondary"
        ? "hover:bg-[var(--accent-color-10)]"
        : "";

  // For secondary hover background, use a CSS variable
  const cssVarStyle: React.CSSProperties =
    variant === "secondary"
      ? {
          ...inlineStyle,
          "--accent-color-10": `${accentColor}1a`,
        } as React.CSSProperties
      : inlineStyle;

  const finalClasses = `${classes} ${hoverClass}`.trim();

  const content = (
    <>
      {children}
      {variant === "ghost" && (
        <span
          className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
          style={{ backgroundColor: accentColor }}
        />
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={finalClasses} style={cssVarStyle}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={finalClasses}
      style={cssVarStyle}
    >
      {content}
    </button>
  );
}
