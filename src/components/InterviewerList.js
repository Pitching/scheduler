import React from "react";
import "components/InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem";

function InterviewerList(props) {
  const listInterviewers = props.interviewers.map((current) => {
    return (
      <InterviewerListItem
        key={current.id}
        avatar={current.avatar}
        name={current.name}
        selected={current.id === props.value}
        id={current.id}
        setInterviewer={() => props.onChange(current.id)}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {listInterviewers}
      </ul>
    </section>
  )
}

export default InterviewerList;