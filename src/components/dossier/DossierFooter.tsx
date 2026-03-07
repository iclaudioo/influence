import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LanguageSwitch } from "@/components/layout/LanguageSwitch";

export async function DossierFooter() {
  const t = await getTranslations("dossier");
  const tFooter = await getTranslations("footer");

  const navItems = [
    { href: "/labs" as const, number: "01", label: t("nav01") },
    { href: "/circle" as const, number: "02", label: t("nav02") },
    { href: "/cases" as const, number: "03", label: t("nav03") },
    { href: "/blog" as const, number: "04", label: t("nav04") },
    { href: "/contact" as const, number: "05", label: t("nav05") },
  ];

  return (
    <footer className="bg-navy text-white">
      <div className="border-t border-dashed border-white/10" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left column */}
          <div>
            <Image
              src="/images/logos/logo-white.svg"
              alt="Influence Circle"
              width={120}
              height={24}
              className="h-6 w-auto"
            />
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/30 mt-3">
              Reputation Architects
            </p>
            <a
              href={`mailto:${t("footerEmail")}`}
              className="block text-sm text-white/50 mt-2"
            >
              {t("footerEmail")}
            </a>
            <a
              href="https://www.linkedin.com/company/influence-circle"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm text-white/50 hover:text-white mt-1"
            >
              LinkedIn
            </a>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-2 items-start md:items-end">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white/50 hover:text-white"
              >
                <span className="font-mono text-[10px]">{item.number}</span>{" "}
                <span className="text-sm">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <span className="font-mono text-[10px] text-white/20">
            {tFooter("copyright", { year: new Date().getFullYear() })}
          </span>

          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="text-xs text-white/30 hover:text-white/60"
            >
              {tFooter("privacy")}
            </Link>
            <Link
              href="/terms"
              className="text-xs text-white/30 hover:text-white/60"
            >
              {tFooter("terms")}
            </Link>
            <LanguageSwitch />
          </div>
        </div>
      </div>
    </footer>
  );
}
