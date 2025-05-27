import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchWeather, fetchForecast } from "../services/weatherApi";
import {
  getSavedCity,
  getSavedUnit,
  saveCity,
  saveUnit,
} from "../utils/localStorage";

// Create context
const WeatherContext = createContext();

/**
 * WeatherProvider component to wrap the app
 */
export const WeatherProvider = ({ children }) => {
  const [city, setCity] = useState(getSavedCity() || "");
  const [unit, setUnit] = useState(getSavedUnit() || "metric");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null); // NEW STATE
  const [error, setError] = useState("");

  useEffect(() => {
    if (city) saveCity(city);
  }, [city]);

  useEffect(() => {
    saveUnit(unit);
  }, [unit]);

  // Fetch current weather + forecast on city/unit change
  useEffect(() => {
    if (!city) return;

    const getWeather = async () => {
      try {
        const currentWeather = await fetchWeather(city, unit);
        const forecast = await fetchForecast(city, unit); // Fetch forecast too
        setWeatherData(currentWeather);
        setForecastData(forecast); // Save forecast
        setError("");
      } catch (err) {
        setWeatherData(null);
        setForecastData(null); // Reset forecast on error
        setError(err.message || "Failed to fetch weather data");
      }
    };

    getWeather();
  }, [city, unit]);

  // Poll current weather AND forecast every 30s
  useEffect(() => {
    if (!city) return;

    const interval = setInterval(async () => {
      try {
        const currentWeather = await fetchWeather(city, unit);
        const forecast = await fetchForecast(city, unit);
        setWeatherData(currentWeather);
        setForecastData(forecast);
        setError("");
      } catch (err) {
        console.error("Polling error:", err.message);
      }
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [city, unit]);

  return (
    <WeatherContext.Provider
      value={{
        city,
        setCity,
        unit,
        setUnit,
        weatherData,
        setWeatherData,
        forecastData, // Provide forecast data
        setForecastData, // optional but useful
        error,
        setError,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

// Custom hook to use weather context
export const useWeatherContext = () => useContext(WeatherContext);
