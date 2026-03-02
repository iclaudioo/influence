"use client";

import React, { useState, useRef, useEffect } from "react";
import { Tags } from "lucide-react";

interface MergeTagPickerProps {
  onSelect: (tag: string) => void;
}

interface MergeTag {
  label: string;
  tag: string;
  description: string;
}

const MERGE_TAGS: MergeTag[] = [
  { label: "Name", tag: "{{name}}", description: "Contact's full name" },
  { label: "Email", tag: "{{email}}", description: "Contact's email address" },
  { label: "Company", tag: "{{company}}", description: "Contact's company" },
  {
    label: "Service",
    tag: "{{service}}",
    description: "Primary service interest",
  },
  { label: "Language", tag: "{{language}}", description: "Contact's language" },
  {
    label: "Unsubscribe Link",
    tag: "{{unsubscribe_url}}",
    description: "One-click unsubscribe",
  },
  {
    label: "Preference Center",
    tag: "{{preferences_url}}",
    description: "Email preferences link",
  },
];

export default function MergeTagPicker({ onSelect }: MergeTagPickerProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        title="Insert Merge Tag"
        className="rounded-md p-1.5 text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-900"
      >
        <Tags className="h-4 w-4" />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-20 mt-1 w-64 rounded-xl border border-gray-200 bg-white py-1 shadow-lg">
          <div className="px-3 py-2 border-b border-gray-100">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Merge Tags
            </p>
          </div>
          {MERGE_TAGS.map((mt) => (
            <button
              key={mt.tag}
              type="button"
              onClick={() => {
                onSelect(mt.tag);
                setOpen(false);
              }}
              className="flex w-full items-start gap-3 px-3 py-2 text-left transition-colors hover:bg-gray-50"
            >
              <code className="mt-0.5 rounded bg-gray-100 px-1.5 py-0.5 text-xs font-mono text-[#d55d25]">
                {mt.tag}
              </code>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-700">{mt.label}</p>
                <p className="text-xs text-gray-400">{mt.description}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
