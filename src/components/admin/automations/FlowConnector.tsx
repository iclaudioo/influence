"use client";

import React from "react";
import { ArrowDown } from "lucide-react";

interface FlowConnectorProps {
  isCondition?: boolean;
  branchLabel?: "yes" | "no";
}

export default function FlowConnector({
  isCondition = false,
  branchLabel,
}: FlowConnectorProps) {
  if (isCondition && branchLabel) {
    return (
      <div className="flex items-center justify-center py-2">
        <div className="flex flex-col items-center">
          <div className="h-4 w-px bg-gray-300" />
          <span
            className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
              branchLabel === "yes"
                ? "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200"
                : "bg-red-50 text-red-500 ring-1 ring-red-200"
            }`}
          >
            {branchLabel}
          </span>
          <div className="h-4 w-px bg-gray-300" />
          <ArrowDown className="h-3 w-3 text-gray-400" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center py-1">
      <div className="h-6 w-px bg-gray-300" />
      <ArrowDown className="h-3 w-3 text-gray-400" />
    </div>
  );
}
