export const colors = {
  navy: "#02182B",
  navyLight: "#0a2540",
  navyDark: "#010f1c",
  white: "#FFFFFF",
  offWhite: "#FAF8F5",
  gold: "#C4A265",
  labs: "#0FA3B1",
  circle: "#D7263D",
  studio: "#A855F7",
  academy: "#E8A317",
} as const;

export type ServiceLine = "labs" | "circle" | "studio" | "academy";

export const serviceLines: Record<
  ServiceLine,
  { color: string; href: string; icon: string }
> = {
  labs: { color: colors.labs, href: "/labs", icon: "🔬" },
  circle: { color: colors.circle, href: "/circle", icon: "⭕" },
  studio: { color: colors.studio, href: "/studio", icon: "🎬" },
  academy: { color: colors.academy, href: "/academy", icon: "🎓" },
} as const;
