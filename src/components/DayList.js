import React from "react";
import DayListItem from "./DayListItem";

export default function DayList (props) {
  const listDays = props.days.map((current) => {
    return (
      <DayListItem 
        key={current.id}
        name={current.name}
        spots={current.spots}
        selected={current.name === props.value}
        setDay={() => props.onChange(current.name)}
        />
    );
  });

  return(
    <ul>
      {listDays}
    </ul>
  );
}