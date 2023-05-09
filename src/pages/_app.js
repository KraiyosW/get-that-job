
import Head from "next/head";
import "../styles/globals.css";
import { AuthProvider } from "@/contexts/authentication";
import { ChakraProvider } from '@chakra-ui/react'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head />
      <AuthProvider>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </AuthProvider>
    </>
  );
}
