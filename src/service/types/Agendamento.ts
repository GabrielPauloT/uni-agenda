import { DiaSemanaEnum } from "@/@types";

export type AppointmentType = {
  id: number;
  data: string;
};

export type AgendamentoType = {
  Id: number;
  IdSala: number;
  Solicitante: string;
  IdUsuario: number;
  DiaSemana: DiaSemanaEnum[];
  Appoiments: AppointmentType[];
  HoraInicial: string;
  HoraFinal: string;
  DataInicio: Date;
  DataFinal: Date;
  Tema: string;
  CriadoEm?: Date;
  AtualizadoEm?: Date;
};
