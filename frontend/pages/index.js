import { Inter } from 'next/font/google'
import Sidebar from '@/components/Sidebar'
import FrontPage from '../components/FrontPage';
import Widgets from '../components/Widgets';
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export default function Home({newsResults}) {

  

  return (
    <>
    <Head>
        <title>Home</title>
        <meta name="description" content="CSCI3100 PROJECT" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/tertwit_T.ico" />
    </Head>

    <div className='grid grid-cols-4  w-screen'>
      <div className=' overflow-y-scroll  h-screen'>
        <Sidebar/>
      </div>

      <div className='col-span-2   h-screen overflow-y-scroll overflow-x-hidden break-words'>
       <FrontPage/>
      </div>

      <div className='col-span-1 border-x-4  h-screen overflow-y-scroll overflow-x-hidden break-words  '>
        <Widgets newsResults={newsResults.articles}/>
      </div>
    </div>

    </>
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