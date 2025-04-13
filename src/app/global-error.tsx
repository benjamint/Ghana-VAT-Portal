'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen bg-white px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
          <div className="mx-auto max-w-max">
            <main className="sm:flex">
              <p className="text-4xl font-bold tracking-tight text-red-600 sm:text-5xl">Error</p>
              <div className="sm:ml-6">
                <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Something went wrong!</h1>
                  <p className="mt-1 text-base text-gray-500">Please try again later or contact support if the problem persists.</p>
                </div>
                <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                  <button
                    onClick={reset}
                    className="inline-flex items-center rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                  >
                    Try again
                  </button>
                </div>
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
} 