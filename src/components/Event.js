import { useState } from "react";

const Event = ({ event }) => {
  const [isExpanded, setExpanded] = useState(false);

  const toggleDetails = () => {
    setExpanded(!isExpanded);
  };

  return (
    <li>
      <p>{event.summary}</p>
      <p>{event.start.dateTime}</p>
      <p>{event.location}</p>
      {isExpanded ? <p>{event.description}</p> : null}
      <button onClick={toggleDetails}>
        {isExpanded ? "hide details" : "show details"}
      </button>
    </li>
  );
};

export default Event;
