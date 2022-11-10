import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

// Form component, used to display the UI for adding or editing an appointment
export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  // Function for checking if the student/interviewer fields are blank. Deletes error on validation.
  function validate() {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    };

    if (interviewer === null) {
      setError("Please select an interviewer");
      return;
    };

    setError("");
    props.onSave(student, interviewer);
  };

  // Function for resetting student, interviewer, and error on cancellation
  const reset = () => {
    setStudent("");
    setInterviewer(null);
    setError("");
  };
  
  // Function for cancelling the appointment changes, callback function to onCancel
  const cancel = () => {
    reset();
    props.onCancel();
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  );
};