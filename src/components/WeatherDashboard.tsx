import React, { useState, useEffect } from 'react';
import { Cloud, CloudRain, Sun, Wind, Droplets, Eye, Gauge } from 'lucide-react';

interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  description: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  pressure: number;
  icon: string;
}

interface ForecastData {
  date: string;
  temp: number;
  description: string;
  icon: string;
}

export function WeatherDashboard() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [city, setCity] = useState('London');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const fetchWeather = async (cityName: string) => {
    if (!API_KEY) {
      setError('Weather API key is not configured');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Fetch current weather
      const currentResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );

      if (!currentResponse.ok) {
        throw new Error('City not found');
      }

      const currentData = await currentResponse.json();

      setWeather({
        city: currentData.name,
        country: currentData.sys.country,
        temperature: Math.round(currentData.main.temp),
        feelsLike: Math.round(currentData.main.feels_like),
        description: currentData.weather[0].main,
        humidity: currentData.main.humidity,
        windSpeed: Math.round(currentData.wind.speed * 3.6), // Convert m/s to km/h
        visibility: (currentData.visibility / 1000).toFixed(1),
        pressure: currentData.main.pressure,
        icon: currentData.weather[0].icon,
      });

      // Fetch 5-day forecast
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
      );

      if (forecastResponse.ok) {
        const forecastData = await forecastResponse.json();
        const dailyForecasts = forecastData.list.filter(
          (_: any, index: number) => index % 8 === 0
        );

        setForecast(
          dailyForecasts.map((item: any) => ({
            date: new Date(item.dt * 1000).toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
            }),
            temp: Math.round(item.main.temp),
            description: item.weather[0].main,
            icon: item.weather[0].icon,
          }))
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      setWeather(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city);
    }
  };

  const getWeatherIcon = (iconCode: string) => {
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
    return <img src={iconUrl} alt="weather" className="w-24 h-24" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2">Weather Dashboard</h1>
          <p className="text-blue-100">Real-time weather information</p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-2">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name..."
              className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Search'}
            </button>
          </div>
        </form>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500 text-white p-4 rounded-lg mb-8">
            {error}
          </div>
        )}

        {/* Current Weather Card */}
        {weather && (
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Side - Main Weather */}
              <div className="flex flex-col justify-center items-center">
                <h2 className="text-4xl font-bold text-gray-800 mb-2">
                  {weather.city}, {weather.country}
                </h2>
                <div className="flex items-center gap-4 mb-4">
                  {getWeatherIcon(weather.icon)}
                  <div>
                    <p className="text-6xl font-bold text-gray-800">
                      {weather.temperature}°C
                    </p>
                    <p className="text-xl text-gray-600">{weather.description}</p>
                    <p className="text-sm text-gray-500">
                      Feels like {weather.feelsLike}°C
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Side - Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Droplets className="w-5 h-5 text-blue-600" />
                    <p className="text-gray-600">Humidity</p>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">{weather.humidity}%</p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Wind className="w-5 h-5 text-blue-600" />
                    <p className="text-gray-600">Wind Speed</p>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">{weather.windSpeed} km/h</p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="w-5 h-5 text-blue-600" />
                    <p className="text-gray-600">Visibility</p>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">{weather.visibility} km</p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Gauge className="w-5 h-5 text-blue-600" />
                    <p className="text-gray-600">Pressure</p>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">{weather.pressure} mb</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 5-Day Forecast */}
        {forecast.length > 0 && (
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">5-Day Forecast</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {forecast.map((day, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg p-4 text-center hover:shadow-lg transition"
                >
                  <p className="font-semibold text-gray-700 mb-3">{day.date}</p>
                  <div className="flex justify-center mb-2">
                    <img
                      src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                      alt="weather"
                      className="w-12 h-12"
                    />
                  </div>
                  <p className="text-lg font-bold text-gray-800 mb-1">{day.temp}°C</p>
                  <p className="text-sm text-gray-600">{day.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="inline-block animate-spin mb-4">
                <Cloud className="w-12 h-12 text-white" />
              </div>
              <p className="text-white text-lg">Loading weather data...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherDashboard;
