import { useState } from "react";

const NumberOfEvents = ({ setCurrentNOE }) => {
  const [numberOfEvents, setNumberOfEvents] = useState(32);

  const handleNumberChange = (event) => {
    const value = event.target.value;
    setNumberOfEvents(value);
    setCurrentNOE(value);
  };

  return (
    <div id="number-of-events">
      <input
        value={numberOfEvents}
        type="number"
        onChange={(event) => {
          handleNumberChange(event);
        }}
      />
    </div>
  );
};

export default NumberOfEvents;
