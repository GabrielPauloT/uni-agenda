import { ReactNode } from "react";

import { AgendamentoType } from "@/service";

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (eventData: AgendamentoType) => void;
  dados?: AgendamentoType;
};

export type CommonModalProps = {
  isOpen: boolean;
  title: string;
  children: ReactNode;
};
