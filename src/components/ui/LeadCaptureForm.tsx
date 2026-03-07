"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

type LeadCaptureFormProps = {
  variant: "newsletter" | "lead_magnet" | "assessment";
  onSuccess?: (contactId?: string) => void;
  accentColor?: string;
  className?: string;
  darkMode?: boolean;
  leadSource?: string;
};

type FormState = "idle" | "submitting" | "success" | "error";

export function LeadCaptureForm({
  variant,
  onSuccess,
  accentColor = "#d55d25",
  className = "",
  darkMode = false,
  leadSource,
}: LeadCaptureFormProps) {
  const t = useTranslations("leadCapture");
  const [name, setName] = useState("");
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
          name: variant !== "newsletter" ? name : "",
          email,
          gdprConsent,
          leadSource: leadSource ?? (variant === "newsletter" ? "newsletter" : variant === "lead_magnet" ? "lead_magnet" : "assessment"),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      const data = await response.json();
      setFormState("success");
      setName("");
      setEmail("");
      setGdprConsent(false);
      onSuccess?.(data.contactId ?? undefined);
    } catch {
      setFormState("error");
    }
  };

  if (formState === "success") {
    return (
      <div className={`text-center py-6 ${className}`} role="status" aria-live="polite">
        <p className={darkMode ? "text-white/70" : "text-[#6e6e73]"}>{t("success")}</p>
      </div>
    );
  }

  const isSubmitting = formState === "submitting";

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      {variant !== "newsletter" && (
        <div>
          <label htmlFor="lead-name" className={`block text-sm mb-1 ${darkMode ? "text-white/60" : "text-[#6e6e73]"}`}>
            {t("name")}
          </label>
          <input
            id="lead-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t("namePlaceholder")}
            required
            className="w-full rounded-lg border border-black/[0.06] bg-[#FAFAFA] px-4 py-3 text-[#1d1d1f] placeholder:text-[#a1a1a6] focus:border-black/[0.12] focus:outline-none focus:ring-1 focus:ring-black/[0.06] hover:border-black/[0.12] transition-colors"
          />
        </div>
      )}

      <div>
        <label htmlFor="lead-email" className={`block text-sm mb-1 ${darkMode ? "text-white/60" : "text-[#6e6e73]"}`}>
          {t("email")}
        </label>
        <input
          id="lead-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("emailPlaceholder")}
          required
          className="w-full rounded-lg border border-black/[0.06] bg-[#FAFAFA] px-4 py-3 text-[#1d1d1f] placeholder:text-[#a1a1a6] focus:border-black/[0.12] focus:outline-none focus:ring-1 focus:ring-black/[0.06] hover:border-black/[0.12] transition-colors"
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          id="lead-gdpr"
          type="checkbox"
          checked={gdprConsent}
          onChange={(e) => setGdprConsent(e.target.checked)}
          required
          className="mt-1 h-4 w-4 rounded border-black/[0.06] bg-[#FAFAFA] accent-current"
          style={{ accentColor }}
        />
        <label htmlFor="lead-gdpr" className={`text-sm leading-snug ${darkMode ? "text-white/50" : "text-[#6e6e73]"}`}>
          {t("gdpr")}
        </label>
      </div>

      <div role="status" aria-live="polite">
        {formState === "error" && (
          <p className={`text-sm ${darkMode ? "text-red-400" : "text-red-500"}`}>{t("error")}</p>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        accentColor={accentColor}
        disabled={isSubmitting}
        className={`w-full ${isSubmitting ? "animate-pulse" : ""}`}
      >
        {isSubmitting ? t("submitting") : t("submit")}
      </Button>
    </form>
  );
}
