import React, { useState, useEffect } from "react";

const CitySearch = ({ allLocations, setCurrentCity }) => {
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    setSuggestions(
      allLocations.filter((location) =>
        location.toUpperCase().includes(value.toUpperCase())
      )
    );
    setShowSuggestion(true);
  };

  const handleClick = (event) => {
    const value = event.target.textContent;
    console.log("Clicked suggestion:", value);
    setQuery(value);
    setShowSuggestion(false);
    setCurrentCity(value);
  };

  useEffect(() => {
    setSuggestions(allLocations);
  }, [allLocations]);

  return (
    <div id="city-search">
      <input
        type="text"
        className="city"
        placeholder="Search for a city"
        value={query}
        onFocus={() => setShowSuggestion(true)}
        onBlur={() => setShowSuggestion(false)}
        onChange={handleInputChange}
      />
      {showSuggestion && (
        <ul className="suggestion">
          {suggestions.map((suggestion) => (
            <li key={suggestion} onClick={() => handleClick(suggestion)}>
              {suggestion}
            </li>
          ))}
          <li
            key="See all cities"
            onClick={() => handleClick("See all cities")}
          >
            <b>See all cities</b>
          </li>
        </ul>
      )}
    </div>
  );
};

export default CitySearch;
