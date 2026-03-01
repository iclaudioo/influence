"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export function LanguageSwitch() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const otherLocale = locale === "nl" ? "en" : "nl";
  const label = locale === "nl" ? "EN" : "NL";

  function handleSwitch() {
    router.replace(pathname, { locale: otherLocale });
  }

  return (
    <button
      onClick={handleSwitch}
      className="px-3 py-1 text-sm border border-white/30 rounded-full hover:bg-white/10 text-white transition-colors duration-200"
      aria-label={`Switch to ${otherLocale === "nl" ? "Nederlands" : "English"}`}
    >
      {label}
    </button>
  );
}
