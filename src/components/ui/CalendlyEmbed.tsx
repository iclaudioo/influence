"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

type CalendlyEmbedProps = {
  url: string;
  variant?: "inline" | "popup";
  prefillEmail?: string;
  accentColor?: string;
};

function loadCalendlyScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector('script[src*="calendly.com/assets/external/widget.js"]')) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Calendly script"));
    document.head.appendChild(script);
  });
}

export function CalendlyEmbed({
  url,
  variant = "inline",
  prefillEmail,
  accentColor = "#d55d25",
}: CalendlyEmbedProps) {
  const t = useTranslations("calendly");
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const calendlyUrl = prefillEmail
    ? `${url}?email=${encodeURIComponent(prefillEmail)}`
    : url;

  useEffect(() => {
    if (variant === "inline") {
      loadCalendlyScript().then(() => {
        setScriptLoaded(true);
      });
    }
  }, [variant]);

  useEffect(() => {
    if (variant === "inline" && scriptLoaded && containerRef.current) {
      const Calendly = (window as unknown as Record<string, unknown>).Calendly as {
        initInlineWidget: (options: {
          url: string;
          parentElement: HTMLElement;
          prefill?: Record<string, string>;
        }) => void;
      } | undefined;

      if (Calendly) {
        Calendly.initInlineWidget({
          url: calendlyUrl,
          parentElement: containerRef.current,
          ...(prefillEmail ? { prefill: { email: prefillEmail } } : {}),
        });
      }
    }
  }, [variant, scriptLoaded, calendlyUrl, prefillEmail]);

  const handlePopupOpen = async () => {
    await loadCalendlyScript();

    const Calendly = (window as unknown as Record<string, unknown>).Calendly as {
      initPopupWidget: (options: { url: string }) => void;
    } | undefined;

    if (Calendly) {
      Calendly.initPopupWidget({ url: calendlyUrl });
    }

    setIsOpen(true);
  };

  if (variant === "inline") {
    return (
      <div>
        <div
          ref={containerRef}
          className="calendly-inline-widget"
          style={{ minWidth: "320px", height: "700px" }}
          data-url={calendlyUrl}
        />
        <link
          href="https://assets.calendly.com/assets/external/widget.css"
          rel="stylesheet"
        />
      </div>
    );
  }

  // Popup variant
  return (
    <>
      <Button
        variant="primary"
        accentColor={accentColor}
        onClick={handlePopupOpen}
      >
        {t("button")}
      </Button>
      <link
        href="https://assets.calendly.com/assets/external/widget.css"
        rel="stylesheet"
      />
    </>
  );
}
