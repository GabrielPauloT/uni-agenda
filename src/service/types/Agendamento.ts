import { DiaSemanaEnum } from "@/@types";

export type AppointmentType = {
  id: number;
  data: string;
};

export type UsuarioType = {
  id: number;
  nome: string;
  email: string;
  senha: string;
  createdat?: Date;
  updatedat?: Date;
};

export type SalaType = {
  id: number;
  idtiposala: number;
  nomedasala: string;
  capacidade: number;
  createdat?: Date;
  updatedat?: Date;
};

export type SolicitanteType = {
  id: number;
  idtiposolicitante: number;
  nome: string;
  email: string;
  criadoEm?: Date;
  atualizadoEm?: Date;
};

export type ListarAgendamentoType = {
  Id: number;
  Sala: SalaType;
  Solicitante: SolicitanteType;
  Usuario: UsuarioType;
  DiaSemana: DiaSemanaEnum[];
  Appoiments: AppointmentType[];
  HoraInicial: string;
  HoraFinal: string;
  DataInicio: Date;
  DataFinal: Date;
  Tema: string;
  Falta: Record<string, boolean>;
  CriadoEm?: Date;
  AtualizadoEm?: Date;
};

export type CreateAgendamentoType = {
  IdSala: number;
  IdUsuario: number;
  IdSolicitante: number;
  DataInicio: Date;
  DataFinal: Date;
  Tema: string;
  DiaSemana: DiaSemanaEnum[];
  HoraInicial: string;
  HoraFinal: string;
};
