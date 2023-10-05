import { ReactQueryKeysEnum } from "@/types/enums/reactQuery";
import { useApiQuery } from "../hooks/Query";
import { SolicitanteRequest } from "../requests";
import { Solicitante } from "../types";

export function useFindAllSolicitante(page: number, perPage: number) {
  return useApiQuery<Solicitante[]>({
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
