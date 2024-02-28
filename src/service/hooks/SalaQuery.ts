import { ReactQueryKeysEnum } from "@/@types/enums/reactQuery";
import { useMutation, useQuery } from "@tanstack/react-query";

import { SalaRequest } from "../requests";

import { CreateSalaType } from "..";

import { createSala, deleteSala, updateSala } from "../requests/SalaRequest";

export function useSala(page: number, perPage: number, tipoSala?: number) {
  return useQuery({
    queryKey: [ReactQueryKeysEnum.SALA_FINDALL, page, perPage, tipoSala],
    queryFn: async () => {
      const { data } = await SalaRequest.findAllSala(page, perPage, tipoSala);
      return data;
    },
  });
}

export function useCreateSala() {
  const mutation = useMutation({
    mutationFn: (salaData: CreateSalaType) => createSala(salaData),
  });
  return mutation;
}

export function useDeleteSala() {
  const mutation = useMutation({
    mutationFn: (salaId: number) => deleteSala(salaId),
  });
  return mutation;
}

export function useUpdateSala() {
  const mutation = useMutation({
    mutationFn: ({
      salaId,
      salaData,
    }: {
      salaId: number;
      salaData: Partial<CreateSalaType>;
    }) => updateSala(salaId, salaData),
  });
  return mutation;
}
