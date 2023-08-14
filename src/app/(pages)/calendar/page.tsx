"use client"
import CustomCalendar from "@/components/Calendar";
import { useCallback, useState } from "react";
import { EVENTS } from "@/components/Calendar/events";
import moment from "moment";
import { CustomCalendarEvent } from "@/config/types/type";

export default function Calendar() {
  const [events, setEvents] = useState<CustomCalendarEvent[]>(EVENTS);
  const onChangeEventTime = useCallback(
    (start: Date, end: Date, appointmentId: number | undefined, resourceId: number) => {
      setEvents(() => {
        return [
          ...EVENTS.map((event) =>
            event?.data?.appointment?.id === appointmentId
              ? {
                  ...event,
                  start: moment(start)?.toDate(),
                  end: moment(end)?.toDate(),
                  resourceId: resourceId,
                }
              : event
          ),
        ];
      });
    },
    []
  );
  // console.log("events", events);

  return (
    <CustomCalendar
      resizable
      onEventDrop={({ start, end, event, resourceId }) => {
        onChangeEventTime(start as Date, end as Date, event?.data?.appointment?.id, resourceId);
      }}
      onEventResize={({ start, end, event, resourceId }) => {
        onChangeEventTime(start as Date, end as Date, event?.data?.appointment?.id, resourceId);
      }}
      event={events}
    />
  )
}