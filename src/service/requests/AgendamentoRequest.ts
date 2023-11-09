import { ApiResult } from "@/@types/API/ApiResult";

import { api } from "../api";
import { CreateAgendamentoType, ListarAgendamentoType } from "../types";

export function findAllAgendamento() {
  return api.get<ApiResult<ListarAgendamentoType[]>>(`/agendamentos/`);
}

export function createAgendamento(agendamentoData: CreateAgendamentoType) {
  return api.post("/agendamentos", agendamentoData);
}

export function updateAgendamento(agendamentoData: CreateAgendamentoType) {
  return api.patch("/agendamentos", agendamentoData);
}
