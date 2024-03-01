import { ApiResult } from "@/@types/API/ApiResult";

import { api } from "../api";
import { EditarSolicitanteQuery, Solicitante, SolicitanteForm } from "../types";

export function findAllSolicitante(
  page: number,
  perPage: number,
  nome?: string,
) {
  return api.get<ApiResult<Solicitante[]>>(
    `/solicitantes/${page}/page/${perPage}/per-page/nome-solicitante/${
      nome ? nome : ""
    }`,
  );
}

export function createSolicitante(solicitanteData: SolicitanteForm) {
  return api.post("/solicitantes", solicitanteData);
}

export function deleteSolicitante(id: number) {
  return api.delete(`/solicitantes/${id}`);
}

export function updateSolicitante(solicitanteData: EditarSolicitanteQuery) {
  return api.patch(`/solicitantes/${solicitanteData.id}`, {
    EmailSolicitante: solicitanteData.EmailSolicitante,
    NomeSolicitante: solicitanteData.NomeSolicitante,
    IdTipoSolicitante: solicitanteData.IdTipoSolicitante,
  });
}
