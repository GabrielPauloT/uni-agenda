"use client";
import { useState } from "react";
import Head from "next/head";
import MenuBarMobile from "../MenuBarMobile/MenuBarMobile";
import { Sidebar } from ".";

type LayoutProps = {
  pageTitle?: string;
  children: React.ReactNode;
};

export function Layout({ pageTitle, children }: LayoutProps) {
  let titleConcat = "Responsive Sidebar Example";
  if (pageTitle) titleConcat = pageTitle + " | " + titleConcat;

  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <Head>
        <title>{titleConcat}</title>
      </Head>
      <div className="min-h-screen">
        <div className="flex">
          <MenuBarMobile setter={setShowSidebar} />
          <Sidebar show={showSidebar} setter={setShowSidebar} />
          <div className="flex min-h-screen w-screen flex-grow flex-col md:w-full">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
