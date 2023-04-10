import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Sidebar from '@/components/Sidebar'
import Trending from "@/components/Trending";
import Suggestions from "@/components/Suggestions";
import Post from "@/components/Post"
import PostHeader from '../../components/postHeader'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (

    <div className='grid grid-cols-4 gap-2 w-screen'>
      <div className=' overflow-y-scroll  h-screen'>
        <Sidebar/>
      </div>

      <div className='col-span-2 border-x-4  h-screen overflow-y-scroll'>
       <Post/>
      </div>
      <div className=' overflow-y-scroll	 h-screen'>
        <Trending/>
        <Suggestions/>
      </div>

    </div>
  );
}
