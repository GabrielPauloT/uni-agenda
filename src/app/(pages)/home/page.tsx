import Sidebar from "@/components/Sidebar";
import React from "react";

export default function Home({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex">
      <Sidebar />
        <main className="flex-1 p-8">
          {children}
        </main>
    </div>
  )
}