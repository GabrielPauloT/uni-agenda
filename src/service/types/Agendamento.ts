export type Agendamento = {
  id?: number;
  idsala: number;
  idsolicitante: number;
  idusuario: number;
  diasemana: number[];
  horainicial: string;
  horafinal: string;
  datainicio: Date;
  datafinal: Date;
  tema: string;
  createdat?: string;
  updatedat?: string;
};
