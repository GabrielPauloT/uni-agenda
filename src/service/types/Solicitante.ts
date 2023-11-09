export type Solicitante = {
  Id: number;
  IdTipoSolicitante: number;
  NomeTipoSolicitante: string;
  NomeSolicitante: string;
  EmailSolicitante: string;
  CriadoEm: Date;
  AtualizadoEm: Date;
};

export type SolicitanteForm = {
  IdTipoSolicitante: number;
  NomeSolicitante: string;
  EmailSolicitante: string;
};
