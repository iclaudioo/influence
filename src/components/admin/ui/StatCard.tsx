"use client";

import React from "react";
import type { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: LucideIcon;
  accentColor?: string;
}

export default function StatCard({
  title,
  value,
  change,
  icon: Icon,
  accentColor = "#02182B",
}: StatCardProps) {
  const isPositive = change?.startsWith("+");
  const isNegative = change?.startsWith("-");

  return (
    <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-200 relative overflow-hidden">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          {change && (
            <div className="flex items-center gap-1 pt-1">
              {isPositive && (
                <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
              )}
              {isNegative && (
                <TrendingDown className="h-3.5 w-3.5 text-red-500" />
              )}
              <span
                className={`text-xs font-semibold ${
                  isPositive
                    ? "text-emerald-600"
                    : isNegative
                      ? "text-red-600"
                      : "text-gray-500"
                }`}
              >
                {change}
              </span>
            </div>
          )}
        </div>
        <div
          className="flex h-10 w-10 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${accentColor}12` }}
        >
          <Icon className="h-5 w-5" style={{ color: accentColor }} />
        </div>
      </div>
    </div>
  );
}
