"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";
import { reactQueryConfig } from "@/config/reactQuery";

const inter = Inter({ subsets: ["latin"] });

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UniAgenda",
  description: "Created by Gabriel Paulo",
};

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
