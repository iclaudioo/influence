"use client";

import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { LanguageSwitch } from "@/components/layout/LanguageSwitch";

const services = [
  { key: "labs", href: "/labs", color: "bg-labs" },
  { key: "circle", href: "/circle", color: "bg-circle" },
  { key: "studio", href: "/studio", color: "bg-studio" },
  { key: "academy", href: "/academy", color: "bg-academy" },
] as const;

const overOnsItems = [
  { key: "about", href: "/about" },
  { key: "team", href: "/team" },
] as const;

const toolsItems = [
  { key: "visibilityScore", href: "/tools/visibility-score" },
  { key: "roiCalculator", href: "/tools/roi-calculator" },
] as const;

type MobileNavProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const t = useTranslations("nav");

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Slide-in panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-navy flex flex-col"
          >
            {/* Close button */}
            <div className="flex justify-end p-6">
              <button
                onClick={onClose}
                className="text-white/70 hover:text-white transition-colors"
                aria-label={t("close")}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Navigation links */}
            <nav className="flex-1 px-6 space-y-2 overflow-y-auto">
              {/* Services section */}
              <div>
                <span className="block text-white/50 text-sm uppercase tracking-wider mb-3">
                  {t("services")}
                </span>
                <div className="space-y-1 pl-2">
                  {services.map((service) => (
                    <Link
                      key={service.key}
                      href={service.href}
                      onClick={onClose}
                      className="flex items-center gap-3 py-2 text-white/80 hover:text-white transition-colors text-lg"
                    >
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${service.color}`}
                      />
                      {t(service.key)}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-white/10 my-4" />

              {/* Cases & Blog links */}
              <Link
                href="/cases"
                onClick={onClose}
                className="block py-3 text-white text-xl font-medium hover:text-white/80 transition-colors"
              >
                {t("cases")}
              </Link>
              <Link
                href="/blog"
                onClick={onClose}
                className="block py-3 text-white text-xl font-medium hover:text-white/80 transition-colors"
              >
                {t("blog")}
              </Link>

              {/* Divider */}
              <div className="border-t border-white/10 my-4" />

              {/* Over ons section */}
              <div>
                <span className="block text-white/50 text-sm uppercase tracking-wider mb-3">
                  {t("overOns")}
                </span>
                <div className="space-y-1 pl-2">
                  {overOnsItems.map((item) => (
                    <Link
                      key={item.key}
                      href={item.href}
                      onClick={onClose}
                      className="block py-2 text-white/80 hover:text-white transition-colors text-lg"
                    >
                      {t(item.key)}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-white/10 my-4" />

              {/* Tools section */}
              <div>
                <span className="block text-white/50 text-sm uppercase tracking-wider mb-3">
                  {t("tools")}
                </span>
                <div className="space-y-1 pl-2">
                  {toolsItems.map((item) => (
                    <Link
                      key={item.key}
                      href={item.href}
                      onClick={onClose}
                      className="block py-2 text-white/80 hover:text-white transition-colors text-lg"
                    >
                      {t(item.key)}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-white/10 my-4" />

              {/* Other links */}
              <Link
                href="/resources"
                onClick={onClose}
                className="block py-3 text-white text-xl font-medium hover:text-white/80 transition-colors"
              >
                {t("resources")}
              </Link>
              <Link
                href="/contact"
                onClick={onClose}
                className="block py-3 text-white text-xl font-medium hover:text-white/80 transition-colors"
              >
                {t("contact")}
              </Link>
            </nav>

            {/* Bottom section */}
            <div className="p-6 space-y-4 border-t border-white/10">
              <Button href="/contact" variant="primary" className="w-full">
                {t("cta")}
              </Button>
              <div className="flex justify-center">
                <LanguageSwitch />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
