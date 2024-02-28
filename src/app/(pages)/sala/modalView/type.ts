export type DataSalaType = {
  nome: string;
  capacidade: string;
  tipo: string;
};

export type ModalViewType = {
  data: DataSalaType;
  onClick: () => void;
};
