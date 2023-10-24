import { ReactQueryKeysEnum } from "@/@types/enums/reactQuery";
import { useMutation, useQuery } from "@tanstack/react-query";

import { AgendamentoRequest } from "../requests";
import { createAgendamento } from "../requests/AgendamentoRequest";

import { CreateAgendamentoType } from "..";

export function useAgendamento() {
  return useQuery({
    queryKey: [ReactQueryKeysEnum.AGENDAMENTO_FINDALL],
    queryFn: async () => {
      const { data } = await AgendamentoRequest.findAllAgendamento();
      return data;
    },
  });
}

export function useCreateAgendamento() {
  const mutation = useMutation({
    mutationFn: (agendamentoData: CreateAgendamentoType) =>
      createAgendamento(agendamentoData),
  });
  return mutation;
}
