import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBusinessById } from '@/app/lib/data';
import BusinessDetails from '@/app/components/businesses/BusinessDetails';

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const business = await getBusinessById(params.id);
  
  if (!business) {
    return {
      title: 'Business Not Found',
    };
  }

  return {
    title: `${business.name} - Business Details`,
    description: `View details for ${business.name}, a ${business.type} business in ${business.location}.`,
  };
}

export default async function BusinessPage({ params }: PageProps) {
  const business = await getBusinessById(params.id);

  if (!business) {
    notFound();
  }

  return <BusinessDetails business={business} />;
} 