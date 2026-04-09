"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye, X } from "lucide-react";

interface Ticket {
  id: number;
  ticketNumber: string;
  date: string;
}

const dummyTickets: Ticket[] = [
  { id: 1, ticketNumber: "12345678", date: "11/2/2026" },
  { id: 2, ticketNumber: "12345678", date: "11/2/2026" },
  { id: 3, ticketNumber: "12345678", date: "11/2/2026" },
  { id: 4, ticketNumber: "12345678", date: "11/2/2026" },
  { id: 5, ticketNumber: "12345678", date: "11/2/2026" },
  { id: 6, ticketNumber: "12345678", date: "11/2/2026" },
  { id: 7, ticketNumber: "12345678", date: "11/2/2026" },
  { id: 8, ticketNumber: "12345678", date: "11/2/2026" },
  { id: 9, ticketNumber: "12345678", date: "11/2/2026" },
  { id: 10, ticketNumber: "12345678", date: "11/2/2026" },
  { id: 11, ticketNumber: "12345678", date: "11/2/2026" },
  { id: 12, ticketNumber: "12345678", date: "11/2/2026" },
  { id: 13, ticketNumber: "12345678", date: "11/2/2026" },
  { id: 14, ticketNumber: "12345678", date: "11/2/2026" },
  { id: 15, ticketNumber: "87654321", date: "11/3/2026" },
  { id: 16, ticketNumber: "87654321", date: "11/3/2026" },
  { id: 17, ticketNumber: "87654321", date: "11/3/2026" },
  { id: 18, ticketNumber: "87654321", date: "11/3/2026" },
];

function TicketCard({ ticket }: { ticket: Ticket }) {
  return (
    <div className="bg-[#e8b84b] rounded-xl px-4 py-3 flex items-center gap-3">
      {/* Number circle */}
      <div className="w-7 h-7 rounded-full bg-[#c9952a] flex items-center justify-center flex-shrink-0">
        <span className="text-white text-xs font-bold">{ticket.id}</span>
      </div>

      {/* Info */}
      <div className="flex gap-6">
        <div className="flex flex-col">
          <span className="text-[#5a3a00] text-[10px] font-medium leading-none mb-1">
            Ticket Number
          </span>
          <span className="text-[#1a0f00] text-sm font-bold leading-none">
            {ticket.ticketNumber}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-[#5a3a00] text-[10px] font-medium leading-none mb-1">
            Date
          </span>
          <span className="text-[#1a0f00] text-sm font-bold leading-none">
            {ticket.date}
          </span>
        </div>
      </div>
    </div>
  );
}

export function ViewParticipantsModal() {
  const [open, setOpen] = useState(false);

  // Split into left and right columns
  const leftCol = dummyTickets.filter((_, i) => i % 2 === 0);
  const rightCol = dummyTickets.filter((_, i) => i % 2 !== 0);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="w-8 h-8 rounded-md bg-[#1a3a2a] border border-[#2a5a3a] flex items-center justify-center hover:bg-[#224d38] transition-colors group"
          title="View"
        >
          <Eye
            size={15}
            className="text-[#3dba6f] group-hover:text-[#4fd080]"
          />
        </button>
      </DialogTrigger>

      <DialogContent
        className="max-w-[520px] p-0 gap-0 border border-[#2a2a2a] rounded-2xl overflow-hidden bg-[#1c1c1c] shadow-2xl"
        // Hide the default shadcn close button
        style={{ ["--tw-ring-shadow" as string]: "none" }}
      >
        {/* Hide default X from shadcn */}
        <style>{`
          [data-radix-dialog-close] { display: none !important; }
        `}</style>

        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-4 flex flex-row items-center justify-between border-b border-[#2a2a2a]">
          <DialogTitle className="text-white text-lg font-semibold leading-none">
            Ticket Details
          </DialogTitle>
          <button
            onClick={() => setOpen(false)}
            className="text-[#888] hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </DialogHeader>

        {/* Tickets Grid */}
        <div className="px-6 py-5">
          <div className="grid grid-cols-2 gap-3">
            {/* Left Column */}
            <div className="flex flex-col gap-3">
              {leftCol.map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-3">
              {rightCol.map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}
            </div>
          </div>
        </div>

      </DialogContent>
    </Dialog>
  );
}

export default ViewParticipantsModal;
