import React from "react";
// import { EventProps } from "react-big-calendar";

// import { AgendaEventType } from "@/@types/Components";

// import { AgendaEventType } from "@/@types";

type EventType = {
  data: any /* EventProps<AgendaEventType> */;
};

// import { AppointmentStatusCode, EVENT_STATUS_COLORS } from "./const";
export function AppointmentEvent({ data }: EventType) {
  //   const background = EVENT_STATUS_COLORS[status as AppointmentStatusCode];
  return (
    <div className={"h-full p-1"}>
      <div className="flex items-center justify-between">
        <div className="mb-2 flex w-full justify-center border text-center align-middle">
          <p className="text-center text-xs text-white">{data.event.tema}</p>
        </div>
      </div>
      <div className="flex ">
        <p className="text-xs text-white">
          Responsável: {data.event.Solicitante}
        </p>
      </div>
      <div className="mt-4">
        {/* {address.split("\n").map((add, index) => (
          <p key={index} className="text-xs">
            {add}
          </p>
        ))} */}
      </div>
    </div>
  );
}
