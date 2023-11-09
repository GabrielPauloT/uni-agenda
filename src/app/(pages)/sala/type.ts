export type FormSalaType = {
  id: number;
  NomeDaSala: string;
  Capacidade: number;
  IdTipoDaSala: number;
};

export type FormTipoSalaType = {
  id: number;
  NomeDoTipo: string;
};

export type DataSalaType = {
  id: number;
  tipo: FormTipoSalaType;
  nome: string;
  capacidade: number;
  CriadoEm: Date;
  AtualizadoEm: Date;
};
