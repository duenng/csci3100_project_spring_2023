import { Inter } from 'next/font/google'
import Sidebar from '@/components/Sidebar'
import Profile from '../../components/Profile';
import Widgets from '../../components/Widgets';
import Head from 'next/head';
import Input from '@/components/Input';
import PostPreview from '@/components/PostPreview';

const inter = Inter({ subsets: ['latin'] })

export default function Home({newsResults}) {
  return (

    <>
    <Head>
        <title>Profile</title>
        <meta name="description" content="CSCI3100 PROJECT" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/tertwit_T.ico" />
    </Head>
    <main className="flex min-h-screen max-w-7xl mx-auto ">
    {/* <div className='grid grid-cols-4  w-screen'>
      <div className=' overflow-y-scroll  h-screen'> */}

        <Sidebar/>
      
      <div className="">
      
       <Profile/>

       <Input />
       
      </div>

      {/* <div className='col-span-1 border-x-4  h-screen overflow-y-scroll overflow-x-hidden break-words  '> */}
      <div className="w-[200px] sm:block md:w-[400px] hidden space-y-5 lg:ml-8 ml-4 md:inline py-4"> 
        <Widgets newsResults={newsResults.articles}/>
      </div>
      </main>
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