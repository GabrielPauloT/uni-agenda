"use client";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "moment/locale/pt-br";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "./index.css";
import AppointmentEvent from "../AppointmentEvent";
import { CustomCalendarProps } from "./types";
import { CustomCalendarEvent } from "@/types/type";

moment.locale("pt-br");

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

export default function CustomCalendar({
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
    event: ({ event }: any) => {
      if (event?.data?.appointment)
        return <AppointmentEvent appointment={event?.data?.appointment} />;
      // if (data?.blockout) return <BlockoutEvent blockout={data?.blockout} />;
      return null;
    },
  };

  const Year = new Date().getFullYear();

  return (
    <div className="mt-0 rounded-lg bg-white p-4 shadow-md max-md:ml-2 max-md:mt-16">
      <DnDCalendar
        draggableAccessor={(event: CustomCalendarEvent) =>
          event.isDraggable === true
        }
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
        min={new Date(Year, 0, 1, 6, 0)}
        max={new Date(Year, 11, 31, 22, 50)}
        messages={messages}
        onRangeChange={(range) => console.log(range)}
        resizable={resizable}
        onEventResize={onEventResize}
        onEventDrop={onEventDrop}
        events={event}
        onSelectSlot={onSelectSlot}
        onSelectEvent={onSelectEvent}
      />
    </div>
  );
}
