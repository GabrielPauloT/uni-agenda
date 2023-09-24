import Link from "next/link";
import { FiMenu as Icon } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import Image from "next/image";

type SidebarProps = {
  setter: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MenuBarMobile({ setter }: SidebarProps) {
  return (
    <nav className="fixed left-0 right-0 top-0 z-20 flex h-[60px] bg-primary-100 px-2 md:hidden [&>*]:my-auto">
      <button
        className="flex text-4xl text-white"
        onClick={() => {
          setter((oldVal) => !oldVal);
        }}
      >
        <Icon />
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
      <Link className="flex text-3xl text-white" href="/login">
        <FaUser />
      </Link>
    </nav>
  );
}
