'use client';

import React from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import DashboardLayout from '@/components/layout/DashboardLayout';

interface ComplianceHistory {
  month: string;
  score: number;
  sectorAverage: number;
}

const MOCK_COMPLIANCE_HISTORY: ComplianceHistory[] = [
  { month: 'Mar', score: 85, sectorAverage: 75 },
  { month: 'Apr', score: 82, sectorAverage: 76 },
  { month: 'May', score: 88, sectorAverage: 74 },
  { month: 'Jun', score: 85, sectorAverage: 75 },
  { month: 'Jul', score: 90, sectorAverage: 77 },
  { month: 'Aug', score: 87, sectorAverage: 76 },
  { month: 'Sep', score: 85, sectorAverage: 75 },
  { month: 'Oct', score: 89, sectorAverage: 76 },
  { month: 'Nov', score: 92, sectorAverage: 78 },
  { month: 'Dec', score: 90, sectorAverage: 77 },
  { month: 'Jan', score: 88, sectorAverage: 76 },
  { month: 'Feb', score: 85, sectorAverage: 75 },
];

export default function BusinessDetailPage({ params }: { params: { id: string } }) {
  const complianceScore = {
    overall: 85,
    filing: 90,
    payment: 82,
    invoice: 88,
  };

  const transactionMetrics = {
    monthlyVolume: 1250,
    averageInvoiceValue: 850,
    dailyVatCollection: 2500,
    unusualFlags: 2,
  };

  const creditAssessment = {
    paymentReliability: 88,
    sustainability: 85,
    financialHealth: 82,
    trustScore: 86,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/businesses" className="text-gray-500 hover:text-gray-700">
            <ArrowLeftIcon className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Accra Retail Solutions</h1>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Business Information Panel */}
          <div className="col-span-1 bg-white rounded-lg shadow">
            <div className="p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Accra Retail Solutions</h2>
                  <span className="px-3 py-1 text-sm font-medium text-green-700 border border-green-200 rounded-full">Low Risk</span>
                </div>
                
                <dl className="grid grid-cols-2 gap-4">
                  <div className="border border-gray-100 rounded-lg p-3">
                    <dt className="text-sm font-medium text-gray-500">TIN</dt>
                    <dd className="mt-1 text-sm text-gray-900">GHA123456789</dd>
                  </div>
                  <div className="border border-gray-100 rounded-lg p-3">
                    <dt className="text-sm font-medium text-gray-500">Registration Date</dt>
                    <dd className="mt-1 text-sm text-gray-900">January 15, 2023</dd>
                  </div>
                  <div className="border border-gray-100 rounded-lg p-3">
                    <dt className="text-sm font-medium text-gray-500">Business Type</dt>
                    <dd className="mt-1 text-sm text-gray-900">Retail</dd>
                  </div>
                  <div className="border border-gray-100 rounded-lg p-3">
                    <dt className="text-sm font-medium text-gray-500">Size Classification</dt>
                    <dd className="mt-1 text-sm text-gray-900">Medium Enterprise</dd>
                  </div>
                </dl>

                <div className="border border-gray-100 rounded-lg p-3">
                  <dt className="text-sm font-medium text-gray-500">Address</dt>
                  <dd className="mt-1 text-sm text-gray-900">123 Independence Ave, Accra</dd>
                </div>
                
                <div className="border border-gray-100 rounded-lg p-3">
                  <dt className="text-sm font-medium text-gray-500">Contact</dt>
                  <dd className="mt-1 text-sm text-gray-900">+233 20 123 4567</dd>
                </div>

                <div className="border border-gray-100 rounded-lg p-3">
                  <dt className="text-sm font-medium text-gray-500">Key Personnel</dt>
                  <dd className="mt-2 space-y-1">
                    <div className="flex items-center justify-between text-sm text-gray-900">
                      <span>John Doe</span>
                      <span className="text-gray-500">CEO</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-900">
                      <span>Jane Smith</span>
                      <span className="text-gray-500">CFO</span>
                    </div>
                  </dd>
                </div>
              </div>
            </div>
          </div>

          {/* Compliance Dashboard */}
          <div className="col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Compliance Dashboard</h2>
                
                <div className="grid grid-cols-4 gap-4 mb-6">
                  <div className="border border-gray-100 rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-500">Overall Score</div>
                    <div className="mt-2 flex items-center">
                      <span className="text-2xl font-bold text-gray-900">{complianceScore.overall}%</span>
                    </div>
                  </div>
                  <div className="border border-gray-100 rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-500">Filing Score</div>
                    <div className="mt-2 flex items-center">
                      <span className="text-2xl font-bold text-gray-900">{complianceScore.filing}%</span>
                    </div>
                  </div>
                  <div className="border border-gray-100 rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-500">Payment Score</div>
                    <div className="mt-2 flex items-center">
                      <span className="text-2xl font-bold text-gray-900">{complianceScore.payment}%</span>
                    </div>
                  </div>
                  <div className="border border-gray-100 rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-500">Invoice Score</div>
                    <div className="mt-2 flex items-center">
                      <span className="text-2xl font-bold text-gray-900">{complianceScore.invoice}%</span>
                    </div>
                  </div>
                </div>

                <div className="h-80">
                  <h3 className="text-sm font-medium text-gray-500 mb-4">Historical Compliance</h3>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={MOCK_COMPLIANCE_HISTORY}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="score"
                        stroke="#4F46E5"
                        strokeWidth={2}
                        name="Business Score"
                      />
                      <Line
                        type="monotone"
                        dataKey="sectorAverage"
                        stroke="#9CA3AF"
                        strokeWidth={2}
                        name="Sector Average"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Transaction Metrics */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Transaction Metrics</h2>
                <div className="grid grid-cols-4 gap-4">
                  <div className="border border-gray-100 rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-500">Monthly Volume</div>
                    <div className="mt-2 text-xl font-semibold text-gray-900">
                      {transactionMetrics.monthlyVolume}
                    </div>
                  </div>
                  <div className="border border-gray-100 rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-500">Avg. Invoice Value</div>
                    <div className="mt-2 text-xl font-semibold text-gray-900">
                      ₵{transactionMetrics.averageInvoiceValue}
                    </div>
                  </div>
                  <div className="border border-gray-100 rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-500">Daily VAT Collection</div>
                    <div className="mt-2 text-xl font-semibold text-gray-900">
                      ₵{transactionMetrics.dailyVatCollection}
                    </div>
                  </div>
                  <div className="border border-gray-100 rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-500">Unusual Flags</div>
                    <div className="mt-2 text-xl font-semibold text-gray-900">
                      {transactionMetrics.unusualFlags}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Credit Assessment */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Credit Assessment</h2>
                <div className="grid grid-cols-4 gap-4">
                  <div className="border border-gray-100 rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-500">Payment Reliability</div>
                    <div className="mt-2 text-xl font-semibold text-gray-900">
                      {creditAssessment.paymentReliability}%
                    </div>
                  </div>
                  <div className="border border-gray-100 rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-500">Sustainability</div>
                    <div className="mt-2 text-xl font-semibold text-gray-900">
                      {creditAssessment.sustainability}%
                    </div>
                  </div>
                  <div className="border border-gray-100 rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-500">Financial Health</div>
                    <div className="mt-2 text-xl font-semibold text-gray-900">
                      {creditAssessment.financialHealth}%
                    </div>
                  </div>
                  <div className="border border-gray-100 rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-500">Trust Score</div>
                    <div className="mt-2 text-xl font-semibold text-gray-900">
                      {creditAssessment.trustScore}%
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Actions</h2>
                <div className="grid grid-cols-4 gap-4">
                  <button className="p-4 text-center border border-gray-100 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    Schedule Audit
                  </button>
                  <button className="p-4 text-center border border-gray-100 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    Send Notification
                  </button>
                  <button className="p-4 text-center border border-gray-100 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    Generate Report
                  </button>
                  <button className="p-4 text-center border border-gray-100 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    View Transactions
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 