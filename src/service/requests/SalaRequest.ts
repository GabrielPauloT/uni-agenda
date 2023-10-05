import { ApiResult } from "@/types/API";
import { api } from "../api";
import { Sala } from "../types";

export function findAllSala(page: number, perPage: number) {
  return api.get<ApiResult<Sala[]>>(`/salas/${page}/page/${perPage}/per-page`);
}
