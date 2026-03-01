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
  "inline-flex items-center justify-center font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50";

const variantStyles = {
  primary: "rounded-full px-8 py-3 bg-white text-navy hover:bg-gray-100",
  secondary:
    "rounded-full px-8 py-3 border-2 border-white text-white hover:bg-white/10",
  ghost:
    "text-white hover:text-white/80 underline-offset-4 hover:underline",
};

export function Button({
  variant = "primary",
  href,
  children,
  className = "",
  accentColor,
  onClick,
  type = "button",
}: ButtonProps) {
  const classes = `${baseStyles} ${variantStyles[variant]} ${className}`;

  const accentStyle: React.CSSProperties | undefined =
    accentColor && variant === "primary"
      ? { backgroundColor: accentColor, color: "#ffffff" }
      : undefined;

  if (href) {
    return (
      <Link href={href} className={classes} style={accentStyle}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      style={accentStyle}
    >
      {children}
    </button>
  );
}
