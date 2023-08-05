import { useState } from "react";

const Event = ({ event }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDetails = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <li className="event">
      <p className="title">{event.summary}</p>
      <p>
        {new Date(event.start.dateTime).toLocaleString(undefined, {
          dateStyle: "medium",
          timeStyle: "short",
        })}
      </p>
      <p className="city">{event.location}</p>
      {isExpanded ? <p className="description">{event.description}</p> : null}
      <button className="details-btn" onClick={toggleDetails}>
        {isExpanded ? "hide details" : "show details"}
      </button>
    </li>
  );
};

export default Event;
