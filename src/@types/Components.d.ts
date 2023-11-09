import { DiaSemanaEnum } from ".";

export type UsuarioType = {
  id: number;
  nome: string;
  email: string;
  senha: string;
  createdat?: Date;
  updatedat?: Date;
};

export type SalaType = {
  id: number;
  idtiposala: number;
  nomedasala: string;
  capacidade: number;
  createdat?: Date;
  updatedat?: Date;
};

export type SolicitanteType = {
  id: number;
  idtiposolicitante: number;
  nome: string;
  email: string;
  criadoEm?: Date;
  atualizadoEm?: Date;
};

export type AgendaEventType = {
  id: number;
  IdSoliciante: number;
  resourceId: number;
  start: Date;
  end: Date;
  idAgendamento: number;
  dataAgendamento: Date;
  tema: string;
  sala: SalaType;
  Solicitante: SolicitanteType;
  usuario: UsuarioType;
  DiaSemana: DiaSemanaEnum[];
  falta: Record<string, boolean> | boolean;
  horaInical: string;
  horaFinal: string;
  dataInicial: string;
  dataFinal: string;
  idHorarioAlterado: number;
};

declare module "react-big-calendar/" {
  export interface Components<
    AgendaEventType,
    TResource extends object = object,
  > {
    event?: React.ComponentType<EventProps<AgendaEventType>> | undefined;
    eventWrapper?:
      | React.ComponentType<EventWrapperProps<AgendaEventType>>
      | undefined;
    eventContainerWrapper?: React.ComponentType | undefined;
    dateCellWrapper?: React.ComponentType<DateCellWrapperProps> | undefined;
    dayColumnWrapper?: React.ComponentType | undefined;
    timeSlotWrapper?: React.ComponentType | undefined;
    timeGutterHeader?: React.ComponentType | undefined;
    timeGutterWrapper?: React.ComponentType | undefined;
    toolbar?:
      | React.ComponentType<ToolbarProps<AgendaEventType, TResource>>
      | undefined;
    agenda?:
      | {
          date?: React.ComponentType | undefined;
          time?: React.ComponentType | undefined;
          event?: React.ComponentType<EventProps<AgendaEventType>> | undefined;
        }
      | undefined;
    day?:
      | {
          header?: React.ComponentType<HeaderProps> | undefined;
          event?: React.ComponentType<EventProps<AgendaEventType>> | undefined;
        }
      | undefined;
    week?:
      | {
          header?: React.ComponentType<HeaderProps> | undefined;
          event?: React.ComponentType<EventProps<AgendaEventType>> | undefined;
        }
      | undefined;
    work_week?:
      | {
          header?: React.ComponentType<HeaderProps> | undefined;
          event?: React.ComponentType<EventProps<AgendaEventType>> | undefined;
        }
      | undefined;
    month?:
      | {
          header?: React.ComponentType<HeaderProps> | undefined;
          dateHeader?: React.ComponentType<DateHeaderProps> | undefined;
          event?: React.ComponentType<EventProps<AgendaEventType>> | undefined;
        }
      | undefined;
    /**
     * component used as a header for each column in the TimeGridHeader
     */
    header?: React.ComponentType<HeaderProps> | undefined;
    resourceHeader?:
      | React.ComponentType<ResourceHeaderProps<TResource>>
      | undefined;
  }
}
