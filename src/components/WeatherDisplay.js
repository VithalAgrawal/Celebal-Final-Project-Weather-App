import React from "react";

const WeatherDisplay = ({ weather, units }) => {
  const tempUnit = units === "metric" ? "°C" : "°F";

  return (
    <div className="section section__weather">
      <div className="current-weather">
        <div className="icon">
          <h3>{`${weather.name}, ${weather.country}`}</h3>
          <img src={weather.iconURL} alt="weather-icon" />
          <h3>{weather.description}</h3>
        </div>
        <div className="temperature">
          <h1>{`${weather.temp.toFixed()} ${tempUnit}`}</h1>
        </div>
      </div>
      <div className="forecast">
        <h2>4-Day Forecast</h2>
        <div className="forecast-cards">
          {weather.forecast.map((dayWeather) => (
            <div key={dayWeather.date} className="forecast-card">
              <h3>{dayWeather.date}</h3>
              <img src={dayWeather.iconURL} alt="forecast-icon" />
              <p>{dayWeather.description}</p>
              <p>{`${dayWeather.temp.min.toFixed()} ${tempUnit} - ${dayWeather.temp.max.toFixed()} ${tempUnit}`}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
