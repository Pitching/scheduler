import { useState, useEffect } from "react";
import axios from "axios";

export function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  const updateSpots = function (appointments, days) {
    let spots = 0;
    const day = days.find(ind => ind.name === state.day);
    for (const appointmentID of day.appointments) {
      let appointment = appointments[appointmentID];
      if (appointment && !appointment.interview) {
        spots++;
      }
    }
    let newDay = {...day, spots};
    const newDayArr = days.map((each) => each.name === state.day ? newDay : each);
    return newDayArr;
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(() => {
        const days = updateSpots(appointments, state.days);
        setState({ ...state, days, appointments })
      })
  }

  function deleteInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        const days = updateSpots(appointments, state.days);
        setState({ ...state, days, appointments })
      })
  }

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ]).then(all => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
    })
  }, [])

  const setDay = day => setState({ ...state, day });
  console.log(state);
  return { state, setDay, bookInterview, deleteInterview };
}