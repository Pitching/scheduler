export function getAppointmentsForDay(state, day) {
  let result = [];
  for (let each of state.days) {
    if (each.name === day) {
      for (let appointment of each.appointments) {
        result.push(state.appointments[appointment]);
      }
    }
  }
  return result;
}

export function getInterviewersForDay(state, day) {
  let result = [];
  for (let each of state.days) {
    if (each.name === day) {
      for (let interviewer of each.interviewers) {
        result.push(state.interviewers[interviewer])
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