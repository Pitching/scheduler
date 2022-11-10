import React from "react";
import DayListItem from "./DayListItem";

// Daylist component, renders all days from a given prop and maps each into a DayListItem (displays M-F on the left)
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
};