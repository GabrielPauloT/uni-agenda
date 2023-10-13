import { ReactQueryKeysEnum } from "@/@types/enums/reactQuery";
import { useQuery } from "@tanstack/react-query";

import { AgendamentoRequest } from "../requests";

export function useAgendamento() {
  return useQuery({
    queryKey: [ReactQueryKeysEnum.AGENDAMENTO_FINDALL],
    queryFn: async () => {
      const { data } = await AgendamentoRequest.findAllAgendamento();
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
