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

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  for (let interviewer in state.interviewers) {
    if (state.interviewers[interviewer].id === interview.interviewer) {
      const interviewerInfo = {
        "student": interview.student,
        "interviewer": state.interviewers[interview.interviewer]
      }
      return interviewerInfo;
    }
  }
}