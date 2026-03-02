"use client";

import React from "react";
import { FlaskConical } from "lucide-react";
import Input from "@/components/admin/ui/Input";
import Toggle from "@/components/admin/ui/Toggle";

interface ABTestSettings {
  enabled: boolean;
  variantBSubject: string;
  splitPercentage: number;
  waitHours: number;
  minSampleSize: number;
}

interface ABTestConfigProps {
  settings: ABTestSettings;
  onChange: (settings: ABTestSettings) => void;
}

export default function ABTestConfig({
  settings,
  onChange,
}: ABTestConfigProps) {
  const update = (patch: Partial<ABTestSettings>) => {
    onChange({ ...settings, ...patch });
  };

  return (
    <div className="space-y-6">
      {/* Enable toggle */}
      <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50">
            <FlaskConical className="h-5 w-5 text-[#A855F7]" />
          </div>
          <div>
            <p className="font-medium text-gray-900">A/B Testing</p>
            <p className="text-sm text-gray-500">
              Test different subject lines to optimize open rates
            </p>
          </div>
        </div>
        <Toggle
          checked={settings.enabled}
          onChange={(checked) => update({ enabled: checked })}
        />
      </div>

      {settings.enabled && (
        <div className="space-y-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          {/* Variant B subject */}
          <div>
            <Input
              label="Variant B Subject Line"
              value={settings.variantBSubject}
              onChange={(e) =>
                update({ variantBSubject: e.target.value })
              }
              placeholder="Enter alternate subject line..."
            />
            <p className="mt-1.5 text-xs text-gray-400">
              Variant A uses the main subject line from Setup.
            </p>
          </div>

          {/* Split percentage slider */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Test Split: {settings.splitPercentage}% per variant
            </label>
            <input
              type="range"
              min={10}
              max={50}
              step={5}
              value={settings.splitPercentage}
              onChange={(e) =>
                update({ splitPercentage: Number(e.target.value) })
              }
              className="w-full accent-[#A855F7]"
            />
            <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
              <span>10%</span>
              <span>50%</span>
            </div>
            <div className="mt-3 flex gap-3">
              <div className="flex-1 rounded-lg bg-[#02182B]/5 p-3 text-center">
                <p className="text-xs text-gray-500">Variant A</p>
                <p className="text-lg font-bold text-[#02182B]">
                  {settings.splitPercentage}%
                </p>
              </div>
              <div className="flex-1 rounded-lg bg-purple-50 p-3 text-center">
                <p className="text-xs text-gray-500">Variant B</p>
                <p className="text-lg font-bold text-[#A855F7]">
                  {settings.splitPercentage}%
                </p>
              </div>
              <div className="flex-1 rounded-lg bg-gray-50 p-3 text-center">
                <p className="text-xs text-gray-500">Winner</p>
                <p className="text-lg font-bold text-gray-700">
                  {100 - settings.splitPercentage * 2}%
                </p>
              </div>
            </div>
          </div>

          {/* Wait hours */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Wait Time: {settings.waitHours} hours
            </label>
            <input
              type="range"
              min={1}
              max={72}
              step={1}
              value={settings.waitHours}
              onChange={(e) =>
                update({ waitHours: Number(e.target.value) })
              }
              className="w-full accent-[#A855F7]"
            />
            <div className="mt-1 flex items-center justify-between text-xs text-gray-500">
              <span>1 hour</span>
              <span>72 hours</span>
            </div>
            <p className="mt-1.5 text-xs text-gray-400">
              Time to wait before selecting the winning variant.
            </p>
          </div>

          {/* Min sample size */}
          <div>
            <Input
              label="Minimum Sample Size"
              type="number"
              min={10}
              max={1000}
              value={String(settings.minSampleSize)}
              onChange={(e) =>
                update({
                  minSampleSize: Math.max(10, Number(e.target.value)),
                })
              }
            />
            <p className="mt-1.5 text-xs text-gray-400">
              Minimum number of recipients per variant before deciding a winner.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
