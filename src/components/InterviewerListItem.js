import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

// InterviewerListItem component, displays all interviewers available for selection as round images
export default function InterviewerListItem(props) {
  let selInterviewer = classNames('interviewers__item', {
    "interviewers__item--selected": props.selected,
  });
  
  return (
    <li className={selInterviewer} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected ? props.name : ''}
    </li>
  );
};