const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const fetchWeather = async (city, unit = "metric") => {
  const response = await fetch(
    `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=${unit}`
  );
  if (!response.ok) throw new Error("City not found");
  return await response.json();
};

export const fetchForecast = async (city, unit = "metric") => {
  const response = await fetch(
    `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=${unit}`
  );
  if (!response.ok) throw new Error("Forecast not found");
  return await response.json();
};
