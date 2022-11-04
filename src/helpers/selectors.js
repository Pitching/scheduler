import React from "react";

export function getAppointmentsForDay(state, day) {
  let result = [];
  for (let each of state.days) {
    if (each.name === day) {
      for (let appointment of each.appointments) {
        if (appointment === state.appointments[appointment].id) {
          result.push(state.appointments[appointment]);
        }
      }
    }
  }
  return result;
}