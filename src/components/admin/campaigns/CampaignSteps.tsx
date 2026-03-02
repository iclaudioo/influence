"use client";

import React from "react";
import { Settings, Users, FileText, FlaskConical, CheckCircle } from "lucide-react";

interface CampaignStepsProps {
  currentStep: number;
  onStepClick: (step: number) => void;
  abTestEnabled?: boolean;
}

const STEPS = [
  { label: "Setup", icon: Settings },
  { label: "Recipients", icon: Users },
  { label: "Content", icon: FileText },
  { label: "A/B Test", icon: FlaskConical },
  { label: "Review", icon: CheckCircle },
];

export default function CampaignSteps({
  currentStep,
  onStepClick,
  abTestEnabled = true,
}: CampaignStepsProps) {
  const visibleSteps = abTestEnabled
    ? STEPS
    : STEPS.filter((s) => s.label !== "A/B Test");

  return (
    <nav className="mb-8">
      <ol className="flex items-center">
        {visibleSteps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          const isLast = index === visibleSteps.length - 1;

          return (
            <li
              key={step.label}
              className={`flex items-center ${isLast ? "" : "flex-1"}`}
            >
              <button
                type="button"
                onClick={() => onStepClick(index)}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[#02182B] text-white"
                    : isCompleted
                      ? "text-[#02182B] hover:bg-[#02182B]/5"
                      : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                    isActive
                      ? "bg-white/20"
                      : isCompleted
                        ? "bg-[#02182B]/10"
                        : "bg-gray-100"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <Icon className="h-3.5 w-3.5" />
                  )}
                </div>
                <span className="hidden sm:inline">{step.label}</span>
              </button>
              {!isLast && (
                <div
                  className={`mx-2 h-px flex-1 ${
                    isCompleted ? "bg-[#02182B]" : "bg-gray-200"
                  }`}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
