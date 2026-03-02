"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { LeadCaptureForm } from "@/components/ui/LeadCaptureForm";
import { Button } from "@/components/ui/Button";

const ACCENT = "#d55d25";

type Industry =
  | "technology"
  | "consulting"
  | "finance"
  | "manufacturing"
  | "healthcare"
  | "other";

const INDUSTRY_MULTIPLIERS: Record<Industry, number> = {
  technology: 1.4,
  consulting: 1.6,
  finance: 1.3,
  manufacturing: 1.2,
  healthcare: 1.3,
  other: 1.25,
};

const INDUSTRY_KEYS: Industry[] = [
  "technology",
  "consulting",
  "finance",
  "manufacturing",
  "healthcare",
  "other",
];

const INDUSTRY_TRANSLATION_MAP: Record<Industry, string> = {
  technology: "technology",
  consulting: "consulting",
  finance: "financial",
  manufacturing: "other",
  healthcare: "healthcare",
  other: "other",
};

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("nl-BE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function ROICalculator() {
  const t = useTranslations("roiCalculator");
  const [revenue, setRevenue] = useState<string>("");
  const [networkPercentage, setNetworkPercentage] = useState(40);
  const [desiredGrowth, setDesiredGrowth] = useState(15);
  const [industry, setIndustry] = useState<Industry>("technology");
  const [showResults, setShowResults] = useState(false);
  const [missedRevenue, setMissedRevenue] = useState(0);
  const [potential, setPotential] = useState(0);

  const handleCalculate = () => {
    const revenueNum = parseFloat(revenue.replace(/[^0-9]/g, "")) || 0;
    if (revenueNum <= 0) return;

    const multiplier = INDUSTRY_MULTIPLIERS[industry];
    const missed =
      revenueNum * (networkPercentage / 100) * (desiredGrowth / 100) * multiplier;
    const potentialRevenue = revenueNum + missed;

    setMissedRevenue(Math.round(missed));
    setPotential(Math.round(potentialRevenue));
    setShowResults(true);
  };

  const handleLeadCaptureSuccess = async (contactId?: string) => {
    if (contactId) {
      try {
        await fetch("/api/assessment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contactId,
            toolType: "roi_calculator",
            answers: {
              revenue: parseFloat(revenue.replace(/[^0-9]/g, "")) || 0,
              networkPercentage,
              desiredGrowth,
              industry,
            },
            score: null,
            results: {
              missedRevenue,
              potential,
            },
          }),
        });
      } catch {
        // Non-blocking
      }
    }
  };

  const revenueNum = parseFloat(revenue.replace(/[^0-9]/g, "")) || 0;

  const chartData = [
    { name: t("currentLabel"), value: revenueNum },
    { name: t("potentialLabel"), value: potential },
  ];

  const barColors = ["rgba(255,255,255,0.3)", ACCENT];

  return (
    <div className="max-w-3xl mx-auto">
      {/* Inputs */}
      <div className="space-y-8 mb-8">
        {/* Revenue */}
        <div>
          <label className="block text-sm text-white/60 mb-2">
            {t("revenue")}
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-white/40">
              &euro;
            </span>
            <input
              type="text"
              value={revenue}
              onChange={(e) => {
                const raw = e.target.value.replace(/[^0-9]/g, "");
                setRevenue(raw ? Number(raw).toLocaleString("nl-BE") : "");
              }}
              placeholder={t("revenuePlaceholder")}
              className="w-full rounded-xl border border-white/20 bg-white/5 pl-12 pr-4 py-4 text-2xl text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/20 transition-colors"
            />
          </div>
        </div>

        {/* Network Percentage Slider */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm text-white/60">
              {t("networkPercentage")}
            </label>
            <span className="text-lg font-semibold text-white">
              {networkPercentage}%
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={networkPercentage}
            onChange={(e) => setNetworkPercentage(Number(e.target.value))}
            className="w-full h-2 rounded-full appearance-none cursor-pointer bg-white/10 accent-[#d55d25]"
          />
          <div className="flex justify-between text-xs text-white/40 mt-1">
            <span>0%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Desired Growth Slider */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm text-white/60">
              {t("desiredGrowth")}
            </label>
            <span className="text-lg font-semibold text-white">
              {desiredGrowth}%
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={50}
            value={desiredGrowth}
            onChange={(e) => setDesiredGrowth(Number(e.target.value))}
            className="w-full h-2 rounded-full appearance-none cursor-pointer bg-white/10 accent-[#d55d25]"
          />
          <div className="flex justify-between text-xs text-white/40 mt-1">
            <span>0%</span>
            <span>50%</span>
          </div>
        </div>

        {/* Industry Select */}
        <div>
          <label className="block text-sm text-white/60 mb-2">
            {t("industry")}
          </label>
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value as Industry)}
            className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/20 transition-colors appearance-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M6 8L1 3h10z' fill='rgba(255,255,255,0.4)'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 16px center",
            }}
          >
            {INDUSTRY_KEYS.map((key) => (
              <option key={key} value={key} className="bg-[#02182B] text-white">
                {t(`industries.${INDUSTRY_TRANSLATION_MAP[key]}`)}
              </option>
            ))}
          </select>
        </div>

        {/* Calculate Button */}
        <Button
          variant="primary"
          accentColor={ACCENT}
          onClick={handleCalculate}
          className={`w-full ${revenueNum <= 0 ? "opacity-50 pointer-events-none" : ""}`}
        >
          {t("calculate")}
        </Button>
      </div>

      {/* Results */}
      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Missed Revenue */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
              <p className="text-sm uppercase tracking-[0.15em] text-white/60 mb-4">
                {t("missedRevenue")}
              </p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-4xl md:text-5xl font-bold text-white/40">
                  &euro;
                </span>
                <AnimatedCounter
                  target={missedRevenue}
                  accentColor={ACCENT}
                  duration={2000}
                />
              </div>
            </div>

            {/* Bar Chart */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.05)"
                  />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 14 }}
                    axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                  />
                  <YAxis
                    tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }}
                    axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                    tickFormatter={(value: number) =>
                      formatCurrency(value)
                    }
                  />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={80}>
                    {chartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={barColors[index]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Lead Capture for Report */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-2">
                {t("getReport")}
              </h3>
              <p className="text-white/60 mb-6">
                {t("reportDescription")}
              </p>
              <LeadCaptureForm
                variant="assessment"
                onSuccess={handleLeadCaptureSuccess}
                accentColor={ACCENT}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
