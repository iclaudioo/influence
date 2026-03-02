"use client";

import React from "react";
import { X, Trash2 } from "lucide-react";
import Input from "@/components/admin/ui/Input";
import Select from "@/components/admin/ui/Select";
import type { FlowNodeData, FlowNodeType } from "./FlowNode";
import { nodeTypeLabels, nodeIcons, nodeStyles } from "./FlowNode";

interface NodePropertiesProps {
  node: FlowNodeData | null;
  onUpdate: (nodeId: string, updates: Partial<FlowNodeData>) => void;
  onDelete: (nodeId: string) => void;
  onClose: () => void;
}

const TRIGGER_TYPE_OPTIONS = [
  { value: "contact_created", label: "Contact Created" },
  { value: "tag_added", label: "Tag Added" },
  { value: "service_interest", label: "Service Interest Added" },
  { value: "manual", label: "Manual Enrollment" },
  { value: "inactivity", label: "Inactivity Trigger" },
];

const CONDITION_FIELD_OPTIONS = [
  { value: "language", label: "Language" },
  { value: "status", label: "Contact Status" },
  { value: "service", label: "Service Interest" },
  { value: "tag", label: "Has Tag" },
  { value: "open_count", label: "Email Opens" },
];

const CONDITION_OPERATOR_OPTIONS = [
  { value: "equals", label: "Equals" },
  { value: "not_equals", label: "Not Equals" },
  { value: "contains", label: "Contains" },
  { value: "greater_than", label: "Greater Than" },
  { value: "less_than", label: "Less Than" },
];

const UPDATE_FIELD_OPTIONS = [
  { value: "status", label: "Status" },
  { value: "language", label: "Language" },
  { value: "tag", label: "Add Tag" },
];

export default function NodeProperties({
  node,
  onUpdate,
  onDelete,
  onClose,
}: NodePropertiesProps) {
  if (!node) {
    return (
      <div className="flex h-full items-center justify-center p-6 text-sm text-gray-400">
        Select a node to view its properties
      </div>
    );
  }

  const style = nodeStyles[node.type];
  const Icon = nodeIcons[node.type];

  const updateConfig = (key: string, value: unknown) => {
    onUpdate(node.id, {
      config: { ...node.config, [key]: value },
    });
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-lg ${style.iconBg}`}
          >
            <Icon className={`h-4 w-4 ${style.iconColor}`} />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
              {nodeTypeLabels[node.type]}
            </p>
            <p className="font-medium text-gray-900">{node.title}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Properties form */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        {/* Title (all types) */}
        <Input
          label="Step Title"
          value={node.title}
          onChange={(e) => onUpdate(node.id, { title: e.target.value })}
          placeholder="Enter step title..."
        />

        {/* Trigger properties */}
        {node.type === "trigger" && (
          <>
            <Select
              label="Trigger Type"
              options={TRIGGER_TYPE_OPTIONS}
              value={(node.config.trigger_type as string) ?? "contact_created"}
              onChange={(e) => updateConfig("trigger_type", e.target.value)}
            />
            {(node.config.trigger_type === "tag_added" ||
              node.config.trigger_type === "service_interest") && (
              <Input
                label="Trigger Value"
                value={(node.config.trigger_value as string) ?? ""}
                onChange={(e) =>
                  updateConfig("trigger_value", e.target.value)
                }
                placeholder={
                  node.config.trigger_type === "tag_added"
                    ? "e.g. newsletter"
                    : "e.g. labs"
                }
              />
            )}
            {node.config.trigger_type === "inactivity" && (
              <Input
                label="Inactivity Days"
                type="number"
                min={1}
                value={String(node.config.inactivity_days ?? 30)}
                onChange={(e) =>
                  updateConfig("inactivity_days", Number(e.target.value))
                }
              />
            )}
          </>
        )}

        {/* Delay properties */}
        {node.type === "delay" && (
          <Input
            label="Delay (hours)"
            type="number"
            min={1}
            max={720}
            value={String(node.config.duration_hours ?? 24)}
            onChange={(e) =>
              updateConfig("duration_hours", Number(e.target.value))
            }
          />
        )}

        {/* Send email properties */}
        {node.type === "send_email" && (
          <>
            <Input
              label="Email Subject"
              value={(node.config.subject as string) ?? ""}
              onChange={(e) => updateConfig("subject", e.target.value)}
              placeholder="Enter email subject..."
            />
            <Input
              label="Subject Line B (A/B Test)"
              value={(node.config.subject_b as string) ?? ""}
              onChange={(e) => updateConfig("subject_b", e.target.value)}
              placeholder="Optional: alternate subject"
            />
            <Input
              label="Template"
              value={(node.config.template as string) ?? ""}
              onChange={(e) => updateConfig("template", e.target.value)}
              placeholder="Template name or ID"
            />
            <Input
              label="Preview Text"
              value={(node.config.preview_text as string) ?? ""}
              onChange={(e) => updateConfig("preview_text", e.target.value)}
              placeholder="Preview text for inbox..."
            />
          </>
        )}

        {/* Condition properties */}
        {node.type === "condition" && (
          <>
            <Select
              label="Field"
              options={CONDITION_FIELD_OPTIONS}
              value={(node.config.field as string) ?? "language"}
              onChange={(e) => updateConfig("field", e.target.value)}
            />
            <Select
              label="Operator"
              options={CONDITION_OPERATOR_OPTIONS}
              value={(node.config.operator as string) ?? "equals"}
              onChange={(e) => updateConfig("operator", e.target.value)}
            />
            <Input
              label="Value"
              value={(node.config.value as string) ?? ""}
              onChange={(e) => updateConfig("value", e.target.value)}
              placeholder="Comparison value..."
            />
          </>
        )}

        {/* Update contact properties */}
        {node.type === "update_contact" && (
          <>
            <Select
              label="Field to Update"
              options={UPDATE_FIELD_OPTIONS}
              value={(node.config.field as string) ?? "status"}
              onChange={(e) => updateConfig("field", e.target.value)}
            />
            <Input
              label="New Value"
              value={(node.config.value as string) ?? ""}
              onChange={(e) => updateConfig("value", e.target.value)}
              placeholder="Value to set..."
            />
          </>
        )}

        {/* Exit has no additional properties */}
        {node.type === "exit" && (
          <p className="text-sm text-gray-500">
            This step ends the flow. Contacts reaching this step will be
            marked as completed.
          </p>
        )}
      </div>

      {/* Footer */}
      {node.type !== "trigger" && (
        <div className="border-t border-gray-200 px-5 py-4">
          <button
            type="button"
            onClick={() => onDelete(node.id)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
            Delete Step
          </button>
        </div>
      )}
    </div>
  );
}
