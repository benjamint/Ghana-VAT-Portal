import { Metadata } from 'next';
import BusinessList from '@/app/components/businesses/BusinessList';
import { getBusinesses } from '@/app/lib/data';

type PageProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Business Directory',
    description: 'View and manage registered businesses in the VAT system.',
  };
}

export default async function BusinessesPage({ searchParams }: PageProps) {
  const businesses = await getBusinesses(searchParams);

  return <BusinessList businesses={businesses} />;
} 