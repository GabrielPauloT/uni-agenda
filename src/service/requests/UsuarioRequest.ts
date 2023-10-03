import { ApiResult } from "@/types/API";
import { Usuario } from "../types/Usuario";
import { api } from "../api";

export function findAllUsuario(page: number, perPage: number) {
  return api.get<ApiResult<Usuario[]>>(
    `/usuario/${page}/page/${perPage}/per-page`,
  );
}
