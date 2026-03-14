"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { Toaster } from "sonner";
interface Props {
  children: ReactNode;
}

const AppProvider = ({ children }: Props) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster richColors position="top-right" />
      <SessionProvider>{children}</SessionProvider>
    </QueryClientProvider>
  );
};

export default AppProvider;
