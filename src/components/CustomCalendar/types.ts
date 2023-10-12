import { SlotInfo, View } from "react-big-calendar";
import { withDragAndDropProps } from "react-big-calendar/lib/addons/dragAndDrop";

import { CustomCalendarEvent } from "@/@types/components/Calendario";

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
