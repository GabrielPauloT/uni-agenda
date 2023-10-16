"use client";

import { useCallback, useState } from "react";
import { SlotInfo } from "react-big-calendar/";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import moment from "moment";

import { ReactQueryKeysEnum } from "@/@types";
import { AgendaEventType } from "@/@types/Components";
import { CustomCalendar, Layout, Modal } from "@/components";
import {
  CreateAgendamentoType,
  useAgendamento,
  useCreateAgendamento,
} from "@/service";
import { useSala } from "@/service/hooks/SalaQuery";
import { useQueryClient } from "@tanstack/react-query";

import { ToastStateType } from "../usuario/type";

import { ModalInputAgenda } from "./modalInput";
import { CriacaoAgendamentoType } from "./type";
export default function Agenda() {
  const queryCliente = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState<ToastStateType>();
  const [agendamento, setAgendamento] = useState<AgendaEventType>();
  const [criacaoAgendamentoAtual, setCriacaoAgendamentoAtual] =
    useState<CriacaoAgendamentoType>();
  const [title, setTitle] = useState("");

  const formMethods = useForm<AgendaEventType>();

  const closeModal = () => {
    formMethods.reset();
    // resetData();
    setIsModalOpen(false);
  };

  const { data: dataSalas } = useSala(1, 100);

  const { data: dataAgenda } = useAgendamento();

  const createAgendamentoMutation = useCreateAgendamento();

  const OmmitDataSala = dataSalas?.Result?.map((item) => {
    return {
      id: item.id,
      title: item.nome + " - " + item.capacidade,
    };
  });

  const showSuccessToast = (message: string) => {
    setToast({ type: "success", message });
  };

  const showErrorToast = (message: string) => {
    setToast({ type: "error", message });
  };

  const OmmitDataAgenda =
    dataAgenda?.Result.map((item) => {
      const appointments = item.Appoiments.map((appointment) => {
        const dataHora = new Date(appointment.data + "T" + item.HoraInicial);
        const dataHoraFinal = new Date(appointment.data + "T" + item.HoraFinal);
        return {
          resourceId: item.IdSala,
          start: dataHora,
          end: dataHoraFinal,
          idAgendamento: appointment.id,
          tema: item.Tema,
          Solicitante: item.Solicitante,
          horaInical: item.HoraInicial,
          horaFinal: item.HoraFinal,
          dataInicial: item.DataInicio,
          dataFinal: item.DataFinal,
          falta: Boolean(item?.Falta[appointment.data]),
        };
      });

      return appointments;
    }).flat() || [];

  // const [events, setEvents] = useState<CustomCalendarEventType[]>(EVENTS);
  // const onChangeEventTime = useCallback(
  //   (
  //     start: Date,
  //     end: Date,
  //     appointmentId: number | undefined,
  //     resourceId: number,
  //   ) => {
  //     setEvents(() => {
  //       return [
  //         ...EVENTS.map((event) =>
  //           event?.data?.appointment?.id === appointmentId
  //             ? {
  //                 ...event,
  //                 start: moment(start)?.toDate(),
  //                 end: moment(end)?.toDate(),
  //                 resourceId: resourceId,
  //               }
  //             : event,
  //         ),
  //       ];
  //     });
  //   },
  //   [],
  // );

  // const handleSelectSlot = useCallback(
  //   ({ start, end, resourceId }: SlotInfo) => {
  //     const professor = window.prompt("Nome do Responsável");
  //     const id = Math.floor(Math.random() * 1000);
  //     if (professor) {
  //       setEvents((prev) => [
  //         ...prev,
  //         {
  //           start,
  //           end,
  //           isDraggable: true,
  //           data: {
  //             appointment: {
  //               id,
  //               professor,
  //             },
  //           },
  //           resourceId,
  //         },
  //       ]);
  //     }
  //   },
  //   [setEvents],
  // );

  const handleSelectSlot = useCallback(
    ({ start, end, resourceId }: SlotInfo) => {
      setCriacaoAgendamentoAtual({
        start: start,
        end: end,
        resourceId: resourceId,
      });
      setIsModalOpen(true);
    },
    [],
  );

  const onSubmit: SubmitHandler<AgendaEventType> = (data) => {
    console.log(data);
    // if (title === "Editar Usuario") {
    //   updateUsuarioMutation
    //     .mutateAsync({
    //       userId: userData.Id,
    //       usuarioData: data,
    //     })
    //     .then(() => {
    //       showSuccessToast("Usuario atualizado com sucesso");
    //       queryCliente.invalidateQueries([ReactQueryKeysEnum.USUARIO_FINDALL]);
    //     })
    //     .catch(() => {
    //       showErrorToast("Erro ao atualizar usuario");
    //     });
    // } else if (title === "Cadastrar Usuario") {
    if (!(criacaoAgendamentoAtual && agendamento)) return;
    const horaInicial = moment(criacaoAgendamentoAtual.start).format("HH:mm");
    const horaFinal = moment(criacaoAgendamentoAtual.end).format("HH:mm");
    const agendamentoData: CreateAgendamentoType = {
      ...data,
      HoraInicial: horaInicial,
      HoraFinal: horaFinal,
      DataInicio: criacaoAgendamentoAtual.start,
      DataFinal: criacaoAgendamentoAtual.end,
      IdSala: criacaoAgendamentoAtual.resourceId as number,
      DiaSemana: agendamento.DiaSemana,
      IdUsuario: agendamento.usuario.id,
      IdSolicitante: agendamento.Solicitante.id,
      Tema: agendamento.tema,
    };

    console.log(
      criacaoAgendamentoAtual?.resourceId,
      typeof criacaoAgendamentoAtual?.resourceId,
    );
    createAgendamentoMutation
      .mutateAsync(agendamentoData)
      .then(() => {
        showSuccessToast("Agendamento cadastrado com sucesso");
        queryCliente.invalidateQueries([
          ReactQueryKeysEnum.AGENDAMENTO_FINDALL,
        ]);
      })
      .catch(() => {
        showErrorToast("Erro ao cadastra o agendamento");
      });
    // }
    closeModal();
  };

  const handleSelectEvent = useCallback(
    (data: AgendaEventType) => {
      setTitle(`Editar agendamento do ${data.Solicitante}`);
      setAgendamento(data), setIsModalOpen(!isModalOpen);
    },
    [isModalOpen],
  );

  return (
    <div>
      <Layout pageTitle="Agenda">
        <CustomCalendar
          defaultView="day"
          views={["day"]}
          resourceMap={OmmitDataSala}
          resizable
          event={OmmitDataAgenda}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
        />
        <FormProvider {...formMethods}>
          <Modal isOpen={isModalOpen} title={title}>
            <ModalInputAgenda
              data={agendamento}
              isEdit={!(title === "Editar Usuario")}
              onClick={closeModal}
              onSubmit={formMethods.handleSubmit(onSubmit)}
              onChageNome={(e) =>
                setAgendamento({
                  ...agendamento,
                  Solicitante: {
                    nome: e.target.value,
                  },
                } as AgendaEventType)
              }
              onChageDataFim={(e) =>
                setAgendamento({
                  ...agendamento,
                  dataFinal: e.target.value,
                } as AgendaEventType)
              }
              onChageDataIni={(e) =>
                setAgendamento({
                  ...agendamento,
                  dataInicial: e.target.value,
                } as AgendaEventType)
              }
              onChageHoraIni={(e) =>
                setAgendamento({
                  ...agendamento,
                  horaInical: e.target.value,
                } as AgendaEventType)
              }
              onChageHoraFim={(e) =>
                setAgendamento({
                  ...agendamento,
                  horaFinal: e.target.value,
                } as AgendaEventType)
              }
              onChageFalta={(e) =>
                setAgendamento({
                  ...agendamento,
                  falta: e.target.checked,
                } as AgendaEventType)
              }
              onChageTema={(e) =>
                setAgendamento({
                  ...agendamento,
                  tema: e.target.value,
                } as AgendaEventType)
              }
            />
          </Modal>
        </FormProvider>
      </Layout>
    </div>
  );
}
