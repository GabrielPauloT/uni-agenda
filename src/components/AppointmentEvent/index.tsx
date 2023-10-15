import React from "react";
import { EventProps } from "react-big-calendar";

import { AgendaEventType } from "@/@types";

type Arroz = {
  data: EventProps<AgendaEventType>;
};

// import { AppointmentStatusCode, EVENT_STATUS_COLORS } from "./const";
export function AppointmentEvent({ data }: Arroz) {
  //   const background = EVENT_STATUS_COLORS[status as AppointmentStatusCode];
  return (
    <div className={`h-full p-1 text-black`}>
      <div className="flex items-center justify-between">
        <div className="flex ">
          <p className="text-xs text-white">
            Responsável: {data.event.Solicitante}
          </p>
        </div>
        {/* <div className="flex">
          <p className="text-xs">{resource}</p>
        </div> */}
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
