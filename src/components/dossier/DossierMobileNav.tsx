"use client";

import { useEffect, useRef, useCallback } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";

const navItems = [
  { number: "01", label: "Approach", href: "/labs" as const },
  { number: "02", label: "Services", href: "/circle" as const },
  { number: "03", label: "Cases", href: "/cases" as const },
  { number: "04", label: "Insights", href: "/blog" as const },
  { number: "05", label: "Contact", href: "/contact" as const },
];

const hoverColors: Record<string, string> = {
  "01": "#d55d25",
  "02": "#D7263D",
  "03": "#A855F7",
  "04": "#E8A317",
  "05": "#1d1d1f",
};

interface DossierMobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DossierMobileNav({ isOpen, onClose }: DossierMobileNavProps) {
  const t = useTranslations("dossier");
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastLinkRef = useRef<HTMLAnchorElement>(null);

  // B1: Escape key handler
  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // B1: Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // B1: Focus first element on open
  useEffect(() => {
    if (isOpen) {
      // Small delay to let animation start
      const timer = setTimeout(() => closeButtonRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // B1: Focus trap
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey && document.activeElement === closeButtonRef.current) {
        e.preventDefault();
        lastLinkRef.current?.focus();
      } else if (!e.shiftKey && document.activeElement === lastLinkRef.current) {
        e.preventDefault();
        closeButtonRef.current?.focus();
      }
    },
    []
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 bg-white"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          onKeyDown={handleKeyDown}
        >
          {/* Close button */}
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="absolute top-6 right-6 text-[#6e6e73] hover:text-[#1d1d1f] transition-colors"
            aria-label="Close menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Navigation */}
          <nav className="flex flex-col justify-center h-full px-10">
            {navItems.map((item, index) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.1 + index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                  ref={index === navItems.length - 1 ? lastLinkRef : undefined}
                  href={item.href}
                  onClick={onClose}
                  className="group flex items-baseline gap-4 py-4 transition-colors duration-300"
                  style={
                    {
                      "--hover-color": hoverColors[item.number],
                    } as React.CSSProperties
                  }
                >
                  <span className="font-mono text-sm text-[#a1a1a6] group-hover:text-[var(--hover-color)] transition-colors duration-300">
                    {item.number}
                  </span>
                  <span className="font-serif text-3xl text-[#1d1d1f] group-hover:text-[var(--hover-color)] transition-colors duration-300">
                    {t(`nav${item.number}` as "nav01" | "nav02" | "nav03" | "nav04" | "nav05")}
                  </span>
                </Link>
              </motion.div>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
