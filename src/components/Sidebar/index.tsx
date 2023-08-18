import Image from "next/image";
import Link from "next/link";
import { Icons } from "../Icons";

export default function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full">
      <div className="relative min-h-screen min-w-fit bg-primary-100 p-4 shadow-md shadow-slate-900">
        <div className="mb-12 mt-10 flex items-center justify-center">
          <div className="mx-5">
            <Image
              src="/logo/logoWhite2.svg"
              alt="logo_unipam"
              width={150}
              height={150}
              className="rounded-full"
            />
          </div>
        </div>
        <nav className="space-y-4">
          <div>
            <Link
              className="ml-4 flex items-center gap-3 rounded-md p-2 text-white hover:bg-white hover:text-primary-100"
              href="/salas"
            >
              <Icons size={18} name="HiHome" /> <span>Salas</span>
            </Link>
            <hr className="my-2 border-gray-300" />
          </div>
          <div>
            <Link
              className="ml-4 flex items-center gap-3 rounded-md p-2 text-white hover:bg-white hover:text-primary-100"
              href="/relatorio"
            >
              <Icons size={18} name="MdReport" /> Relatório
            </Link>
            <hr className="my-2 border-gray-300" />
          </div>
          <div>
            <Link
              className="ml-4 flex items-center gap-3 rounded-md p-2 text-white hover:bg-white hover:text-primary-100"
              href="/sair"
            >
              <Icons size={18} name="ImExit" /> Sair
            </Link>
            <hr className="my-2 border-gray-300" />
          </div>
        </nav>
      </div>
      <main className="max-w-full flex-1 overflow-hidden p-8">{children}</main>
    </div>
  );
}
