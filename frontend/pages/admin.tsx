import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Sidebar from '@/components/Sidebar'
import Feed from "@/components/Feed";
import Trending from "@/components/Trending";
import Suggestions from "@/components/Suggestions";



const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <Head>
        <title>ADMIN</title>
        <meta name="description" content="CSCI3100 PROJECT" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/tertwit_T.ico" />
    </Head>
    <main className="flex min-h-screen max-w-7xl mx-auto ">
        <Sidebar />
        {/* <Feed /> */}
        <div className="right-section">
          {/* <Trending />
          <Suggestions /> */}
        </div>
    </main>
    </>
  );
}
