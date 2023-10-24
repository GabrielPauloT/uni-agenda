"use client";

import { useCallback, useState } from "react";
import { SlotInfo } from "react-big-calendar/";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [toast, setToast] = useState<ToastStateType>();
  const [agendamento, setAgendamento] = useState<AgendaEventType>();
  const [criacaoAgendamentoAtual, setCriacaoAgendamentoAtual] =
    useState<CriacaoAgendamentoType>();
  const [title, setTitle] = useState("");

  const formMethods = useForm<AgendaEventType>();

  const closeModal = () => {
    formMethods.reset();
    // setAgendamento(undefined);
    // setCriacaoAgendamentoAtual(undefined);
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
          id: item.Id,
          resourceId: item.Sala.id,
          start: dataHora,
          end: dataHoraFinal,
          idAgendamento: appointment.id,
          dataAgendamento: appointment.data,
          tema: item.Tema,
          Solicitante: item.Solicitante.nome,
          horaInical: item.HoraInicial,
          horaFinal: item.HoraFinal,
          dataInicial: item.DataInicio,
          dataFinal: item.DataFinal,
          falta: Boolean(item?.Falta[appointment.data]),
        };
      });

      return appointments;
    }).flat() || [];

  const handleSelectSlot = useCallback(
    ({ start, end, resourceId }: SlotInfo) => {
      // dados da tabela
      setCriacaoAgendamentoAtual({
        start: start,
        end: end,
        resourceId: resourceId,
      });
      setTitle("Criar Agendamento");
      setIsModalOpen(true);
    },
    [],
  );

  const onSubmit: SubmitHandler<AgendaEventType> = (data) => {
    if (!(criacaoAgendamentoAtual && agendamento)) return;

    // const horaInicial = moment(criacaoAgendamentoAtual.start).format("HH:mm");
    // const horaFinal = moment(criacaoAgendamentoAtual.end).format("HH:mm");
    // // const agendamentoData: CreateAgendamentoType = {

    //   HoraInicial: horaInicial,
    //   HoraFinal: horaFinal,
    //   DataInicio: criacaoAgendamentoAtual.start,
    //   DataFinal: criacaoAgendamentoAtual.end,
    //   IdSala: criacaoAgendamentoAtual.resourceId as number,
    //   DiaSemana: agendamento.DiaSemana,
    //   IdUsuario: agendamento.usuario.id,
    //   IdSolicitante: agendamento.Solicitante.id,
    //   Tema: agendamento.tema,
    // };
    const agendamentoData: CreateAgendamentoType = {
      HoraInicial: data.horaInical,
      HoraFinal: data.horaFinal,
      DataInicio: data.start,
      DataFinal: data.end,
      IdSala: Number(data.resourceId),
      // @ts-expect-error
      DiaSemana: data.DiaSemana.map((item) => parseInt(item.value)),
      IdUsuario: 1, //TODO PEGAR DO LOGIN
      IdSolicitante: Number(data.IdSoliciante),
      Tema: data.tema,
    };
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
    closeModal();
  };

  const handleSelectEvent = useCallback(
    (data: AgendaEventType) => {
      setTitle("Editar agendamento");
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
              dataTableCreated={criacaoAgendamentoAtual}
              data={agendamento}
              isEdit={title !== "Criar Agendamento"}
              onClick={closeModal}
              onSubmit={formMethods.handleSubmit(onSubmit)}
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
              onChageFalta={(e) => {
                console.log(e.target.checked, e);
                setAgendamento({
                  ...agendamento,
                  falta: e.target.checked,
                } as AgendaEventType);
              }}
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
