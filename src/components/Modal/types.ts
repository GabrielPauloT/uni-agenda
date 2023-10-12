import { CustomCalendarEvent } from "@/@types/type";
import { ReactNode } from "react";

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
