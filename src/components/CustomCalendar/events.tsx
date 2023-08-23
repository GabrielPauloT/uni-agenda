import { CustomCalendarEvent } from "@/types/type";

const Day = new Date().getUTCDate();

export const EVENTS: CustomCalendarEvent[] = [
  {
    resourceId: 1,
    start: new Date(2023, 7, Day, 11, 50, 0),
    end: new Date(2023, 7, Day, 13, 30, 0),
    data: {
      appointment: {
        id: 1,
        professor: "Henaldo",
      },
    },
    isDraggable: true,
  },
  {
    resourceId: 2,
    start: new Date(2023, 7, Day, 6, 50, 0),
    end: new Date(2023, 7, Day, 7, 40, 0),
    data: {
      appointment: {
        id: 2,
        professor: "Juliana",
      },
    },
    isDraggable: true,
  },
  {
    resourceId: 1,
    start: new Date(2023, 7, Day, 15, 50, 0),
    end: new Date(2023, 7, Day, 17, 40, 0),
    data: {
      appointment: {
        id: 3,
        professor: "Sandro",
      },
    },
    isDraggable: true,
  },
  {
    resourceId: 5,
    start: new Date(2023, 7, Day, 6, 0),
    end: new Date(2023, 7, Day, 7, 50, 0),
    data: {
      appointment: {
        id: 4,
        professor: "Eder",
      },
    },
    isDraggable: true,
  },
];
