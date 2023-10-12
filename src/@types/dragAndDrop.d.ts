import { stringOrDate } from "react-big-calendar";

declare module "react-big-calendar/lib/addons/dragAndDrop" {
  export interface EventInteractionArgs<CustomCalendarEvent> {
    event: CustomCalendarEvent;
    start: stringOrDate;
    end: stringOrDate;
    isAllDay: boolean;
    resourceId: number;
  }
}
