import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Sidebar from '@/components/Sidebar'
import Post from "@/components/Post"
import Widgets from '../../components/Widgets'

const inter = Inter({ subsets: ['latin'] })

export default function Home({newsResults}) {
  return (

    <div className='grid grid-cols-4  w-screen'>
      <div className=' overflow-y-scroll  h-screen'>
        <Sidebar/>
      </div>

      <div className='col-span-2 border-x-4  h-screen overflow-y-scroll overflow-x-hidden break-words'>
       <Post/>
      </div>

      <div className='col-span-1 border-x-4  h-screen overflow-y-scroll overflow-x-hidden break-words  '>
        <Widgets newsResults={newsResults.articles}/>
      </div>

    </div>
  );
}

// Along with Widgets component
//newsResults in props
//https://saurav.tech/NewsAPI/everything/cnn.json

export async function getServerSideProps() {
  const newsResults = await fetch('https://saurav.tech/NewsAPI/everything/bbc-news.json').then(res => res.json())
  return {
    props: {
      newsResults
    }
  }
}
//End of Widgets