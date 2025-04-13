import React from 'react';
import dynamic from 'next/dynamic';
import {
  CurrencyPoundIcon,
  BuildingOfficeIcon,
  DocumentTextIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import DashboardLayout from '@/components/layout/DashboardLayout';

// Dynamically import client-side components
const RevenueChart = dynamic(() => import('@/components/charts/RevenueChart'), {
  ssr: false,
  loading: () => (
    <div className="h-64 flex items-center justify-center text-gray-500 bg-gray-50 rounded-lg animate-pulse">
      Loading revenue chart...
    </div>
  ),
});

const ComplianceChart = dynamic(() => import('@/components/charts/ComplianceChart'), {
  ssr: false,
  loading: () => (
    <div className="h-64 flex items-center justify-center text-gray-500 bg-gray-50 rounded-lg animate-pulse">
      Loading compliance chart...
    </div>
  ),
});

const BusinessMap = dynamic(() => import('@/components/maps/BusinessMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] flex items-center justify-center text-gray-500 bg-gray-50 rounded-lg animate-pulse">
      Loading business map...
    </div>
  ),
});

export const metadata = {
  title: 'Dashboard - Ghana VAT Portal',
  description: 'View your VAT collection metrics and business insights',
};

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <CurrencyPoundIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
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

        {/* Charts and Map Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[1.1rem] font-semibold text-gray-900 dark:text-white">
                Revenue Overview
              </h2>
            </div>
            <div className="h-64">
              <RevenueChart />
            </div>
          </div>

          {/* Compliance Chart */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[1.1rem] font-semibold text-gray-900 dark:text-white">
                Business Compliance
              </h2>
            </div>
            <div className="h-64">
              <ComplianceChart />
            </div>
          </div>

          {/* Business Map */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[1.1rem] font-semibold text-gray-900 dark:text-white">
                Business Locations
              </h2>
            </div>
            <div className="h-[400px]">
              <BusinessMap />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 