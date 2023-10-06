import { ApiResult } from "@/@types/API/ApiResult";
import { api } from "../api";
import { Solicitante } from "../types";

export function findAllSolicitante(page: number, perPage: number) {
  return api.get<ApiResult<Solicitante[]>>(
    `/solicitantes/${page}/page/${perPage}/per-page`,
  );
}
