
import Head from "next/head";
import "../styles/globals.css";
import { AuthProvider } from "@/contexts/authentication";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head/>
            <AuthProvider>
               <Component {...pageProps} />
            </AuthProvider>
    </>
  );
}
