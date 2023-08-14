// import { CustomCalendarEvent } from '@/config/types/type';
// import { useState, useEffect } from 'react';

// interface EventFormProps {
//     addEvent: (event: CustomCalendarEvent) => void;
//     showAddEventForm: boolean;
//     editingEvent: CustomCalendarEvent | null;
//     updateEvent: (event: CustomCalendarEvent) => void;
//     setEditingEvent: (event: CustomCalendarEvent | null) => void;
//   }

// export default function EventForm({
//     addEvent,
//     showAddEventForm,
//     editingEvent,
//     updateEvent,
//     setEditingEvent
// }: EventFormProps) {
//   const [professor, setProfessor] = useState('');
//   const [start, setStart] = useState(new Date());
//   const [end, setEnd] = useState(new Date());
//   const [resourceId, setResourceId] = useState(1);

//   useEffect(() => {
//     if (editingEvent) {
//       setProfessor(editingEvent.data.appointment.professor);
//       setStart(editingEvent.start);
//       setEnd(editingEvent.end);
//       setResourceId(editingEvent.resourceId);
//     } else {
//       setProfessor('');
//       setStart(new Date());
//       setEnd(new Date());
//       setResourceId(1);
//     }
//   }, [editingEvent]);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const newEvent: CustomCalendarEvent = {
//       data: {
//         appointment: {
//             professor,
//         }
//       },
//       start,
//       end,
//       resourceId,
//     };

//     if (editingEvent) {
//         setProfessor(editingEvent.data.appointment.professor);
//         setStart(editingEvent.start);
//         setEnd(editingEvent.end);
//         setResourceId(editingEvent.resourceId);
    
//         setEditingEvent(null);
//     } else {
//         setProfessor('');
//         setStart(new Date());
//         setEnd(new Date());
//         setResourceId(1);
//     }

//     setProfessor('');
//     setStart(new Date());
//     setEnd(new Date());
//     setResourceId(1);
//     if (editingEvent) {
//         setEditingEvent(null);
//     }
//   };

//   if (!showAddEventForm) {
//     return null;
//   }

//   return (
//     <div>
//       <h2>{editingEvent ? 'Editar Evento' : 'Adicionar Novo Evento'}</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={professor}
//           onChange={(e) => setProfessor(e.target.value)}
//           placeholder="Título"
//         />
//         <input
//           type="datetime-local"
//           value={start.toISOString().slice(0, -1)}
//           onChange={(e) => setStart(new Date(e.target.value))}
//         />
//         <input
//           type="datetime-local"
//           value={end.toISOString().slice(0, -1)}
//           onChange={(e) => setEnd(new Date(e.target.value))}
//         />
//         <select
//           value={resourceId}
//           onChange={(e) => setResourceId(Number(e.target.value))}
//         >
//           {/* Opções para selecionar o resourceId */}
//         </select>
//         <button type="submit">{editingEvent ? 'Editar' : 'Adicionar'}</button>
//       </form>
//     </div>
//   );
// }
