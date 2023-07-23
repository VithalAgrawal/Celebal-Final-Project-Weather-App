import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

const makeIconURL = (iconId) =>
  `https://openweathermap.org/img/wn/${iconId}@2x.png`;

const getFormattedWeatherData = async (city, units = "metric") => {
  const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;
  const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${units}`;

  const [currentWeatherResponse, forecastResponse] = await Promise.all([
    axios.get(currentWeatherURL).then((res) => res.data),
    axios.get(forecastURL).then((res) => res.data),
  ]);

  const {
    weather,
    main: { temp, feels_like, temp_min, temp_max, humidity, pressure },
    sys: { country },
    wind: { speed },
    name,
  } = currentWeatherResponse;

  const { description, icon } = weather[0];

  // Extracting forecast data for the next 4 days (filter and group by date)
  const forecastData = forecastResponse.list.reduce((result, item) => {
    const date = item.dt_txt.split(" ")[0]; // Get the date part from the timestamp
    if (!result[date]) {
      // Create a new entry for the date if it doesn't exist
      // console.log(item.weather[0].icon);
      result[date] = {
        date,
        description: item.weather[0].description,
        iconURL: makeIconURL(item.weather[0].icon),
        temp: {
          min: item.main.temp_min,
          max: item.main.temp_max,
        },
      };
    } else {
      // Update the temperature range if a new minimum or maximum is found
      if (item.main.temp_min < result[date].temp.min) {
        result[date].temp.min = item.main.temp_min;
      }
      if (item.main.temp_max > result[date].temp.max) {
        result[date].temp.max = item.main.temp_max;
      }
    }
    return result;
  }, {});

  // Convert the forecastData object into an array of 4-day forecasts
  const forecastArray = Object.values(forecastData).slice(0, 4);

  return {
    description,
    iconURL: makeIconURL(icon),
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    pressure,
    country,
    speed,
    name,
    forecast: forecastArray,
  };
};

export { getFormattedWeatherData };
