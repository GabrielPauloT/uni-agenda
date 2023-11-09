import { ApiResult } from "@/@types";

import { api } from "../api";
import { TipoSolicitanteType } from "../types/TipoSolicitante";

export function findAllTipoSala(page: number, perPage: number) {
  return api.get<ApiResult<TipoSolicitanteType[]>>(
    `/tipossolicitantes/${page}/page/${perPage}/per-page`,
  );
}
