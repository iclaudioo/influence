"use client";

import React from "react";
import { motion } from "motion/react";
import { Link } from "@/i18n/navigation";
import { useMagnetic } from "@/hooks/useMagnetic";

type ButtonProps = {
  variant?: "primary" | "secondary" | "ghost";
  href?: string;
  children: React.ReactNode;
  className?: string;
  accentColor?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

const baseStyles =
  "inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1d1d1f]/20";

const variantStyles = {
  primary: "rounded-full px-8 py-3 relative overflow-hidden",
  secondary: "rounded-full px-8 py-3 border-2",
  ghost: "group relative",
};

export function Button({
  variant = "primary",
  href,
  children,
  className = "",
  accentColor = "#d55d25",
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
  const classes = `${baseStyles} ${variantStyles[variant]} ${className}`;

  const inlineStyle: React.CSSProperties =
    variant === "primary"
      ? {
          backgroundColor: accentColor,
          color: "#ffffff",
          boxShadow: `0 0 30px ${accentColor}30, 0 4px 12px ${accentColor}20`,
        }
      : variant === "secondary"
        ? {
            borderColor: `${accentColor}60`,
            color: accentColor,
          }
        : {};

  const hoverClass =
    variant === "primary"
      ? "hover:brightness-110 hover:shadow-lg"
      : variant === "secondary"
        ? "hover:bg-[var(--accent-color-10)] hover:border-[var(--accent-color)]"
        : "";

  const cssVarStyle: React.CSSProperties =
    variant === "secondary"
      ? {
          ...inlineStyle,
          "--accent-color-10": `${accentColor}1a`,
          "--accent-color": accentColor,
        } as React.CSSProperties
      : inlineStyle;

  const disabledClass = disabled ? "opacity-60 pointer-events-none" : "";
  const finalClasses = `${classes} ${disabled ? "" : hoverClass} ${disabledClass}`.trim();

  const content = (
    <>
      {/* Shimmer effect on primary buttons */}
      {variant === "primary" && (
        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-[linear-gradient(105deg,transparent_40%,rgba(255,255,255,0.12)_50%,transparent_60%)] pointer-events-none" />
      )}
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {variant === "primary" && (
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          >
            <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      {variant === "ghost" && (
        <span
          className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
          style={{ backgroundColor: accentColor }}
        />
      )}
    </>
  );

  const { ref: magneticRef, style: magneticStyle } = useMagnetic<HTMLDivElement>({ maxDistance: 12 });
  const isPrimary = variant === "primary";

  if (href) {
    const link = (
      <Link href={href} className={`${finalClasses} group`} style={cssVarStyle}>
        {content}
      </Link>
    );

    if (!isPrimary) return link;

    return (
      <motion.div
        ref={magneticRef}
        style={magneticStyle}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className="inline-flex"
      >
        {link}
      </motion.div>
    );
  }

  const btn = (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${finalClasses} group`}
      style={cssVarStyle}
    >
      {content}
    </button>
  );

  if (!isPrimary || disabled) return btn;

  return (
    <motion.div
      ref={magneticRef}
      style={magneticStyle}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="inline-flex"
    >
      {btn}
    </motion.div>
  );
}
