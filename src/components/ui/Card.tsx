import React from "react";

type Props = {
  children: React.ReactNode;
  accentColor?: string;
  className?: string;
  hover?: boolean;
};

export function Card({
  children,
  accentColor,
  className = "",
  hover = false,
}: Props) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg shadow-navy/5 ${
        hover
          ? "transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/10"
          : ""
      } ${className}`}
    >
      {accentColor && (
        <div
          className="absolute inset-x-0 top-0 h-1"
          style={{ backgroundColor: accentColor }}
        />
      )}
      {children}
    </div>
  );
}
