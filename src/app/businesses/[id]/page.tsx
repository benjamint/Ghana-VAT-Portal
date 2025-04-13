import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBusinessById, getBusinesses } from '@/app/lib/data';
import BusinessDetails from '@/app/components/businesses/BusinessDetails';

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateStaticParams() {
  const businesses = await getBusinesses();
  return businesses.map((business) => ({
    id: business.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const business = await getBusinessById(resolvedParams.id);
  
  if (!business) {
    return {
      title: 'Business Not Found',
    };
  }

  return {
    title: `${business.name} - Business Details`,
    description: `View details for ${business.name}, a ${business.sector} business in ${business.location}.`,
  };
}

export default async function BusinessPage({ params }: PageProps) {
  const resolvedParams = await params;
  const business = await getBusinessById(resolvedParams.id);

  if (!business) {
    notFound();
  }

  return <BusinessDetails business={business} />;
} 