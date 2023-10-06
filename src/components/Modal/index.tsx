import { CustomCalendarEvent } from "@/@types/type";
import { ModalProps } from "./types";
import { useState } from "react";

export function Modal({ isOpen, onClose, onSave, dados }: ModalProps) {
  const [eventData, setEventData] = useState<CustomCalendarEvent>(
    dados || ({} as CustomCalendarEvent),
  );

  if (!isOpen) return null;

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;

  //   setEventData((prevData) => {
  //     const updatedAppointment = {
  //       ...prevData.data?.appointment,
  //       [name]: value,
  //       professor: prevData.data?.appointment.professor || "",
  //     };

  //     return {
  //       ...prevData,
  //       data: {
  //         appointment: updatedAppointment,
  //       },
  //     };
  //   });
  // };

  const handleSave = () => {
    if (onSave) {
      onSave(eventData);
    }
    onClose();
  };

  function formatDate(date: Date) {
    var day = ("0" + date.getDate()).slice(-2);
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var year = date.getFullYear();
    var hours = ("0" + date.getHours()).slice(-2);
    var minutes = ("0" + date.getMinutes()).slice(-2);

    return year + "-" + month + "-" + day + "T" + hours + ":" + minutes;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="z-50 w-500 rounded-lg bg-white p-4 shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Agendar Sala</h2>
          <div className="mt-10 flex w-full items-center justify-center">
            <label className="mr-5">Nome do Professor:</label>
            <input
              type="text"
              placeholder="Nome do Professor"
              value={dados?.data?.appointment.professor}
              onChange={(e) =>
                setEventData({
                  ...eventData,
                  data: {
                    appointment: {
                      professor: e.target.value,
                    },
                  },
                })
              }
              className="select-none rounded-md border-2 border-gray-300 p-2"
            />
          </div>
          <div className="mb-5 mt-5 flex gap-3">
            <div>
              <label className="mr-5">Data Inicio:</label>
              <input
                type="datetime-local"
                placeholder="Data"
                name="start"
                value={dados?.start && formatDate(dados!.start!)}
                onChange={(e) =>
                  setEventData({
                    ...eventData,
                    start: new Date(e.target.value),
                  })
                }
                className="rounded-md border-2 border-gray-300 p-2"
              />
            </div>
            <div>
              <label className="mr-5">Data Fim:</label>
              <input
                type="datetime-local"
                placeholder="Data"
                name="end"
                value={dados?.start && formatDate(dados!.end!)}
                onChange={(e) =>
                  setEventData({ ...eventData, end: new Date(e.target.value) })
                }
                className="rounded-md border-2 border-gray-300 p-2"
              />
            </div>
          </div>
          <div className="flex justify-center gap-5">
            <button
              className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-primary-100"
              onClick={handleSave}
            >
              Salvar
            </button>
            <button
              className="mt-4 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
              onClick={onClose}
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
