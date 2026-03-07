import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LanguageSwitch } from "@/components/layout/LanguageSwitch";
import { NewsletterSignup } from "@/components/ui/NewsletterSignup";

const serviceLinks = [
  { key: "labs", href: "/labs", color: "#d55d25" },
  { key: "circle", href: "/circle", color: "#D7263D" },
  { key: "studio", href: "/studio", color: "#A855F7" },
  { key: "academy", href: "/academy", color: "#E8A317" },
];

const insightLinks = [
  { key: "blog", href: "/blog" },
  { key: "cases", href: "/cases" },
  { key: "resources", href: "/resources" },
];

const companyLinks = [
  { key: "about", href: "/about" },
  { key: "team", href: "/team" },
  { key: "contact", href: "/contact" },
];

const legalLinks = [
  { key: "privacy", href: "/privacy" },
  { key: "terms", href: "/terms" },
];

export async function Footer() {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white relative overflow-hidden">
      {/* Multi-color accent stripe with shimmer */}
      <div className="relative h-[2px] shimmer-line">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(90deg, #d55d25, #D7263D, #A855F7, #E8A317, #d55d25)",
            backgroundSize: "200% 100%",
          }}
        />
      </div>

      {/* Subtle background glows */}
      <div
        className="absolute bottom-0 left-1/4 w-[500px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(213,93,37,0.04) 0%, transparent 60%)" }}
      />
      <div
        className="absolute top-1/3 right-0 w-[400px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(168,85,247,0.03) 0%, transparent 60%)" }}
      />

      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1: Logo & tagline */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-5 group">
              <Image
                src="/images/logos/logo-white.svg"
                alt="Influence Circle"
                width={160}
                height={32}
                className="h-8 w-auto transition-opacity group-hover:opacity-80"
              />
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              {t("tagline")}
            </p>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/30 mb-5">
              {t("services")}
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((service) => (
                <li key={service.key}>
                  <Link
                    href={service.href}
                    className="group flex items-center gap-2 text-sm transition-all duration-200"
                    style={{ color: `${service.color}cc` }}
                  >
                    <span
                      className="w-1 h-1 rounded-full transition-transform duration-200 group-hover:scale-150"
                      style={{ backgroundColor: service.color }}
                    />
                    <span className="group-hover:brightness-125 transition-all">
                      {tNav(service.key)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Inzichten + Bedrijf */}
          <div className="space-y-10">
            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/30 mb-5">
                {t("insights")}
              </h3>
              <ul className="space-y-3">
                {insightLinks.map((link) => (
                  <li key={link.key}>
                    <Link
                      href={link.href}
                      className="text-white/60 hover:text-white transition-colors text-sm"
                    >
                      {t(link.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/30 mb-5">
                {t("company")}
              </h3>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.key}>
                    <Link
                      href={link.href}
                      className="text-white/60 hover:text-white transition-colors text-sm"
                    >
                      {t(link.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 4: Newsletter + Social */}
          <div className="space-y-10">
            <NewsletterSignup variant="compact" />

            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/30 mb-5">
                {t("connect")}
              </h3>
              <div className="flex gap-3">
                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
                  aria-label="LinkedIn"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>

                {/* X / Twitter */}
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
                  aria-label="X"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="divider-gradient" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
        <p className="text-white/30 text-xs">
          {t("copyright", { year: currentYear })}
        </p>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            {legalLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="text-white/30 hover:text-white/60 transition-colors text-xs py-1"
              >
                {t(link.key)}
              </Link>
            ))}
          </div>
          <LanguageSwitch />
        </div>
      </div>
    </footer>
  );
}
