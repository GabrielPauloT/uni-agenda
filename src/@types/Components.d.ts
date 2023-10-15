export type AgendaEventType = {
  resourceId: number;
  start: Date;
  end: Date;
  idAgendamento: number;
  tema: string;
  Solicitante: string;
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
