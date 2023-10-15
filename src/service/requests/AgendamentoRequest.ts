import { ApiResult } from "@/@types/API/ApiResult";

import { api } from "../api";
import { AgendamentoType } from "../types";

export function findAllAgendamento() {
  return api.get<ApiResult<AgendamentoType[]>>(`/agendamentos/`);
}
