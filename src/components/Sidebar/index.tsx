import Image from "next/image";
import Link from "next/link";
import { Icons } from "../Icons";

export default function Sidebar() {
    return (
        <div className="w-60 bg-primary-100 shadow-md shadow-slate-900 p-4">
            <div className="flex mt-10 mb-12 justify-center items-center">
                <div className="mr-2">
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
                    <Link className="items-center ml-4 flex gap-3 p-2 rounded-md hover:bg-white hover:text-primary-100 text-white" href="/salas">
                        <Icons size={18} name="HiHome"/> <span>Salas</span>
                    </Link>
                    <hr className="my-2 border-gray-300" />
                </div>
                <div>
                    <Link className="items-center ml-4 flex gap-3 p-2 rounded-md hover:bg-white hover:text-primary-100 text-white" href="/relatorio">
                        <Icons size={18} name="MdReport"/> Relatório
                    </Link>
                    <hr className="my-2 border-gray-300" />
                </div>
                <div>
                    <Link className="items-center ml-4 flex gap-3 p-2 rounded-md hover:bg-white hover:text-primary-100 text-white" href="/sair">
                        <Icons size={18} name="ImExit"/> Sair
                    </Link>
                    <hr className="my-2 border-gray-300" />
                </div>
            </nav>
        </div>
    )
}
