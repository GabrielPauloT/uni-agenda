export type TipoSalaType = {
  id: number;
  nomedotipo: string;
};

export type SalaFindType = {
  id: number;
  tipo: TipoSalaType;
  nome: string;
  capacidade: number;
  CriadoEm: Date;
  AtualizadoEm: Date;
};

export type CreateSalaType = {
  NomeDaSala: string;
  IdTipoDaSala: number;
  Capacidade: number;
};
