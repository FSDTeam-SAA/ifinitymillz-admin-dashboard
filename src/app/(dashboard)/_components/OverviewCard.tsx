import React from "react";
import { Users, Megaphone, Trophy, ListChecks, Wallet, ShieldCheck } from "lucide-react";

interface StatCardProps {
  icon: React.ReactNode;
  value: number | string;
  label: string;
}

function StatCard({ icon, value, label }: StatCardProps) {
  return (
    <div className="flex flex-col gap-3 !rounded-[8px] bg-[#181715] border border-[#2a2a2a] p-5 border-[#c9a84c]/40 shadow-[4px_8px_25px_0px_#00000014]">
      {/* Icon */}
      <div className="text-[#c9a84c] w-7 h-7 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>

      {/* Value */}
      <span className="text-white text-3xl font-bold leading-none tracking-tight">
        {value}
      </span>

      {/* Label */}
      <span className="text-[#E5E2E1] text-[24px] font-normal">{label}</span>
    </div>
  );
}

const stats: StatCardProps[] = [
  {
    icon: <Users size={28} strokeWidth={1.5} />,
    value: 520,
    label: "Total Users",
  },
  {
    icon: <Megaphone size={28} strokeWidth={1.5} />,
    value: 5,
    label: "Campaigns",
  },
  {
    icon: <Trophy size={28} strokeWidth={1.5} />,
    value: 5,
    label: "Total Winners",
  },
  {
    icon: <ListChecks size={28} strokeWidth={1.5} />,
    value: 5,
    label: "Total Entries",
  },
  {
    icon: <Wallet size={28} strokeWidth={1.5} />,
    value: 3,
    label: "Withdrawals",
  },
  {
    icon: <ShieldCheck size={28} strokeWidth={1.5} />,
    value: 4,
    label: "Verifications",
  },
];

function OverviewCard() {
  return (
    <div className="">
      <div className="">
        {/* Header */}
        <h2 className="text-white text-[24px] font-bold mb-6 leading-[120%]">
          Dashboard Overview
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default OverviewCard;