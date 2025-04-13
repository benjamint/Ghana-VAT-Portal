import { Metadata } from 'next';
import { getBusinesses } from '@/app/lib/data';
import StaticBusinessList from '@/app/components/businesses/StaticBusinessList';

export const metadata: Metadata = {
  title: 'Businesses | Ghana VAT Portal',
  description: 'View and manage registered businesses in the Ghana VAT system',
};

export const dynamic = 'force-static';
export const revalidate = false;

export default async function BusinessesPage() {
  const businesses = await getBusinesses();

  return (
    <div style={{ marginTop: '1.5rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ 
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#111827',
            marginBottom: '0.5rem'
          }}>
            Businesses
          </h1>
          <p style={{
            fontSize: '0.875rem',
            color: '#374151'
          }}>
            View and manage registered businesses in the Ghana VAT system
          </p>
        </div>
      </div>
      <StaticBusinessList businesses={businesses} />
    </div>
  );
} 