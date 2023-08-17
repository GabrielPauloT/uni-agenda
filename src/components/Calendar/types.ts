import { CustomCalendarEvent } from "@/types/type";
import { SlotInfo } from "react-big-calendar";
import { withDragAndDropProps } from "react-big-calendar/lib/addons/dragAndDrop";

type CalendarEvent = {
  onSelectSlot: (slotInfo: SlotInfo) => void | undefined;
  onSelectEvent: any;
};

type DnDType = CustomCalendarEvent &
  withDragAndDropProps & { event: CustomCalendarEvent[] } & CalendarEvent;
export type CustomCalendarProps = Omit<DnDType, "localizer">;
