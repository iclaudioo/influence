import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LanguageSwitch } from "@/components/layout/LanguageSwitch";

const serviceLinks = [
  { key: "labs", href: "/labs", colorClass: "text-labs" },
  { key: "circle", href: "/circle", colorClass: "text-circle" },
  { key: "studio", href: "/studio", colorClass: "text-studio" },
  { key: "academy", href: "/academy", colorClass: "text-academy" },
];

const companyLinks = [
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
  { key: "privacy", href: "/privacy" },
  { key: "terms", href: "/terms" },
];

export async function Footer() {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-dark text-white">
      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1: Logo & tagline */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/images/logos/logo-white.svg"
                alt="Influence Circle"
                width={160}
                height={32}
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              {t("tagline")}
            </p>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/40 mb-4">
              {t("services")}
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((service) => (
                <li key={service.key}>
                  <Link
                    href={service.href}
                    className={`text-white/70 hover:text-white transition-colors text-sm`}
                  >
                    {tNav(service.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/40 mb-4">
              {t("company")}
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors text-sm"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/40 mb-4">
              {t("connect")}
            </h3>
            <div className="flex gap-4">
              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>

              {/* X / Twitter */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
                aria-label="X"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            {t("copyright", { year: currentYear })}
          </p>
          <LanguageSwitch />
        </div>
      </div>
    </footer>
  );
}
