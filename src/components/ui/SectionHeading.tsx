import React from "react";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
  light?: boolean;
  accentColor?: string;
  gradient?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
  light = true,
  accentColor,
  gradient = false,
}: Props) {
  const textColor = light ? "text-white" : "text-navy";
  const eyebrowColor = accentColor
    ? undefined
    : light
      ? "text-white/70"
      : "text-navy/60";

  const titleClasses = `text-4xl md:text-5xl font-bold tracking-tight mb-4 ${
    gradient && light ? "text-gradient-orange" : textColor
  }`;

  return (
    <div className={centered ? "text-center" : ""}>
      {eyebrow && (
        <p
          className={`mb-4 text-sm uppercase tracking-[0.15em] font-medium flex items-center ${centered ? "justify-center" : ""} ${eyebrowColor ?? ""}`}
          style={accentColor ? { color: accentColor } : undefined}
        >
          {!centered && (
            <span
              className="inline-block w-6 h-0.5 mr-3"
              style={{
                backgroundColor:
                  accentColor ||
                  (light ? "rgba(255,255,255,0.5)" : "rgba(2,24,43,0.3)"),
              }}
            />
          )}
          {eyebrow}
        </p>
      )}
      <h2 className={titleClasses}>{title}</h2>
      {description && (
        <p
          className={`text-lg font-light opacity-80 max-w-2xl ${textColor} ${centered ? "mx-auto" : ""}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
