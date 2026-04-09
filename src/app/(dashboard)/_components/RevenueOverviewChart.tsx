"use client";

import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", revenue: 8200 },
  { month: "Feb", revenue: 14500 },
  { month: "Mar", revenue: 12800 },
  { month: "Apr", revenue: 17600 },
  { month: "May", revenue: 22400 },
  { month: "Jun", revenue: 45591 },
  { month: "Jul", revenue: 38200 },
  { month: "Aug", revenue: 35600 },
  { month: "Sep", revenue: 39800 },
  { month: "Oct", revenue: 47200 },
  { month: "Nov", revenue: 44100 },
  { month: "Dec", revenue: 52800 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1c1c1c] border border-[#2e2e2e] rounded-lg px-4 py-3 shadow-xl">
        <p className="text-[#9a9a9a] text-xs mb-1">{label} 2021</p>
        <p className="text-[#c9a84c] text-lg font-bold leading-none">
          ${payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

interface CustomDotProps {
  cx?: number;
  cy?: number;
  payload?: { month: string };
  activeMonth?: string | null;
}

const CustomActiveDot = ({ cx, cy }: CustomDotProps) => (
  <g>
    <circle cx={cx} cy={cy} r={6} fill="#1c1c1c" stroke="#4ade80" strokeWidth={2} />
    <circle cx={cx} cy={cy} r={3} fill="#4ade80" />
  </g>
);

function RevenueOverviewChart() {
  const [activeMonth, setActiveMonth] = useState<string | null>("Jun");

  return (
    <div className="w-full bg-[#161616] rounded-2xl border border-[#222222] p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-white text-[24px] font-bold mb-6 leading-[120%]">
          Revenue Overview
        </h2>
        <p className="text-[#5a5a5a] text-xs mt-1">
          Track total revenue, platform commission, and payouts over time.
        </p>
      </div>

      {/* Chart */}
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 20, right: 4, left: -20, bottom: 0 }}
            onMouseMove={(e) => {
              if (e.activeLabel) setActiveMonth(String(e.activeLabel));
            }}
            onMouseLeave={() => setActiveMonth("Jun")}
          >
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#c9a84c" stopOpacity={0.55} />
                <stop offset="55%" stopColor="#9a7a2a" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#1a1400" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              stroke="#222222"
              strokeDasharray="0"
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#555555", fontSize: 12, fontFamily: "inherit" }}
              dy={10}
            />

            <YAxis
              hide={true}
              domain={["dataMin - 5000", "dataMax + 5000"]}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: "#c9a84c",
                strokeWidth: 1,
                strokeDasharray: "4 4",
              }}
            />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#c9a84c"
              strokeWidth={2}
              fill="url(#revenueGradient)"
              activeDot={<CustomActiveDot activeMonth={activeMonth} />}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default RevenueOverviewChart;