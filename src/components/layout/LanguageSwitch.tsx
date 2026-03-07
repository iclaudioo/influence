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
      className="px-3 py-2 text-sm border border-black/[0.12] rounded-full hover:bg-black/[0.04] text-[#1d1d1f] transition-colors duration-200"
      aria-label={`Switch to ${otherLocale === "nl" ? "Nederlands" : "English"}`}
    >
      {label}
    </button>
  );
}
