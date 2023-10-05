import { ApiResult } from "@/types/API";
import { api } from "../api";
import { Agendamento } from "../types";

export function findAllAgendamento(page: number, perPage: number) {
  return api.get<ApiResult<Agendamento[]>>(
    `/agendamentos/${page}/page/${perPage}/per-page`,
  );
}

export function createAgendamento(agendamento: Agendamento) {
  return api.post<ApiResult<Agendamento>>("/agendamentos", agendamento);
}

export function updateAgendamento(agendamento: Agendamento) {
  return api.put<ApiResult<Agendamento>>(
    `/agendamentos/${agendamento.id}`,
    agendamento,
  );
}

export function deleteAgendamento(id: number) {
  return api.delete<ApiResult<Agendamento>>(`/agendamentos/${id}`);
}

export function findAgendamentoById(id: number) {
  return api.get<ApiResult<Agendamento>>(`/agendamentos/${id}`);
}
