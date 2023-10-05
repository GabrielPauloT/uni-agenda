import { ReactQueryKeysEnum } from "@/types/enums/reactQuery";
import { useApiQuery } from "../hooks/Query";
import { SalaRequest } from "../requests";
import { Sala } from "../types";

export function useFindAllSala(page: number, perPage: number) {
  return useApiQuery<Sala[]>({
    queryKey: [ReactQueryKeysEnum.SALA_FINDALL, page, perPage],
    queryFn: async () => {
      const { data } = await SalaRequest.findAllSala(page, perPage);
      return data;
    },
  });
}
