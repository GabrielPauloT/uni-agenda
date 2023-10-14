import { Dispatch, SetStateAction } from "react";

import { ToastStateType } from "@/app/(pages)/usuario/type";

export type ToastProps = {
  message: string;
  type: "success" | "error";
  isClose: Dispatch<SetStateAction<ToastStateType | undefined>>;
};
