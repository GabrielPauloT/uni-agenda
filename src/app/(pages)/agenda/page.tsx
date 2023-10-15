"use client";

import { CustomCalendar, Layout } from "@/components";
import { useAgendamento } from "@/service";
import { useSala } from "@/service/hooks/SalaQuery";

export default function Agenda() {
  // const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: dataSalas } = useSala(1, 100);

  const { data: dataAgenda } = useAgendamento();

  const OmmitDataSala = dataSalas?.Result?.map((item) => {
    return {
      id: item.id,
      title: item.nome + " - " + item.capacidade,
    };
  });

  const OmmitDataAgenda = dataAgenda?.Result.map((item) => {
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
      };
    });

    return appointments;
  }).flat();

  // console.log(OmmitDataAgenda);

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

  // const handleSelectEvent = useCallback(
  //   (data: CustomCalendarEventType) => {
  //     setData(data), setIsModalOpen(!isModalOpen);
  //   },
  //   [isModalOpen],
  // );

  return (
    <div>
      <Layout pageTitle="Agenda">
        <CustomCalendar
          defaultView="day"
          views={["day"]}
          resourceMap={OmmitDataSala}
          resizable
          event={OmmitDataAgenda}
        />
      </Layout>
    </div>
  );
}
