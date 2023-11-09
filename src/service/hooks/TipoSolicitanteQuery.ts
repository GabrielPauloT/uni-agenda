import { ReactQueryKeysEnum } from "@/@types";
import { useQuery } from "@tanstack/react-query";

import { TipoSolicitanteRequest } from "..";

export function useTipoSolicitante(page: number, perPage: number) {
  return useQuery({
    queryKey: [ReactQueryKeysEnum.TIPO_SOLICITANTE_FINDALL, page, perPage],
    queryFn: async () => {
      const { data } = await TipoSolicitanteRequest.findAllTipoSala(
        page,
        perPage,
      );
      return data;
    },
  });
}
