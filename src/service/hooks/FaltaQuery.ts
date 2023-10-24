import { useMutation } from "@tanstack/react-query";

import { FaltaType } from "..";

import { createFalta } from "../requests/FaltaRequest";

export function useCreateFalta() {
  const mutation = useMutation({
    mutationFn: (faltaData: FaltaType) => createFalta(faltaData),
  });
  return mutation;
}
