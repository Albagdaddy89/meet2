import React from "react"; // Add this if you're using JSX below
import CitySearch from "./components/CitySearch";
import EventList from "./components/EventList";
import NumberOfEvents from "./components/NumberOfEvents"; // Make sure to import this
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <CitySearch />
      <EventList />
      <NumberOfEvents />
    </div>
  );
};

export default App;
