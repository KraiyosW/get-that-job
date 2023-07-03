import Head from "next/head";
import "../styles/globals.css";
import { AuthProvider } from "@/contexts/authentication";
import { ChakraProvider } from "@chakra-ui/react";
// import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head />
      {/* <SessionProvider> */}
        <AuthProvider>
          <ChakraProvider>
            <Component {...pageProps} />
          </ChakraProvider>
        </AuthProvider>
      {/* </SessionProvider> */}
    </>
  );
}
