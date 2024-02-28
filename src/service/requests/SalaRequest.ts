import { ApiResult } from "@/@types/API/ApiResult";

import { api } from "../api";
import { CreateSalaType } from "../types";
import { SalaFindType } from "../types/Sala";

export function findAllSala(page: number, perPage: number, tipoSala?: number) {
  return api.get<ApiResult<SalaFindType[]>>(
    `/salas/${page}/page/${perPage}/per-page${
      tipoSala ? `?tipoSala=${tipoSala}` : ""
    }`,
  );
}

export function createSala(salaData: CreateSalaType) {
  return api.post("/salas", salaData);
}

export function deleteSala(salaId: number) {
  return api.delete(`/salas/${salaId}`);
}

export function updateSala(salaId: number, salaData: Partial<CreateSalaType>) {
  return api.patch(`/salas/${salaId}/id-sala`, salaData);
}
