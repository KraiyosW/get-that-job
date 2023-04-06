import Head from 'next/head'
import { Inter } from 'next/font/google'
import Contentsection from '../components/Contentsection.js'
import Navigatebar from '../components/Navigatebar.js'
import Footer from '@/components/Footer.js'
const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  return (
    <>
      <Head>
        <title>Get That Job</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      <Navigatebar />
      <Contentsection />
      <Footer />
    </>
  );
}

//Best JPG = Background ma
//Best PNG = Background no ma 