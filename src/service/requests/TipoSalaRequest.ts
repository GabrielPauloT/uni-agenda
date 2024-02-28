import { ApiResult } from "@/@types/API/ApiResult";

import { api } from "../api";
import { CreateTipoSalaType, TipoSalaT } from "../types/TipoSala";

export function findAllTipoSala(page: number, perPage: number) {
  return api.get<ApiResult<TipoSalaT[]>>(
    `/tipossalas/${page}/page/${perPage}/per-page`,
  );
}

export function createTipoSala(tipoSalaData: CreateTipoSalaType) {
  return api.post("/tipossalas", tipoSalaData);
}

export function deleteTipoSala(salaId: number) {
  return api.delete(`/tipossalas/${salaId}`);
}

export function updateTipoSala(
  tipoSalaId: number,
  tipoSalaData: Partial<CreateTipoSalaType>,
) {
  return api.patch(`/tipossalas/${tipoSalaId}`, tipoSalaData);
}
