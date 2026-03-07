"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

type NewsletterSignupProps = {
  variant?: "compact" | "full";
  className?: string;
};

type FormState = "idle" | "submitting" | "success" | "error";

export function NewsletterSignup({
  variant = "compact",
  className = "",
}: NewsletterSignupProps) {
  const t = useTranslations("footer");
  const tLead = useTranslations("leadCapture");
  const [email, setEmail] = useState("");
  const [gdprConsent, setGdprConsent] = useState(false);
  const [formState, setFormState] = useState<FormState>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          gdprConsent,
          leadSource: "newsletter",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      setFormState("success");
      setEmail("");
      setGdprConsent(false);
    } catch {
      setFormState("error");
    }
  };

  if (formState === "success") {
    return (
      <div className={className} role="status" aria-live="polite">
        <p className="text-white/80 text-sm">{t("newsletterSuccess")}</p>
      </div>
    );
  }

  const isSubmitting = formState === "submitting";

  if (variant === "compact") {
    return (
      <form onSubmit={handleSubmit} className={`space-y-3 ${className}`}>
        <p className="text-sm font-semibold text-white">{t("newsletter")}</p>
        <div className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("newsletterPlaceholder")}
            required
            className="flex-1 rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none hover:border-white/30 transition-colors"
          />
          <Button
            type="submit"
            variant="primary"
            accentColor="#d55d25"
            disabled={isSubmitting}
            className={`text-sm px-4 py-2 ${isSubmitting ? "animate-pulse" : ""}`}
          >
            {t("newsletterButton")}
          </Button>
        </div>
        <div className="flex items-start gap-2">
          <input
            id="newsletter-gdpr-compact"
            type="checkbox"
            checked={gdprConsent}
            onChange={(e) => setGdprConsent(e.target.checked)}
            required
            className="mt-0.5 h-4 w-4 rounded border-white/20 bg-white/5"
            style={{ accentColor: "#d55d25" }}
          />
          <label
            htmlFor="newsletter-gdpr-compact"
            className="text-xs text-white/50 leading-snug"
          >
            {tLead("gdpr")}
          </label>
        </div>
        <div role="status" aria-live="polite">
          {formState === "error" && (
            <p className="text-red-400 text-xs">{tLead("error")}</p>
          )}
        </div>
      </form>
    );
  }

  // Full variant
  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <h3 className="text-lg font-semibold text-white">{t("newsletter")}</h3>
      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("newsletterPlaceholder")}
          required
          className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/20 hover:border-white/30 transition-colors"
        />
      </div>
      <div className="flex items-start gap-3">
        <input
          id="newsletter-gdpr-full"
          type="checkbox"
          checked={gdprConsent}
          onChange={(e) => setGdprConsent(e.target.checked)}
          required
          className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5"
          style={{ accentColor: "#d55d25" }}
        />
        <label
          htmlFor="newsletter-gdpr-full"
          className="text-sm text-white/60 leading-snug"
        >
          {tLead("gdpr")}
        </label>
      </div>
      <div role="status" aria-live="polite">
        {formState === "error" && (
          <p className="text-red-400 text-sm">{tLead("error")}</p>
        )}
      </div>
      <Button
        type="submit"
        variant="primary"
        accentColor="#d55d25"
        disabled={isSubmitting}
        className={`w-full ${isSubmitting ? "animate-pulse" : ""}`}
      >
        {t("newsletterButton")}
      </Button>
    </form>
  );
}
