"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Send, Eye, MousePointerClick, Calendar } from "lucide-react";
import Badge from "@/components/admin/ui/Badge";

type CampaignStatus =
  | "draft"
  | "scheduled"
  | "sending"
  | "sent"
  | "paused"
  | "cancelled";

interface Campaign {
  id: string;
  name: string;
  subject: string;
  status: CampaignStatus;
  total_recipients: number;
  total_opens: number;
  total_clicks: number;
  scheduled_at: string | null;
  sent_at: string | null;
  created_at: string;
}

interface CampaignListProps {
  campaigns: Campaign[];
}

const statusVariant: Record<
  CampaignStatus,
  "success" | "warning" | "error" | "info" | "default"
> = {
  draft: "default",
  scheduled: "info",
  sending: "warning",
  sent: "success",
  paused: "warning",
  cancelled: "error",
};

const STATUS_FILTERS: { value: string; label: string }[] = [
  { value: "all", label: "All Campaigns" },
  { value: "draft", label: "Drafts" },
  { value: "scheduled", label: "Scheduled" },
  { value: "sending", label: "Sending" },
  { value: "sent", label: "Sent" },
  { value: "paused", label: "Paused" },
  { value: "cancelled", label: "Cancelled" },
];

export default function CampaignList({ campaigns }: CampaignListProps) {
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered =
    statusFilter === "all"
      ? campaigns
      : campaigns.filter((c) => c.status === statusFilter);

  return (
    <div>
      {/* Filters */}
      <div className="mb-4 flex flex-wrap gap-2">
        {STATUS_FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setStatusFilter(f.value)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
              statusFilter === f.value
                ? "bg-[#02182B] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Campaign list */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Campaign
              </th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Status
              </th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                <div className="flex items-center gap-1.5">
                  <Send className="h-3.5 w-3.5" />
                  Recipients
                </div>
              </th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                <div className="flex items-center gap-1.5">
                  <Eye className="h-3.5 w-3.5" />
                  Open Rate
                </div>
              </th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                <div className="flex items-center gap-1.5">
                  <MousePointerClick className="h-3.5 w-3.5" />
                  Click Rate
                </div>
              </th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  Date
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-10 text-center text-gray-400"
                >
                  No campaigns found.
                </td>
              </tr>
            ) : (
              filtered.map((campaign) => {
                const openRate =
                  campaign.total_recipients > 0
                    ? (
                        (campaign.total_opens / campaign.total_recipients) *
                        100
                      ).toFixed(1)
                    : "0.0";
                const clickRate =
                  campaign.total_recipients > 0
                    ? (
                        (campaign.total_clicks / campaign.total_recipients) *
                        100
                      ).toFixed(1)
                    : "0.0";
                const dateStr =
                  campaign.sent_at ||
                  campaign.scheduled_at ||
                  campaign.created_at;

                return (
                  <tr
                    key={campaign.id}
                    onClick={() =>
                      router.push(`/admin/campaigns/${campaign.id}`)
                    }
                    className="cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors hover:bg-gray-50"
                  >
                    <td className="px-5 py-3.5">
                      <div>
                        <p className="font-medium text-gray-900">
                          {campaign.name}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {campaign.subject}
                        </p>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge variant={statusVariant[campaign.status]}>
                        {campaign.status}
                      </Badge>
                    </td>
                    <td className="px-5 py-3.5 text-gray-700">
                      {campaign.total_recipients.toLocaleString()}
                    </td>
                    <td className="px-5 py-3.5 text-gray-700">{openRate}%</td>
                    <td className="px-5 py-3.5 text-gray-700">{clickRate}%</td>
                    <td className="px-5 py-3.5 text-gray-500 text-xs">
                      {new Date(dateStr).toLocaleDateString("nl-NL", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
