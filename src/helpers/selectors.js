// Retrieves all of the appointments for the given day parameter
export function getAppointmentsForDay(state, day) {
  let result = [];
  for (let each of state.days) {
    if (each.name === day) {
      for (let appointment of each.appointments) {
        result.push(state.appointments[appointment]);
      };
    };
  };
  return result;
};

// Retrieves all of the interviewers that are booked for the given day parameter
export function getInterviewersForDay(state, day) {
  let result = [];
  const interviewers = state.interviewers;

  for (let each of state.days) {
    if (each.name === day) {
      for (let interviewer of each.interviewers) {
        result.push(interviewers[interviewer])
      };
    };
  };
  return result;
};

// retrieves the interview info (student name and interviewer name) for a given interview parameter. If there is no interview, returns null
export function getInterview(state, interview) {
  const interviewers = state.interviewers;

  if (!interview) {
    return null;
  }
  for (let interviewer in interviewers) {
    if (interviewers[interviewer].id === interview.interviewer) {
      const interviewerInfo = {
        "student": interview.student,
        "interviewer": interviewers[interview.interviewer]
      };
      return interviewerInfo;
    };
  };
};