import { ApiResult } from "@/types/API";
import { api } from "../api";
import { Usuario } from "../types";

export function findAllUsuario(page: number, perPage: number) {
  return api.get<ApiResult<Usuario[]>>(
    `/usuarios/${page}/page/${perPage}/per-page`,
  );
}
