import { ReactQueryKeysEnum } from "@/@types/enums/reactQuery";
import { useQuery } from "@tanstack/react-query";

import { SalaRequest } from "../requests";

export function useFindAllSala(page: number, perPage: number) {
  return useQuery({
    queryKey: [ReactQueryKeysEnum.SALA_FINDALL, page, perPage],
    queryFn: async () => {
      const { data } = await SalaRequest.findAllSala(page, perPage);
      return data;
    },
  });
}
