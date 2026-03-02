"use client";

import React, { useState, useRef, useEffect } from "react";
import { Plus } from "lucide-react";
import type { FlowNodeType } from "./FlowNode";
import { nodeTypeLabels, nodeIcons, nodeStyles } from "./FlowNode";

interface NodeTypePickerProps {
  onSelect: (type: FlowNodeType) => void;
  excludeTypes?: FlowNodeType[];
}

const ALL_NODE_TYPES: FlowNodeType[] = [
  "trigger",
  "delay",
  "send_email",
  "condition",
  "update_contact",
  "exit",
];

export default function NodeTypePicker({
  onSelect,
  excludeTypes = [],
}: NodeTypePickerProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const availableTypes = ALL_NODE_TYPES.filter(
    (t) => !excludeTypes.includes(t)
  );

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
        className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-500 transition-colors hover:border-[#02182B] hover:text-[#02182B]"
      >
        <Plus className="h-3.5 w-3.5" />
        Add Step
      </button>

      {open && (
        <div className="absolute left-1/2 top-full z-20 mt-2 w-56 -translate-x-1/2 rounded-xl border border-gray-200 bg-white py-1 shadow-lg">
          <div className="px-3 py-2 border-b border-gray-100">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Step Type
            </p>
          </div>
          {availableTypes.map((type) => {
            const Icon = nodeIcons[type];
            const style = nodeStyles[type];

            return (
              <button
                key={type}
                type="button"
                onClick={() => {
                  onSelect(type);
                  setOpen(false);
                }}
                className="flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-gray-50"
              >
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-md ${style.iconBg}`}
                >
                  <Icon className={`h-3.5 w-3.5 ${style.iconColor}`} />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {nodeTypeLabels[type]}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
