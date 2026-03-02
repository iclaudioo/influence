"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Send, Eye, MousePointerClick, AlertTriangle } from "lucide-react";

interface CampaignStatsProps {
  delivered: number;
  opened: number;
  clicked: number;
  bounced: number;
  totalRecipients: number;
}

export default function CampaignStats({
  delivered,
  opened,
  clicked,
  bounced,
  totalRecipients,
}: CampaignStatsProps) {
  const rate = (value: number) =>
    totalRecipients > 0 ? ((value / totalRecipients) * 100).toFixed(1) : "0.0";

  const stats = [
    {
      label: "Delivered",
      value: delivered,
      rate: rate(delivered),
      icon: Send,
      color: "#02182B",
    },
    {
      label: "Opened",
      value: opened,
      rate: rate(opened),
      icon: Eye,
      color: "#d55d25",
    },
    {
      label: "Clicked",
      value: clicked,
      rate: rate(clicked),
      icon: MousePointerClick,
      color: "#A855F7",
    },
    {
      label: "Bounced",
      value: bounced,
      rate: rate(bounced),
      icon: AlertTriangle,
      color: "#D7263D",
    },
  ];

  const chartData = stats.map((s) => ({
    name: s.label,
    count: s.value,
    color: s.color,
  }));

  return (
    <div className="space-y-6">
      {/* Stat cards row */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value.toLocaleString()}
                  </p>
                  <p className="text-sm font-medium text-gray-500 mt-1">
                    {stat.label}
                  </p>
                  <p
                    className="text-xs font-semibold mt-1"
                    style={{ color: stat.color }}
                  >
                    {stat.rate}%
                  </p>
                </div>
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${stat.color}12` }}
                >
                  <Icon className="h-5 w-5" style={{ color: stat.color }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bar chart */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">
          Campaign Performance
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12, fill: "#9ca3af" }}
                tickLine={false}
                axisLine={{ stroke: "#e5e7eb" }}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#9ca3af" }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "0.5rem",
                  fontSize: "0.875rem",
                }}
              />
              <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
