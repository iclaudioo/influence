"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { CaseCard } from "@/components/sections/CaseCard";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { colors } from "@/lib/constants";
import type { ServiceLine } from "@/lib/constants";

type CaseStudy = {
  slug: string;
  title: string;
  clientName: string;
  clientRole: string;
  clientCompany: string;
  clientLogoUrl: string | null;
  headlineResult: string;
  serviceLine: ServiceLine;
};

type Props = {
  cases: CaseStudy[];
  locale: string;
};

const SERVICE_TABS: { key: ServiceLine | "all"; label: string; color?: string }[] = [
  { key: "all", label: "all" },
  { key: "labs", label: "Influence Labs", color: colors.labs },
  { key: "circle", label: "Influence Circle", color: colors.circle },
  { key: "studio", label: "Influence Studio", color: colors.studio },
  { key: "academy", label: "Influence Academy", color: colors.academy },
];

export function CaseFilterClient({ cases, locale }: Props) {
  const [activeFilter, setActiveFilter] = useState<ServiceLine | "all">("all");
  const t = useTranslations("cases");

  const filtered =
    activeFilter === "all"
      ? cases
      : cases.filter((c) => c.serviceLine === activeFilter);

  return (
    <>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-3 mb-12">
        {SERVICE_TABS.map((tab) => {
          const isActive = activeFilter === tab.key;
          const label = tab.key === "all" ? t("all") : tab.label;

          return (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "text-white"
                  : "text-white/60 border border-white/10 hover:border-white/30"
              }`}
              style={
                isActive
                  ? {
                      backgroundColor: tab.color || "#ffffff20",
                      boxShadow: tab.color ? `0 0 20px ${tab.color}30` : undefined,
                    }
                  : undefined
              }
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Cases grid */}
      {filtered.length > 0 ? (
        <motion.div
          key={activeFilter}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filtered.map((cs) => (
            <motion.div key={cs.slug} variants={fadeUp}>
              <CaseCard
                slug={cs.slug}
                title={cs.title}
                clientName={cs.clientName}
                clientRole={cs.clientRole}
                clientCompany={cs.clientCompany}
                clientLogoUrl={cs.clientLogoUrl}
                headlineResult={cs.headlineResult}
                serviceLine={cs.serviceLine}
                locale={locale}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <p className="text-white/60 text-center py-12">{t("noCases")}</p>
      )}
    </>
  );
}
