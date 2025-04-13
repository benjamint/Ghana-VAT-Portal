import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import '../styles/globals.css';
import getConfig from 'next/config';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { publicRuntimeConfig } = getConfig();
  const basePath = publicRuntimeConfig?.basePath || '';

  useEffect(() => {
    // Ensure CSS is loaded properly
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `${basePath}/styles/globals.css`;
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [basePath]);

  return <Component {...pageProps} />;
}

export default MyApp; 