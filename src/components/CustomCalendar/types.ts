import { CustomCalendarEvent } from "@/@types/type";
import { SlotInfo, View } from "react-big-calendar";
import { withDragAndDropProps } from "react-big-calendar/lib/addons/dragAndDrop";

type CalendarEvent = {
  onSelectSlot: (slotInfo: SlotInfo) => void | undefined;
  onSelectEvent: (event: CustomCalendarEvent) => void | undefined;
  resourceMap: { id: number; title: string }[];
  views: View[];
  defaultView: View;
};

type DnDType = CustomCalendarEvent &
  withDragAndDropProps & { event: CustomCalendarEvent[] } & CalendarEvent;
export type CustomCalendarProps = Omit<DnDType, "localizer">;
