"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Check, Link2 } from "lucide-react";
import { fadeUp } from "@/lib/animations";

type Props = {
  url: string;
  title: string;
  variant?: "light" | "dark";
};

export function SocialShare({ url, title, variant = "light" }: Props) {
  const [copied, setCopied] = useState(false);
  const t = useTranslations("share");

  const isLight = variant === "light";
  const textColor = isLight ? "text-[#a1a1a6]" : "text-white/40";
  const btnClass = isLight
    ? "rounded-lg border border-black/[0.06] p-2 text-[#6e6e73] transition-colors hover:border-black/[0.12] hover:text-[#1d1d1f]"
    : "rounded-lg border border-white/10 p-2 text-white/50 transition-colors hover:border-white/20 hover:text-white";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="flex items-center gap-3"
    >
      <span className={`text-sm ${textColor}`}>{t("label")}</span>

      {/* LinkedIn */}
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={btnClass}
        aria-label={t("linkedin")}
      >
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </a>

      {/* X / Twitter */}
      <a
        href={`https://x.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={btnClass}
        aria-label={t("twitter")}
      >
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>

      {/* Copy link */}
      <button
        type="button"
        onClick={handleCopy}
        className={btnClass}
        aria-label={t("copied")}
      >
        {copied ? (
          <Check className="h-4 w-4" />
        ) : (
          <Link2 className="h-4 w-4" />
        )}
      </button>

      {copied && (
        <span className={`text-xs ${textColor}`}>{t("copied")}</span>
      )}
    </motion.div>
  );
}
