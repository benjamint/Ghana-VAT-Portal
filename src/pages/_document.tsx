import { Html, Head, Main, NextScript } from 'next/document';
import getConfig from 'next/config';

export default function Document() {
  const { publicRuntimeConfig } = getConfig();
  const basePath = publicRuntimeConfig?.basePath || '';

  return (
    <Html lang="en">
      <Head>
        <link rel="stylesheet" href={`${basePath}/styles/globals.css`} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
} 