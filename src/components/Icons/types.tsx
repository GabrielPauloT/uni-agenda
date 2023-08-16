import { IconBaseProps } from "react-icons/lib";
import * as IconsAllowed from "@/config/icons.config";

export type IconProps = IconBaseProps & {
  name: keyof typeof IconsAllowed;
  color?: string;
};
