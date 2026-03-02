"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Users, Plus, X } from "lucide-react";
import Select from "@/components/admin/ui/Select";

type ServiceLine = "labs" | "circle" | "studio" | "academy";
type ContactStatus = "active" | "unsubscribed" | "bounced" | "complained" | "suppressed";

interface SegmentFilter {
  id: string;
  type: "service_interest" | "tag" | "status" | "language";
  value: string;
}

interface Segment {
  filters: SegmentFilter[];
}

interface RecipientPickerProps {
  segment: Segment;
  onChange: (segment: Segment) => void;
}

const SERVICE_OPTIONS = [
  { value: "labs", label: "Labs" },
  { value: "circle", label: "Circle" },
  { value: "studio", label: "Studio" },
  { value: "academy", label: "Academy" },
];

const STATUS_OPTIONS = [
  { value: "active", label: "Active" },
  { value: "unsubscribed", label: "Unsubscribed" },
  { value: "bounced", label: "Bounced" },
];

const LANGUAGE_OPTIONS = [
  { value: "nl", label: "Nederlands" },
  { value: "en", label: "English" },
];

const FILTER_TYPE_OPTIONS = [
  { value: "service_interest", label: "Service Interest" },
  { value: "tag", label: "Tag" },
  { value: "status", label: "Contact Status" },
  { value: "language", label: "Language" },
];

const serviceColors: Record<ServiceLine, string> = {
  labs: "#d55d25",
  circle: "#D7263D",
  studio: "#A855F7",
  academy: "#E8A317",
};

export default function RecipientPicker({
  segment,
  onChange,
}: RecipientPickerProps) {
  const [estimatedCount, setEstimatedCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const estimateRecipients = useCallback(async (filters: SegmentFilter[]) => {
    if (filters.length === 0) {
      setEstimatedCount(null);
      return;
    }

    setLoading(true);
    // Simulate estimation - in production this would call a Supabase function
    await new Promise((r) => setTimeout(r, 500));
    const base = 250;
    const multiplier = Math.max(0.1, 1 - filters.length * 0.2);
    setEstimatedCount(Math.round(base * multiplier));
    setLoading(false);
  }, []);

  useEffect(() => {
    estimateRecipients(segment.filters);
  }, [segment.filters, estimateRecipients]);

  const addFilter = () => {
    const newFilter: SegmentFilter = {
      id: `filter-${Date.now()}`,
      type: "service_interest",
      value: "labs",
    };
    onChange({ filters: [...segment.filters, newFilter] });
  };

  const removeFilter = (filterId: string) => {
    onChange({
      filters: segment.filters.filter((f) => f.id !== filterId),
    });
  };

  const updateFilter = (
    filterId: string,
    updates: Partial<SegmentFilter>
  ) => {
    onChange({
      filters: segment.filters.map((f) =>
        f.id === filterId ? { ...f, ...updates } : f
      ),
    });
  };

  const getValueOptions = (type: SegmentFilter["type"]) => {
    switch (type) {
      case "service_interest":
        return SERVICE_OPTIONS;
      case "status":
        return STATUS_OPTIONS;
      case "language":
        return LANGUAGE_OPTIONS;
      case "tag":
        return [
          { value: "newsletter", label: "Newsletter" },
          { value: "lead", label: "Lead" },
          { value: "customer", label: "Customer" },
          { value: "vip", label: "VIP" },
          { value: "prospect", label: "Prospect" },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="space-y-4">
      {/* Estimated count */}
      <div className="flex items-center gap-3 rounded-xl bg-[#02182B]/5 border border-[#02182B]/10 px-5 py-4">
        <Users className="h-5 w-5 text-[#02182B]" />
        <div>
          <p className="text-sm font-medium text-gray-700">
            Estimated recipients
          </p>
          <p className="text-2xl font-bold text-[#02182B]">
            {loading ? (
              <span className="text-gray-400">Calculating...</span>
            ) : estimatedCount !== null ? (
              `~${estimatedCount.toLocaleString()}`
            ) : (
              <span className="text-gray-400">Add filters to estimate</span>
            )}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-3">
        {segment.filters.map((filter) => (
          <div
            key={filter.id}
            className="flex items-end gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
          >
            <div className="flex-1">
              <Select
                label="Filter by"
                options={FILTER_TYPE_OPTIONS}
                value={filter.type}
                onChange={(e) => {
                  const newType = e.target
                    .value as SegmentFilter["type"];
                  const opts = getValueOptions(newType);
                  updateFilter(filter.id, {
                    type: newType,
                    value: opts[0]?.value || "",
                  });
                }}
              />
            </div>
            <div className="flex-1">
              {filter.type === "tag" ? (
                <div className="w-full">
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Value
                  </label>
                  <input
                    type="text"
                    value={filter.value}
                    onChange={(e) =>
                      updateFilter(filter.id, { value: e.target.value })
                    }
                    placeholder="Enter tag name"
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-[#02182B] focus:outline-none focus:ring-2 focus:ring-[#02182B]/20 focus:ring-offset-1"
                  />
                </div>
              ) : (
                <Select
                  label="Value"
                  options={getValueOptions(filter.type)}
                  value={filter.value}
                  onChange={(e) =>
                    updateFilter(filter.id, { value: e.target.value })
                  }
                />
              )}
            </div>
            {filter.type === "service_interest" && (
              <div
                className="mb-0.5 h-3 w-3 rounded-full shrink-0"
                style={{
                  backgroundColor:
                    serviceColors[filter.value as ServiceLine] || "#6b7280",
                }}
              />
            )}
            <button
              type="button"
              onClick={() => removeFilter(filter.id)}
              className="mb-0.5 rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Add filter button */}
      <button
        type="button"
        onClick={addFilter}
        className="flex items-center gap-2 rounded-xl border border-dashed border-gray-300 px-4 py-3 text-sm font-medium text-gray-500 transition-colors hover:border-[#02182B] hover:text-[#02182B] w-full justify-center"
      >
        <Plus className="h-4 w-4" />
        Add Filter
      </button>
    </div>
  );
}
