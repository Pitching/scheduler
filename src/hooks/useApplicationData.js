import { useState, useEffect } from "react";
import axios from "axios";

export function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // Function used to update in real time the remaining spots for each day if an interview is booked
  const updateSpots = function (appointments, days) {
    let spots = 0;
    const day = days.find(ind => ind.name === state.day);
    for (const appointmentID of day.appointments) {
      let appointment = appointments[appointmentID];
      if (appointment && !appointment.interview) {
        spots++;
      };
    };
    let newDay = {...day, spots};
    const newDayArr = days.map((each) => each.name === state.day ? newDay : each);
    return newDayArr;
  };

  // Function used to make a put axios request to the appointments list in the database at the given ID and update the state with the new interview
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        const days = updateSpots(appointments, state.days);
        setState({ ...state, days, appointments });
      });
  };

  // Function used to make an axios delete reqeust to the appointments list in the database at the given ID and update the state with the deleted interview
  function deleteInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        const days = updateSpots(appointments, state.days);
        setState({ ...state, days, appointments });
      });
  };

  // Update the appointments list with the information from the database
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then(all => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
    })
  }, []);

  const setDay = day => setState({ ...state, day });
  return { state, setDay, bookInterview, deleteInterview };
};