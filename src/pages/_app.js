import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/global.css" />
        <div className="my-parent-div w-screen h-screen">
          <ChakraProvider>
            <Component {...pageProps} />
          </ChakraProvider>
        </div>
      </Head>
    </>
  );
}
