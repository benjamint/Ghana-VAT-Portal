'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import {
  BanknotesIcon,
  BuildingOfficeIcon,
  DocumentTextIcon,
  ChartBarIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import DashboardLayout from '@/components/layout/DashboardLayout';

// Dynamically import charts with no SSR
const RevenueChart = dynamic(() => import('@/components/charts/RevenueChart'), { ssr: false });
const ComplianceChart = dynamic(() => import('@/components/charts/ComplianceChart'), { ssr: false });
const BusinessMap = dynamic(() => import('@/components/maps/BusinessMap'), { ssr: false });

const revenueData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
];

const complianceData = [
  { name: 'Compliant', value: 70, color: '#10B981' },
  { name: 'Partial', value: 20, color: '#F59E0B' },
  { name: 'Non-compliant', value: 10, color: '#EF4444' },
];

const recentTransactions = [
  { 
    business: 'MTN Ghana', 
    taxType: 'Corporate Income Tax',
    amount: 'GHC 125,000', 
    date: '2024-03-15', 
    status: 'Paid'
  },
  { 
    business: 'Melcom Group', 
    taxType: 'Pay As You Earn (PAYE)',
    amount: 'GHC 87,500', 
    date: '2024-03-14', 
    status: 'Processing'
  },
  { 
    business: 'GHACEM Limited', 
    taxType: 'Withholding Tax',
    amount: 'GHC 152,000', 
    date: '2024-03-14', 
    status: 'Failed'
  },
  { 
    business: 'Fan Milk Limited', 
    taxType: 'Small Taxpayer Rate',
    amount: 'GHC 56,000', 
    date: '2024-03-13', 
    status: 'Pending'
  },
];

export default function DashboardPage() {
  const [dateFilter, setDateFilter] = useState('This month');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <BanknotesIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <div className="ml-3 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Total VAT Collected
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                        GHC 2.5M
                      </div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                        <span>+12%</span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <BuildingOfficeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <div className="ml-3 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Active Businesses
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                        1,234
                      </div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                        <span>85% compliant</span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <DocumentTextIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <div className="ml-3 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Invoices Today
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                        245
                      </div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                        <span>GHC 125K</span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <ChartBarIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <div className="ml-3 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Compliance Rate
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                        92%
                      </div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                        <span>+2%</span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Overview */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[1.1rem] font-semibold text-gray-900 dark:text-white">
              Revenue overview
            </h2>
            <div className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none"
              >
                {dateFilter}
                <ChevronDownIcon className="h-4 w-4 text-gray-500" />
              </button>

              {isFilterOpen && (
                <div className="absolute right-0 mt-1 w-36 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    {['Today', 'This week', 'This month'].map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setDateFilter(option);
                          setIsFilterOpen(false);
                        }}
                        className={`block w-full px-4 py-2 text-sm text-left ${
                          dateFilter === option
                            ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                            : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                        role="menuitem"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="h-80">
            <RevenueChart />
          </div>
        </div>

        {/* Business Map */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-[1.1rem] font-semibold text-gray-900 dark:text-white mb-4">
            Business Compliance Map
          </h2>
          <BusinessMap />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Compliance Overview */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-[1.1rem] font-semibold text-gray-900 dark:text-white mb-4">
              Compliance overview
            </h2>
            <div className="h-80">
              <ComplianceChart />
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-[1.1rem] font-semibold text-gray-900 dark:text-white mb-4">
              Recent transactions
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Business
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Tax Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {recentTransactions.map((transaction, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {transaction.business}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          transaction.taxType === 'Corporate Income Tax'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                            : transaction.taxType === 'Pay As You Earn (PAYE)'
                            ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                            : transaction.taxType === 'Withholding Tax'
                            ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
                            : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200'
                        }`}>
                          {transaction.taxType}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {transaction.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {transaction.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          transaction.status === 'Paid'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : transaction.status === 'Processing'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                            : transaction.status === 'Failed'
                            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        }`}>
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 