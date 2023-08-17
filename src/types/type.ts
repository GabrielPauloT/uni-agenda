export type Appointment = {
  id: number;
  professor: string;
};

export type CustomCalendarEvent = {
  resourceId?: number | string | undefined;
  start?: Date;
  end?: Date;
  data?: { appointment: Appointment };
  isDraggable: boolean;
};
