"use client";

import { useCallback, useMemo, useState } from "react";
import { SlotInfo } from "react-big-calendar/";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import moment from "moment-timezone";

import { ReactQueryKeysEnum } from "@/@types";
import { AgendaEventType } from "@/@types/Components";
import { CustomCalendar, Layout, Modal, Spinner } from "@/components";
import {
  AppointmentType,
  CreateAgendamentoType,
  HorarioAlterado,
  ListarAgendamentoType,
  useAgendamento,
  useCreateAgendamento,
} from "@/service";
import { useSala } from "@/service/hooks/SalaQuery";
import { useTipoSala } from "@/service/hooks/TipoSalaQuery";
import { HorarioAlteradoRequest } from "@/service/requests";
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
  const [tipoSala, setTipoSala] = useState<number | undefined>();
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

  const { data: dataSalas } = useSala(
    1,
    100,
    tipoSala === 0 ? undefined : tipoSala,
  );

  const { data: dataAgenda, refetch: refetchDataAgenda } = useAgendamento();

  const { data: tipoSalas } = useTipoSala(1, 100);

  const tipoSalaConcatPlaceholder = useMemo(() => {
    return [
      { id: 0, nomedotipo: "Selecione a sala" },
      ...(tipoSalas?.Result || []),
    ];
  }, [tipoSalas]);

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

  const checkHorario = (
    horariosAlterados: HorarioAlterado[],
    agendamento: ListarAgendamentoType,
    appoiment: AppointmentType,
  ) => {
    if (horariosAlterados === undefined)
      return {
        horarioInicial: agendamento.HoraInicial,
        horarioFinal: agendamento.HoraFinal,
        idHorarioAlterado: undefined,
      };
    const horarioAlterado = horariosAlterados.find(
      (item) =>
        moment(item.data).tz("America/Sao_Paulo").utc().format("YYYY-MM-DD") ===
        appoiment.data,
    );
    return {
      horarioInicial: horarioAlterado?.horainicial || agendamento.HoraInicial,
      horarioFinal: horarioAlterado?.horafinal || agendamento.HoraFinal,
      idHorarioAlterado: horarioAlterado?.id,
    };
  };

  const OmmitDataAgenda =
    dataAgenda?.Result.map((item) => {
      const appointments = item.Appoiments.map((appointment) => {
        const dataHora = new Date(
          appointment.data +
            "T" +
            checkHorario(item.HorariosAlterados, item, appointment)
              .horarioInicial,
        );
        const dataHoraFinal = new Date(
          appointment.data +
            "T" +
            checkHorario(item.HorariosAlterados, item, appointment)
              .horarioFinal,
        );
        return {
          id: item.Id,
          resourceId: item.Sala.id,
          start: dataHora,
          end: dataHoraFinal,
          idAgendamento: appointment.id,
          dataAgendamento: appointment.data,
          tema: item.Tema,
          Solicitante: item.Solicitante.nome,
          horaInical: checkHorario(item.HorariosAlterados, item, appointment)
            .horarioInicial,
          horaFinal: checkHorario(item.HorariosAlterados, item, appointment)
            .horarioFinal,
          dataInicial: item.DataInicio,
          dataFinal: item.DataFinal,
          falta: Boolean(item?.Falta[appointment.data]),
          idHorarioAlterado: checkHorario(
            item.HorariosAlterados,
            item,
            appointment,
          ).idHorarioAlterado,
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
    // if (!(criacaoAgendamentoAtual && agendamento)) return;
    if (title !== "Criar Agendamento" && agendamento?.id) {
      HorarioAlteradoRequest.createHorarioAlterado({
        data:
          moment(agendamento.dataAgendamento)
            .tz("America/Sao_Paulo")
            .utc()
            .format("YYYY-MM-DD") + "T00:00:00.000Z",
        horainicial: data.horaInical,
        horafinal: data.horaFinal,
        IdHorarioAlterado: agendamento.idHorarioAlterado,
        IdAgendamento: agendamento.id,
      })
        .then(() => {
          showSuccessToast("Agendamento alterado com sucesso");
          refetchDataAgenda();
        })
        .catch(() => {
          showErrorToast("Erro ao alterar o agendamento");
        });
    } else {
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
    }
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
    <>
      <Layout pageTitle="Agenda">
        <div className="mr-10 mt-2 flex justify-end max-md:mt-16 max-md:justify-center">
          <div>
            <label className=" mb-2 block text-sm font-bold text-gray-700">
              Tipo de Salsa:
            </label>
            <select
              title="Lista de salas"
              id="idTipoSala"
              value={tipoSala ? tipoSala : "Selecione a sala"}
              placeholder="Selecione a sala"
              onChange={(tipo) => {
                console.log(tipo.target.value);
                setTipoSala(Number(tipo.target.value));
              }}
              className="h-10 w-full rounded-md border border-gray-300 pl-2 text-sm font-medium text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            >
              {tipoSalaConcatPlaceholder?.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.nomedotipo}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        {tipoSala && tipoSala !== 0 ? (
          <CustomCalendar
            defaultView="day"
            views={["day"]}
            resourceMap={OmmitDataSala}
            resizable
            event={OmmitDataAgenda as any}
            onSelectEvent={handleSelectEvent}
            onSelectSlot={handleSelectSlot}
          />
        ) : (
          // <div className="flex h-full items-center justify-center">
          <div className="m-auto flex h-96 w-auto flex-col items-center justify-center gap-4">
            <h1>Selecione um Tipo de sala</h1>
            <Spinner />
          </div>
          // </div>
        )}
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
    </>
  );
}
