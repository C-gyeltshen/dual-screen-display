"use client";

import React from "react";
import WeatherCard from "./WeatherCard";
import BusTimingCard from "./BusTimingCard";
import BusCardBalanceCard from "./BusCardBalanceCard";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen w-full p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Smart Transit Dashboard
          </h1>
          <p className="text-gray-400">
            Real-time weather, bus timings, and card balance information
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[600px]">
          {/* Weather Card */}
          <div className="lg:col-span-1">
            <WeatherCard />
          </div>

          {/* Bus Timing Card */}
          <div className="lg:col-span-1">
            <BusTimingCard />
          </div>

          {/* Bus Card Balance */}
          <div className="lg:col-span-1">
            <BusCardBalanceCard />
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Data updates automatically every 30 seconds • Singapore Public
            Transport
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
