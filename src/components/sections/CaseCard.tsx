"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { ServiceLine } from "@/lib/constants";
import { colors } from "@/lib/constants";
import { getCaseFallbackImage } from "@/lib/fallback-images";
import { TiltCard } from "@/components/ui/TiltCard";

type CaseCardProps = {
  slug: string;
  title: string;
  clientName: string;
  clientRole: string;
  clientCompany: string;
  clientLogoUrl: string | null;
  headlineResult: string;
  serviceLine: ServiceLine;
  locale: string;
};

const serviceColorMap: Record<ServiceLine, string> = {
  labs: colors.labs,
  circle: colors.circle,
  studio: colors.studio,
  academy: colors.academy,
};

const serviceLabelMap: Record<ServiceLine, string> = {
  labs: "Influence Labs",
  circle: "Influence Circle",
  studio: "Influence Studio",
  academy: "Influence Academy",
};

export function CaseCard({
  slug,
  title,
  clientName,
  clientRole,
  clientCompany,
  clientLogoUrl,
  headlineResult,
  serviceLine,
}: CaseCardProps) {
  const badgeColor = serviceColorMap[serviceLine] || colors.labs;
  const badgeLabel = serviceLabelMap[serviceLine] || serviceLine;
  const fallbackImage = getCaseFallbackImage(slug);

  return (
    <Link href={`/cases/${slug}`} className="block h-full">
      <TiltCard
        glowColor={badgeColor}
        maxRotation={6}
        className="relative overflow-hidden rounded-2xl bg-white border border-black/[0.06] p-8 h-full group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/[0.06]"
      >
        {/* Hover-reveal background image */}
        {fallbackImage && (
          <div className="absolute inset-0 overflow-hidden rounded-2xl" aria-hidden="true">
            <Image src={fallbackImage} alt="" fill className="object-cover opacity-0 group-hover:opacity-[0.08] transition-opacity duration-700 mix-blend-luminosity" sizes="(max-width: 768px) 100vw, 33vw" />
          </div>
        )}

        {/* Accent bar */}
        <div
          className="absolute inset-x-0 top-0 h-0.5"
          style={{
            background: `linear-gradient(90deg, ${badgeColor}, ${badgeColor}00)`,
          }}
        />

        {/* Client info */}
        <div className="flex items-center gap-4 mb-6">
          {clientLogoUrl ? (
            <Image
              src={clientLogoUrl}
              alt={clientCompany}
              width={48}
              height={48}
              className="rounded-lg object-contain"
            />
          ) : (
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center text-[#1d1d1f] font-bold text-lg"
              style={{ backgroundColor: `${badgeColor}30` }}
            >
              {clientCompany.charAt(0)}
            </div>
          )}
          <div>
            <p className="font-semibold text-[#1d1d1f]">{clientName}</p>
            <p className="text-sm text-[#6e6e73]">
              {clientRole}, {clientCompany}
            </p>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-[#1d1d1f] mb-3 group-hover:text-[#1d1d1f]/90 transition-colors">
          {title}
        </h3>

        {/* Headline result */}
        <p className="text-2xl md:text-3xl font-bold mb-6" style={{ color: badgeColor }}>
          {headlineResult}
        </p>

        {/* Service badge */}
        <span
          className="inline-block px-3 py-1 rounded-full text-xs font-medium"
          style={{
            backgroundColor: `${badgeColor}1a`,
            color: badgeColor,
          }}
        >
          {badgeLabel}
        </span>
      </TiltCard>
    </Link>
  );
}
