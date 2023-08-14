import { CustomCalendarEvent } from "@/config/types/type";

export const EVENTS: CustomCalendarEvent[] = [
    {
        resourceId: 1,
        start: new Date(2023, 7, 14, 11,50, 0),
        end: new Date(2023, 7, 14, 13,30, 0),
        data: {
            appointment: {
                id: 1,
                professor: 'Henaldo',
            }
        },
        isDraggable: true,
    },
    {
        resourceId: 2,
        start: new Date(2023, 7, 14, 6,50, 0),
        end: new Date(2023, 7, 14, 7,40, 0),
        data: {
            appointment: {
                id: 2,
                professor: 'Juliana',
            }
        },
        isDraggable: true,
    },
    {
        resourceId: 1,
        start: new Date(2023, 7, 14, 15,50, 0),
        end: new Date(2023, 7, 14, 17,40, 0),
        data: {
            appointment: {
                id: 3,
                professor: 'Sandro',
            }
        },
        isDraggable: true,
    },
    {
        resourceId: 5,
        start: new Date(2023, 7, 14, 6, 0),
        end: new Date(2023, 7, 14, 7,50, 0),
        data: {
            appointment: {
                id: 4,
                professor: 'MatheuSÃO da JUJU',
            }
        },
        isDraggable: true,
    },
  ];