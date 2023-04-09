import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Sidebar from '@/components/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Tertwit</title>
        <meta name="description" content="CSCI3100 Project" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/tertwit_T.ico" />
      </Head>
      <main className={styles.main}>
        {/* Sidebar */}
        {/* <div className={styles.sidebar}> */}
          <Sidebar />

        {/* Feed */}

        {/* Widgets */}
      </main>
    </>
  )
}
