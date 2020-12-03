import { CSSReset, ChakraProvider } from '@chakra-ui/react';
import { Global, css } from '@emotion/react';
import { AuthProvider } from '../lib/auth';
import Head from 'next/head';

import customTheme from '@/styles/themes';
import SEO from '../next-seo.config';
import { DefaultSeo } from 'next-seo';

const GlobalStyle = ({ children }) => {
  return (
    <>
      <CSSReset />
      <Global
        styles={css`
          html {
            min-width: 360px;
            scroll-behavior: smooth;
          }

          #__next {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }
        `}
      />
    </>
  );
};

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ChakraProvider theme={customTheme}>
        <AuthProvider>
          <GlobalStyle />
          <DefaultSeo {...SEO} />
          <Component {...pageProps} />
        </AuthProvider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
