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
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Trash2,
} from "lucide-react";
import ViewParticipantsModal from "@/components/Dialogs/ViewParticipantsModal";

type EntryType = "Free" | "Paid";

interface Participant {
  id: number;
  name: string;
  email: string;
  campaignName: string;
  tickets: number;
  entryType: EntryType;
  amount: string;
  date: string;
}

const allParticipants: Participant[] = [
  { id: 1,  name: "John Martinez",   email: "john.m@email.com",   campaignName: "Campaign Name", tickets: 15, entryType: "Free", amount: "x",   date: "12/02/2024" },
  { id: 2,  name: "Sarah Johnson",   email: "sarah.j@email.com",  campaignName: "Campaign Name", tickets: 15, entryType: "Paid", amount: "$40", date: "12/02/2024" },
  { id: 3,  name: "Mike Thompson",   email: "mike.t@email.com",   campaignName: "Campaign Name", tickets: 15, entryType: "Free", amount: "x",   date: "12/02/2024" },
  { id: 4,  name: "Emily Davis",     email: "emily.d@email.com",  campaignName: "Campaign Name", tickets: 15, entryType: "Paid", amount: "$40", date: "12/02/2024" },
  { id: 5,  name: "Chris Wilson",    email: "chris.w@email.com",  campaignName: "Campaign Name", tickets: 15, entryType: "Free", amount: "x",   date: "12/02/2024" },
  { id: 6,  name: "Anna Roberts",    email: "anna.r@email.com",   campaignName: "Campaign Name", tickets: 15, entryType: "Paid", amount: "$40", date: "12/02/2024" },
  { id: 7,  name: "James Lee",       email: "james.l@email.com",  campaignName: "Campaign Name", tickets: 15, entryType: "Free", amount: "x",   date: "12/02/2024" },
  { id: 8,  name: "Olivia Brown",    email: "olivia.b@email.com", campaignName: "Campaign Name", tickets: 15, entryType: "Paid", amount: "$40", date: "12/02/2024" },
  { id: 9,  name: "Lucas Martin",    email: "lucas.m@email.com",  campaignName: "Campaign Name", tickets: 15, entryType: "Free", amount: "x",   date: "12/02/2024" },
  { id: 10, name: "Sophia White",    email: "sophia.w@email.com", campaignName: "Campaign Name", tickets: 15, entryType: "Paid", amount: "$40", date: "12/02/2024" },
  { id: 11, name: "Ethan Clark",     email: "ethan.c@email.com",  campaignName: "Campaign Name", tickets: 15, entryType: "Free", amount: "x",   date: "12/02/2024" },
  { id: 12, name: "Mia Lewis",       email: "mia.l@email.com",    campaignName: "Campaign Name", tickets: 15, entryType: "Paid", amount: "$40", date: "12/02/2024" },
  { id: 13, name: "Noah Hall",       email: "noah.h@email.com",   campaignName: "Campaign Name", tickets: 15, entryType: "Free", amount: "x",   date: "12/02/2024" },
  { id: 14, name: "Isabella Young",  email: "bella.y@email.com",  campaignName: "Campaign Name", tickets: 15, entryType: "Paid", amount: "$40", date: "12/02/2024" },
  { id: 15, name: "Liam King",       email: "liam.k@email.com",   campaignName: "Campaign Name", tickets: 15, entryType: "Free", amount: "x",   date: "12/02/2024" },
  { id: 16, name: "Ava Scott",       email: "ava.s@email.com",    campaignName: "Campaign Name", tickets: 15, entryType: "Paid", amount: "$40", date: "12/02/2024" },
  { id: 17, name: "Mason Adams",     email: "mason.a@email.com",  campaignName: "Campaign Name", tickets: 15, entryType: "Free", amount: "x",   date: "12/02/2024" },
  { id: 18, name: "Charlotte Baker", email: "char.b@email.com",   campaignName: "Campaign Name", tickets: 15, entryType: "Paid", amount: "$40", date: "12/02/2024" },
  { id: 19, name: "Logan Nelson",    email: "logan.n@email.com",  campaignName: "Campaign Name", tickets: 15, entryType: "Free", amount: "x",   date: "12/02/2024" },
  { id: 20, name: "Amelia Carter",   email: "amelia.c@email.com", campaignName: "Campaign Name", tickets: 15, entryType: "Paid", amount: "$40", date: "12/02/2024" },
  { id: 21, name: "Benjamin Hill",   email: "ben.h@email.com",    campaignName: "Campaign Name", tickets: 15, entryType: "Free", amount: "x",   date: "12/02/2024" },
];

const PAGE_SIZE = 7;

function EntryBadge({ type }: { type: EntryType }) {
  if (type === "Free") {
    return (
      <Badge className="bg-[#1a3a2a] hover:bg-[#1a3a2a] text-[#3dba6f] text-xs font-semibold px-3 py-1 rounded-full border border-[#2a5a3a] cursor-default">
        Free
      </Badge>
    );
  }
  return (
    <Badge className="bg-[#3a2a10] hover:bg-[#3a2a10] text-[#c9a84c] text-xs font-semibold px-3 py-1 rounded-full border border-[#5a4a20] cursor-default">
      Paid
    </Badge>
  );
}

function ParticipantsPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(allParticipants.length / PAGE_SIZE);
  const paginated = allParticipants.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const getPageNumbers = () => {
    const pages: number[] = [];
    for (let i = 1; i <= Math.min(totalPages, 3); i++) pages.push(i);
    return pages;
  };

  return (
    <div className="min-h-screen">
      <div className="">
        {/* Title */}
        <h1 className="text-white text-[24px] font-bold mb-10 leading-[120%]">
          Participants / Entries
        </h1>

        {/* Table Container */}
        <div className="rounded-xl overflow-hidden border border-[#2a2a2a]">
          <Table>
            {/* Header */}
            <TableHeader>
              <TableRow className="bg-[#e8b84b] hover:bg-[#e8b84b] border-0">
                {["User Name", "Email", "Campaign Name", "Tickets", "Entry Type", "Amount", "Date", "Actions"].map(
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

            {/* Body */}
            <TableBody>
              {paginated.map((p, index) => (
                <TableRow
                  key={p.id}
                  className={`border-b border-[#222222] hover:bg-[#1e1e1e] transition-colors ${
                    index % 2 === 0 ? "bg-[#161616]" : "bg-[#131313]"
                  }`}
                >
                  {/* User Name */}
                  <TableCell className="text-[#C9C9C9] text-base font-medium text-center py-5 leading-[120%] whitespace-nowrap">
                    {p.name}
                  </TableCell>

                  {/* Email */}
                  <TableCell className="text-[#aaaaaa] text-base text-center py-5 leading-[120%] whitespace-nowrap">
                    {p.email}
                  </TableCell>

                  {/* Campaign Name */}
                  <TableCell className="text-[#aaaaaa] text-base text-center py-5 leading-[120%] whitespace-nowrap">
                    {p.campaignName}
                  </TableCell>

                  {/* Tickets */}
                  <TableCell className="text-center py-5">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-[#aaaaaa] text-base leading-[120%]">
                        {p.tickets} Tickets
                      </span>
                      <Eye size={16} className="text-[#c9a84c] cursor-pointer hover:text-[#e8b84b] transition-colors" />
                    </div>
                  </TableCell>

                  {/* Entry Type */}
                  <TableCell className="text-center py-5">
                    <div className="flex justify-center">
                      <EntryBadge type={p.entryType} />
                    </div>
                  </TableCell>

                  {/* Amount */}
                  <TableCell className="text-[#aaaaaa] text-base text-center py-5 leading-[120%]">
                    {p.amount}
                  </TableCell>

                  {/* Date */}
                  <TableCell className="text-[#aaaaaa] text-base text-center py-5 leading-[120%] whitespace-nowrap">
                    {p.date}
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="text-center py-5">
                    <div className="flex items-center justify-center gap-2">
                      {/* View */}
                      {/* <button
                        className="w-8 h-8 rounded-md bg-[#1a3a2a] border border-[#2a5a3a] flex items-center justify-center hover:bg-[#224d38] transition-colors group"
                        title="View"
                      >
                        <Eye size={15} className="text-[#3dba6f] group-hover:text-[#4fd080]" />
                      </button> */}
                      <ViewParticipantsModal />

                      {/* Delete */}
                      <button
                        className="w-8 h-8 rounded-md bg-[#3a1a1a] border border-[#5a2a2a] flex items-center justify-center hover:bg-[#4d2222] transition-colors group"
                        title="Delete"
                      >
                        <Trash2 size={15} className="text-[#e05555] group-hover:text-[#f06666]" />
                      </button>
                    </div>
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
    </div>
  );
}

export default ParticipantsPage;