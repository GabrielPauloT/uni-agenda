import { ApiResult } from "@/@types/API/ApiResult";

import { api } from "../api";
import { Usuario } from "../types";

export function findAllUsuario(page: number, perPage: number) {
  return api.get<ApiResult<Usuario[]>>(
    `/usuarios/${page}/page/${perPage}/per-page`,
  );
}

export function createUsuario(usuarioData: Usuario) {
  return api.post("/usuarios", usuarioData);
}
