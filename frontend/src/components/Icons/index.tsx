import * as IconsAllowed from "@/config/icons.config";
import { IconProps } from "./types";

export function Icons({ name, size, ...props }: IconProps) {
  const CurrentIcon = IconsAllowed[name];

  return <CurrentIcon size={size || 24} {...props} />;
}
