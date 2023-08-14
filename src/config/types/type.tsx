export type Appointment = {
    id: number;
    professor: string;
  };
  
  export type CustomCalendarEvent = {
    resourceId?: number;
    start?: Date;
    end?: Date;
    data?: { appointment: Appointment };
    isDraggable?: boolean;
  };