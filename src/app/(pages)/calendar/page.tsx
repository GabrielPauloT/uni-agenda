"use client";
import CustomCalendar from "@/components/CustomCalendar";
import { useCallback, useState } from "react";
import { EVENTS } from "@/components/CustomCalendar/events";
import moment from "moment";
import { CustomCalendarEvent } from "@/types/type";
import { SlotInfo } from "react-big-calendar";
import { resourceMap } from "./const";

export default function Calendar() {
  const [events, setEvents] = useState<CustomCalendarEvent[]>(EVENTS);
  const onChangeEventTime = useCallback(
    (
      start: Date,
      end: Date,
      appointmentId: number | undefined,
      resourceId: number,
    ) => {
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
              : event,
          ),
        ];
      });
    },
    [],
  );

  const handleSelectSlot = useCallback(
    ({ start, end, resourceId }: SlotInfo) => {
      const professor = window.prompt("Nome do Responsável");
      const id = Math.floor(Math.random() * 1000);
      if (professor) {
        setEvents((prev) => [
          ...prev,
          {
            start,
            end,
            isDraggable: true,
            data: {
              appointment: {
                id,
                professor,
              },
            },
            resourceId,
          },
        ]);
      }
    },
    [setEvents],
  );

  const handleSelectEvent = useCallback(
    ({ data }: CustomCalendarEvent) =>
      window.alert(data?.appointment.professor),
    [],
  );

  return (
    <div>
      <CustomCalendar
        defaultView="day"
        views={["day"]}
        resourceMap={resourceMap}
        resizable
        onEventDrop={({ start, end, event, resourceId }) => {
          onChangeEventTime(
            start as Date,
            end as Date,
            event?.data?.appointment?.id,
            resourceId,
          );
        }}
        onEventResize={({ start, end, event, resourceId }) => {
          onChangeEventTime(
            start as Date,
            end as Date,
            event?.data?.appointment?.id,
            resourceId,
          );
        }}
        event={events}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
      />
    </div>
  );
}
