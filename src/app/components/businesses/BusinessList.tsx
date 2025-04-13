'use client';

import React from 'react';
import {
  ChevronUpDownIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  ArrowDownTrayIcon,
  PlusIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import { format } from 'date-fns';

export interface Business {
  id: string;
  name: string;
  tin: string;
  sector: string;
  complianceScore: {
    overall: number;
    filing: number;
    payment: number;
    invoice: number;
  };
  vatStatus: 'Filed' | 'Pending' | 'Overdue';
  riskLevel: 'Low' | 'Medium' | 'High';
  lastTransactionDate: string;
  vatCollectedYTD: number;
  location: string;
  registrationDate: string;
  address: string;
  contact: string;
  businessType: string;
  sizeClassification: string;
  keyPersonnel: Array<{
    name: string;
    role: string;
  }>;
  complianceMetrics: {
    filingScore: number;
    paymentScore: number;
    invoiceScore: number;
  };
  monthlyMetrics: {
    transactionVolume: number;
    averageInvoiceValue: number;
    dailyVatCollection: number;
    unusualFlags: number;
  };
  creditAssessment: {
    paymentReliability: number;
    sustainability: number;
    financialHealth: number;
    trustScore: number;
  };
  enforcementHistory: Array<{
    type: string;
    date: string;
    status: string;
    details: string;
  }>;
}

interface BusinessListProps {
  businesses: Business[];
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: 'GHS',
    minimumFractionDigits: 2,
  }).format(amount);
};

const getRiskLevelColor = (level: string) => {
  switch (level) {
    case 'Low':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'Medium':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    case 'High':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  }
};

const getVATStatusColor = (status: string) => {
  switch (status) {
    case 'Filed':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    case 'Overdue':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  }
};

export default function BusinessList({ businesses }: BusinessListProps) {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          <div className="p-6">
            {/* Header Actions */}
            <div className="flex space-x-4 mb-4">
              <div className="relative flex-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 dark:text-white dark:bg-gray-700 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#5266eb] sm:text-sm sm:leading-6"
                  placeholder="Search businesses..."
                />
              </div>
              <button className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:hover:bg-gray-700">
                <FunnelIcon className="h-5 w-5 mr-2 text-gray-400" />
                Filters
              </button>
              <button className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:hover:bg-gray-700">
                <ArrowDownTrayIcon className="h-5 w-5 mr-2 text-gray-400" />
                Export
              </button>
              <button className="inline-flex items-center rounded-md bg-[#5266eb] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#4255da] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5266eb]">
                <PlusIcon className="h-5 w-5 mr-2" />
                Add Business
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto -mx-6">
              <div className="min-w-full inline-block align-middle">
                <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
                  <thead>
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-6 lg:pl-8">
                        Business Name
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                        TIN
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                        Compliance Score
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                        VAT Status
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                        Risk Level
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 dark:text-white">
                        VAT Collected YTD
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {businesses.map((business) => (
                      <tr 
                        key={business.id} 
                        className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                      >
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white sm:pl-6 lg:pl-8">
                          <Link href={`/businesses/${business.id}`} className="hover:text-[#5266eb]">
                            {business.name}
                          </Link>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {business.tin}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <div className="flex items-center">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{business.complianceScore.overall}%</div>
                            <div className="ml-2 w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-blue-600 rounded-full h-2"
                                style={{ width: `${business.complianceScore.overall}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getVATStatusColor(business.vatStatus)}`}>
                            {business.vatStatus}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getRiskLevelColor(business.riskLevel)}`}>
                            {business.riskLevel}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-900 dark:text-white">
                          {formatCurrency(business.vatCollectedYTD)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 