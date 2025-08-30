"use client";

import React, { useState, useEffect } from "react";
import ElectricBorder from "./ElectricBorder";
import { Bus, Clock, MapPin, RefreshCw } from "lucide-react";

interface BusArrival {
  busNumber: string;
  destination: string;
  estimatedArrival: number; // minutes
  nextArrival?: number; // minutes
  occupancy: "Low" | "Medium" | "High";
}

const BusTimingCard: React.FC = () => {
  const [busArrivals, setBusArrivals] = useState<BusArrival[]>([
    {
      busNumber: "14",
      destination: "To Pasakha",
      estimatedArrival: 3,
      nextArrival: 15,
      occupancy: "Low",
    },
    {
      busNumber: "16",
      destination: "BFAL to Chumithang",
      estimatedArrival: 7,
      nextArrival: 22,
      occupancy: "Medium",
    },
    {
      busNumber: "31",
      destination: "Mallbase to Chumithang",
      estimatedArrival: 12,
      nextArrival: 28,
      occupancy: "High",
    },
    {
      busNumber: "2",
      destination: "Kampong Bahru",
      estimatedArrival: 18,
      nextArrival: 35,
      occupancy: "Low",
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const refreshBusTiming = () => {
    setLoading(true);
    setTimeout(() => {
      setBusArrivals((prev) =>
        prev.map((bus) => ({
          ...bus,
          estimatedArrival: Math.max(
            1,
            bus.estimatedArrival -
              Math.floor(Math.random() * 3) +
              Math.floor(Math.random() * 5)
          ),
          nextArrival: bus.nextArrival
            ? Math.max(
                5,
                bus.nextArrival -
                  Math.floor(Math.random() * 3) +
                  Math.floor(Math.random() * 5)
              )
            : undefined,
          occupancy: (["Low", "Medium", "High"] as const)[
            Math.floor(Math.random() * 3)
          ],
        }))
      );
      setLastUpdated(new Date());
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setBusArrivals((prev) =>
        prev.map((bus) => ({
          ...bus,
          estimatedArrival: Math.max(0, bus.estimatedArrival - 1),
          nextArrival: bus.nextArrival
            ? Math.max(0, bus.nextArrival - 1)
            : undefined,
        }))
      );
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const getOccupancyColor = (occupancy: string) => {
    switch (occupancy) {
      case "Low":
        return "text-green-400";
      case "Medium":
        return "text-yellow-400";
      case "High":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  const getArrivalText = (minutes: number) => {
    if (minutes === 0) return "Arr";
    if (minutes === 1) return "1 min";
    return `${minutes} min`;
  };

  return (
    <ElectricBorder
      color="#ff6b35"
      speed={1.2}
      chaos={1}
      thickness={3}
      className="w-full h-full"
      style={{ borderRadius: "16px" }}
    >
      <div className="bg-gray-900/95 backdrop-blur-md rounded-2xl p-6 h-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <h2 className="text-xl font-bold text-white">Bus Timing</h2>
          </div>
          <button
            onClick={refreshBusTiming}
            disabled={loading}
            className="text-orange-400 hover:text-orange-300 disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>

        <div className="flex items-center text-gray-400 text-sm mb-4">
          <MapPin className="w-4 h-4 mr-1" />
          <span>City Bus Terminal</span>
        </div>

        <div className="space-y-3 max-h-64 overflow-y-auto">
          {busArrivals.map((bus, index) => (
            <div key={index} className="bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <span className="bg-orange-500 text-white px-2 py-1 rounded text-sm font-bold mr-3">
                    {bus.busNumber}
                  </span>
                  <div>
                    <div className="text-white font-medium">
                      {bus.destination}
                    </div>
                    <div
                      className={`text-xs ${getOccupancyColor(bus.occupancy)}`}
                    >
                      {bus.occupancy} occupancy
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-white">
                    {getArrivalText(bus.estimatedArrival)}
                  </div>
                  {bus.nextArrival && (
                    <div className="text-sm text-gray-400">
                      {getArrivalText(bus.nextArrival)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 text-xs text-gray-500 flex items-center">
          <Clock className="w-3 h-3 mr-1" />
          Last updated: {lastUpdated.toLocaleTimeString()}
        </div>
      </div>
    </ElectricBorder>
  );
};

export default BusTimingCard;
