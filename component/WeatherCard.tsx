"use client";

import React, { useState, useEffect } from "react";
import ElectricBorder from "./ElectricBorder";
import {
  Cloud,
  CloudRain,
  Sun,
  Wind,
  Thermometer,
  Droplets,
} from "lucide-react";

interface WeatherData {
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  location: string;
}

const WeatherCard: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData>({
    temperature: 24,
    description: "Partly Cloudy",
    humidity: 65,
    windSpeed: 12,
    location: "Singapore",
  });

  const [loading, setLoading] = useState(false);

  // Simulate weather data refresh
  const refreshWeather = () => {
    setLoading(true);
    setTimeout(() => {
      setWeather({
        temperature: Math.round(20 + Math.random() * 15),
        description: ["Sunny", "Partly Cloudy", "Cloudy", "Light Rain"][
          Math.floor(Math.random() * 4)
        ],
        humidity: Math.round(40 + Math.random() * 40),
        windSpeed: Math.round(5 + Math.random() * 20),
        location: "Singapore",
      });
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    const interval = setInterval(refreshWeather, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = (description: string) => {
    switch (description) {
      case "Sunny":
        return <Sun className="w-12 h-12 text-yellow-400" />;
      case "Partly Cloudy":
        return <Cloud className="w-12 h-12 text-blue-300" />;
      case "Cloudy":
        return <Cloud className="w-12 h-12 text-gray-400" />;
      case "Light Rain":
        return <CloudRain className="w-12 h-12 text-blue-500" />;
      default:
        return <Sun className="w-12 h-12 text-yellow-400" />;
    }
  };

  return (
    <ElectricBorder
      color="#00bcd4"
      speed={1.5}
      chaos={0.8}
      thickness={3}
      className="w-full h-full"
      style={{ borderRadius: "16px" }}
    >
      <div className="bg-gray-900/95 backdrop-blur-md rounded-2xl p-6 h-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Weather</h2>
          <button
            onClick={refreshWeather}
            disabled={loading}
            className="text-cyan-400 hover:text-cyan-300 disabled:opacity-50"
          >
            <Wind className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-4xl font-bold text-white mb-1">
              {weather.temperature}°C
            </div>
            <div className="text-gray-300 text-sm">{weather.location}</div>
          </div>
          {getWeatherIcon(weather.description)}
        </div>

        <div className="text-lg text-gray-200 mb-4">{weather.description}</div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-300">
              <Thermometer className="w-4 h-4 mr-2" />
              <span className="text-sm">Feels like</span>
            </div>
            <span className="text-white">{weather.temperature + 2}°C</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-300">
              <Droplets className="w-4 h-4 mr-2" />
              <span className="text-sm">Humidity</span>
            </div>
            <span className="text-white">{weather.humidity}%</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-300">
              <Wind className="w-4 h-4 mr-2" />
              <span className="text-sm">Wind</span>
            </div>
            <span className="text-white">{weather.windSpeed} km/h</span>
          </div>
        </div>
      </div>
    </ElectricBorder>
  );
};

export default WeatherCard;
