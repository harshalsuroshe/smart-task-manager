import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Setup the localizer for the calendar using date-fns
const locales = {
  'en-US': enUS,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarView = ({ tasks }) => {
  // 1. Map your TaskFlow tasks into the 'event' format the calendar requires
  const events = tasks.map(task => {
    // Assuming your tasks have a 'dueDate' field. If not, we fallback to today.
    // Adjust 'task.dueDate' if your property is named differently!
    const taskDate = task.dueDate ? new Date(task.dueDate) : new Date(); 
    
    return {
      title: task.title,
      start: taskDate,
      end: taskDate,
      allDay: true, // Tasks typically show as all-day events unless they have specific times
      taskDetails: task // Keep the original task data just in case
    };
  });

  // 2. Custom styling to match your dark/light mode surface colors
  return (
    <div style={{ 
      backgroundColor: "var(--surface)", 
      padding: "20px", 
      borderRadius: "12px",
      boxShadow: "0 4px 6px rgba(0,0,0,0.05)"
    }}>
      <h2 style={{ marginBottom: "20px", color: "var(--text-primary)" }}>Calendar</h2>
      
      <div style={{ height: "600px" }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          views={['month', 'week', 'agenda']} // Allow switching between Month, Week, and Agenda views
          // Optional: Color code tasks based on their status
          eventPropGetter={(event) => {
            let backgroundColor = "#4F46E5"; // Default primary color
            if (event.taskDetails?.status === "COMPLETED") backgroundColor = "#10B981"; // Green
            if (event.taskDetails?.status === "PENDING") backgroundColor = "#F59E0B"; // Orange
            
            return { style: { backgroundColor, color: "white", border: "none" } };
          }}
        />
      </div>
    </div>
  );
};

export default CalendarView;