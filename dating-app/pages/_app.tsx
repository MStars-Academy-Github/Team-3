import "../styles/globals.css";
import "../styles/register.css";
import type { AppProps } from "next/app";
import "../styles/logo.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
