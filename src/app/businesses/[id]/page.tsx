import { ArrowLeftIcon, CheckCircleIcon, ExclamationTriangleIcon, XCircleIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { getBusinessById } from '@/app/lib/data';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  // This is a placeholder array of business IDs that will be pre-rendered
  const businessIds = ['1', '2', '3'];
  
  return businessIds.map((id) => ({
    id: id,
  }));
}

export default async function BusinessDetailsPage({ params }: { params: { id: string } }) {
  const business = await getBusinessById(params.id);
  
  if (!business) {
    notFound();
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Filed':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'Pending':
        return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />;
      default:
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
    }
  };

  const getTrustScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-green-500';
    if (score >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Basic Information */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center gap-4 mb-6">
              <Link href="/businesses" className="text-gray-500 hover:text-gray-700">
                <ArrowLeftIcon className="w-5 h-5" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">{business.name}</h1>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100">
                {getStatusIcon(business.vatStatus)}
                <span className="text-sm font-medium text-gray-700">{business.vatStatus}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <p><span className="font-medium">TIN:</span> {business.tin}</p>
                <p><span className="font-medium">Sector:</span> {business.sector}</p>
                <p><span className="font-medium">Location:</span> {business.location}</p>
                <p><span className="font-medium">Address:</span> {business.address}</p>
                <p><span className="font-medium">Contact:</span> {business.contact}</p>
              </div>
              <div>
                <p><span className="font-medium">Business Type:</span> {business.businessType}</p>
                <p><span className="font-medium">Size Classification:</span> {business.sizeClassification}</p>
                <p><span className="font-medium">Registration Date:</span> {new Date(business.registrationDate).toLocaleDateString()}</p>
                <p><span className="font-medium">Risk Level:</span> {business.riskLevel}</p>
                <p><span className="font-medium">VAT Collected YTD:</span> ₵{business.vatCollectedYTD.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Compliance Metrics */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Compliance Metrics</h2>
            <div className="grid grid-cols-4 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500">Overall Score</h3>
                <div className="mt-2 text-2xl font-semibold text-gray-900">
                  {business.complianceScore.overall}%
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500">Filing Score</h3>
                <div className="mt-2 text-2xl font-semibold text-gray-900">
                  {business.complianceScore.filing}%
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500">Payment Score</h3>
                <div className="mt-2 text-2xl font-semibold text-gray-900">
                  {business.complianceScore.payment}%
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500">Invoice Score</h3>
                <div className="mt-2 text-2xl font-semibold text-gray-900">
                  {business.complianceScore.invoice}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Metrics */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Monthly Metrics</h2>
            <div className="grid grid-cols-4 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500">Transaction Volume</h3>
                <div className="mt-2 text-2xl font-semibold text-gray-900">
                  {business.monthlyMetrics.transactionVolume}
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500">Average Invoice Value</h3>
                <div className="mt-2 text-2xl font-semibold text-gray-900">
                  ₵{business.monthlyMetrics.averageInvoiceValue.toLocaleString()}
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500">Daily VAT Collection</h3>
                <div className="mt-2 text-2xl font-semibold text-gray-900">
                  ₵{business.monthlyMetrics.dailyVatCollection.toLocaleString()}
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500">Unusual Flags</h3>
                <div className="mt-2 text-2xl font-semibold text-gray-900">
                  {business.monthlyMetrics.unusualFlags}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Score Analysis */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Trust Score Analysis</h2>
            <div className="grid grid-cols-4 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500">Payment Reliability</h3>
                <div className={`mt-2 text-2xl font-semibold ${getTrustScoreColor(business.creditAssessment.paymentReliability)}`}>
                  {business.creditAssessment.paymentReliability}%
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500">Sustainability</h3>
                <div className={`mt-2 text-2xl font-semibold ${getTrustScoreColor(business.creditAssessment.sustainability)}`}>
                  {business.creditAssessment.sustainability}%
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500">Financial Health</h3>
                <div className={`mt-2 text-2xl font-semibold ${getTrustScoreColor(business.creditAssessment.financialHealth)}`}>
                  {business.creditAssessment.financialHealth}%
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500">Trust Score</h3>
                <div className={`mt-2 text-2xl font-semibold ${getTrustScoreColor(business.creditAssessment.trustScore)}`}>
                  {business.creditAssessment.trustScore}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enforcement History */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Enforcement History</h2>
            <div className="space-y-4">
              {business.enforcementHistory.map((event, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{event.type}</h3>
                      <p className="text-sm text-gray-600">{event.details}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
                      <p className={`text-sm ${event.status === 'Completed' ? 'text-green-600' : 'text-yellow-600'}`}>
                        {event.status}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Personnel */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Key Personnel</h2>
            <div className="space-y-4">
              {business.keyPersonnel.map((person, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-900">{person.name}</span>
                  <span className="text-gray-600">{person.role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Powered by ScoreTrux */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Powered by <span className="font-medium">ScoreTrux</span>
          </p>
        </div>
      </div>
    </div>
  );
}
