/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type FilterType = "Day" | "Week" | "Month" | "Year";

const formatYAxis = (value: number) => {
  if (value === 0) return "0";
  if (value >= 1000) return `${value / 1000}k`;
  return `${value}`;
};

const CustomDot = (props: any) => {
  const { cx, cy, stroke } = props;
  return (
    <circle
      cx={cx}
      cy={cy}
      r={5}
      fill="white"
      stroke={stroke}
      strokeWidth={2}
    />
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-sm">
        <p className="font-semibold text-gray-700 mb-1">{label}</p>
        {payload.map((entry: any) => (
          <div key={entry.name} className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-gray-500">{entry.name}:</span>
            <span className="font-medium text-gray-800">
              {entry.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

function SellReport() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("Year");
  const filters: FilterType[] = ["Day", "Week", "Month", "Year"];

  const currentYear = new Date().getFullYear();

  const session = useSession();
  const TOKEN = session?.data?.user?.accessToken;
  

  const { data: sellReportData } = useQuery({
    queryKey: ["sellReport", activeFilter, currentYear],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/dashboard/sales-report?range=${activeFilter.toLowerCase()}&year=${currentYear}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch sell report");
      }

      const result = await res.json();
      return result?.data;
    },
  });

  // 🔥 Convert API response to recharts format
  const chartData =
    sellReportData?.labels?.map((label: string, index: number) => ({
      date: label,
      thisMonth: sellReportData?.thisPeriod?.[index] ?? 0,
      lastMonth: sellReportData?.lastPeriod?.[index] ?? 0,
    })) || [];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm w-full my-10">
      {/* Header Row */}
      <div className="flex items-start justify-between mb-4">
        <h2 className="text-base font-bold text-gray-800">Sell Report</h2>

        {/* Filter Buttons */}
        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                activeFilter === filter
                  ? "bg-green-600 text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 mb-6 ml-1">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-green-600 inline-block" />
          <span className="text-sm text-gray-500">This Month</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-sky-400 inline-block" />
          <span className="text-sm text-gray-500">Last Month</span>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={chartData}
          margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
        >
          <CartesianGrid
            stroke="#f0f0f0"
            vertical={false}
          />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#9ca3af" }}
            dy={10}
          />
          <YAxis
            tickFormatter={formatYAxis}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#9ca3af" }}
            dx={-5}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="linear"
            dataKey="thisMonth"
            name="This Month"
            stroke="#16a34a"
            strokeWidth={2}
            dot={<CustomDot />}
            activeDot={{ r: 6, fill: "white", stroke: "#16a34a", strokeWidth: 2 }}
          />
          <Line
            type="linear"
            dataKey="lastMonth"
            name="Last Month"
            stroke="#7dd3fc"
            strokeWidth={2}
            dot={<CustomDot />}
            activeDot={{ r: 6, fill: "white", stroke: "#7dd3fc", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SellReport;