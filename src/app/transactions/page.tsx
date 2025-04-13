'use client';

import React, { useState, useEffect } from 'react';
import {
  AdjustmentsHorizontalIcon,
  CalendarIcon,
  MagnifyingGlassIcon,
  DocumentArrowDownIcon,
  DocumentDuplicateIcon,
  XMarkIcon,
  PaperAirplaneIcon,
  ArrowDownTrayIcon,
} from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import DashboardLayout from '@/components/layout/DashboardLayout';

interface Transaction {
  id: string;
  businessName: string;
  tin: string;
  date: string;
  invoiceNumber: string;
  amount: number;
  vatAmount: number;
  paymentMethod: 'Mobile Money' | 'Bank Transfer' | 'Card' | 'Cash';
  status: 'Completed' | 'Pending' | 'Flagged' | 'Under Review';
  complianceFlag: 'green' | 'yellow' | 'red';
}

const transactions: Transaction[] = [
  {
    id: 'TRX-001-2024',
    businessName: 'MTN Ghana',
    tin: 'C0000012345',
    date: '2024-03-15',
    invoiceNumber: 'INV-2024-001',
    amount: 125000.00,
    vatAmount: 18750.00,
    paymentMethod: 'Bank Transfer',
    status: 'Completed',
    complianceFlag: 'green',
  },
  {
    id: 'TRX-002-2024',
    businessName: 'Melcom Group',
    tin: 'C0000054321',
    date: '2024-03-14',
    invoiceNumber: 'INV-2024-002',
    amount: 87500.00,
    vatAmount: 13125.00,
    paymentMethod: 'Mobile Money',
    status: 'Pending',
    complianceFlag: 'yellow',
  },
  {
    id: 'TRX-003-2024',
    businessName: 'GHACEM Limited',
    tin: 'C0000098765',
    date: '2024-03-14',
    invoiceNumber: 'INV-2024-003',
    amount: 152000.00,
    vatAmount: 22800.00,
    paymentMethod: 'Bank Transfer',
    status: 'Flagged',
    complianceFlag: 'red',
  },
  {
    id: 'TRX-004-2024',
    businessName: 'Fan Milk Limited',
    tin: 'C0000087654',
    date: '2024-03-13',
    invoiceNumber: 'INV-2024-004',
    amount: 56000.00,
    vatAmount: 8400.00,
    paymentMethod: 'Card',
    status: 'Under Review',
    complianceFlag: 'yellow',
  },
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: 'GHS',
    minimumFractionDigits: 2,
  }).format(amount);
};

const getStatusColor = (status: Transaction['status']) => {
  switch (status) {
    case 'Completed':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    case 'Flagged':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    case 'Under Review':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  }
};

const getComplianceFlagColor = (flag: Transaction['complianceFlag']) => {
  switch (flag) {
    case 'green':
      return 'bg-green-500';
    case 'yellow':
      return 'bg-yellow-500';
    case 'red':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};

export default function TransactionsPage() {
  const [view, setView] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedTransaction(null);
      setIsClosing(false);
    }, 300); // Match the duration in the CSS transition
  };

  // Clean up the animation state when component unmounts
  useEffect(() => {
    return () => {
      setIsClosing(false);
    };
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          <div className="p-6">
            <div className="flex space-x-4 mb-4">
              <div className="relative flex-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 dark:text-white dark:bg-gray-700 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#5266eb] sm:text-sm sm:leading-6"
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:hover:bg-gray-700">
                <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2 text-gray-400" />
                Filters
              </button>
              <button className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:hover:bg-gray-700">
                <CalendarIcon className="h-5 w-5 mr-2 text-gray-400" />
                Date
              </button>
              <button
                type="button"
                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:hover:bg-gray-700"
              >
                <DocumentDuplicateIcon className="h-5 w-5 mr-2 text-gray-400" />
                Match Receipts
              </button>
              <button
                type="button"
                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:hover:bg-gray-700"
              >
                <DocumentArrowDownIcon className="h-5 w-5 mr-2 text-gray-400" />
                Export All
              </button>
            </div>

            <div className="overflow-x-auto -mx-6">
              <div className="min-w-full inline-block align-middle">
                <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
                  <thead>
                    <tr>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                        Date
                      </th>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-6 lg:pl-8">
                        Transaction ID
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                        Business Name
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                        TIN
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                        Invoice Number
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 dark:text-white">
                        Amount (GHS)
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 dark:text-white">
                        VAT Amount (GHS)
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                        Payment Method
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {transactions.map((transaction) => (
                      <tr 
                        key={transaction.id} 
                        className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                        onClick={() => setSelectedTransaction(transaction)}
                      >
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {format(new Date(transaction.date), 'MMM dd, yyyy')}
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white sm:pl-6 lg:pl-8">
                          {transaction.id}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 dark:text-white">
                          {transaction.businessName}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {transaction.tin}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {transaction.invoiceNumber}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-900 dark:text-white">
                          {formatCurrency(transaction.amount)}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-900 dark:text-white">
                          {formatCurrency(transaction.vatAmount)}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <span className="inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                            {transaction.paymentMethod}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusColor(transaction.status)}`}>
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
      </div>

      {/* Transaction Detail Modal */}
      {selectedTransaction && (
        <>
          {/* Backdrop */}
          <div 
            className={`fixed inset-0 bg-gray-500/75 dark:bg-gray-900/75 backdrop-blur-sm transition-opacity z-40 ${
              isClosing ? 'opacity-0' : 'opacity-100'
            }`}
            onClick={handleCloseModal}
          />
          
          {/* Panel */}
          <div 
            className={`fixed inset-y-4 right-4 z-50 w-[480px] bg-white dark:bg-gray-800 shadow-2xl overflow-y-auto rounded-xl transform transition-all duration-300 ease-in-out ${
              isClosing ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'
            }`}
          >
            <div className="relative h-full">
              {/* Header */}
              <div className="sticky top-0 z-10 px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-white dark:bg-gray-800">
                <div className="flex items-center space-x-2">
                  <h2 className="text-base font-medium text-gray-900 dark:text-white">Transaction Details</h2>
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
                {/* Amount and Status */}
                <div>
                  <div className="flex items-baseline">
                    <span className="text-gray-500 text-2xl">₵</span>
                    <span className="text-4xl font-semibold text-gray-900 dark:text-white">{selectedTransaction.amount.toLocaleString('en-GH', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="mt-4 flex items-center space-x-3">
                    <div className="text-sm text-gray-500">Due on {format(new Date(selectedTransaction.date), 'MMM dd')}</div>
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(selectedTransaction.status)}`}>
                      {selectedTransaction.status}
                    </span>
                  </div>
                </div>

                {/* Business Information */}
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-medium text-gray-900 dark:text-white truncate">{selectedTransaction.businessName}</h4>
                        <span className="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-900/50 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-200">
                          Retail
                        </span>
                      </div>
                      <div className="mt-1">
                        <p className="text-sm text-gray-500">TIN: {selectedTransaction.tin}</p>
                        <p className="mt-1 text-sm text-gray-500">Accra, Ghana</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons - Updated with icons */}
                <div className="flex space-x-3">
                  <button className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#5266eb] hover:bg-[#4255da] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5266eb]">
                    <PaperAirplaneIcon className="h-5 w-5 mr-2" />
                    Send Invoice
                  </button>
                  <button className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1a1a1a]">
                    <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                    Download PDF
                  </button>
                  <button className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1a1a1a]">
                    <span className="sr-only">More options</span>
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>
                </div>

                {/* Recent Activity */}
                <div>
                  <h3 className="text-base font-medium text-gray-900 dark:text-white mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                        <svg className="w-3 h-3 text-blue-600 dark:text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-900 dark:text-white">Invoice created successfully</p>
                        <p className="text-xs text-gray-500">{format(new Date(selectedTransaction.date), 'MMM dd, yyyy')}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                        <svg className="w-3 h-3 text-green-600 dark:text-green-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-900 dark:text-white">Payment made via {selectedTransaction.paymentMethod}</p>
                        <p className="text-xs text-gray-500">{format(new Date(selectedTransaction.date), 'MMM dd, yyyy')}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Invoice Items */}
                <div>
                  <h3 className="text-base font-medium text-gray-900 dark:text-white mb-4">Invoice Items</h3>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">Item Total</p>
                          <p className="text-xs text-gray-500">{formatCurrency(selectedTransaction.amount - selectedTransaction.vatAmount)}</p>
                        </div>
                        <p className="text-sm text-gray-900 dark:text-white">{formatCurrency(selectedTransaction.amount - selectedTransaction.vatAmount)}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">VAT (15%)</p>
                        </div>
                        <p className="text-sm text-gray-900 dark:text-white">{formatCurrency(selectedTransaction.vatAmount)}</p>
                      </div>
                      <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between items-center">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">Total</p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{formatCurrency(selectedTransaction.amount)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payments */}
                <div>
                  <h3 className="text-base font-medium text-gray-900 dark:text-white mb-4">Payments</h3>
                  <div className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600 dark:text-green-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{formatCurrency(selectedTransaction.amount)}</p>
                      <p className="text-xs text-gray-500">Payment made via {selectedTransaction.paymentMethod} on {format(new Date(selectedTransaction.date), 'MMM dd, yyyy')}</p>
                    </div>
                  </div>
                </div>

                {/* Reminders */}
                <div>
                  <h3 className="text-base font-medium text-gray-900 dark:text-white mb-4">Reminders</h3>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-sm text-gray-500">No active reminder set</p>
                    </div>
                    <button className="text-sm font-medium text-[#5266eb] hover:text-[#4255da]">
                      Add a Reminder
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
} 