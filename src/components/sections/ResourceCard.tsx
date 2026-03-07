"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Download, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { LeadCaptureForm } from "@/components/ui/LeadCaptureForm";

type LeadMagnet = {
  id: string;
  title: string;
  description: string;
  cover_image_url: string | null;
  service: string | null;
  download_count: number;
  file_url: string;
};

type Props = {
  resource: LeadMagnet;
};

export function ResourceCard({ resource }: Props) {
  const t = useTranslations("resources");
  const [showModal, setShowModal] = useState(false);

  const serviceColors: Record<string, string> = {
    labs: "#d55d25",
    circle: "#D7263D",
    studio: "#A855F7",
    academy: "#E8A317",
  };

  const accentColor = resource.service
    ? serviceColors[resource.service] || "#d55d25"
    : "#d55d25";

  async function handleLeadCaptureSuccess() {
    try {
      const response = await fetch("/api/resources/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadMagnetId: resource.id,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.fileUrl) {
          window.open(data.fileUrl, "_blank");
        }
      }
    } catch {
      // If the download tracking fails, still open the file directly
      window.open(resource.file_url, "_blank");
    }

    setShowModal(false);
  }

  return (
    <>
      <div className="bg-white border border-black/[0.06] rounded-2xl overflow-hidden flex flex-col h-full hover:border-black/[0.12] transition-colors">
        {/* Cover image */}
        {resource.cover_image_url && (
          <div className="relative aspect-[16/10] bg-[#FAFAFA]">
            <Image
              src={resource.cover_image_url}
              alt={resource.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="p-6 flex flex-col flex-1">
          {/* Service badge */}
          {resource.service && (
            <span
              className="inline-block self-start text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full mb-3"
              style={{
                backgroundColor: `${accentColor}20`,
                color: accentColor,
              }}
            >
              {resource.service}
            </span>
          )}

          {/* Title & description */}
          <h3 className="text-lg font-bold text-[#1d1d1f] mb-2">
            {resource.title}
          </h3>
          <p className="text-[#6e6e73] text-sm leading-relaxed flex-1">
            {resource.description}
          </p>

          {/* Download count & button */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-black/[0.06]">
            <span className="text-xs text-[#a1a1a6]">
              {resource.download_count} {t("downloads")}
            </span>
            <Button
              variant="primary"
              accentColor={accentColor}
              onClick={() => setShowModal(true)}
              className="!px-5 !py-2 text-sm"
            >
              <Download className="w-4 h-4 mr-2" />
              {t("download")}
            </Button>
          </div>
        </div>
      </div>

      {/* Download modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowModal(false);
          }}
        >
          <div className="relative bg-white border border-black/[0.06] rounded-2xl p-8 max-w-md w-full">
            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-[#a1a1a6] hover:text-[#1d1d1f] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-[#1d1d1f] mb-2">
              {t("downloadTitle")}
            </h3>
            <p className="text-[#6e6e73] text-sm mb-6">
              {t("downloadDescription")}
            </p>

            <LeadCaptureForm
              variant="lead_magnet"
              onSuccess={handleLeadCaptureSuccess}
              accentColor={accentColor}
            />
          </div>
        </div>
      )}
    </>
  );
}
