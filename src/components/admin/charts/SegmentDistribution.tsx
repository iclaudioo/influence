"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface SegmentDataPoint {
  name: string;
  value: number;
  color: string;
}

interface SegmentDistributionProps {
  data: SegmentDataPoint[];
}

export default function SegmentDistribution({
  data,
}: SegmentDistributionProps) {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-200">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">
        Service Line Distribution
      </h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
              nameKey="name"
              label={({ name, value }) =>
                `${name} (${total > 0 ? Math.round((value / total) * 100) : 0}%)`
              }
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [value as number, "Contacts"]}
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "0.5rem",
                fontSize: "0.875rem",
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: "0.75rem", paddingTop: "0.5rem" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
