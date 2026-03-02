"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

type LeadCaptureFormProps = {
  variant: "newsletter" | "lead_magnet" | "assessment";
  onSuccess?: (contactId?: string) => void;
  accentColor?: string;
  className?: string;
};

type FormState = "idle" | "submitting" | "success" | "error";

export function LeadCaptureForm({
  variant,
  onSuccess,
  accentColor = "#d55d25",
  className = "",
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
          leadSource: variant === "newsletter" ? "newsletter" : variant === "lead_magnet" ? "lead_magnet" : "assessment",
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
      <div className={`text-center py-6 ${className}`}>
        <p className="text-white/80">{t("success")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      {variant !== "newsletter" && (
        <div>
          <label htmlFor="lead-name" className="block text-sm text-white/60 mb-1">
            {t("name")}
          </label>
          <input
            id="lead-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t("namePlaceholder")}
            required
            className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/20 transition-colors"
          />
        </div>
      )}

      <div>
        <label htmlFor="lead-email" className="block text-sm text-white/60 mb-1">
          {t("email")}
        </label>
        <input
          id="lead-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("emailPlaceholder")}
          required
          className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/20 transition-colors"
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          id="lead-gdpr"
          type="checkbox"
          checked={gdprConsent}
          onChange={(e) => setGdprConsent(e.target.checked)}
          required
          className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 accent-current"
          style={{ accentColor }}
        />
        <label htmlFor="lead-gdpr" className="text-sm text-white/60 leading-snug">
          {t("gdpr")}
        </label>
      </div>

      {formState === "error" && (
        <p className="text-red-400 text-sm">{t("error")}</p>
      )}

      <Button
        type="submit"
        variant="primary"
        accentColor={accentColor}
        className="w-full"
      >
        {formState === "submitting" ? t("submitting") : t("submit")}
      </Button>
    </form>
  );
}
