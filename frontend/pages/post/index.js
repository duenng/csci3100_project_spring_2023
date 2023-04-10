import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Sidebar from '@/components/Sidebar'
import Trending from "@/components/Trending";
import Suggestions from "@/components/Suggestions";
import Post from "@/components/Post"

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className="container">
     
      <div className="main-content flex">
      <div className='left-section'>
      <Sidebar />
      </div>
      <div className='w-2/3'>
        <Post/>
      </div>
        <div className="right-section">
          <Trending />
          <Suggestions />
        </div>
      </div>
    </div>
  );
}
