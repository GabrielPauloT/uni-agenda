"use client"
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/pt-br'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import './index.css';
import AppointmentEvent from '../AppointmentEvent';
import { CustomCalendarProps } from './types';

moment.locale('pt-br');

const resourceMap = [
  { id: 1, title: 'Sala 1' },
  { id: 2, title: 'Sala 2' },
  { id: 3, title: 'Sala 3' },
  { id: 4, title: 'Sala 4' },
  { id: 5, title: 'Sala 5' },
  { id: 6, title: 'Sala 6' },
  { id: 7, title: 'Sala 7' },
  { id: 8, title: 'Sala 8' },
];

const messages = {
  today: 'Hoje',
  previous: 'Voltar',
  next: 'Próximo',
};

const localizer = momentLocalizer(moment);

const DnDCalendar = withDragAndDrop(Calendar)

export default function CustomCalendar({event, resizable, onEventResize, onEventDrop, onSelectSlot, onSelectEvent}: CustomCalendarProps) {

  const components = {
    event: ({ event }: any) => {
      if (event?.data?.appointment)
        return <AppointmentEvent appointment={event?.data?.appointment} />;
      // if (data?.blockout) return <BlockoutEvent blockout={data?.blockout} />;
      return null;
    },
  };

  const Year = new Date().getFullYear();

  return (
      <div className="rounded-lg bg-white p-4 shadow-md">
        <DnDCalendar
          selectable
          components={components}
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="day"
          views={['day']}
          step={50}
          timeslots={1}
          resources={resourceMap}
          formats={
            {
              dayHeaderFormat: (date) => 
                moment(date).format("ddd")
                .charAt(0)
                .toUpperCase()
                 + 
                moment(date)
                .format("dddd, DD/MM/YYYY")
                .slice(1)
            }
          }
          min={new Date(Year, 0, 1, 6, 0)}
          max={new Date(Year, 11, 31, 22, 50)}
          messages={messages}
          resizable={resizable}
          onEventResize={onEventResize}
          onEventDrop={onEventDrop}
          events={event}
          onSelectSlot={onSelectSlot}
          onSelectEvent={onSelectEvent}
        />
      </div>
  );
};