'use client';

import React, { useState } from 'react';
import {
  AdjustmentsHorizontalIcon,
  CalendarIcon,
  MagnifyingGlassIcon,
  ArrowDownTrayIcon,
  PlusIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import DashboardLayout from '@/components/layout/DashboardLayout';
import CreateInvoice from './components/CreateInvoice';

interface Invoice {
  id: string;
  dueDate: string;
  status: 'Paid' | 'Overdue' | 'Cancelled' | 'Processing';
  customer: string;
  amount: number;
  invoiceNumber: string;
  invoiceDate: string;
  recurring: {
    type: 'Monthly' | 'Weekly';
    status: 'Series complete' | 'Next on May 1' | 'Next on Apr 18';
  };
}

const invoices: Invoice[] = [
  {
    id: '1',
    dueDate: '2024-03-01',
    status: 'Paid',
    customer: 'BNL Inc.',
    amount: 440.00,
    invoiceNumber: 'INV-017-1',
    invoiceDate: '2024-02-01',
    recurring: {
      type: 'Monthly',
      status: 'Series complete'
    }
  },
  {
    id: '2',
    dueDate: '2024-03-11',
    status: 'Overdue',
    customer: 'Acme Corp Conglom',
    amount: 175.00,
    invoiceNumber: 'INV-001-invoice',
    invoiceDate: '2024-03-11',
    recurring: {
      type: 'Monthly',
      status: 'Next on May 1'
    }
  },
  {
    id: '3',
    dueDate: '2024-03-26',
    status: 'Cancelled',
    customer: 'NASA',
    amount: 2000.00,
    invoiceNumber: 'INV-003',
    invoiceDate: '2024-03-11',
    recurring: {
      type: 'Weekly',
      status: 'Next on Apr 18'
    }
  },
  {
    id: '4',
    dueDate: '2024-04-01',
    status: 'Overdue',
    customer: 'BNL Inc.',
    amount: 440.00,
    invoiceNumber: 'INV-017-2',
    invoiceDate: '2024-03-01',
    recurring: {
      type: 'Monthly',
      status: 'Series complete'
    }
  }
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: 'GHS',
    minimumFractionDigits: 2,
  }).format(amount);
};

const getStatusColor = (status: Invoice['status']) => {
  switch (status) {
    case 'Paid':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'Overdue':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    case 'Cancelled':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    case 'Processing':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  }
};

export default function InvoicingPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateInvoiceOpen, setIsCreateInvoiceOpen] = useState(false);

  // Calculate summary statistics
  const totalOpen = invoices.reduce((sum, invoice) => 
    invoice.status !== 'Paid' && invoice.status !== 'Cancelled' ? sum + invoice.amount : sum, 0
  );
  const overdueInvoices = invoices.filter(invoice => invoice.status === 'Overdue');
  const overdueAmount = overdueInvoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const paidInvoices = invoices.filter(invoice => invoice.status === 'Paid');
  const paidAmount = paidInvoices.reduce((sum, invoice) => sum + invoice.amount, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Open */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(totalOpen)}
                </p>
                <div className="flex items-center mt-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total open</p>
                  <QuestionMarkCircleIcon className="h-4 w-4 text-gray-400 ml-1" />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {invoices.filter(i => i.status !== 'Paid' && i.status !== 'Cancelled').length} invoices
                </p>
              </div>
            </div>
          </div>

          {/* Overdue Invoices */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-semibold text-orange-600 dark:text-orange-400">
                  {formatCurrency(overdueAmount)}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Overdue invoices
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {overdueInvoices.length} invoices
                </p>
              </div>
            </div>
          </div>

          {/* Paid Invoices */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(paidAmount)}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Paid invoices
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {paidInvoices.length} invoices
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
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
                  placeholder="Search invoices..."
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
                Status
              </button>
              <button className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:hover:bg-gray-700">
                <ArrowDownTrayIcon className="h-5 w-5 mr-2 text-gray-400" />
                Export
              </button>
              <button 
                onClick={() => setIsCreateInvoiceOpen(true)}
                className="inline-flex items-center rounded-md bg-[#1a1a1a] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#2a2a2a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a1a1a]"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                New Invoice
              </button>
            </div>

            <div className="mt-6">
              <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Due date
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Status
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Customer
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 dark:text-white">
                      Amount
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Invoice no.
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Invoice date
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Recurring
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900 dark:text-white">
                        {format(new Date(invoice.dueDate), 'MMM d')}
                        {invoice.status === 'Overdue' && (
                          <div className="text-xs text-gray-500">
                            {Math.floor((Date.now() - new Date(invoice.dueDate).getTime()) / (1000 * 60 * 60 * 24))} days ago
                          </div>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusColor(invoice.status)}`}>
                          {invoice.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 dark:text-white">
                        {invoice.customer}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-900 dark:text-white">
                        {formatCurrency(invoice.amount)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {invoice.invoiceNumber}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {format(new Date(invoice.invoiceDate), 'MMM d')}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <div className="text-gray-900 dark:text-white">{invoice.recurring.type}</div>
                        <div className="text-gray-500 text-xs">{invoice.recurring.status}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <CreateInvoice 
        isOpen={isCreateInvoiceOpen}
        onClose={() => setIsCreateInvoiceOpen(false)}
      />
    </DashboardLayout>
  );
} 