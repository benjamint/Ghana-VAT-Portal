'use client';

import React, { useState } from 'react';
import { CalendarIcon, DocumentArrowDownIcon, ClockIcon, ChartBarIcon } from '@heroicons/react/24/outline';

interface ReportGeneratorProps {
  onGenerate: (options: ReportOptions) => void;
}

interface ReportOptions {
  dateRange: {
    start: string;
    end: string;
  };
  format: 'pdf' | 'excel' | 'csv';
  schedule?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    email: string;
  };
  visualization: 'table' | 'chart';
  comparison?: {
    enabled: boolean;
    previousPeriod: boolean;
    customRange?: {
      start: string;
      end: string;
    };
  };
}

export default function ReportGenerator({ onGenerate }: ReportGeneratorProps) {
  const [options, setOptions] = useState<ReportOptions>({
    dateRange: {
      start: new Date().toISOString().split('T')[0],
      end: new Date().toISOString().split('T')[0],
    },
    format: 'pdf',
    visualization: 'chart',
    comparison: {
      enabled: false,
      previousPeriod: true,
    },
  });

  const [showSchedule, setShowSchedule] = useState(false);

  return (
    <div className="bg-white border border-gray-100 rounded-lg p-6 space-y-6">
      <h2 className="text-lg font-medium text-gray-900">Generate Report</h2>

      {/* Date Range Selection */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">Date Range</label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-500 mb-1">Start Date</label>
            <div className="relative">
              <input
                type="date"
                className="block w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm"
                value={options.dateRange.start}
                onChange={(e) =>
                  setOptions({
                    ...options,
                    dateRange: { ...options.dateRange, start: e.target.value },
                  })
                }
              />
              <CalendarIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">End Date</label>
            <div className="relative">
              <input
                type="date"
                className="block w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm"
                value={options.dateRange.end}
                onChange={(e) =>
                  setOptions({
                    ...options,
                    dateRange: { ...options.dateRange, end: e.target.value },
                  })
                }
              />
              <CalendarIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Export Format */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">Export Format</label>
        <div className="grid grid-cols-3 gap-4">
          <button
            className={`flex items-center justify-center rounded-lg border px-4 py-2 text-sm ${
              options.format === 'pdf'
                ? 'border-blue-600 bg-blue-50 text-blue-600'
                : 'border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setOptions({ ...options, format: 'pdf' })}
          >
            <DocumentArrowDownIcon className="mr-2 h-5 w-5" />
            PDF
          </button>
          <button
            className={`flex items-center justify-center rounded-lg border px-4 py-2 text-sm ${
              options.format === 'excel'
                ? 'border-blue-600 bg-blue-50 text-blue-600'
                : 'border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setOptions({ ...options, format: 'excel' })}
          >
            <DocumentArrowDownIcon className="mr-2 h-5 w-5" />
            Excel
          </button>
          <button
            className={`flex items-center justify-center rounded-lg border px-4 py-2 text-sm ${
              options.format === 'csv'
                ? 'border-blue-600 bg-blue-50 text-blue-600'
                : 'border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setOptions({ ...options, format: 'csv' })}
          >
            <DocumentArrowDownIcon className="mr-2 h-5 w-5" />
            CSV
          </button>
        </div>
      </div>

      {/* Visualization Toggle */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">Visualization</label>
        <div className="grid grid-cols-2 gap-4">
          <button
            className={`flex items-center justify-center rounded-lg border px-4 py-2 text-sm ${
              options.visualization === 'table'
                ? 'border-blue-600 bg-blue-50 text-blue-600'
                : 'border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setOptions({ ...options, visualization: 'table' })}
          >
            <ChartBarIcon className="mr-2 h-5 w-5" />
            Table View
          </button>
          <button
            className={`flex items-center justify-center rounded-lg border px-4 py-2 text-sm ${
              options.visualization === 'chart'
                ? 'border-blue-600 bg-blue-50 text-blue-600'
                : 'border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setOptions({ ...options, visualization: 'chart' })}
          >
            <ChartBarIcon className="mr-2 h-5 w-5" />
            Chart View
          </button>
        </div>
      </div>

      {/* Comparison Options */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">Compare with Previous Period</label>
          <button
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              options.comparison?.enabled ? 'bg-blue-600' : 'bg-gray-200'
            }`}
            onClick={() =>
              setOptions({
                ...options,
                comparison: {
                  ...options.comparison!,
                  enabled: !options.comparison?.enabled,
                },
              })
            }
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ease-in-out ${
                options.comparison?.enabled ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Schedule Report */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">Schedule Report</label>
          <button
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              showSchedule ? 'bg-blue-600' : 'bg-gray-200'
            }`}
            onClick={() => setShowSchedule(!showSchedule)}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ease-in-out ${
                showSchedule ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {showSchedule && (
          <div className="space-y-4 mt-4">
            <div>
              <label className="block text-sm text-gray-500 mb-1">Frequency</label>
              <select
                className="block w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm"
                value={options.schedule?.frequency}
                onChange={(e) =>
                  setOptions({
                    ...options,
                    schedule: {
                      ...options.schedule!,
                      frequency: e.target.value as 'daily' | 'weekly' | 'monthly',
                    },
                  })
                }
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Email Address</label>
              <input
                type="email"
                className="block w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm"
                placeholder="Enter email address"
                value={options.schedule?.email}
                onChange={(e) =>
                  setOptions({
                    ...options,
                    schedule: { ...options.schedule!, email: e.target.value },
                  })
                }
              />
            </div>
          </div>
        )}
      </div>

      {/* Generate Button */}
      <button
        className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        onClick={() => onGenerate(options)}
      >
        Generate Report
      </button>
    </div>
  );
} 