"use client";

import { useState } from "react";

import Head from "next/head";

import MenuBarMobile from "../MenuBarMobile";
import { Sidebar } from "../Sidebar";

import { LayoutProps } from "./types";

export function Layout({ pageTitle, children }: LayoutProps) {
  let titleConcat = "Responsive Sidebar Example";
  if (pageTitle) titleConcat = pageTitle + " | " + titleConcat;

  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div>
      <Head>
        <title>{titleConcat}</title>
      </Head>
      <div className="min-h-screen">
        <div className="flex">
          <MenuBarMobile setter={setShowSidebar} />
          <Sidebar show={showSidebar} setter={setShowSidebar} />
          <div className="flex h-1/2 w-1/2 flex-grow flex-col ">{children}</div>
        </div>
      </div>
    </div>
  );
}
