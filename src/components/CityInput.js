import React, { useState } from "react";
import Autosuggest from "react-autosuggest";
import axios from "axios";
import "../CityInput.css";

const cityApiKey = process.env.REACT_APP_API_KEY_GEOAPIFY;

const CityInput = ({ handleCity, handleUnits }) => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);


  const getSuggestions = async (inputValue) => {
    try {
      // console.log(cityApiKey);
      const response = await axios.get(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${inputValue}&apiKey=${cityApiKey}`
      );

      // Extract city names from the response
      const citySuggestions = response.data.features.map(
        (feature) => feature.properties.formatted
      );

      return citySuggestions;
    } catch (error) {
      console.error("Error fetching city suggestions:", error);
      return [];
    }
  };

  const onSuggestionsFetchRequested = async ({ value }) => {
    const suggestions = await getSuggestions(value);
    setSuggestions(suggestions);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion) => suggestion;

  const renderSuggestion = (suggestion) => <div>{suggestion}</div>;

  const inputProps = {
    placeholder: "Enter city",
    value,
    onChange: (_, { newValue }) => setValue(newValue),
    onKeyDown: handleCity,
  };

  return (
    <div className="section section__input">
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
      <button onClick={handleUnits}>℉</button>
    </div>
  );
};

export default CityInput;
