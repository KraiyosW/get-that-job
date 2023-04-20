import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import "../styles/globals.css";
import { AuthProvider } from "@/contexts/authentication";
import axios from "axios";




export default function App({ Component, pageProps }) {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
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
