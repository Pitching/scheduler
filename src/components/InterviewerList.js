import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from 'prop-types';

// InterviewerList component, grabs interviewers object from a given prop and maps each interviewer into its own interviewer icon
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
  );
};

InterviewerList.propTypes = { interviewers: PropTypes.array.isRequired };

export default InterviewerList;