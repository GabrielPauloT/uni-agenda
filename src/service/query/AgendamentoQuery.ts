import { ReactQueryKeysEnum } from "@/types/enums/reactQuery";
import { useApiQuery } from "../hooks/Query";
import { Agendamento } from "../types/Agendamento";
import { AgendamentoRequest } from "../requests";

export function useFindAllAgendamento(page: number, perPage: number) {
  return useApiQuery<Agendamento[]>({
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

export function useCreateAgendamento(agendamento: Agendamento) {
  return useApiQuery<Agendamento>({
    queryKey: [ReactQueryKeysEnum.AGENDAMENTO_CREATE],
    queryFn: async () => {
      const { data } = await AgendamentoRequest.createAgendamento(agendamento);
      return data;
    },
  });
}

export function useUpdateAgendamento(agendamento: Agendamento) {
  return useApiQuery<Agendamento>({
    queryKey: [ReactQueryKeysEnum.AGENDAMENTO_UPDATE],
    queryFn: async () => {
      const { data } = await AgendamentoRequest.updateAgendamento(agendamento);
      return data;
    },
  });
}

export function useDeleteAgendamento(id: number) {
  return useApiQuery<Agendamento>({
    queryKey: [ReactQueryKeysEnum.AGENDAMENTO_DELETE],
    queryFn: async () => {
      const { data } = await AgendamentoRequest.deleteAgendamento(id);
      return data;
    },
  });
}

export function useFindAgendamentoById(id: number) {
  return useApiQuery<Agendamento>({
    queryKey: [ReactQueryKeysEnum.AGENDAMENTO_FINDBYID, id],
    queryFn: async () => {
      const { data } = await AgendamentoRequest.findAgendamentoById(id);
      return data;
    },
  });
}
