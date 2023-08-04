import Event from "./Event";

const EventList = ({ events = [] }) => {
  return (
    <ul id="event-list">
      {events.map((event) => (
        <Event event={event} key={event.id} />
      ))}
    </ul>
  );
};

export default EventList;
