import { ReactQueryKeysEnum } from "@/@types/enums/reactQuery";
import { useMutation, useQuery } from "@tanstack/react-query";

import { SolicitanteRequest } from "../requests";
import {
  createSolicitante,
  updateSolicitante,
} from "../requests/SolicitanteRequest";

import { EditarSolicitanteQuery, SolicitanteForm } from "..";

export function useSolicitante(page: number, perPage: number, nome?: string) {
  return useQuery({
    queryKey: [ReactQueryKeysEnum.SOLICITANTE_FINDALL, page, perPage, nome],
    queryFn: async () => {
      const { data } = await SolicitanteRequest.findAllSolicitante(
        page,
        perPage,
        nome,
      );
      return data;
    },
  });
}

export function useCreateSolicitante() {
  const mutation = useMutation({
    mutationFn: (solicitanteData: SolicitanteForm) =>
      createSolicitante(solicitanteData),
  });
  return mutation;
}

export function useDeleteSolicitante() {
  const mutation = useMutation({
    mutationFn: (id: number) => SolicitanteRequest.deleteSolicitante(id),
  });
  return mutation;
}

export function useUpdateSolicitante() {
  const mutation = useMutation({
    mutationFn: (solicitanteData: EditarSolicitanteQuery) =>
      updateSolicitante(solicitanteData),
  });
  return mutation;
}
