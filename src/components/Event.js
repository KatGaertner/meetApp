import { useState } from "react";

const Event = ({ event }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDetails = () => {
    setIsExpanded(!isExpanded);
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
