import { CustomCalendarEvent } from "@/@types/type";

const day = new Date().getUTCDate();
const month = new Date().getUTCMonth();

export const EVENTS: CustomCalendarEvent[] = [
  {
    resourceId: 1,
    start: new Date(2023, month, day, 11, 50, 0),
    end: new Date(2023, month, day, 13, 30, 0),
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
    start: new Date(2023, month, day, 6, 50, 0),
    end: new Date(2023, month, day, 7, 40, 0),
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
    start: new Date(2023, month, day, 15, 50, 0),
    end: new Date(2023, month, day, 17, 40, 0),
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
    start: new Date(2023, month, day, 6, 0),
    end: new Date(2023, month, day, 7, 50, 0),
    data: {
      appointment: {
        id: 4,
        professor: "Eder",
      },
    },
    isDraggable: true,
  },
  {
    resourceId: 5,
    start: new Date(2023, month, 2, 10, 0),
    end: new Date(2023, month, 2, 13, 50, 0),
    data: {
      appointment: {
        id: 5,
        professor: "Eder",
      },
    },
    isDraggable: true,
  },
];
