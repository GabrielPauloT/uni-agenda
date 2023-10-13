"use client";
import { useCallback, useState } from "react";
import { SlotInfo } from "react-big-calendar";

import moment from "moment";

import { CustomCalendarEvent } from "@/@types/components/Calendario";
import { CustomCalendar, Layout } from "@/components";
import { Modal2 } from "@/components/Modal/excluir";
import { EVENTS } from "@/contants/events";
import { useAgendamento } from "@/service";

import { resourceMap } from "./const";

export default function Agenda() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<CustomCalendarEvent>();

  const { data: dataAgendamento } = useAgendamento();

  console.log(dataAgendamento);

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
    (data: CustomCalendarEvent) => {
      setData(data), setIsModalOpen(!isModalOpen);
    },
    [isModalOpen],
  );

  return (
    <div>
      <Layout pageTitle="Agenda">
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
        <Modal2
          onClose={() => setIsModalOpen(!isModalOpen)}
          isOpen={isModalOpen}
          dados={data}
        />
      </Layout>
    </div>
  );
}
