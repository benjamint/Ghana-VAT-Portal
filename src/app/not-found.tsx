export default function NotFound() {
  return (
    <html>
      <head>
        <title>404 - Page Not Found</title>
      </head>
      <body>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f9fafb',
          color: '#111827',
          padding: '1rem'
        }}>
          <div style={{
            maxWidth: '28rem',
            textAlign: 'center'
          }}>
            <h1 style={{
              fontSize: '3rem',
              fontWeight: '700',
              marginBottom: '1rem',
              color: '#4f46e5'
            }}>
              404
            </h1>
            <h2 style={{
              fontSize: '1.875rem',
              fontWeight: '700',
              marginBottom: '0.5rem'
            }}>
              Page not found
            </h2>
            <p style={{
              fontSize: '1rem',
              color: '#6b7280',
              marginBottom: '1.5rem'
            }}>
              Please check the URL in the address bar and try again.
            </p>
            <a
              href="/"
              style={{
                display: 'inline-block',
                backgroundColor: '#4f46e5',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.375rem',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: '600',
                transition: 'background-color 150ms'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#4338ca'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4f46e5'}
            >
              Go back home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
} 