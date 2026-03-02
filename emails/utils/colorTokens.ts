export const colors = {
  navy: "#02182B",
  navyLight: "#0a2540",
  navyDark: "#010f1c",
  white: "#FFFFFF",
  offWhite: "#F8F9FA",
  labs: "#d55d25",
  circle: "#D7263D",
  studio: "#A855F7",
  academy: "#E8A317",
  textPrimary: "#02182B",
  textSecondary: "#4A5568",
  textMuted: "#718096",
  border: "#E2E8F0",
} as const;

export type ServiceLine = "labs" | "circle" | "studio" | "academy";

export function getServiceColor(service?: ServiceLine): string {
  if (!service) return colors.labs;
  return colors[service];
}

export function getServiceName(
  service: ServiceLine,
  lang: "nl" | "en" = "nl",
): string {
  const names: Record<ServiceLine, Record<string, string>> = {
    labs: { nl: "Influence Labs", en: "Influence Labs" },
    circle: { nl: "Influence Circle", en: "Influence Circle" },
    studio: { nl: "Influence Studio", en: "Influence Studio" },
    academy: { nl: "Influence Academy", en: "Influence Academy" },
  };
  return names[service][lang];
}
