import { useState } from "react";

const NumberOfEvents = () => {
  const [numberOfEvents, setNumberOfEvents] = useState(32);

  return (
    <div id="number-of-events">
      <input
        value={numberOfEvents}
        type="number"
        onChange={(event) => {
          setNumberOfEvents(event.target.value);
        }}
      />
    </div>
  );
};

export default NumberOfEvents;
