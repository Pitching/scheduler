import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

// DayListItem component, displays all days (M-F)
export default function DayListItem(props) {
  let dayClass = classNames ('day-list__item', {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots
  });

  // Checks for spots remaining for that day through a given prop
  const formatSpots = () => {
    if (props.spots === 1) {
      return "1 spot remaining"
    } else if (props.spots === 0) {
      return "no spots remaining";
    };
    return `${props.spots} spots remaining`;
  };
  
  return (
    <li className={dayClass} onClick={props.setDay} data-testid="day">
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
};