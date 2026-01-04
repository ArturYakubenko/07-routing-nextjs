"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools"
import { useState, ReactNode } from "react";

interface TanstackProviderProps {
  children: ReactNode;
}

const TanStackProvider = ({ children }: TanstackProviderProps) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools/>
    </QueryClientProvider>
  );
};

export default TanStackProvider;