import React from "react";

import "components/Application.scss";
import DayList from "./DayList";
import "components/Appointment";
import Appointment from "components/Appointment";
import { useApplicationData } from "hooks/useApplicationData";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

// Application component, retrieves state values from useApplicationData hook
export default function Application() {
  const {
    state,
    setDay,
    bookInterview,
    deleteInterview
  } = useApplicationData();

  // Retrieves all the appointments and interviewers for the selected day and maps each into an Appointment component
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);

  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
        deleteInterview={deleteInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
};
