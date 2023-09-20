import React, { useState } from "react";
import { ModalProps, CustomCalendarEvent, Appointment } from "@/types/type";

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSave }) => {
  const [eventData, setEventData] = useState<CustomCalendarEvent>({
    data: {
      appointment: {
        id: 0,
        professor: "",
      },
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setEventData((prevData) => ({
      ...prevData,
      data: {
        ...prevData.data,
        appointment: {
          ...prevData.data?.appointment,
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
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="z-50 rounded-lg bg-white p-4 shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Agendar Evento</h2>
          <input
            type="text"
            placeholder="Nome"
            className="mt-2 w-full p-2"
            name="professor"
            value={eventData.data?.appointment.professor}
            onChange={handleInputChange}
          />
          <input
            type="date"
            placeholder="Data"
            className="mt-2 w-full p-2"
            name="start"
            value={eventData.start?.toISOString().split("T")[0]}
            onChange={(e) =>
              setEventData({ ...eventData, start: new Date(e.target.value) })
            }
          />
          {/* Outros campos e botões aqui */}
          <button
            className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
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
  );
};

export default Modal;
