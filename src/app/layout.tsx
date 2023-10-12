"use client";
import "./globals.css";

import moment from "moment";
import { Inter } from "next/font/google";

import { reactQueryConfig } from "@/config/reactQuery";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const inter = Inter({ subsets: ["latin"] });

moment.locale("pt-br");

const queryClient = new QueryClient(reactQueryConfig);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <QueryClientProvider client={queryClient}>
        <body className={inter.className}>{children}</body>
      </QueryClientProvider>
    </html>
  );
}
