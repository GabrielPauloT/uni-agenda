import { ReactQueryKeysEnum } from "@/@types/enums/reactQuery";
import { useMutation, useQuery } from "@tanstack/react-query";

import { TipoSalaRequest } from "../requests";

import { CreateTipoSalaType } from "..";

import {
  createTipoSala,
  deleteTipoSala,
  updateTipoSala,
} from "../requests/TipoSalaRequest";

export function useTipoSala(page: number, perPage: number) {
  return useQuery({
    queryKey: [ReactQueryKeysEnum.TIPO_SALA_FINDALL, page, perPage],
    queryFn: async () => {
      const { data } = await TipoSalaRequest.findAllTipoSala(page, perPage);
      return data;
    },
  });
}

export function useCreateTipoSala() {
  const mutation = useMutation({
    mutationFn: (tipoSalaData: CreateTipoSalaType) =>
      createTipoSala(tipoSalaData),
  });
  return mutation;
}

export function useDeleteTipoSala() {
  const mutation = useMutation({
    mutationFn: (tipoSalaId: number) => deleteTipoSala(tipoSalaId),
  });
  return mutation;
}

export function useUpdateTipoSala() {
  const mutation = useMutation({
    mutationFn: ({
      tipoSalaId,
      tipoSalaData,
    }: {
      tipoSalaId: number;
      tipoSalaData: Partial<CreateTipoSalaType>;
    }) => updateTipoSala(tipoSalaId, tipoSalaData),
  });
  return mutation;
}
