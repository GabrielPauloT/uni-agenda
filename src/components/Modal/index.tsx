import { CustomCalendarEvent } from "@/types/type";
import { ModalProps } from "./types";
import { useState } from "react";

export function Modal({ isOpen, onClose, onSave }: ModalProps) {
  if (!isOpen) return null;

  const initialEventData: CustomCalendarEvent = {
    data: {
      appointment: {
        id: 0,
        professor: "",
      },
    },
  };

  const [eventData, setEventData] =
    useState<CustomCalendarEvent>(initialEventData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setEventData((prevData) => ({
      ...prevData,
      data: {
        ...prevData.data,
        appointment: {
          ...prevData.data.appointment,
          [name]: value,
        },
      },
    }));
  };

  const handleSave = () => {
    if (onSave) {
      onSave(eventData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="z-50 rounded-lg bg-white p-4 shadow-lg">
        {/* Elementos */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Agendar Sala</h2>
          <input
            type="text"
            placeholder="Nome do Professor"
            className="mt-2 w-full select-none p-2"
          />
          <input
            type="datetime-local"
            placeholder="Data"
            name="start"
            value={eventData.start?.toISOString().split("T")[0]}
            onChange={(e) =>
              setEventData({ ...eventData, start: new Date(e.target.value) })
            }
            className="mt-2 p-2"
          />
          <input
            type="datetime-local"
            placeholder="Data"
            name="end"
            value={eventData.end?.toISOString().split("T")[0]}
            onChange={(e) =>
              setEventData({ ...eventData, end: new Date(e.target.value) })
            }
            className="mt-2 p-2"
          />
          {/* Outros campos e botões aqui */}
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
