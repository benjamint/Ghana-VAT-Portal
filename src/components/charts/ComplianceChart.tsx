'use client';

import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Label,
} from 'recharts';

const data = [
  { name: 'Compliant', value: 987, percentage: 80, color: '#5266eb' },
  { name: 'Non-compliant', value: 247, percentage: 20, color: '#E2E8F0' },
];

const totalBusinesses = data.reduce((sum, item) => sum + item.value, 0);

const formatNumber = (value: number) => {
  return new Intl.NumberFormat('en-US').format(value);
};

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor="middle" 
      dominantBaseline="central"
      style={{ fontSize: '14px', fontWeight: '600' }}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function ComplianceChart() {
  return (
    <div className="flex items-start gap-8">
      {/* Left side - Chart */}
      <div className="w-[300px] h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={0}
              outerRadius={120}
              dataKey="value"
              startAngle={90}
              endAngle={450}
              labelLine={false}
              label={renderCustomizedLabel}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  stroke="none"
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Right side - Data */}
      <div className="flex-1 pt-4">
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {formatNumber(totalBusinesses)}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total Registered Businesses
          </p>
          <div className="mt-1 flex items-center text-sm text-green-600">
            <span>+13% from last month</span>
          </div>
        </div>

        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {item.name}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {item.percentage}%
                  </span>
                </div>
                <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {formatNumber(item.value)} businesses
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 