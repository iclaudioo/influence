"use client";

import React from "react";
import {
  Zap,
  Clock,
  Mail,
  GitBranch,
  RefreshCw,
  LogOut,
} from "lucide-react";

export type FlowNodeType =
  | "trigger"
  | "delay"
  | "send_email"
  | "condition"
  | "update_contact"
  | "exit";

export interface FlowNodeData {
  id: string;
  type: FlowNodeType;
  title: string;
  config: Record<string, unknown>;
  position: number;
}

interface FlowNodeProps {
  node: FlowNodeData;
  selected: boolean;
  onClick: (nodeId: string) => void;
}

const nodeStyles: Record<
  FlowNodeType,
  { bg: string; border: string; iconBg: string; iconColor: string }
> = {
  trigger: {
    bg: "bg-green-50",
    border: "border-green-500",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  delay: {
    bg: "bg-gray-50",
    border: "border-gray-400",
    iconBg: "bg-gray-100",
    iconColor: "text-gray-600",
  },
  send_email: {
    bg: "bg-orange-50",
    border: "border-[#d55d25]",
    iconBg: "bg-orange-100",
    iconColor: "text-[#d55d25]",
  },
  condition: {
    bg: "bg-purple-50",
    border: "border-[#A855F7]",
    iconBg: "bg-purple-100",
    iconColor: "text-[#A855F7]",
  },
  update_contact: {
    bg: "bg-amber-50",
    border: "border-[#E8A317]",
    iconBg: "bg-amber-100",
    iconColor: "text-[#E8A317]",
  },
  exit: {
    bg: "bg-[#02182B]/5",
    border: "border-[#02182B]",
    iconBg: "bg-[#02182B]/10",
    iconColor: "text-[#02182B]",
  },
};

const nodeIcons: Record<FlowNodeType, React.ElementType> = {
  trigger: Zap,
  delay: Clock,
  send_email: Mail,
  condition: GitBranch,
  update_contact: RefreshCw,
  exit: LogOut,
};

const nodeTypeLabels: Record<FlowNodeType, string> = {
  trigger: "Trigger",
  delay: "Wait / Delay",
  send_email: "Send Email",
  condition: "Condition",
  update_contact: "Update Contact",
  exit: "Exit",
};

function getConfigSummary(node: FlowNodeData): string {
  const config = node.config;
  switch (node.type) {
    case "trigger":
      return (config.trigger_type as string) ?? "When triggered";
    case "delay":
      return config.duration_hours
        ? `Wait ${config.duration_hours} hour(s)`
        : "Configure delay";
    case "send_email":
      return (config.subject as string) ?? "Configure email";
    case "condition":
      return config.field
        ? `If ${config.field} ${config.operator} ${config.value}`
        : "Configure condition";
    case "update_contact":
      return config.field
        ? `Set ${config.field} = ${config.value}`
        : "Configure update";
    case "exit":
      return "End flow";
    default:
      return "";
  }
}

export default function FlowNode({ node, selected, onClick }: FlowNodeProps) {
  const style = nodeStyles[node.type];
  const Icon = nodeIcons[node.type];
  const summary = getConfigSummary(node);

  return (
    <button
      type="button"
      onClick={() => onClick(node.id)}
      className={`
        w-72 rounded-xl border-2 p-4 text-left transition-all
        ${style.bg} ${style.border}
        ${selected ? "ring-2 ring-[#02182B] ring-offset-2 shadow-md" : "shadow-sm hover:shadow-md"}
      `}
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${style.iconBg}`}
        >
          <Icon className={`h-4.5 w-4.5 ${style.iconColor}`} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
            {nodeTypeLabels[node.type]}
          </p>
          <p className="font-medium text-gray-900 mt-0.5 truncate">
            {node.title}
          </p>
          <p className="text-xs text-gray-500 mt-1 truncate">{summary}</p>
        </div>
      </div>
    </button>
  );
}

export { nodeTypeLabels, nodeIcons, nodeStyles };
