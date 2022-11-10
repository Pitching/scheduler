import React from "react";

// Header component, used to display the times for each appointment 12-5 and seperates them with CSS
export default function Header(props) {
  return (
    <header className="appointment__time">
      <h4 className="text--semi-bold">{props.time}</h4>
      <hr className="appointment__separator" />
    </header>
  );
};