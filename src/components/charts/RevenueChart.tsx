'use client';

import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { date: 'Mar 16', amount: 4800000 },
  { date: 'Mar 18', amount: 4900000 },
  { date: 'Mar 20', amount: 4850000 },
  { date: 'Mar 22', amount: 5000000 },
  { date: 'Mar 24', amount: 5100000 },
  { date: 'Mar 26', amount: 5050000 },
  { date: 'Mar 28', amount: 5200000 },
  { date: 'Mar 30', amount: 5150000 },
  { date: 'Apr 1', amount: 5300000 },
  { date: 'Apr 3', amount: 5250000 },
  { date: 'Apr 5', amount: 5400000 },
];

const formatAmount = (amount: number) => {
  if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(1)}M`;
  }
  if (amount >= 1000) {
    return `${(amount / 1000).toFixed(1)}K`;
  }
  return amount.toString();
};

export default function RevenueChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#5266eb" stopOpacity={0.1}/>
            <stop offset="95%" stopColor="#5266eb" stopOpacity={0.01}/>
          </linearGradient>
        </defs>
        <CartesianGrid 
          vertical={false}
          horizontal={true}
          strokeDasharray="3 3"
          stroke="#E5E7EB"
        />
        <XAxis 
          dataKey="date"
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#6B7280', fontSize: 12 }}
          dy={10}
        />
        <YAxis 
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#6B7280', fontSize: 12 }}
          tickFormatter={formatAmount}
          dx={-10}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                  <p className="text-gray-600 dark:text-gray-300">{payload[0].payload.date}</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    GHC {formatAmount(payload[0].value as number)}
                  </p>
                </div>
              );
            }
            return null;
          }}
        />
        <Area
          type="monotone"
          dataKey="amount"
          stroke="#5266eb"
          strokeWidth={2}
          fill="url(#colorRevenue)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
} 