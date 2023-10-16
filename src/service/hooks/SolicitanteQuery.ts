import { ReactQueryKeysEnum } from "@/@types/enums/reactQuery";
import { useQuery } from "@tanstack/react-query";

import { SolicitanteRequest } from "../requests";

export function useSolicitante(page: number, perPage: number, nome?: string) {
  return useQuery({
    queryKey: [ReactQueryKeysEnum.SOLICITANTE_FINDALL, page, perPage, nome],
    queryFn: async () => {
      const { data } = await SolicitanteRequest.findAllSolicitante(
        page,
        perPage,
        nome,
      );
      return data;
    },
  });
}
