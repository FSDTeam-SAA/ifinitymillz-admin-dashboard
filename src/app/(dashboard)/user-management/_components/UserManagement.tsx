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
import { ChevronLeft, ChevronRight, Ban } from "lucide-react";

type ActionType = "accept-reject" | "suspended";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  date: string;
  action: ActionType;
}

const allUsers: User[] = [
  { id: 1,  name: "John Martinez", email: "john.m@email.com", phone: "1212585474", date: "Oct 12, 2023", action: "accept-reject" },
  { id: 2,  name: "Sarah Johnson",  email: "sarah.j@email.com", phone: "1212585474", date: "Oct 12, 2023", action: "accept-reject" },
  { id: 3,  name: "Mike Thompson",  email: "mike.t@email.com",  phone: "1212585474", date: "Oct 12, 2023", action: "suspended" },
  { id: 4,  name: "Emily Davis",    email: "emily.d@email.com", phone: "1212585474", date: "Oct 12, 2023", action: "accept-reject" },
  { id: 5,  name: "Chris Wilson",   email: "chris.w@email.com", phone: "1212585474", date: "Oct 12, 2023", action: "accept-reject" },
  { id: 6,  name: "Anna Roberts",   email: "anna.r@email.com",  phone: "1212585474", date: "Oct 12, 2023", action: "accept-reject" },
  { id: 7,  name: "James Lee",      email: "james.l@email.com", phone: "1212585474", date: "Oct 12, 2023", action: "accept-reject" },
  { id: 8,  name: "Olivia Brown",   email: "olivia.b@email.com",phone: "1212585474", date: "Oct 11, 2023", action: "accept-reject" },
  { id: 9,  name: "Lucas Martin",   email: "lucas.m@email.com", phone: "1212585474", date: "Oct 11, 2023", action: "suspended" },
  { id: 10, name: "Sophia White",   email: "sophia.w@email.com",phone: "1212585474", date: "Oct 11, 2023", action: "accept-reject" },
  { id: 11, name: "Ethan Clark",    email: "ethan.c@email.com", phone: "1212585474", date: "Oct 10, 2023", action: "accept-reject" },
  { id: 12, name: "Mia Lewis",      email: "mia.l@email.com",   phone: "1212585474", date: "Oct 10, 2023", action: "accept-reject" },
  { id: 13, name: "Noah Hall",      email: "noah.h@email.com",  phone: "1212585474", date: "Oct 10, 2023", action: "suspended" },
  { id: 14, name: "Isabella Young", email: "bella.y@email.com", phone: "1212585474", date: "Oct 09, 2023", action: "accept-reject" },
  { id: 15, name: "Liam King",      email: "liam.k@email.com",  phone: "1212585474", date: "Oct 09, 2023", action: "accept-reject" },
  { id: 16, name: "Ava Scott",      email: "ava.s@email.com",   phone: "1212585474", date: "Oct 09, 2023", action: "accept-reject" },
  { id: 17, name: "Mason Adams",    email: "mason.a@email.com", phone: "1212585474", date: "Oct 08, 2023", action: "accept-reject" },
  { id: 18, name: "Charlotte Baker",email: "char.b@email.com",  phone: "1212585474", date: "Oct 08, 2023", action: "suspended" },
  { id: 19, name: "Logan Nelson",   email: "logan.n@email.com", phone: "1212585474", date: "Oct 08, 2023", action: "accept-reject" },
  { id: 20, name: "Amelia Carter",  email: "amelia.c@email.com",phone: "1212585474", date: "Oct 07, 2023", action: "accept-reject" },
  { id: 21, name: "Benjamin Hill",  email: "ben.h@email.com",   phone: "1212585474", date: "Oct 07, 2023", action: "accept-reject" },
];

const PAGE_SIZE = 9;

function ActionButtons({ action }: { action: ActionType }) {
  if (action === "suspended") {
    return (
      <Badge className="bg-[#e05555] hover:bg-[#c94444] text-white text-[14px] font-semibold px-4 py-1.5 rounded-full flex items-center gap-1 cursor-pointer border-0">
        <Ban size={12} />
        Suspend
      </Badge>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Badge className="bg-[#3dba6f] hover:bg-[#34a561] text-white text-[14px] font-semibold px-4 py-1.5 rounded-full cursor-pointer border-0 transition-colors">
        Accept
      </Badge>
      <Badge className="bg-[#e05555] hover:bg-[#c94444] text-white text-[14px] font-semibold px-4 py-1.5 rounded-full cursor-pointer border-0 transition-colors">
        Reject
      </Badge>
    </div>
  );
}

function UserManagement() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(allUsers.length / PAGE_SIZE);
  const paginatedUsers = allUsers.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= Math.min(totalPages, 3); i++) pages.push(i);
    return pages;
  };

  return (
    <div className="min-h-screen">
      <div className="">
        {/* Title */}
        <h1 className="text-white text-[24px] font-bold mb-10 leading-[120%]">
          User Management
        </h1>

        {/* Table Container */}
        <div className="rounded-xl overflow-hidden border border-[#2a2a2a]">
          <Table>
            {/* Header */}
            <TableHeader>
              <TableRow className="bg-[#e8b84b] hover:bg-[#e8b84b] border-0">
                <TableHead className="text-[#1F1F1F] text-base text-center py-4 font-medium">
                  User Name
                </TableHead>
                <TableHead className="text-[#1F1F1F] text-base text-center py-4 font-medium">
                  Email
                </TableHead>
                <TableHead className="text-[#1F1F1F] text-base text-center py-4 font-medium">
                  Phone Number
                </TableHead>
                <TableHead className="text-[#1F1F1F] text-base text-center py-4 font-medium">
                  Date
                </TableHead>
                <TableHead className="text-[#1F1F1F] text-base text-center py-4 font-medium">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            {/* Body */}
            <TableBody>
              {paginatedUsers.map((user, index) => (
                <TableRow
                  key={user.id}
                  className={`
                    border-b border-[#222222] hover:bg-[#1e1e1e] transition-colors
                    ${index % 2 === 0 ? "bg-[#161616]" : "bg-[#131313]"}
                  `}
                >
                  <TableCell className="text-[#C9C9C9] text-base font-medium text-center py-5 leading-[120%]">
                    {user.name}
                  </TableCell>
                  <TableCell className="text-[#aaaaaa] text-base text-center py-5 leading-[120%]">
                    {user.email}
                  </TableCell>
                  <TableCell className="text-[#aaaaaa] text-base text-center py-5 leading-[120%]">
                    {user.phone}
                  </TableCell>
                  <TableCell className="text-[#aaaaaa] text-base text-center py-5 leading-[120%]">
                    {user.date}
                  </TableCell>
                  <TableCell className="text-center py-4">
                    <div className="flex justify-center">
                      <ActionButtons action={user.action} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex justify-end items-center gap-1 mt-5">
          {/* Prev */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="w-9 h-9 rounded-md bg-[#1a1a1a] border-[#2e2e2e] text-[#888] hover:bg-[#252525] hover:text-white disabled:opacity-30"
          >
            <ChevronLeft size={14} />
          </Button>

          {/* Page Numbers */}
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

          {/* Next */}
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

export default UserManagement;