import React from "react";
import {
  AppointmentStatusCode,
  EVENT_STATUS_COLORS,
} from "./const";
import { Appointment } from "@/config/types/type";

export default function AppointmentEvent({
  appointment,
}: {
  appointment: Appointment | undefined;
}) {
//   const background = EVENT_STATUS_COLORS[status as AppointmentStatusCode];
  return (
    <div className={`p-1 h-full text-black`}>
      <div className="flex items-center justify-between">
        <div className="flex ">
          <p className="text-xs text-white">Professor(a): {appointment?.professor}</p>
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
