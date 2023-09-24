import "./globals.css";
import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UniAgenda",
  description: "Created by Gabriel Paulo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
