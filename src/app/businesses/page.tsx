import { Metadata } from 'next';
import { getBusinesses } from '@/app/lib/data';
import BusinessList from '@/app/components/businesses/BusinessList';

export const metadata: Metadata = {
  title: 'Businesses | Ghana VAT Portal',
  description: 'View and manage registered businesses in the Ghana VAT system',
};

export default async function BusinessesPage() {
  const businesses = await getBusinesses();

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Businesses</h1>
          <p className="mt-2 text-sm text-gray-700">
            View and manage registered businesses in the Ghana VAT system
          </p>
        </div>
      </div>
      <BusinessList businesses={businesses} />
    </div>
  );
} 