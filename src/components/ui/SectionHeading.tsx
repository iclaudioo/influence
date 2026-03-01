import React from "react";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
  light?: boolean;
  accentColor?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
  light = true,
  accentColor,
}: Props) {
  const textColor = light ? "text-white" : "text-navy";
  const eyebrowColor = accentColor
    ? undefined
    : light
      ? "text-white/70"
      : "text-navy/60";

  return (
    <div className={centered ? "text-center" : ""}>
      {eyebrow && (
        <p
          className={`mb-4 text-sm uppercase tracking-[0.15em] font-medium ${eyebrowColor ?? ""}`}
          style={accentColor ? { color: accentColor } : undefined}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`text-4xl md:text-5xl font-bold tracking-tight mb-4 ${textColor}`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`text-lg opacity-80 max-w-2xl ${textColor} ${centered ? "mx-auto" : ""}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
