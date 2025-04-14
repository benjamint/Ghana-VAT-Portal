import { ArrowLeftIcon, CheckBadgeIcon, ExclamationTriangleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import React from 'react';
import BusinessLayout from '@/components/businesses/BusinessLayout';
import { TrustScoreChart, TransactionVolumeChart } from '@/components/businesses/BusinessCharts';
import { getBusinessById } from '@/app/lib/data';
import { notFound } from 'next/navigation';

interface VerificationStatus {
  status: 'Verified' | 'Partially Verified' | 'Unverified';
  color: string;
  icon: any;
}

const verificationStatuses: Record<string, VerificationStatus> = {
  'Verified': { status: 'Verified', color: 'text-green-600 bg-green-50', icon: CheckBadgeIcon },
  'Partially Verified': { status: 'Partially Verified', color: 'text-yellow-600 bg-yellow-50', icon: ExclamationTriangleIcon },
  'Unverified': { status: 'Unverified', color: 'text-red-600 bg-red-50', icon: XCircleIcon },
  'default': { status: 'Unverified', color: 'text-gray-600 bg-gray-50', icon: XCircleIcon }
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
  const verificationStatus = business.verificationStatus && verificationStatuses[business.verificationStatus] 
    ? verificationStatuses[business.verificationStatus] 
    : verificationStatuses['default'];

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <Link href="/businesses" className="text-gray-500 hover:text-gray-700">
              <ArrowLeftIcon className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">{business.name}</h1>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${verificationStatus.color}`}>
              <div className="flex items-center gap-1">
                {React.createElement(verificationStatus.icon, {
                  className: "w-4 h-4"
                })}
                {verificationStatus.status}
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
        <TrustScoreChart 
          trustScoreHistory={business.trustScoreHistory}
          industryAverageHistory={business.industryAverageHistory}
        />
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
            <TransactionVolumeChart transactionVolume={business.transactionVolume} />
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

export async function generateStaticParams() {
  // This is a placeholder array of business IDs that will be pre-rendered
  // Replace this with your actual business IDs from your data source
  const businessIds = ['1', '2', '3', '4', '5'];
  
  return businessIds.map((id) => ({
    id: id,
  }));
}

export default async function BusinessDetailsPage({ params }: { params: { id: string } }) {
  const business = await getBusinessById(params.id);
  
  if (!business) {
    notFound();
  }

  return (
    <BusinessLayout>
      <div className="space-y-6">
        <BusinessProfileHeader business={business} />
        <TrustScorePanel business={business} />
        <TransactionAnalysis business={business} />
        <ComplianceTimeline business={business} />
        <VerificationDetails business={business} />
      </div>
    </BusinessLayout>
  );
}
