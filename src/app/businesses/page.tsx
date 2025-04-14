import { Metadata } from 'next';
import { getBusinesses } from '@/app/lib/data';
import StaticBusinessList from '@/app/components/businesses/StaticBusinessList';
import DashboardLayout from '@/components/layout/DashboardLayout';

export const metadata: Metadata = {
  title: 'Businesses | Ghana VAT Portal',
  description: 'View and manage registered businesses in the Ghana VAT system',
};

export const dynamic = 'force-static';
export const revalidate = false;

export default async function BusinessesPage() {
  const businesses = await getBusinesses();

  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Businesses
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              View and manage registered businesses in the Ghana VAT system
            </p>
          </div>

          {/* Content */}
          <div className="mt-6">
            <StaticBusinessList businesses={businesses} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 