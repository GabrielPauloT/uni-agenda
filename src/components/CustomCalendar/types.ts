import { Event, SlotInfo, View } from "react-big-calendar";
import { withDragAndDropProps } from "react-big-calendar/lib/addons/dragAndDrop";

import { AgendaEventType } from "@/@types";

export type SalaMapType = {
  id: number;
  title: string;
} & Event;

type CalendarEvent = {
  onSelectSlot?: (slotInfo: SlotInfo) => void | undefined;
  onSelectEvent: (event: AgendaEventType) => void | undefined;
  resourceMap: SalaMapType[] | undefined;
  views: View[];
  defaultView: View;
};

type DnDType = withDragAndDropProps & {
  event?: AgendaEventType[];
} & CalendarEvent;
export type CustomCalendarProps = Omit<DnDType, "localizer">;
