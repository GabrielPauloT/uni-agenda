import { ReactQueryKeysEnum } from "@/@types/enums/reactQuery";
import { useQuery } from "@tanstack/react-query";

import { AgendamentoRequest } from "../requests";

export function useFindAllAgendamento(page: number, perPage: number) {
  return useQuery({
    queryKey: [ReactQueryKeysEnum.AGENDAMENTO_FINDALL, page, perPage],
    queryFn: async () => {
      const { data } = await AgendamentoRequest.findAllAgendamento(
        page,
        perPage,
      );
      return data;
    },
  });
}

export function useFindAgendamentoById(id: number) {
  return useQuery({
    queryKey: [ReactQueryKeysEnum.AGENDAMENTO_FINDBYID, id],
    queryFn: async () => {
      const { data } = await AgendamentoRequest.findAgendamentoById(id);
      return data;
    },
  });
}
