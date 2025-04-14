import { ArrowLeftIcon } from '@heroicons/react/24/outline';
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center gap-4 mb-6">
              <Link href="/businesses" className="text-gray-500 hover:text-gray-700">
                <ArrowLeftIcon className="w-5 h-5" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">{business.name}</h1>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <p><span className="font-medium">TIN:</span> {business.tin}</p>
                <p><span className="font-medium">Sector:</span> {business.sector}</p>
                <p><span className="font-medium">Location:</span> {business.location}</p>
              </div>
              <div>
                <p><span className="font-medium">VAT Status:</span> {business.vatStatus}</p>
                <p><span className="font-medium">Risk Level:</span> {business.riskLevel}</p>
                <p><span className="font-medium">VAT Collected YTD:</span> ₵{business.vatCollectedYTD.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
