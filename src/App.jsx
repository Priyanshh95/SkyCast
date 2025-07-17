import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [date, setDate] = useState(new Date());
  const [region, setRegion] = useState('');

  const API_KEY = '2671ae2aa3a131674758d9acfc47bf61';

  // Update date/time every minute
  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Fetch weather by city name
  const fetchWeather = async (e) => {
    e.preventDefault();
    if (!city) return;
    setLoading(true);
    setError('');
    setWeather(null);
    setRegion('');
    try {
      // First, get geocoding info for state/region
      const geoRes = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${API_KEY}`
      );
      const geoData = await geoRes.json();
      let state = '';
      if (geoData && geoData[0]) {
        state = geoData[0].state || '';
        setRegion(state);
      }
      // Then, get weather
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch weather by geolocation
  const fetchWeatherByLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }
    setLoading(true);
    setError('');
    setWeather(null);
    setRegion('');
    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        const { latitude, longitude } = position.coords;
        // Get city/state from geocoding
        const geoRes = await fetch(
          `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`
        );
        const geoData = await geoRes.json();
        let cityName = '';
        let state = '';
        if (geoData && geoData[0]) {
          cityName = geoData[0].name || '';
          state = geoData[0].state || '';
          setCity(cityName);
          setRegion(state);
        }
        // Get weather
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
        );
        if (!response.ok) {
          throw new Error('Location weather not found');
        }
        const data = await response.json();
        setWeather(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }, () => {
      setError('Unable to retrieve your location.');
      setLoading(false);
    });
  };

  // Format date/time
  const formatDate = (date) => {
    return date.toLocaleString(undefined, {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className="app-container">
      <h1>SkyCast Weather App</h1>
      <form onSubmit={fetchWeather} className="search-form">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-btn">Search</button>
        <button type="button" className="search-btn" onClick={fetchWeatherByLocation} style={{background:'#43a047',marginLeft:'0.5rem'}}>Use My Location</button>
      </form>
      <div style={{marginBottom:'1rem', color:'#333'}}>{formatDate(date)}</div>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {weather && (
        <div className="weather-card">
          <h2>{weather.name}{region ? `, ${region}` : ''}, {weather.sys.country}</h2>
          <p className="temp">{Math.round(weather.main.temp)}°C</p>
          <p>{weather.weather[0].main} - {weather.weather[0].description}</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <div className="weather-details">
            <span>🌡️ Feels like: {Math.round(weather.main.feels_like)}°C</span>
            <span>💧 Humidity: {weather.main.humidity}%</span>
            <span>💨 Wind: {Math.round(weather.wind.speed)} m/s</span>
            <span>🔼 Max: {Math.round(weather.main.temp_max)}°C</span>
            <span>🔽 Min: {Math.round(weather.main.temp_min)}°C</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App; 