import { Metadata } from 'next';
import BusinessList from '@/app/components/businesses/BusinessList';
import { getBusinesses } from '@/app/lib/data';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: Promise<{}>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Business Directory',
    description: 'View and manage registered businesses in the VAT system.',
  };
}

export default async function BusinessesPage() {
  // Get all businesses without filtering for static export
  const businesses = await getBusinesses();

  return <BusinessList businesses={businesses} />;
} 