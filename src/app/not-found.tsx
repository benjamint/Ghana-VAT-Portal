import Link from 'next/link';

// Disable static optimization for this page
export const dynamic = 'force-static';

// Define default styles as constants
const DEFAULT_STYLES = {
  container: "min-h-screen bg-white px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8",
  main: "sm:flex",
  errorCode: "text-4xl font-bold tracking-tight text-indigo-600 sm:text-5xl",
  content: "sm:ml-6",
  border: "sm:border-l sm:border-gray-200 sm:pl-6",
  title: "text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl",
  message: "mt-1 text-base text-gray-500",
  actions: "mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6",
  button: "inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
} as const;

export default function NotFound() {
  return (
    <div className={DEFAULT_STYLES.container}>
      <div className="mx-auto max-w-max">
        <main className={DEFAULT_STYLES.main}>
          <p className={DEFAULT_STYLES.errorCode}>404</p>
          <div className={DEFAULT_STYLES.content}>
            <div className={DEFAULT_STYLES.border}>
              <h1 className={DEFAULT_STYLES.title}>Page not found</h1>
              <p className={DEFAULT_STYLES.message}>
                Please check the URL in the address bar and try again.
              </p>
            </div>
            <div className={DEFAULT_STYLES.actions}>
              <Link
                href="/dashboard"
                className={DEFAULT_STYLES.button}
              >
                Go back home
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 