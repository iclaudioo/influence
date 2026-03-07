"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { MobileNav } from "@/components/layout/MobileNav";
import { LanguageSwitch } from "@/components/layout/LanguageSwitch";

const services = [
  {
    key: "labs",
    href: "/labs",
    color: "#d55d25",
    colorDot: "bg-labs",
    colorText: "text-labs",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="opacity-60 group-hover:opacity-100 transition-opacity">
        <path d="M6 2v4.5L3.5 12.5A1 1 0 004.4 14h7.2a1 1 0 00.9-1.5L10 6.5V2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M5 2h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: "circle",
    href: "/circle",
    color: "#D7263D",
    colorDot: "bg-circle",
    colorText: "text-circle",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="opacity-60 group-hover:opacity-100 transition-opacity">
        <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="8" cy="8" r="2" fill="currentColor" opacity="0.4" />
      </svg>
    ),
  },
  {
    key: "studio",
    href: "/studio",
    color: "#A855F7",
    colorDot: "bg-studio",
    colorText: "text-studio",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="opacity-60 group-hover:opacity-100 transition-opacity">
        <rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
        <path d="M6.5 6.5l3 1.5-3 1.5V6.5z" fill="currentColor" opacity="0.5" />
      </svg>
    ),
  },
  {
    key: "academy",
    href: "/academy",
    color: "#E8A317",
    colorDot: "bg-academy",
    colorText: "text-academy",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="opacity-60 group-hover:opacity-100 transition-opacity">
        <path d="M8 2L2 5.5 8 9l6-3.5L8 2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M3 7v4l5 3 5-3V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
] as const;

const overOnsItems = [
  { key: "about", href: "/about" },
  { key: "team", href: "/team" },
] as const;

const toolsItems = [
  { key: "visibilityScore", href: "/tools/visibility-score" },
  { key: "roiCalculator", href: "/tools/roi-calculator" },
] as const;

export function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isOverOnsOpen, setIsOverOnsOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const servicesTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const overOnsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const toolsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  function handleServicesMouseEnter() {
    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
    setIsServicesOpen(true);
  }

  function handleServicesMouseLeave() {
    servicesTimeoutRef.current = setTimeout(() => setIsServicesOpen(false), 150);
  }

  function handleOverOnsMouseEnter() {
    if (overOnsTimeoutRef.current) clearTimeout(overOnsTimeoutRef.current);
    setIsOverOnsOpen(true);
  }

  function handleOverOnsMouseLeave() {
    overOnsTimeoutRef.current = setTimeout(() => setIsOverOnsOpen(false), 150);
  }

  function handleToolsMouseEnter() {
    if (toolsTimeoutRef.current) clearTimeout(toolsTimeoutRef.current);
    setIsToolsOpen(true);
  }

  function handleToolsMouseLeave() {
    toolsTimeoutRef.current = setTimeout(() => setIsToolsOpen(false), 150);
  }

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 50);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsServicesOpen(false);
        setIsOverOnsOpen(false);
        setIsToolsOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const chevronSvg = (isOpen: boolean) => (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      className={`transition-transform duration-200 ${
        isOpen ? "rotate-180" : ""
      }`}
    >
      <path
        d="M3 4.5L6 7.5L9 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const dropdownVariants = {
    initial: { opacity: 0, y: -4, scale: 0.97 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -4, scale: 0.97 },
  };

  return (
    <>
      <header
        className={`fixed z-40 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled
            ? "navbar-floating glass shadow-lg shadow-black/[0.04]"
            : "top-0 left-0 right-0 bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between transition-all duration-700 ${isScrolled ? "h-16" : "h-20"}`}>
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 group">
              <Image
                src="/images/logos/logo-navy.svg"
                alt="Influence Circle"
                width={160}
                height={32}
                className="h-8 w-auto transition-opacity group-hover:opacity-80"
                priority
              />
            </Link>

            {/* Desktop navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {/* Services dropdown */}
              <div
                className="relative"
                onMouseEnter={handleServicesMouseEnter}
                onMouseLeave={handleServicesMouseLeave}
              >
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  aria-haspopup="menu"
                  aria-expanded={isServicesOpen}
                  className="flex items-center gap-1.5 text-[#6e6e73] hover:text-[#1d1d1f] transition-colors text-sm font-medium"
                >
                  {t("services")}
                  {chevronSvg(isServicesOpen)}
                </button>

                {/* Mega menu dropdown */}
                <AnimatePresence>
                  {isServicesOpen && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-4"
                    >
                      <div className="glass rounded-2xl p-5 shadow-xl shadow-black/[0.08] min-w-[540px]" role="menu">
                        {/* Header */}
                        <p className="text-[10px] uppercase tracking-[0.2em] text-[#a1a1a6] font-medium mb-3 px-1">
                          {t("services")}
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          {services.map((service) => (
                            <Link
                              key={service.key}
                              href={service.href}
                              role="menuitem"
                              className="group flex items-start gap-3 p-3 rounded-xl hover:bg-black/[0.04] transition-all duration-200"
                            >
                              <span
                                className="mt-0.5 flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200"
                                style={{
                                  backgroundColor: `${service.color}15`,
                                  color: service.color,
                                }}
                              >
                                {service.icon}
                              </span>
                              <div>
                                <span className="block font-semibold text-[#1d1d1f] text-sm group-hover:text-[#1d1d1f] transition-colors">
                                  {t(service.key)}
                                </span>
                                <span className="block text-xs text-[#a1a1a6] mt-0.5 leading-relaxed">
                                  {t(`${service.key}Desc`)}
                                </span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Cases direct link */}
              <Link
                href="/cases"
                aria-current={pathname.includes("/cases") ? "page" : undefined}
                className={`relative text-sm font-medium transition-colors ${pathname.includes("/cases") ? "text-[#1d1d1f]" : "text-[#6e6e73] hover:text-[#1d1d1f]"}`}
              >
                {t("cases")}
                {pathname.includes("/cases") && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-labs" />
                )}
              </Link>

              {/* Blog direct link */}
              <Link
                href="/blog"
                aria-current={pathname.includes("/blog") ? "page" : undefined}
                className={`relative text-sm font-medium transition-colors ${pathname.includes("/blog") ? "text-[#1d1d1f]" : "text-[#6e6e73] hover:text-[#1d1d1f]"}`}
              >
                {t("blog")}
                {pathname.includes("/blog") && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-labs" />
                )}
              </Link>

              {/* Over ons dropdown */}
              <div
                className="relative"
                onMouseEnter={handleOverOnsMouseEnter}
                onMouseLeave={handleOverOnsMouseLeave}
              >
                <button
                  onClick={() => setIsOverOnsOpen(!isOverOnsOpen)}
                  aria-haspopup="menu"
                  aria-expanded={isOverOnsOpen}
                  className="flex items-center gap-1.5 text-[#6e6e73] hover:text-[#1d1d1f] transition-colors text-sm font-medium"
                >
                  {t("overOns")}
                  {chevronSvg(isOverOnsOpen)}
                </button>

                <AnimatePresence>
                  {isOverOnsOpen && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-4"
                    >
                      <div className="glass rounded-2xl p-3 shadow-xl shadow-black/[0.08] min-w-[200px]" role="menu">
                        <div className="space-y-0.5">
                          {overOnsItems.map((item) => (
                            <Link
                              key={item.key}
                              href={item.href}
                              role="menuitem"
                              className="block px-3 py-2.5 rounded-xl text-white/70 hover:text-white hover:bg-black/[0.04] transition-all text-sm font-medium"
                            >
                              {t(item.key)}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Tools dropdown */}
              <div
                className="relative"
                onMouseEnter={handleToolsMouseEnter}
                onMouseLeave={handleToolsMouseLeave}
              >
                <button
                  onClick={() => setIsToolsOpen(!isToolsOpen)}
                  aria-haspopup="menu"
                  aria-expanded={isToolsOpen}
                  className="flex items-center gap-1.5 text-[#6e6e73] hover:text-[#1d1d1f] transition-colors text-sm font-medium"
                >
                  {t("tools")}
                  {chevronSvg(isToolsOpen)}
                </button>

                <AnimatePresence>
                  {isToolsOpen && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-4"
                    >
                      <div className="glass rounded-2xl p-3 shadow-xl shadow-black/[0.08] min-w-[220px]" role="menu">
                        <div className="space-y-0.5">
                          {toolsItems.map((item) => (
                            <Link
                              key={item.key}
                              href={item.href}
                              role="menuitem"
                              className="block px-3 py-2.5 rounded-xl text-white/70 hover:text-white hover:bg-black/[0.04] transition-all text-sm font-medium"
                            >
                              {t(item.key)}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/contact"
                aria-current={pathname.includes("/contact") ? "page" : undefined}
                className={`relative text-sm font-medium transition-colors ${pathname.includes("/contact") ? "text-[#1d1d1f]" : "text-[#6e6e73] hover:text-[#1d1d1f]"}`}
              >
                {t("contact")}
                {pathname.includes("/contact") && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-labs" />
                )}
              </Link>

              <LanguageSwitch />

              <Button href="/contact" variant="primary" className="text-sm">
                {t("cta")}
              </Button>
            </nav>

            {/* Mobile hamburger */}
            <button
              className="md:hidden text-[#1d1d1f] p-2"
              onClick={() => setIsMobileOpen(true)}
              aria-label={t("menu")}
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
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Bottom line accent when scrolled */}
        <motion.div
          initial={false}
          animate={{ opacity: isScrolled ? 1 : 0 }}
          className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-black/[0.06] to-transparent"
        />
      </header>

      {/* Mobile navigation */}
      <MobileNav
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
      />
    </>
  );
}
