import Link from "next/link";
import Image from "next/image";
import { MenuBarMobileProps } from "./types";
import { Icons } from "../Icons";

export default function MenuBarMobile({ setter }: MenuBarMobileProps) {
  return (
    <nav className="fixed bottom-20 left-0 right-0 top-0 z-20 flex h-[60px] bg-primary-100 px-2 md:hidden [&>*]:my-auto">
      <button
        className="flex text-4xl text-white"
        onClick={() => {
          setter((oldVal) => !oldVal);
        }}
      >
        <Icons size={40} name="MdOutlineMenu" />
      </button>
      <Link href="/" className="mx-auto">
        <Image
          src="/logo/logoWhite2.svg"
          alt="logo_unipam"
          width={150}
          height={150}
          className="rounded-full"
        />
      </Link>
    </nav>
  );
}
