"use client";

import React, { useState, useEffect } from "react";
import ElectricBorder from "./ElectricBorder";
import {
  CreditCard,
  DollarSign,
  History,
  CheckCircle,
  AlertCircle,
  Smartphone,
  Search,
} from "lucide-react";

interface CardBalance {
  balance: number;
  lastTopUp: string;
  lastTrip: string;
  cardNumber: string;
}

interface TransactionHistory {
  date: string;
  description: string;
  amount: number;
  balance: number;
}

const BusCardBalanceCard: React.FC = () => {
  const [cardBalance, setCardBalance] = useState<CardBalance>({
    balance: 15.6,
    lastTopUp: "2025-08-28",
    lastTrip: "2025-08-30 08:30",
    cardNumber: "****1234",
  });

  const [loading, setLoading] = useState(false);
  const [showTopUpGuide, setShowTopUpGuide] = useState(false);

  const checkBalance = () => {
    setLoading(true);
    setTimeout(() => {
      setCardBalance((prev) => ({
        ...prev,
        balance: Math.round((Math.random() * 30 + 5) * 100) / 100,
        lastTrip: new Date()
          .toLocaleString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })
          .replace(",", ""),
      }));
      setLoading(false);
    }, 1500);
  };

  const getBalanceStatus = (balance: number) => {
    if (balance < 5)
      return {
        color: "text-red-400",
        icon: AlertCircle,
        message: "Low balance",
      };
    if (balance < 15)
      return {
        color: "text-yellow-400",
        icon: AlertCircle,
        message: "Consider topping up",
      };
    return {
      color: "text-green-400",
      icon: CheckCircle,
      message: "Balance OK",
    };
  };

  const status = getBalanceStatus(cardBalance.balance);
  const StatusIcon = status.icon;

  const balanceCheckGuide = [
    "Find the Smart Board in the bus stop",
    "Navigate to the Card Balance interface",
    "Insert the bus card number",
    "Press Check Balance",
    "Top up if necessary",
  ];

  return (
    <ElectricBorder
      color="#9c27b0"
      speed={0.8}
      chaos={1.2}
      thickness={3}
      className="w-full h-full"
      style={{ borderRadius: "16px" }}
    >
      <div className="bg-gray-900/95 backdrop-blur-md rounded-2xl p-6 h-full">
          <div className="space-y-4 max-h-96 overflow-y-auto">
            <h3 className="text-lg font-semibold text-white mb-3">
              How to Check Your Card Balance
            </h3>

            {/* Balance Check Guide */}
            <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
              <div className="flex items-center mb-2">
                <Search className="w-4 h-4 text-purple-400 mr-2" />
                <span className="text-white font-medium">
                  Using Smart Board at Bus Stop
                </span>
              </div>
              <ol className="text-sm text-gray-300 space-y-1">
                {balanceCheckGuide.map((step, stepIndex) => (
                  <li key={stepIndex} className="flex items-start">
                    <span className="text-purple-400 mr-2 font-bold">
                      {stepIndex + 1}.
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
      </div>
    </ElectricBorder>
  );
};

export default BusCardBalanceCard;
