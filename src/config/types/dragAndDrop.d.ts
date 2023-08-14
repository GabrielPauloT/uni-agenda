import { stringOrDate } from "react-big-calendar";
import { CustomCalendarEvent } from "./type";

declare module 'react-big-calendar/lib/addons/dragAndDrop' {
    export interface EventInteractionArgs<CustomCalendarEvent> {
        event: CustomCalendarEvent;
        start: stringOrDate;
        end: stringOrDate;
        isAllDay: boolean;
        resourceId: number;
    }
}
