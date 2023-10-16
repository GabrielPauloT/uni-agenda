import { ReactNode } from "react";

import { ListarAgendamentoType } from "@/service";

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (eventData: ListarAgendamentoType) => void;
  dados?: ListarAgendamentoType;
};

export type CommonModalProps = {
  isOpen: boolean;
  title: string;
  children: ReactNode;
};
