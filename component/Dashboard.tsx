"use client";

import React from "react";
import WeatherCard from "./WeatherCard";
import BusTimingCard from "./BusTimingCard";
import BusCardBalanceCard from "./BusCardBalanceCard";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen w-full p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="max-w-7xl mx-auto">
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
      </div>
    </div>
  );
};

export default Dashboard;
