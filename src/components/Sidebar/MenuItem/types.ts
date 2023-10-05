import * as IconsAllowed from "@/config/icons.config";
export type MenuProps = {
  setter: React.Dispatch<React.SetStateAction<boolean>>;
  icon: keyof typeof IconsAllowed;
  title: string;
  path: string;
  id?: number;
  roles?: ["user" | "admin"];
};
