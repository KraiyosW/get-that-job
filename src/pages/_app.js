import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import "../styles/globals.css"

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head/>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}
