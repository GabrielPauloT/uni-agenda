"use client";
import Cookie from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { SidebarMenu } from "./const";
import { MenuItem } from "./MenuItem";
import { SidebarProps } from "./types";

export function Sidebar({ show, setter }: SidebarProps) {
  const oldVal = () => (oldVal: boolean) => !oldVal;
  const router = useRouter();

  function handleLogin() {
    Cookie.remove("auth_token");
    router.push("/");
  }

  const className =
    "relative min-h-screen min-w-fit bg-primary-100 w-[250px] transition-[margin-left] ease-in-out duration-500 md:static top-0 bottom-0 left-0 z-40 px-5";
  const appendClass = show ? " ml-0" : " ml-[-250px] md:ml-0";

  const ModalOverlay = () => (
    <div
      className={`fixed bottom-0 left-0 right-0 top-0 z-30 flex bg-black/50 md:hidden`}
      onClick={() => {
        setter((oldVal: boolean) => !oldVal);
      }}
    />
  );

  return (
    <>
      <div className={`${className}${appendClass}`}>
        <div className="mt-9 flex p-2">
          <Link href="/">
            <Image
              src="/logo/logoWhite2.svg"
              alt="logo_unipam"
              width={150}
              height={150}
              className="rounded-full"
            />
          </Link>
        </div>
        <div className="mt-9 flex flex-col gap-2">
          {SidebarMenu.map((item) => (
            <MenuItem
              key={item.id}
              setter={oldVal}
              title={item.title}
              path={item.path}
              icon={item.icon}
            />
          ))}
          <div onClick={() => handleLogin()}>
            <MenuItem setter={oldVal} title="Sair" path="/" icon="ImExit" />
          </div>
        </div>
      </div>
      {show ? <ModalOverlay /> : <></>}
    </>
  );
}
