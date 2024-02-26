import React, { useState } from "react";

const NumberOfEvents = ({ setNumberOfEvents, setErrorAlert }) => {
  const [eventNumber, setEventNumber] = useState("32");

  const handleInputChange = (event) => {
    const value = event.target.value;
    const parsedValue = parseInt(value, 10);

    let infoText;
    if (isNaN(value) || value <= 0) {
      infoText = "Number of events cannot be negative";
      setErrorAlert(infoText); // Call setErrorAlert with the error message
    } else {
      infoText = "";
      setErrorAlert(infoText);
      setNumberOfEvents(value);
    }

    setEventNumber(value);
  };

  return (
    <div id="numberOfEvents">
      <label htmlFor="eventNumberInput">Number of Events</label>
      <input
        type="text"
        id="eventNumberInput"
        value={eventNumber}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default NumberOfEvents;
