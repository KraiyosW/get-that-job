import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import "../styles/globals.css";
import { AuthProvider } from "@/contexts/authentication";
import "@/pages/api/jwtintercepter.js"


export default function App({ Component, pageProps }) {
  return (
    <>
      <Head/>
        <ChakraProvider>
          <AuthProvider>
          <Component {...pageProps} />
          </AuthProvider>
        </ChakraProvider>
    </>
  );
}
