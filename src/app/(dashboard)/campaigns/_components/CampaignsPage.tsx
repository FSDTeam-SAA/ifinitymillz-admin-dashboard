/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { ChevronLeft, ChevronRight, Eye, Pencil, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CampaignDetailsModal from "@/components/Dialogs/CampaignsModal";

type StatusType = "Active" | "Closed";

interface Campaign {
  id: number;
  image: string;
  prizeTitle: string;
  ticketPrice: string;
  totalTickets: number;
  startDate: string;
  endDate: string;
  drawDate: string;
  status: StatusType;
}

const allCampaigns: Campaign[] = [
  {
    id: 1,
    image: "/placeholder-watch.png",
    prizeTitle: "Royal Oak Heritage",
    ticketPrice: "$40",
    totalTickets: 100,
    startDate: "12/02/2026",
    endDate: "12/02/2026",
    drawDate: "12/02/2026",
    status: "Active",
  },
  {
    id: 2,
    image: "/placeholder-watch.png",
    prizeTitle: "Royal Oak Heritage",
    ticketPrice: "$40",
    totalTickets: 100,
    startDate: "12/02/2026",
    endDate: "12/02/2026",
    drawDate: "12/02/2026",
    status: "Closed",
  },
  {
    id: 3,
    image: "/placeholder-watch.png",
    prizeTitle: "Royal Oak Heritage",
    ticketPrice: "$40",
    totalTickets: 100,
    startDate: "12/02/2026",
    endDate: "12/02/2026",
    drawDate: "12/02/2026",
    status: "Active",
  },
  {
    id: 4,
    image: "/placeholder-watch.png",
    prizeTitle: "Royal Oak Heritage",
    ticketPrice: "$40",
    totalTickets: 100,
    startDate: "12/02/2026",
    endDate: "12/02/2026",
    drawDate: "12/02/2026",
    status: "Active",
  },
  {
    id: 5,
    image: "/placeholder-watch.png",
    prizeTitle: "Royal Oak Heritage",
    ticketPrice: "$40",
    totalTickets: 100,
    startDate: "12/02/2026",
    endDate: "12/02/2026",
    drawDate: "12/02/2026",
    status: "Closed",
  },
  {
    id: 6,
    image: "/placeholder-watch.png",
    prizeTitle: "Royal Oak Heritage",
    ticketPrice: "$40",
    totalTickets: 100,
    startDate: "12/02/2026",
    endDate: "12/02/2026",
    drawDate: "12/02/2026",
    status: "Closed",
  },
  {
    id: 7,
    image: "/placeholder-watch.png",
    prizeTitle: "Royal Oak Heritage",
    ticketPrice: "$40",
    totalTickets: 100,
    startDate: "12/02/2026",
    endDate: "12/02/2026",
    drawDate: "12/02/2026",
    status: "Closed",
  },
  {
    id: 8,
    image: "/placeholder-watch.png",
    prizeTitle: "Submariner Edition",
    ticketPrice: "$60",
    totalTickets: 200,
    startDate: "11/15/2026",
    endDate: "11/30/2026",
    drawDate: "12/01/2026",
    status: "Active",
  },
  {
    id: 9,
    image: "/placeholder-watch.png",
    prizeTitle: "Submariner Edition",
    ticketPrice: "$60",
    totalTickets: 200,
    startDate: "11/15/2026",
    endDate: "11/30/2026",
    drawDate: "12/01/2026",
    status: "Closed",
  },
  {
    id: 10,
    image: "/placeholder-watch.png",
    prizeTitle: "Daytona Chronograph",
    ticketPrice: "$80",
    totalTickets: 50,
    startDate: "10/01/2026",
    endDate: "10/20/2026",
    drawDate: "10/25/2026",
    status: "Active",
  },
  {
    id: 11,
    image: "/placeholder-watch.png",
    prizeTitle: "Daytona Chronograph",
    ticketPrice: "$80",
    totalTickets: 50,
    startDate: "10/01/2026",
    endDate: "10/20/2026",
    drawDate: "10/25/2026",
    status: "Closed",
  },
  {
    id: 12,
    image: "/placeholder-watch.png",
    prizeTitle: "GMT Master II",
    ticketPrice: "$50",
    totalTickets: 150,
    startDate: "09/01/2026",
    endDate: "09/30/2026",
    drawDate: "10/05/2026",
    status: "Active",
  },
  {
    id: 13,
    image: "/placeholder-watch.png",
    prizeTitle: "GMT Master II",
    ticketPrice: "$50",
    totalTickets: 150,
    startDate: "09/01/2026",
    endDate: "09/30/2026",
    drawDate: "10/05/2026",
    status: "Closed",
  },
  {
    id: 14,
    image: "/placeholder-watch.png",
    prizeTitle: "Explorer II",
    ticketPrice: "$35",
    totalTickets: 300,
    startDate: "08/10/2026",
    endDate: "08/25/2026",
    drawDate: "09/01/2026",
    status: "Active",
  },
  {
    id: 15,
    image: "/placeholder-watch.png",
    prizeTitle: "Explorer II",
    ticketPrice: "$35",
    totalTickets: 300,
    startDate: "08/10/2026",
    endDate: "08/25/2026",
    drawDate: "09/01/2026",
    status: "Closed",
  },
  {
    id: 16,
    image: "/placeholder-watch.png",
    prizeTitle: "Milgauss Edition",
    ticketPrice: "$45",
    totalTickets: 120,
    startDate: "07/05/2026",
    endDate: "07/20/2026",
    drawDate: "07/25/2026",
    status: "Active",
  },
  {
    id: 17,
    image: "/placeholder-watch.png",
    prizeTitle: "Milgauss Edition",
    ticketPrice: "$45",
    totalTickets: 120,
    startDate: "07/05/2026",
    endDate: "07/20/2026",
    drawDate: "07/25/2026",
    status: "Closed",
  },
  {
    id: 18,
    image: "/placeholder-watch.png",
    prizeTitle: "Sea-Dweller Pro",
    ticketPrice: "$70",
    totalTickets: 80,
    startDate: "06/01/2026",
    endDate: "06/15/2026",
    drawDate: "06/20/2026",
    status: "Active",
  },
  {
    id: 19,
    image: "/placeholder-watch.png",
    prizeTitle: "Sea-Dweller Pro",
    ticketPrice: "$70",
    totalTickets: 80,
    startDate: "06/01/2026",
    endDate: "06/15/2026",
    drawDate: "06/20/2026",
    status: "Closed",
  },
  {
    id: 20,
    image: "/placeholder-watch.png",
    prizeTitle: "Cellini Moonphase",
    ticketPrice: "$90",
    totalTickets: 60,
    startDate: "05/01/2026",
    endDate: "05/20/2026",
    drawDate: "05/25/2026",
    status: "Active",
  },
  {
    id: 21,
    image: "/placeholder-watch.png",
    prizeTitle: "Cellini Moonphase",
    ticketPrice: "$90",
    totalTickets: 60,
    startDate: "05/01/2026",
    endDate: "05/20/2026",
    drawDate: "05/25/2026",
    status: "Closed",
  },
];

const PAGE_SIZE = 7;

// Fallback image component using div when next/image isn't available
function PrizeImage({ alt }: { alt: string }) {
  return (
    <div className="w-9 h-9 rounded-lg bg-[#2a2a2a] border border-[#3a3a3a] flex items-center justify-center overflow-hidden flex-shrink-0">
      <div className="w-full h-full bg-gradient-to-br from-[#3a3020] to-[#1a1a1a] flex items-center justify-center">
        <span className="text-[#c9a84c] text-[10px] font-bold">⌚</span>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: StatusType }) {
  if (status === "Active") {
    return (
      <Badge className="bg-[#1a3a2a] hover:bg-[#1a3a2a] text-[#3dba6f] text-xs font-semibold px-3 py-1 rounded-full border border-[#2a5a3a] cursor-default">
        Active
      </Badge>
    );
  }
  return (
    <Badge className="bg-[#2a2a2a] hover:bg-[#2a2a2a] text-[#888888] text-xs font-semibold px-3 py-1 rounded-full border border-[#3a3a3a] cursor-default">
      Closed
    </Badge>
  );
}

function CampaignsPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(allCampaigns.length / PAGE_SIZE);
  const paginated = allCampaigns.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const getPageNumbers = () => {
    const pages: number[] = [];
    for (let i = 1; i <= Math.min(totalPages, 3); i++) pages.push(i);
    return pages;
  };

  return (
    <div className="min-h-screen">
      <div className="">
        {/* Title Row */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-white text-[24px] font-bold leading-[120%]">
            Campaigns
          </h1>
          <button className="flex items-center gap-2 bg-[#e8b84b] hover:bg-[#d4a73e] text-[#111111] font-semibold text-sm px-5 py-2.5 rounded-full transition-colors">
            <Plus size={16} strokeWidth={2.5} />
            Add Campaign
          </button>
        </div>

        {/* Table Container */}
        <div className="rounded-xl overflow-hidden border border-[#2a2a2a]">
          <Table>
            {/* Header */}
            <TableHeader>
              <TableRow className="bg-[#e8b84b] hover:bg-[#e8b84b] border-0">
                {[
                  "Prize Title",
                  "Ticket Price",
                  "Total Tickets",
                  "Start Date",
                  "End Date",
                  "Draw Date",
                  "Status",
                  "Actions",
                  "Winner",
                ].map((col) => (
                  <TableHead
                    key={col}
                    className="text-[#1F1F1F] text-base text-center py-4 font-medium whitespace-nowrap"
                  >
                    {col}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            {/* Body */}
            <TableBody>
              {paginated.map((campaign, index) => (
                <TableRow
                  key={campaign.id}
                  className={`border-b border-[#222222] hover:bg-[#1e1e1e] transition-colors ${
                    index % 2 === 0 ? "bg-[#161616]" : "bg-[#131313]"
                  }`}
                >
                  {/* Prize Title */}
                  <TableCell className="py-4 text-center">
                    <div className="flex items-center gap-3 justify-center">
                      <PrizeImage alt={campaign.prizeTitle} />
                      <span className="text-[#C9C9C9] text-base font-medium whitespace-nowrap">
                        {campaign.prizeTitle}
                      </span>
                    </div>
                  </TableCell>

                  {/* Ticket Price */}
                  <TableCell className="text-[#aaaaaa] text-base text-center py-4 whitespace-nowrap">
                    {campaign.ticketPrice}
                  </TableCell>

                  {/* Total Tickets */}
                  <TableCell className="text-[#aaaaaa] text-base text-center py-4">
                    {campaign.totalTickets}
                  </TableCell>

                  {/* Start Date */}
                  <TableCell className="text-[#aaaaaa] text-base text-center py-4 whitespace-nowrap">
                    {campaign.startDate}
                  </TableCell>

                  {/* End Date */}
                  <TableCell className="text-[#aaaaaa] text-base text-center py-4 whitespace-nowrap">
                    {campaign.endDate}
                  </TableCell>

                  {/* Draw Date */}
                  <TableCell className="text-[#aaaaaa] text-base text-center py-4 whitespace-nowrap">
                    {campaign.drawDate}
                  </TableCell>

                  {/* Status */}
                  <TableCell className="text-center py-4">
                    <div className="flex justify-center">
                      <StatusBadge status={campaign.status} />
                    </div>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="text-center py-4">
                    <div className="flex items-center justify-center gap-2">
                      {/* View */}
                      {/* <button
                        className="w-8 h-8 rounded-md bg-[#2a2010] border border-[#4a3a20] flex items-center justify-center hover:bg-[#3a2a10] transition-colors group"
                        title="View"
                      >
                        <Eye
                          size={15}
                          className="text-[#c9a84c] group-hover:text-[#e8b84b]"
                        />
                      </button> */}
                      <CampaignDetailsModal />

                      {/* Edit */}
                      <button
                        className="w-8 h-8 rounded-md bg-[#2a2010] border border-[#4a3a20] flex items-center justify-center hover:bg-[#3a2a10] transition-colors group"
                        title="Edit"
                      >
                        <Pencil
                          size={14}
                          className="text-[#c9a84c] group-hover:text-[#e8b84b]"
                        />
                      </button>
                    </div>
                  </TableCell>

                  {/* Winner */}
                  <TableCell className="text-center py-4">
                    <Link href="/campaigns/genarate">
                      <button className="bg-[#3dba6f] hover:bg-[#34a561] text-white text-xs font-semibold px-4 py-1.5 rounded-full transition-colors whitespace-nowrap">
                        Generate
                      </button>
                    </Link>
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

export default CampaignsPage;
