import { ReactQueryKeysEnum } from "@/@types/enums/reactQuery";
import { useQuery } from "@tanstack/react-query";

import { SolicitanteRequest } from "../requests";

export function useFindAllSolicitante(page: number, perPage: number) {
  return useQuery({
    queryKey: [ReactQueryKeysEnum.SOLICITANTE_FINDALL, page, perPage],
    queryFn: async () => {
      const { data } = await SolicitanteRequest.findAllSolicitante(
        page,
        perPage,
      );
      return data;
    },
  });
}
