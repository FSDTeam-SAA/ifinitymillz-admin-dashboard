"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

type StatusType = "Paid" | "Approve" | "Rejected" | "Pending";

interface WithdrawalItem {
  id: number;
  winnerName: string;
  campaignName: string;
  campaignSub: string;
  amount: string;
  bankName: string;
  accNo: string;
  status: StatusType;
  method: string;
}

const STATUS_STYLES: Record<StatusType, { bg: string; text: string; border: string }> = {
  Paid:     { bg: "#1a3a2a", text: "#3dba6f", border: "#2a5a3a" },
  Approve:  { bg: "#1a3a2a", text: "#3dba6f", border: "#2a5a3a" },
  Rejected: { bg: "#3a1a1a", text: "#e05555", border: "#5a2a2a" },
  Pending:  { bg: "#2a2510", text: "#c9a84c", border: "#4a4020" },
};

const ALL_STATUSES: StatusType[] = ["Paid", "Approve", "Rejected", "Pending"];

const initialData: WithdrawalItem[] = [
  { id: 1,  winnerName: "John Martinez", campaignName: "Mayfair Estates Draw", campaignSub: "Grand Tier Entry", amount: "$40", bankName: "Prime Bank", accNo: "64565465", status: "Paid",     method: "Bank" },
  { id: 2,  winnerName: "John Martinez", campaignName: "Mayfair Estates Draw", campaignSub: "Grand Tier Entry", amount: "$40", bankName: "Prime Bank", accNo: "64565465", status: "Approve",  method: "Bank" },
  { id: 3,  winnerName: "John Martinez", campaignName: "Mayfair Estates Draw", campaignSub: "Grand Tier Entry", amount: "$40", bankName: "Prime Bank", accNo: "64565465", status: "Rejected", method: "Bank" },
  { id: 4,  winnerName: "John Martinez", campaignName: "Mayfair Estates Draw", campaignSub: "Grand Tier Entry", amount: "$40", bankName: "Prime Bank", accNo: "64565465", status: "Pending",  method: "Bank" },
  { id: 5,  winnerName: "John Martinez", campaignName: "Mayfair Estates Draw", campaignSub: "Grand Tier Entry", amount: "$40", bankName: "Prime Bank", accNo: "64565465", status: "Paid",     method: "Bank" },
  { id: 6,  winnerName: "John Martinez", campaignName: "Mayfair Estates Draw", campaignSub: "Grand Tier Entry", amount: "$40", bankName: "Prime Bank", accNo: "64565465", status: "Paid",     method: "Bank" },
  { id: 7,  winnerName: "John Martinez", campaignName: "Mayfair Estates Draw", campaignSub: "Grand Tier Entry", amount: "$40", bankName: "Prime Bank", accNo: "64565465", status: "Paid",     method: "Bank" },
  { id: 8,  winnerName: "Sarah Johnson", campaignName: "Royal Oak Heritage",   campaignSub: "Silver Tier Entry", amount: "$60", bankName: "City Bank",  accNo: "78912345", status: "Approve",  method: "Bank" },
  { id: 9,  winnerName: "Sarah Johnson", campaignName: "Royal Oak Heritage",   campaignSub: "Silver Tier Entry", amount: "$60", bankName: "City Bank",  accNo: "78912345", status: "Pending",  method: "Bank" },
  { id: 10, winnerName: "Emily Davis",   campaignName: "Submariner Edition",   campaignSub: "Gold Tier Entry",   amount: "$80", bankName: "Metro Bank", accNo: "55544433", status: "Paid",     method: "Bank" },
  { id: 11, winnerName: "Emily Davis",   campaignName: "Submariner Edition",   campaignSub: "Gold Tier Entry",   amount: "$80", bankName: "Metro Bank", accNo: "55544433", status: "Rejected", method: "Bank" },
  { id: 12, winnerName: "Chris Wilson",  campaignName: "Daytona Chronograph",  campaignSub: "Platinum Entry",    amount: "$50", bankName: "Trust Bank", accNo: "99988877", status: "Approve",  method: "Bank" },
  { id: 13, winnerName: "Chris Wilson",  campaignName: "Daytona Chronograph",  campaignSub: "Platinum Entry",    amount: "$50", bankName: "Trust Bank", accNo: "99988877", status: "Paid",     method: "Bank" },
  { id: 14, winnerName: "Anna Roberts",  campaignName: "GMT Master II",        campaignSub: "Grand Tier Entry",  amount: "$35", bankName: "Prime Bank", accNo: "11122233", status: "Pending",  method: "Bank" },
  { id: 15, winnerName: "Anna Roberts",  campaignName: "GMT Master II",        campaignSub: "Grand Tier Entry",  amount: "$35", bankName: "Prime Bank", accNo: "11122233", status: "Paid",     method: "Bank" },
  { id: 16, winnerName: "James Lee",     campaignName: "Explorer II",          campaignSub: "Silver Tier Entry", amount: "$45", bankName: "City Bank",  accNo: "44455566", status: "Approve",  method: "Bank" },
  { id: 17, winnerName: "James Lee",     campaignName: "Explorer II",          campaignSub: "Silver Tier Entry", amount: "$45", bankName: "City Bank",  accNo: "44455566", status: "Rejected", method: "Bank" },
  { id: 18, winnerName: "Olivia Brown",  campaignName: "Milgauss Edition",     campaignSub: "Bronze Tier Entry", amount: "$70", bankName: "Metro Bank", accNo: "33344455", status: "Paid",     method: "Bank" },
  { id: 19, winnerName: "Olivia Brown",  campaignName: "Milgauss Edition",     campaignSub: "Bronze Tier Entry", amount: "$70", bankName: "Metro Bank", accNo: "33344455", status: "Pending",  method: "Bank" },
  { id: 20, winnerName: "Lucas Martin",  campaignName: "Sea-Dweller Pro",      campaignSub: "Grand Tier Entry",  amount: "$90", bankName: "Trust Bank", accNo: "66677788", status: "Approve",  method: "Bank" },
  { id: 21, winnerName: "Lucas Martin",  campaignName: "Sea-Dweller Pro",      campaignSub: "Grand Tier Entry",  amount: "$90", bankName: "Trust Bank", accNo: "66677788", status: "Paid",     method: "Bank" },
];

const PAGE_SIZE = 7;

function CampaignThumbnail() {
  return (
    <div
      className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center"
      style={{
        background: "linear-gradient(135deg, #c9501a 0%, #8a2a00 100%)",
        border: "1px solid #5a3020",
      }}
    >
      <span className="text-white text-sm">🏆</span>
    </div>
  );
}

function StatusDropdown({
  status,
  onStatusChange,
}: {
  status: StatusType;
  onStatusChange: (s: StatusType) => void;
}) {
  const styles = STATUS_STYLES[status];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors focus:outline-none"
          style={{
            background: styles.bg,
            color: styles.text,
            border: `1px solid ${styles.border}`,
          }}
        >
          {status}
          <ChevronDown size={12} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-xl p-1 shadow-xl min-w-[120px]"
      >
        {ALL_STATUSES.map((s) => {
          const st = STATUS_STYLES[s];
          return (
            <DropdownMenuItem
              key={s}
              onClick={() => onStatusChange(s)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-[#2a2a2a] focus:bg-[#2a2a2a]"
            >
              <span
                className="text-xs font-semibold"
                style={{ color: st.text }}
              >
                {s}
              </span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function WithdrawalRequest() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<WithdrawalItem[]>(initialData);

  const totalPages = Math.ceil(data.length / PAGE_SIZE);
  const paginated = data.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const getPageNumbers = () => {
    const pages: number[] = [];
    for (let i = 1; i <= Math.min(totalPages, 3); i++) pages.push(i);
    return pages;
  };

  const handleStatusChange = (id: number, newStatus: StatusType) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
  };

  return (
    <div className="min-h-screen">
      {/* Title */}
      <h1 className="text-white text-[24px] font-bold mb-8 leading-[120%]">
        Withdrawal Request
      </h1>

      {/* Table */}
      <div className="rounded-xl overflow-hidden border border-[#2a2a2a]">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#e8b84b] hover:bg-[#e8b84b] border-0">
              {["Winner Name", "Campaign Name", "Amount", "Bank Name", "Acc.No.", "Status", "Method"].map(
                (col) => (
                  <TableHead
                    key={col}
                    className="text-[#1F1F1F] text-base text-center py-4 font-medium whitespace-nowrap"
                  >
                    {col}
                  </TableHead>
                )
              )}
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginated.map((item, index) => (
              <TableRow
                key={item.id}
                className={`border-b border-[#222222] hover:bg-[#1e1e1e] transition-colors ${
                  index % 2 === 0 ? "bg-[#161616]" : "bg-[#131313]"
                }`}
              >
                {/* Winner Name */}
                <TableCell className="text-[#C9C9C9] text-base font-medium text-center py-4 whitespace-nowrap">
                  {item.winnerName}
                </TableCell>

                {/* Campaign Name */}
                <TableCell className="py-4 text-center">
                  <div className="flex items-center gap-3 justify-center">
                    <CampaignThumbnail />
                    <div className="flex flex-col items-start">
                      <span className="text-[#C9C9C9] text-sm font-semibold leading-[140%] whitespace-nowrap">
                        {item.campaignName}
                      </span>
                      <span className="text-[#666] text-xs leading-[140%] whitespace-nowrap">
                        {item.campaignSub}
                      </span>
                    </div>
                  </div>
                </TableCell>

                {/* Amount */}
                <TableCell className="text-[#aaaaaa] text-base text-center py-4">
                  {item.amount}
                </TableCell>

                {/* Bank Name */}
                <TableCell className="text-[#aaaaaa] text-base text-center py-4 whitespace-nowrap">
                  {item.bankName}
                </TableCell>

                {/* Acc No */}
                <TableCell className="text-[#aaaaaa] text-base text-center py-4">
                  {item.accNo}
                </TableCell>

                {/* Status Dropdown */}
                <TableCell className="text-center py-4">
                  <div className="flex justify-center">
                    <StatusDropdown
                      status={item.status}
                      onStatusChange={(s) => handleStatusChange(item.id, s)}
                    />
                  </div>
                </TableCell>

                {/* Method */}
                <TableCell className="text-[#aaaaaa] text-base text-center py-4">
                  {item.method}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center gap-1 mt-5">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="w-9 h-9 rounded-md bg-[#1a1a1a] border-[#2e2e2e] text-[#888] hover:bg-[#252525] hover:text-white disabled:opacity-30"
        >
          <ChevronLeft size={14} />
        </Button>

        {getPageNumbers().map((page) => (
          <Button
            key={page}
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(page)}
            className={`w-9 h-9 rounded-md text-sm font-semibold border transition-colors ${
              currentPage === page
                ? "bg-[#e8b84b] border-[#e8b84b] text-[#111111] hover:bg-[#d4a73e]"
                : "bg-[#1a1a1a] border-[#2e2e2e] text-[#888] hover:bg-[#252525] hover:text-white"
            }`}
          >
            {page}
          </Button>
        ))}

        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="w-9 h-9 rounded-md bg-[#1a1a1a] border-[#2e2e2e] text-[#888] hover:bg-[#252525] hover:text-white disabled:opacity-30"
        >
          <ChevronRight size={14} />
        </Button>
      </div>
    </div>
  );
}

export default WithdrawalRequest;