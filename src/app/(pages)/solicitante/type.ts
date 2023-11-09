export type FormSolicitanteType = {
  Id: number;
  IdTipoSolicitante: number;
  NomeTipoSolicitante: string;
  NomeSolicitante: string;
  EmailSolicitante: string;
  CriadoEm: Date;
  AtualizadoEm: Date;
};

export type ModalDataViewType = {
  Email: string;
  Nome: string;
  tipo: string;
};
