"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface AudienceDataPoint {
  date: string;
  contacts: number;
}

interface AudienceGrowthChartProps {
  data: AudienceDataPoint[];
}

export default function AudienceGrowthChart({
  data,
}: AudienceGrowthChartProps) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-200">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">
        Audience Growth (Last 30 Days)
      </h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <defs>
              <linearGradient id="navyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#02182B" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#02182B" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12, fill: "#9ca3af" }}
              tickLine={false}
              axisLine={{ stroke: "#e5e7eb" }}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#9ca3af" }}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "0.5rem",
                fontSize: "0.875rem",
              }}
            />
            <Area
              type="monotone"
              dataKey="contacts"
              name="Total Contacts"
              stroke="#02182B"
              strokeWidth={2}
              fill="url(#navyGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
