'use client';

import React, { useState, useEffect } from 'react';
import {
  ChevronUpDownIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  ArrowDownTrayIcon,
  BuildingOfficeIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import { format } from 'date-fns';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { subMonths, format as dateFormat } from 'date-fns';

interface Business {
  id: string;
  name: string;
  tin: string;
  sector: string;
  complianceScore: number;
  vatStatus: 'Filed' | 'Pending' | 'Overdue' | 'Non-Compliant';
  riskLevel: 'Low' | 'Medium' | 'High';
  lastTransactionDate: Date;
  vatCollectedYTD: number;
  location: string;
  registrationDate: Date;
  address: string;
  contact: string;
  businessType: string;
  sizeClassification: 'Micro' | 'Small' | 'Medium' | 'Large';
  keyPersonnel: Array<{ name: string; role: string }>;
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
    type: 'Audit' | 'Notice' | 'Penalty';
    date: Date;
    status: string;
    details: string;
  }>;
}

interface FilterState {
  sector: string;
  complianceRange: { min: number; max: number };
  dateRange: { start: Date | null; end: Date | null };
  riskLevel: string;
  location: string;
  searchTerm: string;
}

const MOCK_BUSINESSES: Business[] = [
  {
    id: '1',
    name: 'Accra Retail Solutions',
    tin: 'GHA123456789',
    sector: 'Retail',
    complianceScore: 85,
    vatStatus: 'Filed',
    riskLevel: 'Low',
    lastTransactionDate: new Date('2024-03-10'),
    vatCollectedYTD: 25000.50,
    location: 'Accra',
    registrationDate: new Date('2023-01-15'),
    address: '123 Independence Ave, Accra',
    contact: '+233 20 123 4567',
    businessType: 'Limited Liability Company',
    sizeClassification: 'Medium',
    keyPersonnel: [
      { name: 'John Doe', role: 'CEO' },
      { name: 'Jane Smith', role: 'CFO' },
    ],
    complianceMetrics: {
      filingScore: 90,
      paymentScore: 85,
      invoiceScore: 88,
    },
    monthlyMetrics: {
      transactionVolume: 1250,
      averageInvoiceValue: 850,
      dailyVatCollection: 2500,
      unusualFlags: 2,
    },
    creditAssessment: {
      paymentReliability: 88,
      sustainability: 85,
      financialHealth: 82,
      trustScore: 86,
    },
    enforcementHistory: [
      {
        type: 'Audit',
        date: new Date('2023-12-15'),
        status: 'Completed',
        details: 'Regular compliance audit - No major issues found',
      },
      {
        type: 'Notice',
        date: new Date('2023-10-01'),
        status: 'Resolved',
        details: 'Late filing notice - Resolved within grace period',
      },
    ],
  },
  {
    id: '2',
    name: 'Kumasi Manufacturing Ltd',
    tin: 'GHA987654321',
    sector: 'Manufacturing',
    complianceScore: 65,
    vatStatus: 'Pending',
    riskLevel: 'Medium',
    lastTransactionDate: new Date('2024-03-08'),
    vatCollectedYTD: 45000.75,
    location: 'Kumasi',
    registrationDate: new Date('2022-06-20'),
    address: '45 Prempeh II Street, Kumasi',
    contact: '+233 20 987 6543',
    businessType: 'Private Limited Company',
    sizeClassification: 'Large',
    keyPersonnel: [
      { name: 'Kwame Mensah', role: 'Managing Director' },
      { name: 'Abena Osei', role: 'Finance Director' },
    ],
    complianceMetrics: {
      filingScore: 70,
      paymentScore: 65,
      invoiceScore: 75,
    },
    monthlyMetrics: {
      transactionVolume: 2800,
      averageInvoiceValue: 1200,
      dailyVatCollection: 3800,
      unusualFlags: 5,
    },
    creditAssessment: {
      paymentReliability: 72,
      sustainability: 68,
      financialHealth: 70,
      trustScore: 71,
    },
    enforcementHistory: [
      {
        type: 'Penalty',
        date: new Date('2024-01-15'),
        status: 'Pending',
        details: 'Late filing penalty - Payment plan in progress',
      },
      {
        type: 'Audit',
        date: new Date('2023-11-20'),
        status: 'Completed',
        details: 'Scheduled audit - Minor discrepancies found',
      },
    ],
  },
  // Add more mock data as needed
];

const SECTORS = ['All', 'Retail', 'Manufacturing', 'Services', 'Technology', 'Agriculture'];
const RISK_LEVELS = ['All', 'Low', 'Medium', 'High'];
const LOCATIONS = ['All', 'Accra', 'Kumasi', 'Takoradi', 'Tamale'];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: 'GHS',
    minimumFractionDigits: 2,
  }).format(amount);
};

// Historical compliance data generator
const generateHistoricalData = (business: Business) => {
  const data = [];
  const baseScore = business.complianceScore;
  
  for (let i = 11; i >= 0; i--) {
    const date = subMonths(new Date(), i);
    // Generate a score that varies slightly from the base score
    const variance = Math.random() * 10 - 5; // Random variance between -5 and +5
    const score = Math.min(100, Math.max(0, baseScore + variance));
    
    data.push({
      date: dateFormat(date, 'MMM yyyy'),
      score: Number(score.toFixed(1)),
    });
  }
  
  return data;
};

// Historical Compliance Chart Component
const HistoricalComplianceChart = ({ data }: { data: Array<{ date: string; score: number }> }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis
          dataKey="date"
          stroke="#6B7280"
          tick={{ fill: '#6B7280' }}
        />
        <YAxis
          stroke="#6B7280"
          tick={{ fill: '#6B7280' }}
          domain={[0, 100]}
          ticks={[0, 20, 40, 60, 80, 100]}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1F2937',
            border: 'none',
            borderRadius: '0.5rem',
            color: '#F3F4F6',
          }}
        />
        <Line
          type="monotone"
          dataKey="score"
          stroke="#5266eb"
          strokeWidth={2}
          dot={{ fill: '#5266eb', r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default function BusinessesPage() {
  const [businesses, setBusinesses] = useState<Business[]>(MOCK_BUSINESSES);
  const [filters, setFilters] = useState<FilterState>({
    sector: 'All',
    complianceRange: { min: 0, max: 100 },
    dateRange: { start: null, end: null },
    riskLevel: 'All',
    location: 'All',
    searchTerm: '',
  });
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Business;
    direction: 'asc' | 'desc';
  } | null>(null);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const handleSort = (key: keyof Business) => {
    setSortConfig(current => ({
      key,
      direction: current?.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedBusiness(null);
      setIsClosing(false);
    }, 300);
  };

  useEffect(() => {
    return () => {
      setIsClosing(false);
    };
  }, []);

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
      case 'Non-Compliant':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

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
                  value={filters.searchTerm}
                  onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
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
                        onClick={() => setSelectedBusiness(business)}
                      >
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white sm:pl-6 lg:pl-8">
                          {business.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {business.tin}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <div className="flex items-center">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{business.complianceScore}%</div>
                            <div className="ml-2 w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-blue-600 rounded-full h-2"
                                style={{ width: `${business.complianceScore}%` }}
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

      {/* Updated Business Detail Modal */}
      {selectedBusiness && (
        <>
          {/* Keep existing backdrop */}
          <div 
            className={`fixed inset-0 bg-gray-500/75 dark:bg-gray-900/75 backdrop-blur-sm transition-opacity z-40 ${
              isClosing ? 'opacity-0' : 'opacity-100'
            }`}
            onClick={handleCloseModal}
          />
          
          {/* Updated Panel */}
          <div 
            className={`fixed inset-y-4 right-4 z-50 w-[800px] bg-white dark:bg-gray-800 shadow-2xl overflow-y-auto rounded-xl transform transition-all duration-300 ease-in-out ${
              isClosing ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'
            }`}
          >
            <div className="relative h-full">
              {/* Header */}
              <div className="sticky top-0 z-10 px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-white dark:bg-gray-800">
                <div className="flex items-center space-x-2">
                  <h2 className="text-base font-medium text-gray-900 dark:text-white">Business Profile</h2>
                </div>
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-500 transition-colors"
                  onClick={handleCloseModal}
                >
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Content */}
              <div className="px-6 py-6 space-y-8">
                {/* Business Information */}
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 bg-[#5266eb] rounded-lg flex items-center justify-center text-white text-2xl font-semibold">
                        {selectedBusiness.name.split(' ').map(word => word[0]).join('')}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{selectedBusiness.name}</h3>
                        <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${getRiskLevelColor(selectedBusiness.riskLevel)}`}>
                          {selectedBusiness.riskLevel} Risk
                        </span>
                      </div>
                      <dl className="mt-4 grid grid-cols-2 gap-4">
                        <div>
                          <dt className="text-sm font-medium text-gray-500">TIN</dt>
                          <dd className="mt-1 text-sm text-gray-900 dark:text-white">{selectedBusiness.tin}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Registration Date</dt>
                          <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                            {format(selectedBusiness.registrationDate, 'MMM dd, yyyy')}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Business Type</dt>
                          <dd className="mt-1 text-sm text-gray-900 dark:text-white">{selectedBusiness.businessType}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Size Classification</dt>
                          <dd className="mt-1 text-sm text-gray-900 dark:text-white">{selectedBusiness.sizeClassification}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Address</dt>
                          <dd className="mt-1 text-sm text-gray-900 dark:text-white">{selectedBusiness.address}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Contact</dt>
                          <dd className="mt-1 text-sm text-gray-900 dark:text-white">{selectedBusiness.contact}</dd>
                        </div>
                      </dl>
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-500">Key Personnel</h4>
                        <ul className="mt-2 grid grid-cols-2 gap-2">
                          {selectedBusiness.keyPersonnel.map((person, index) => (
                            <li key={index} className="text-sm text-gray-900 dark:text-white">
                              {person.name} - <span className="text-gray-500">{person.role}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Compliance Dashboard */}
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Compliance Dashboard</h3>
                  
                  {/* Compliance Scores */}
                  <div className="grid grid-cols-4 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-500">Overall Score</h4>
                      <div className="mt-2">
                        <div className="flex items-baseline">
                          <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                            {selectedBusiness.complianceScore}%
                          </p>
                        </div>
                        <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-blue-600 rounded-full h-2"
                            style={{ width: `${selectedBusiness.complianceScore}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-500">Filing Score</h4>
                      <div className="mt-2">
                        <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                          {selectedBusiness.complianceMetrics.filingScore}%
                        </p>
                        <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-green-600 rounded-full h-2"
                            style={{ width: `${selectedBusiness.complianceMetrics.filingScore}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-500">Payment Score</h4>
                      <div className="mt-2">
                        <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                          {selectedBusiness.complianceMetrics.paymentScore}%
                        </p>
                        <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-purple-600 rounded-full h-2"
                            style={{ width: `${selectedBusiness.complianceMetrics.paymentScore}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-500">Invoice Score</h4>
                      <div className="mt-2">
                        <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                          {selectedBusiness.complianceMetrics.invoiceScore}%
                        </p>
                        <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-yellow-600 rounded-full h-2"
                            style={{ width: `${selectedBusiness.complianceMetrics.invoiceScore}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Historical Compliance Graph */}
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-medium text-gray-500">Historical Compliance</h4>
                      <div className="text-sm text-gray-500">Last 12 months</div>
                    </div>
                    <HistoricalComplianceChart data={generateHistoricalData(selectedBusiness)} />
                  </div>
                </div>

                {/* Transaction Metrics */}
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Transaction Metrics</h3>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-500">Monthly Volume</h4>
                      <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
                        {selectedBusiness.monthlyMetrics.transactionVolume}
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-500">Avg. Invoice Value</h4>
                      <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
                        {formatCurrency(selectedBusiness.monthlyMetrics.averageInvoiceValue)}
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-500">Daily VAT Collection</h4>
                      <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
                        {formatCurrency(selectedBusiness.monthlyMetrics.dailyVatCollection)}
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-500">Unusual Flags</h4>
                      <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
                        {selectedBusiness.monthlyMetrics.unusualFlags}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Credit Assessment */}
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Credit Assessment</h3>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-500">Payment Reliability</h4>
                      <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
                        {selectedBusiness.creditAssessment.paymentReliability}%
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-500">Sustainability</h4>
                      <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
                        {selectedBusiness.creditAssessment.sustainability}%
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-500">Financial Health</h4>
                      <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
                        {selectedBusiness.creditAssessment.financialHealth}%
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-500">Trust Score</h4>
                      <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
                        {selectedBusiness.creditAssessment.trustScore}%
                      </p>
                    </div>
                  </div>
                </div>

                {/* Enforcement History */}
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Enforcement History</h3>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden">
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                      {selectedBusiness.enforcementHistory.map((event, index) => (
                        <li key={index} className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">{event.type}</p>
                              <p className="mt-1 text-sm text-gray-500">{event.details}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-900 dark:text-white">{format(event.date, 'MMM dd, yyyy')}</p>
                              <p className="mt-1 text-sm text-gray-500">{event.status}</p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#5266eb] hover:bg-[#4255da] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5266eb]">
                    Schedule Audit
                  </button>
                  <button className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1a1a1a]">
                    Send Notification
                  </button>
                  <button className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1a1a1a]">
                    <span className="sr-only">More options</span>
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
} 