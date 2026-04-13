/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
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

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

interface CustomTooltipProps {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
  year?: number;
}

const CustomTooltip = ({ active, payload, label, year }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1c1c1c] border border-[#2e2e2e] rounded-lg px-4 py-3 shadow-xl">
        <p className="text-[#9a9a9a] text-xs mb-1">{label} {year}</p>
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
}

const CustomActiveDot = ({ cx, cy }: CustomDotProps) => (
  <g>
    <circle cx={cx} cy={cy} r={6} fill="#1c1c1c" stroke="#4ade80" strokeWidth={2} />
    <circle cx={cx} cy={cy} r={3} fill="#4ade80" />
  </g>
);

interface RevenueApiResponse {
  status: boolean;
  message: string;
  data: {
    year: number;
    revenue: Record<string, number>;
  };
}

function RevenueOverviewChart() {
  const [activeMonth, setActiveMonth] = useState<string | null>("Jun");
  const session = useSession();
  const TOKEN = session?.data?.user?.accessToken;

  const { data: revenueApiData, isLoading } = useQuery<RevenueApiResponse>({
    queryKey: ["revenue"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/admin/revenue`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch revenue");
      return res.json();
    },
  });

  const chartData = MONTHS.map((month) => ({
    month,
    revenue: revenueApiData?.data?.revenue?.[month] ?? 0,
  }));

  const year = revenueApiData?.data?.year;

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

      {/* Loading state */}
      {isLoading ? (
        <div className="w-full h-80 flex items-center justify-center">
          <p className="text-[#555555] text-sm">Loading...</p>
        </div>
      ) : (
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
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

              <CartesianGrid vertical={false} stroke="#222222" strokeDasharray="0" />

              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#555555", fontSize: 12, fontFamily: "inherit" }}
                dy={10}
              />

              <YAxis
                hide={true}
                domain={[
                  0,
                  (dataMax: number) => (dataMax === 0 ? 100 : dataMax * 1.3),
                ]}
              />

              <Tooltip
                content={<CustomTooltip year={year} />}
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
                activeDot={<CustomActiveDot />}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default RevenueOverviewChart;