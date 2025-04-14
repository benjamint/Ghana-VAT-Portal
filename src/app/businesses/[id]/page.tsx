'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { ArrowLeftIcon, CheckBadgeIcon, ExclamationTriangleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import React from 'react';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface VerificationStatus {
  status: 'Verified' | 'Partially Verified' | 'Unverified';
  color: string;
  icon: any;
}

const verificationStatuses: Record<string, VerificationStatus> = {
  'Verified': { status: 'Verified', color: 'text-green-600 bg-green-50', icon: CheckBadgeIcon },
  'Partially Verified': { status: 'Partially Verified', color: 'text-yellow-600 bg-yellow-50', icon: ExclamationTriangleIcon },
  'Unverified': { status: 'Unverified', color: 'text-red-600 bg-red-50', icon: XCircleIcon },
};

function TrustScoreGauge({ score }: { score: number }) {
  return (
    <div className="relative w-32 h-32">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="10"
        />
        {/* Score circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke={score >= 70 ? '#22c55e' : score >= 40 ? '#eab308' : '#ef4444'}
          strokeWidth="10"
          strokeDasharray={`${score * 2.83} ${283 - score * 2.83}`}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
        />
        <text
          x="50"
          y="50"
          textAnchor="middle"
          dy="0.3em"
          className="text-2xl font-bold"
          fill="#374151"
        >
          {score}%
        </text>
      </svg>
    </div>
  );
}

function BusinessProfileHeader({ business }: { business: any }) {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <Link href="/businesses" className="text-gray-500 hover:text-gray-700">
              <ArrowLeftIcon className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">{business.name}</h1>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${verificationStatuses[business.verificationStatus].color}`}>
              <div className="flex items-center gap-1">
                {React.createElement(verificationStatuses[business.verificationStatus].icon, {
                  className: "w-4 h-4"
                })}
                {business.verificationStatus}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <p><span className="font-medium">TIN:</span> {business.tin}</p>
              <p><span className="font-medium">Contact:</span> {business.contact}</p>
              <p><span className="font-medium">Address:</span> {business.address}</p>
            </div>
            <div>
              <p><span className="font-medium">Business Type:</span> {business.businessType}</p>
              <p><span className="font-medium">Size:</span> {business.sizeClassification}</p>
              <p><span className="font-medium">Registration Date:</span> {new Date(business.registrationDate).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-4">
          <TrustScoreGauge score={business.trustScore} />
          <div className="flex gap-2">
            <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
              Schedule Audit
            </button>
            <button className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100">
              Contact Business
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TrustScorePanel({ business }: { business: any }) {
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Trust Score',
        data: business.trustScoreHistory,
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        fill: true,
      },
      {
        label: 'Industry Average',
        data: business.industryAverageHistory,
        borderColor: '#94a3b8',
        backgroundColor: 'transparent',
        borderDash: [5, 5],
      },
    ],
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Trust Score Analysis</h2>
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Tax Compliance</h3>
          <div className="text-2xl font-bold text-gray-900">{business.taxComplianceScore}%</div>
          <div className="mt-2 text-sm text-gray-600">Based on filing & payment history</div>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Transaction Verification</h3>
          <div className="text-2xl font-bold text-gray-900">{business.transactionVerificationScore}%</div>
          <div className="mt-2 text-sm text-gray-600">Based on verified transactions</div>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Business Legitimacy</h3>
          <div className="text-2xl font-bold text-gray-900">{business.legitimacyScore}%</div>
          <div className="mt-2 text-sm text-gray-600">Based on verification checks</div>
        </div>
      </div>
      <div className="h-64">
        <Line data={chartData} options={{
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
            },
          },
        }} />
      </div>
    </div>
  );
}

function TransactionAnalysis({ business }: { business: any }) {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Transaction Analysis</h2>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-4">Transaction Volume</h3>
          <div className="h-64">
            <Line
              data={{
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                  label: 'Volume',
                  data: business.transactionVolume,
                  borderColor: '#6366f1',
                  backgroundColor: 'rgba(99, 102, 241, 0.1)',
                  fill: true,
                }],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          </div>
        </div>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Consistency Score</h3>
            <div className="text-2xl font-bold text-gray-900">{business.consistencyScore}%</div>
            <div className="mt-2 text-sm text-gray-600">Based on transaction patterns</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Unusual Patterns</h3>
            <ul className="space-y-2">
              {business.unusualPatterns.map((pattern: string, index: number) => (
                <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                  <ExclamationTriangleIcon className="w-4 h-4 text-yellow-500" />
                  {pattern}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function ComplianceTimeline({ business }: { business: any }) {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Compliance History</h2>
      <div className="flow-root">
        <ul className="-mb-8">
          {business.complianceHistory.map((event: any, index: number) => (
            <li key={index}>
              <div className="relative pb-8">
                {index !== business.complianceHistory.length - 1 && (
                  <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                )}
                <div className="relative flex space-x-3">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                    event.type === 'success' ? 'bg-green-500' :
                    event.type === 'warning' ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}>
                    <CheckBadgeIcon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                    <div>
                      <p className="text-sm text-gray-900">{event.description}</p>
                    </div>
                    <div className="whitespace-nowrap text-right text-sm text-gray-500">
                      <time dateTime={event.date}>{new Date(event.date).toLocaleDateString()}</time>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function VerificationDetails({ business }: { business: any }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Verification Details</h2>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-4">Verified Documents</h3>
          <ul className="space-y-3">
            {business.verifiedDocuments.map((doc: any, index: number) => (
              <li key={index} className="flex items-center gap-2">
                <CheckBadgeIcon className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-600">{doc.name}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-4">Verification Steps</h3>
          <ul className="space-y-3">
            {business.verificationSteps.map((step: any, index: number) => (
              <li key={index} className="flex items-center gap-2">
                {step.completed ? (
                  <CheckBadgeIcon className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircleIcon className="w-5 h-5 text-gray-300" />
                )}
                <span className="text-sm text-gray-600">{step.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Physical Verification</h3>
            <p className="text-sm text-gray-600">{business.physicalVerification}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Last Verification</h3>
            <p className="text-sm text-gray-600">{new Date(business.lastVerificationDate).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
      <div className="mt-6 pt-6 border-t border-gray-200 text-center">
        <p className="text-xs text-gray-500">Powered by ScoreTrux</p>
      </div>
    </div>
  );
}

export default function BusinessDetailsPage({ params }: { params: { id: string } }) {
  const [business, setBusiness] = useState<any>(null);

  useEffect(() => {
    // In a real application, fetch business data from an API
    // For now, we'll use mock data
    setBusiness({
      id: params.id,
      name: 'Sage Microsystems Ghana Ltd.',
      tin: 'GHA123456789',
      contact: '+233 30 273 4567',
      address: '14 Independence Ave, Airport City, Accra',
      businessType: 'Technology Services',
      sizeClassification: 'Medium Enterprise',
      registrationDate: '2020-01-15',
      verificationStatus: 'Verified',
      trustScore: 85,
      taxComplianceScore: 90,
      transactionVerificationScore: 85,
      legitimacyScore: 80,
      trustScoreHistory: [75, 78, 80, 82, 85, 85],
      industryAverageHistory: [70, 71, 72, 71, 73, 72],
      transactionVolume: [150, 180, 160, 190, 175, 200],
      consistencyScore: 88,
      unusualPatterns: [
        'Unusual spike in transactions on weekends',
        'Higher than average refund rate',
      ],
      complianceHistory: [
        {
          type: 'success',
          date: '2023-12-15',
          description: 'VAT Return filed and paid on time',
        },
        {
          type: 'warning',
          date: '2023-11-15',
          description: 'Late payment - resolved within grace period',
        },
        {
          type: 'success',
          date: '2023-10-15',
          description: 'Successful routine audit completed',
        },
      ],
      verifiedDocuments: [
        { name: 'Business Registration Certificate' },
        { name: 'Tax Clearance Certificate' },
        { name: 'VAT Registration Certificate' },
        { name: 'Directors\' ID Documents' },
      ],
      verificationSteps: [
        { name: 'Document Verification', completed: true },
        { name: 'Physical Address Verification', completed: true },
        { name: 'Bank Account Verification', completed: true },
        { name: 'Director Background Check', completed: true },
      ],
      physicalVerification: 'Completed - Location matches registered address',
      lastVerificationDate: '2023-12-01',
    });
  }, [params.id]);

  if (!business) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <BusinessProfileHeader business={business} />
          <TrustScorePanel business={business} />
          <TransactionAnalysis business={business} />
          <ComplianceTimeline business={business} />
          <VerificationDetails business={business} />
        </div>
      </div>
    </DashboardLayout>
  );
}
