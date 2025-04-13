import { useEffect } from 'react';
import { useRouter } from 'next/router';
import getConfig from 'next/config';

export default function Custom404() {
  const router = useRouter();
  const { publicRuntimeConfig } = getConfig();
  const basePath = publicRuntimeConfig?.basePath || '';

  useEffect(() => {
    // Check if we're on the client side
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const correctPath = path.replace('/Ghana-VAT-Portal/Ghana-VAT-Portal', '/Ghana-VAT-Portal');
      if (path !== correctPath) {
        window.location.href = correctPath;
      } else {
        // If path is already correct but page not found, redirect to home
        router.push('/');
      }
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <p className="mt-4 text-xl text-gray-600">Redirecting to the correct page...</p>
      </div>
    </div>
  );
} 