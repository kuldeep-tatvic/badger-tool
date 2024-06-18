import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { CookiesProvider } from "react-cookie";
import { QueryClient, QueryClientProvider } from "react-query";

// MUI
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

// custom context
import theme from "components/materialTheme";
import NavigationLoader from "components/navigationLoader";

// store
import ErrorBoundary from "components/errorBoundary";
import Head from "next/head";
import Home from "pages";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const initialRenderRef = useRef(true);
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  // navigational loader
  const [loading, setLoading] = useState(false);
  const [currentRoute, setCurrentRoute] = useState(null);

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);



  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {loading && <NavigationLoader />}
      <CookiesProvider>
        <QueryClientProvider client={queryClient}>

          <Head>
            <title>Tatvic Badger</title>
          </Head>
          <ErrorBoundary>
            <AuthenticatedComponent Component={Component} pageProps={pageProps} />
          </ErrorBoundary>
        </QueryClientProvider>
      </CookiesProvider>
    </ThemeProvider>
  );
}

function AuthenticatedComponent({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;