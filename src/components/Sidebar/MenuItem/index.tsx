import { Icons } from "@/components/Icons";
import * as IconsAllowed from "@/config/icons.config";
import Link from "next/link";
import { usePathname } from "next/navigation";

type MenuProps = {
  setter: React.Dispatch<React.SetStateAction<boolean>>;
  icon: keyof typeof IconsAllowed;
  name: string;
  route: string;
};

export function MenuItem({ icon, name, route, setter }: MenuProps) {
  const pathname = usePathname();
  const colorClass =
    pathname === route
      ? "bg-white text-primary-100 rounded-md"
      : "text-white hover:bg-white hover:text-primary-100 rounded-md";

  return (
    <Link
      href={route}
      onClick={() => {
        setter(setter as unknown as boolean);
      }}
      className={`text-md flex gap-1 border-b-white/10 py-3 pl-6 [&>*]:my-auto ${colorClass}`}
    >
      <div className="flex w-[30px] text-xl [&>*]:mx-auto">
        <Icons size={18} name={icon} />
      </div>
      <div>{name}</div>
    </Link>
  );
}
