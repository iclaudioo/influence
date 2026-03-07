"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { LanguageSwitch } from "@/components/layout/LanguageSwitch";
import { DossierMobileNav } from "./DossierMobileNav";

const navItems = [
  { number: "01", label: "Approach", href: "/labs" as const },
  { number: "02", label: "Services", href: "/circle" as const },
  { number: "03", label: "Cases", href: "/cases" as const },
  { number: "04", label: "Insights", href: "/blog" as const },
  { number: "05", label: "Contact", href: "/contact" as const },
];

export function DossierHeader() {
  const t = useTranslations("dossier");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 60);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "border-b border-black/[0.06] bg-white/90 backdrop-blur-sm"
            : ""
        }`}
      >
        {/* Top bar */}
        <div
          className={`transition-all duration-500 ${
            isScrolled ? "h-0 overflow-hidden opacity-0" : "h-8 opacity-100"
          }`}
        >
          <div className="py-2 text-center">
            <span className="tracking-[0.3em] text-[10px] text-[#a1a1a6] font-mono">
              INFLUENCE CIRCLE — REPUTATION ARCHITECTS — EST. 2025
            </span>
          </div>
        </div>

        {/* Main nav */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/">
              <Image
                src="/images/logos/logo-navy.svg"
                alt="Influence Circle"
                width={120}
                height={24}
                className="h-6 w-auto"
                priority
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-6">
              <div className="flex items-center">
                {navItems.map((item, index) => (
                  <span key={item.number} className="flex items-center">
                    {index > 0 && (
                      <span className="mx-3 text-[#a1a1a6] text-sm">/</span>
                    )}
                    <Link
                      href={item.href}
                      className="group flex items-baseline gap-1.5 hover:text-[#1d1d1f] transition-colors duration-300"
                    >
                      <span className="font-mono text-[11px] text-[#a1a1a6] group-hover:text-[#6e6e73] transition-colors duration-300">
                        {item.number}
                      </span>
                      <span className="font-serif text-sm text-[#6e6e73] group-hover:text-[#1d1d1f] transition-colors duration-300">
                        {t(`nav${item.number}` as "nav01" | "nav02" | "nav03" | "nav04" | "nav05")}
                      </span>
                    </Link>
                  </span>
                ))}
              </div>

              <LanguageSwitch />
            </nav>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMobileNavOpen(true)}
              className="md:hidden text-[#6e6e73] hover:text-[#1d1d1f] transition-colors"
              aria-label="Open menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
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

      {/* Mobile nav overlay */}
      <DossierMobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />
    </>
  );
}
