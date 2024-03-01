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

export type EditarSolicitanteFormType = {
  Id: number;
  Nome?: string;
  Email?: string;
  tipo?: string;
  CriadoEm?: string;
  AtualizadoEm?: string;
};

export type EditarSolicitanteQuery = {
  id: number;
  NomeSolicitante: string;
  EmailSolicitante: string;
  IdTipoSolicitante: number;
};
