"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { MobileNav } from "@/components/layout/MobileNav";
import { LanguageSwitch } from "@/components/layout/LanguageSwitch";

const services = [
  {
    key: "labs",
    href: "/labs",
    colorDot: "bg-labs",
    colorText: "text-labs",
  },
  {
    key: "circle",
    href: "/circle",
    colorDot: "bg-circle",
    colorText: "text-circle",
  },
  {
    key: "studio",
    href: "/studio",
    colorDot: "bg-studio",
    colorText: "text-studio",
  },
  {
    key: "academy",
    href: "/academy",
    colorDot: "bg-academy",
    colorText: "text-academy",
  },
] as const;

export function Navbar() {
  const t = useTranslations("nav");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 50);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "backdrop-blur-xl bg-navy/90 border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/images/logos/logo-white.svg"
                alt="Influence Circle"
                width={160}
                height={32}
                className="h-8 w-auto"
                priority
              />
            </Link>

            {/* Desktop navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {/* Services dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors text-sm font-medium"
                >
                  {t("services")}
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    className={`transition-transform duration-200 ${
                      isServicesOpen ? "rotate-180" : ""
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
                </button>

                {/* Mega menu dropdown */}
                {isServicesOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4">
                    <div className="bg-navy-light border border-white/10 rounded-2xl p-6 shadow-2xl min-w-[560px]">
                      <div className="grid grid-cols-2 gap-4">
                        {services.map((service) => (
                          <Link
                            key={service.key}
                            href={service.href}
                            className="group flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors"
                          >
                            <span
                              className={`mt-1.5 w-2.5 h-2.5 rounded-full ${service.colorDot} flex-shrink-0`}
                            />
                            <div>
                              <span
                                className={`block font-semibold text-white group-hover:${service.colorText} transition-colors`}
                              >
                                {t(service.key)}
                              </span>
                              <span className="block text-sm text-white/50 mt-0.5">
                                {t(`${service.key}Desc`)}
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/about"
                className="text-white/80 hover:text-white transition-colors text-sm font-medium"
              >
                {t("about")}
              </Link>

              <Link
                href="/contact"
                className="text-white/80 hover:text-white transition-colors text-sm font-medium"
              >
                {t("contact")}
              </Link>

              <LanguageSwitch />

              <Button href="/contact" variant="primary" className="text-sm">
                {t("cta")}
              </Button>
            </nav>

            {/* Mobile hamburger */}
            <button
              className="md:hidden text-white p-2"
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
      </header>

      {/* Mobile navigation */}
      <MobileNav
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
      />
    </>
  );
}
