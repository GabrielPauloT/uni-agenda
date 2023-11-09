import { ReactQueryKeysEnum } from "@/@types/enums/reactQuery";
import { useMutation, useQuery } from "@tanstack/react-query";

import { SalaRequest } from "../requests";

import { CreateSalaType } from "..";

import { createSala, deleteSala, updateSala } from "../requests/SalaRequest";

export function useSala(page: number, perPage: number) {
  return useQuery({
    queryKey: [ReactQueryKeysEnum.SALA_FINDALL, page, perPage],
    queryFn: async () => {
      const { data } = await SalaRequest.findAllSala(page, perPage);
      console.log({ data });
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

export function useDeleteUsuario() {
  const mutation = useMutation({
    mutationFn: (salaId: number) => deleteSala(salaId),
  });
  return mutation;
}

export function useUpdateUsuario() {
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
