import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { WiDaySunny, WiNightClear, WiCloudy, WiRain, WiSnow, WiThunderstorm, WiFog, WiWindy } from 'react-icons/wi';
import { FaTemperatureHigh, FaWind, FaTint } from 'react-icons/fa';
import './Weather.css'

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  // Replace with your OpenWeatherMap API key
  const API_KEY = import.meta.env.VITE_API_KEY
  const CITY = 'Mumbai';

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`
        );
        setWeatherData(response.data);
      } catch (err) {
        setError(err);
      }
    };

    fetchWeatherData();
  }, [API_KEY]);

  if (error) {
    return <div>Error fetching weather data: {error.message}</div>;
  }

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const { main, weather } = weatherData;

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'Clear':
        return <WiDaySunny />;
      case 'Clouds':
        return <WiCloudy />;
      case 'Rain':
        return <WiRain />;
      case 'Snow':
        return <WiSnow />;
      case 'Thunderstorm':
        return <WiThunderstorm />;
      case 'Mist':
      case 'Fog':
        return <WiFog />;
      default:
        return <WiWindy />;
    }
  };

  return (
    <div className="weather-container">
      <h2>Weather in {CITY}</h2>
      <div className="weather-icon">
        {getWeatherIcon(weather[0].main)}
      </div>
      <p>
        <FaTemperatureHigh /> Condition: {weather[0].description}
      </p>
      <p>
        <FaTemperatureHigh /> Temperature: {main.temp}°C
      </p>
      <p>
        <FaTint /> Humidity: {main.humidity}%
      </p>
    </div>
  );
};

export default Weather;