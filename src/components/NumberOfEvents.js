import { useState } from "react";

const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
  const [numberOfEvents, setNumberOfEvents] = useState(32);

  const handleNumberChange = (event) => {
    const value = event.target.value;

    let errorText;
    if (value <= 0 || isNaN(value)) {
      errorText = "Please enter a valid number.";
    } else {
      errorText = "";
      setCurrentNOE(value);
    }

    setNumberOfEvents(value);
    setErrorAlert(errorText);
  };
  return (
    <div id="number-of-events">
      <label htmlFor="number-of-events-box" className="hidden">
        Number of events
      </label>
      <input
        id="number-of-events-box"
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
