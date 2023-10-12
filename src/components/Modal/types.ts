import { ReactNode } from "react";

import { CustomCalendarEvent } from "@/@types/components/Calendario";

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (eventData: CustomCalendarEvent) => void;
  dados?: CustomCalendarEvent;
};

export type CommonModalProps = {
  isOpen: boolean;
  title: string;
  children: ReactNode;
};
