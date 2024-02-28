"use client";
import "moment/locale/pt-br";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./index.css";

import { Calendar, EventProps, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import moment from "moment";

import { AgendaEventType } from "@/@types/Components";

import { CustomCalendarProps } from "./types";

import { AppointmentEvent } from "..";

const messages = {
  today: "Hoje",
  previous: "Voltar",
  next: "Próximo",
};

const localizer = momentLocalizer(moment);

const DnDCalendar = withDragAndDrop(Calendar);

function handleData(data: Date) {
  const today = new Date();
  if (
    data.getDate() === today.getDate() &&
    data.getMonth() === today.getMonth() &&
    data.getFullYear() === today.getFullYear()
  ) {
    return "Hoje" + moment(data).format(", DD/MM/YYYY");
  }
  return (
    moment(data).format("ddd").charAt(0).toUpperCase() +
    moment(data).format("dddd, DD/MM/YYYY").slice(1)
  );
}

export function CustomCalendar({
  event,
  resizable,
  onEventResize,
  onEventDrop,
  onSelectSlot,
  onSelectEvent,
  resourceMap,
  views,
  defaultView,
}: CustomCalendarProps) {
  const components = {
    event: (event: EventProps<AgendaEventType>) => {
      return <AppointmentEvent data={event} />;
    },
  };

  const Year = new Date().getFullYear();

  return (
    <div className="mt-0 h-full max-w-full rounded-lg bg-white px-4 shadow-md max-md:ml-2 max-md:mt-5">
      <DnDCalendar
        // className="max-w-screen-xl "
        // draggableAccessor={(event: AgendaEventType) =>
        //   event.isDraggable === true
        // }
        selectable
        components={components}
        localizer={localizer}
        defaultDate={new Date()}
        defaultView={defaultView}
        views={views}
        step={50}
        timeslots={1}
        resources={resourceMap}
        formats={{
          dayHeaderFormat: (date) => handleData(date),
        }}
        min={new Date(Year - 1, 0, 1, 7, 30)}
        max={new Date(Year, 11, 31, 23, 20)}
        messages={messages}
        onRangeChange={(range) => console.log(range)}
        resizable={resizable}
        onEventResize={onEventResize}
        onEventDrop={onEventDrop}
        events={event}
        onSelectSlot={onSelectSlot}
        onSelectEvent={(event: object) =>
          onSelectEvent(event as AgendaEventType)
        }
      />
    </div>
  );
}
