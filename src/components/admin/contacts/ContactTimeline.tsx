"use client";

import {
  Mail,
  MailOpen,
  MousePointerClick,
  Workflow,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface TimelineEvent {
  id: string;
  type:
    | "email_sent"
    | "email_delivered"
    | "email_opened"
    | "email_clicked"
    | "email_bounced"
    | "email_failed"
    | "flow_enrolled"
    | "flow_completed";
  description: string;
  detail?: string;
  timestamp: string;
}

interface ContactTimelineProps {
  events: TimelineEvent[];
}

const eventConfig: Record<
  TimelineEvent["type"],
  { icon: LucideIcon; color: string; bg: string }
> = {
  email_sent: { icon: Mail, color: "text-blue-600", bg: "bg-blue-50" },
  email_delivered: {
    icon: CheckCircle2,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  email_opened: {
    icon: MailOpen,
    color: "text-[#02182B]",
    bg: "bg-gray-100",
  },
  email_clicked: {
    icon: MousePointerClick,
    color: "text-[#d55d25]",
    bg: "bg-orange-50",
  },
  email_bounced: {
    icon: AlertTriangle,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  email_failed: { icon: XCircle, color: "text-red-600", bg: "bg-red-50" },
  flow_enrolled: {
    icon: Workflow,
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  flow_completed: {
    icon: CheckCircle2,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
};

function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ContactTimeline({ events }: ContactTimelineProps) {
  if (events.length === 0) {
    return (
      <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-200">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">
          Activity Timeline
        </h3>
        <div className="flex flex-col items-center justify-center py-8 text-gray-400">
          <Clock className="h-8 w-8 mb-2" />
          <p className="text-sm">No activity recorded yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-200">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">
        Activity Timeline
      </h3>
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-5 top-2 bottom-2 w-px bg-gray-200" />

        <div className="space-y-4">
          {events.map((event) => {
            const config = eventConfig[event.type];
            const Icon = config.icon;

            return (
              <div key={event.id} className="relative flex items-start gap-3 pl-1">
                <div
                  className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${config.bg}`}
                >
                  <Icon className={`h-4 w-4 ${config.color}`} />
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <p className="text-sm text-gray-900">{event.description}</p>
                  {event.detail && (
                    <p className="text-xs text-gray-500 mt-0.5">
                      {event.detail}
                    </p>
                  )}
                  <p className="text-xs text-gray-400 mt-0.5">
                    {formatTimestamp(event.timestamp)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
