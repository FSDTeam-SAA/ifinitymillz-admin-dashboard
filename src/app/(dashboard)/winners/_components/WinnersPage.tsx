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
import { ChevronLeft, ChevronRight } from "lucide-react";

type ResultType = "Publish" | "Published";

interface Winner {
  id: number;
  image: string;
  prizeTitle: string;
  winningTicket: string;
  winnerName: string;
  drawDate: string;
  totalTicket: number;
  ticketPrice: string;
  endDate: string;
  result: ResultType;
}

const allWinners: Winner[] = [
  { id: 1,  image: "", prizeTitle: "Royal Oak Heritage", winningTicket: "TK-1001", winnerName: "John Martinez",   drawDate: "12/02/2026", totalTicket: 100, ticketPrice: "$40", endDate: "12/02/2026", result: "Publish"   },
  { id: 2,  image: "", prizeTitle: "Royal Oak Heritage", winningTicket: "TK-1001", winnerName: "John Martinez",   drawDate: "12/02/2026", totalTicket: 100, ticketPrice: "$40", endDate: "12/02/2026", result: "Publish"   },
  { id: 3,  image: "", prizeTitle: "Royal Oak Heritage", winningTicket: "TK-1001", winnerName: "John Martinez",   drawDate: "12/02/2026", totalTicket: 100, ticketPrice: "$40", endDate: "12/02/2026", result: "Published" },
  { id: 4,  image: "", prizeTitle: "Royal Oak Heritage", winningTicket: "TK-1001", winnerName: "John Martinez",   drawDate: "12/02/2026", totalTicket: 100, ticketPrice: "$40", endDate: "12/02/2026", result: "Publish"   },
  { id: 5,  image: "", prizeTitle: "Royal Oak Heritage", winningTicket: "TK-1001", winnerName: "John Martinez",   drawDate: "12/02/2026", totalTicket: 100, ticketPrice: "$40", endDate: "12/02/2026", result: "Published" },
  { id: 6,  image: "", prizeTitle: "Royal Oak Heritage", winningTicket: "TK-1001", winnerName: "John Martinez",   drawDate: "12/02/2026", totalTicket: 100, ticketPrice: "$40", endDate: "12/02/2026", result: "Publish"   },
  { id: 7,  image: "", prizeTitle: "Royal Oak Heritage", winningTicket: "TK-1001", winnerName: "John Martinez",   drawDate: "12/02/2026", totalTicket: 100, ticketPrice: "$40", endDate: "12/02/2026", result: "Publish"   },
  { id: 8,  image: "", prizeTitle: "Submariner Edition",  winningTicket: "TK-2045", winnerName: "Sarah Johnson",  drawDate: "11/15/2026", totalTicket: 200, ticketPrice: "$60", endDate: "11/30/2026", result: "Published" },
  { id: 9,  image: "", prizeTitle: "Submariner Edition",  winningTicket: "TK-2045", winnerName: "Sarah Johnson",  drawDate: "11/15/2026", totalTicket: 200, ticketPrice: "$60", endDate: "11/30/2026", result: "Publish"   },
  { id: 10, image: "", prizeTitle: "Daytona Chronograph", winningTicket: "TK-3012", winnerName: "Emily Davis",    drawDate: "10/01/2026", totalTicket: 50,  ticketPrice: "$80", endDate: "10/20/2026", result: "Published" },
  { id: 11, image: "", prizeTitle: "Daytona Chronograph", winningTicket: "TK-3012", winnerName: "Emily Davis",    drawDate: "10/01/2026", totalTicket: 50,  ticketPrice: "$80", endDate: "10/20/2026", result: "Publish"   },
  { id: 12, image: "", prizeTitle: "GMT Master II",        winningTicket: "TK-4088", winnerName: "Chris Wilson",  drawDate: "09/01/2026", totalTicket: 150, ticketPrice: "$50", endDate: "09/30/2026", result: "Published" },
  { id: 13, image: "", prizeTitle: "GMT Master II",        winningTicket: "TK-4088", winnerName: "Chris Wilson",  drawDate: "09/01/2026", totalTicket: 150, ticketPrice: "$50", endDate: "09/30/2026", result: "Publish"   },
  { id: 14, image: "", prizeTitle: "Explorer II",          winningTicket: "TK-5201", winnerName: "Anna Roberts",  drawDate: "08/10/2026", totalTicket: 300, ticketPrice: "$35", endDate: "08/25/2026", result: "Publish"   },
  { id: 15, image: "", prizeTitle: "Explorer II",          winningTicket: "TK-5201", winnerName: "Anna Roberts",  drawDate: "08/10/2026", totalTicket: 300, ticketPrice: "$35", endDate: "08/25/2026", result: "Published" },
  { id: 16, image: "", prizeTitle: "Milgauss Edition",     winningTicket: "TK-6330", winnerName: "James Lee",     drawDate: "07/05/2026", totalTicket: 120, ticketPrice: "$45", endDate: "07/20/2026", result: "Publish"   },
  { id: 17, image: "", prizeTitle: "Milgauss Edition",     winningTicket: "TK-6330", winnerName: "James Lee",     drawDate: "07/05/2026", totalTicket: 120, ticketPrice: "$45", endDate: "07/20/2026", result: "Published" },
  { id: 18, image: "", prizeTitle: "Sea-Dweller Pro",      winningTicket: "TK-7410", winnerName: "Olivia Brown",  drawDate: "06/01/2026", totalTicket: 80,  ticketPrice: "$70", endDate: "06/15/2026", result: "Publish"   },
  { id: 19, image: "", prizeTitle: "Sea-Dweller Pro",      winningTicket: "TK-7410", winnerName: "Olivia Brown",  drawDate: "06/01/2026", totalTicket: 80,  ticketPrice: "$70", endDate: "06/15/2026", result: "Published" },
  { id: 20, image: "", prizeTitle: "Cellini Moonphase",    winningTicket: "TK-8822", winnerName: "Lucas Martin",  drawDate: "05/01/2026", totalTicket: 60,  ticketPrice: "$90", endDate: "05/20/2026", result: "Publish"   },
  { id: 21, image: "", prizeTitle: "Cellini Moonphase",    winningTicket: "TK-8822", winnerName: "Lucas Martin",  drawDate: "05/01/2026", totalTicket: 60,  ticketPrice: "$90", endDate: "05/20/2026", result: "Published" },
];

const PAGE_SIZE = 7;

function PrizeThumbnail() {
  return (
    <div
      className="w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center"
      style={{
        background: "linear-gradient(135deg, #3a3020 0%, #1a1400 100%)",
        border: "1px solid #3a3020",
      }}
    >
      <span className="text-[#c9a84c] text-sm">⌚</span>
    </div>
  );
}

function ResultButton({ result }: { result: ResultType }) {
  if (result === "Published") {
    return (
      <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold bg-[#1a3a2a] text-[#3dba6f] border border-[#2a5a3a] cursor-default">
        Published
      </span>
    );
  }
  return (
    <button className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold bg-[#3dba6f] hover:bg-[#34a561] text-white transition-colors">
      Publish
    </button>
  );
}

function WinnersPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(allWinners.length / PAGE_SIZE);
  const paginated = allWinners.slice(
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
      {/* Title */}
      <h1 className="text-white text-[24px] font-bold mb-8 leading-[120%]">
        Winners / Draw Results
      </h1>

      {/* Table */}
      <div className="rounded-xl overflow-hidden border border-[#2a2a2a]">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#e8b84b] hover:bg-[#e8b84b] border-0">
              {[
                "Prize Title",
                "Winning Ticket Number",
                "Winner Name",
                "Draw Date",
                "Total Ticket",
                "Ticket Price",
                "End Date",
                "Result",
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

          <TableBody>
            {paginated.map((winner, index) => (
              <TableRow
                key={winner.id}
                className={`border-b border-[#222222] hover:bg-[#1e1e1e] transition-colors ${
                  index % 2 === 0 ? "bg-[#161616]" : "bg-[#131313]"
                }`}
              >
                {/* Prize Title */}
                <TableCell className="py-4 text-center">
                  <div className="flex items-center gap-3 justify-center">
                    <PrizeThumbnail />
                    <span className="text-[#C9C9C9] text-base font-medium whitespace-nowrap">
                      {winner.prizeTitle}
                    </span>
                  </div>
                </TableCell>

                {/* Winning Ticket Number */}
                <TableCell className="text-[#aaaaaa] text-base text-center py-4 whitespace-nowrap">
                  {winner.winningTicket}
                </TableCell>

                {/* Winner Name */}
                <TableCell className="text-[#aaaaaa] text-base text-center py-4 whitespace-nowrap">
                  {winner.winnerName}
                </TableCell>

                {/* Draw Date */}
                <TableCell className="text-[#aaaaaa] text-base text-center py-4 whitespace-nowrap">
                  {winner.drawDate}
                </TableCell>

                {/* Total Ticket */}
                <TableCell className="text-[#aaaaaa] text-base text-center py-4">
                  {winner.totalTicket}
                </TableCell>

                {/* Ticket Price */}
                <TableCell className="text-[#aaaaaa] text-base text-center py-4">
                  {winner.ticketPrice}
                </TableCell>

                {/* End Date */}
                <TableCell className="text-[#aaaaaa] text-base text-center py-4 whitespace-nowrap">
                  {winner.endDate}
                </TableCell>

                {/* Result */}
                <TableCell className="text-center py-4">
                  <div className="flex justify-center">
                    <ResultButton result={winner.result} />
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
  );
}

export default WinnersPage;