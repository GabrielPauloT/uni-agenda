import { CustomCalendarEvent } from "@/types/type";

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (eventData: CustomCalendarEvent) => void;
};
