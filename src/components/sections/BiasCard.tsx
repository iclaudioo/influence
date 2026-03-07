"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const SERVICE_COLORS: Record<string, string> = {
  labs: "#d55d25",
  circle: "#D7263D",
  studio: "#A855F7",
  academy: "#E8A317",
};

const SERVICE_HREFS: Record<string, string> = {
  labs: "/labs",
  circle: "/circle",
  studio: "/studio",
  academy: "/academy",
};

/* ---------- SVG icons per bias key ---------- */
function BiasIcon({ biasKey, color }: { biasKey: string; color: string }) {
  switch (biasKey) {
    case "mere-exposure":
      return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="4" stroke={color} strokeWidth="1.5" />
          <circle cx="16" cy="16" r="8" stroke={color} strokeWidth="1" opacity="0.5" />
          <circle cx="16" cy="16" r="12" stroke={color} strokeWidth="0.75" opacity="0.3" />
        </svg>
      );
    case "authority-bias":
      return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M16 4l2.5 5 5.5.8-4 3.9.9 5.3L16 16.5 11.1 19l.9-5.3-4-3.9 5.5-.8L16 4z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
          <line x1="16" y1="22" x2="16" y2="28" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
        </svg>
      );
    case "social-proof":
      return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="8" cy="18" r="2.5" stroke={color} strokeWidth="1.2" opacity="0.5" />
          <circle cx="16" cy="14" r="3" stroke={color} strokeWidth="1.5" />
          <circle cx="24" cy="18" r="2.5" stroke={color} strokeWidth="1.2" opacity="0.5" />
          <path d="M6 24c1-3 3-4 5-4s4 1 5 4M18 24c1-3 3-4 5-4s4 1 5 4" stroke={color} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
          <path d="M11 22c1-3 3-5 5-5s4 2 5 5" stroke={color} strokeWidth="1.2" opacity="0.5" strokeLinecap="round" />
        </svg>
      );
    case "halo-effect":
      return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="6" stroke={color} strokeWidth="1.5" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <line
              key={deg}
              x1="16"
              y1="16"
              x2={16 + Math.cos((deg * Math.PI) / 180) * 13}
              y2={16 + Math.sin((deg * Math.PI) / 180) * 13}
              stroke={color}
              strokeWidth="1"
              opacity="0.3"
              strokeLinecap="round"
            />
          ))}
        </svg>
      );
    case "anchoring":
      return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="8" r="3" stroke={color} strokeWidth="1.5" />
          <line x1="16" y1="11" x2="16" y2="26" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M10 22c0 3.3 2.7 6 6 6s6-2.7 6-6" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <line x1="12" y1="18" x2="20" y2="18" stroke={color} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
        </svg>
      );
    case "availability-heuristic":
      return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="14" cy="14" r="8" stroke={color} strokeWidth="1.5" />
          <line x1="20" y1="20" x2="27" y2="27" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <circle cx="11" cy="12" r="1.5" fill={color} opacity="0.3" />
          <circle cx="16" cy="11" r="1.5" fill={color} opacity="0.3" />
          <circle cx="14" cy="16" r="1.5" fill={color} opacity="0.3" />
        </svg>
      );
    case "framing-effect":
      return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect x="3" y="6" width="12" height="12" rx="1.5" stroke={color} strokeWidth="1.5" />
          <rect x="17" y="14" width="12" height="12" rx="1.5" stroke={color} strokeWidth="1.5" opacity="0.5" />
          <circle cx="9" cy="12" r="3" fill={color} opacity="0.3" />
          <circle cx="23" cy="20" r="3" fill={color} opacity="0.3" />
        </svg>
      );
    case "bandwagon-effect":
      return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="6" cy="20" r="2.5" fill={color} opacity="0.3" />
          <circle cx="12" cy="16" r="2.5" fill={color} opacity="0.45" />
          <circle cx="18" cy="13" r="2.5" fill={color} opacity="0.6" />
          <circle cx="24" cy="11" r="2.5" fill={color} opacity="0.8" />
          <path d="M5 22c3-1 6-3 9-5s6-3.5 9-4.5" stroke={color} strokeWidth="1" opacity="0.25" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}

type BiasItem = {
  key: string;
  title: string;
  oneliner: string;
  description: string;
  application: string;
  service: string;
  serviceLabel: string;
};

type Props = {
  item: BiasItem;
  featured?: boolean;
};

export function BiasCard({ item, featured = false }: Props) {
  const [expanded, setExpanded] = useState(false);
  const t = useTranslations("biases");
  const color = SERVICE_COLORS[item.service] ?? "#d55d25";
  const href = SERVICE_HREFS[item.service] ?? "/";

  return (
    <motion.div
      whileHover={{
        y: -6,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      onClick={() => setExpanded((v) => !v)}
      className={`relative overflow-hidden rounded-2xl p-8 cursor-pointer group ${
        featured ? "md:col-span-2 lg:col-span-2 lg:row-span-2" : ""
      }`}
      style={{
        background: `linear-gradient(135deg, ${color}08 0%, ${color}03 100%)`,
        border: `1px solid ${color}18`,
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${color}12 0%, transparent 70%)`,
        }}
      />

      {/* Shimmer top line */}
      <div
        className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}40, transparent)`,
        }}
      />

      {/* Corner glow */}
      <div
        className="absolute -top-20 -right-20 w-56 h-56 rounded-full opacity-0 group-hover:opacity-20 transition-all duration-700"
        style={{ background: `radial-gradient(circle, ${color}, transparent)` }}
      />

      <div className="relative z-10">
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
          style={{ backgroundColor: `${color}12`, color }}
        >
          <BiasIcon biasKey={item.key} color={color} />
        </div>

        <h3 className={`font-bold text-[#1d1d1f] mb-2 ${featured ? "text-2xl" : "text-lg"}`}>
          {item.title}
        </h3>

        <p className="text-[#6e6e73] text-sm leading-relaxed">{item.oneliner}</p>

        {/* Expanded content */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pt-5 border-t border-black/[0.06] mt-5">
                <p className="text-[#6e6e73] text-sm leading-relaxed mb-4">
                  {item.description}
                </p>

                <div
                  className="rounded-lg p-4 mb-4"
                  style={{ backgroundColor: `${color}08` }}
                >
                  <p className="text-xs uppercase tracking-wider font-medium mb-2" style={{ color }}>
                    {t("card.howWeApply")}
                  </p>
                  <p className="text-[#6e6e73] text-sm leading-relaxed">
                    {item.application}
                  </p>
                </div>

                <Link
                  href={href}
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 hover:gap-3"
                  style={{ color }}
                >
                  {item.serviceLabel}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="transition-transform duration-300"
                  >
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expand indicator */}
        <div className="mt-4 flex items-center gap-1.5 text-xs text-[#a1a1a6]">
          <motion.svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
          {expanded ? t("card.showLess") : t("card.showMore")}
        </div>
      </div>
    </motion.div>
  );
}
