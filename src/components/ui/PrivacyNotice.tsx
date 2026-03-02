"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const STORAGE_KEY = "privacy-notice-dismissed";

export function PrivacyNotice() {
  const t = useTranslations("privacyNotice");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (!dismissed) {
      setVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-navy/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <p className="text-sm text-white/70">
          {t("text")}{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-2 hover:text-white transition-colors"
          >
            {t("learnMore")}
          </Link>
        </p>
        <button
          onClick={handleDismiss}
          className="shrink-0 rounded-full border border-white/20 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
        >
          {t("dismiss")}
        </button>
      </div>
    </div>
  );
}
