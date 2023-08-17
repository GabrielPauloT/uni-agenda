import React from "react";
import { AppointmentStatusCode, EVENT_STATUS_COLORS } from "./const";
import { Appointment } from "@/types/type";

export default function AppointmentEvent({
  appointment,
}: {
  appointment: Appointment | undefined;
}) {
  //   const background = EVENT_STATUS_COLORS[status as AppointmentStatusCode];
  return (
    <div className={`h-full p-1 text-black`}>
      <div className="flex items-center justify-between">
        <div className="flex ">
          <p className="text-xs text-white">
            Responsável: {appointment?.professor}
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
