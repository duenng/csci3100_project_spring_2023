import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Sidebar from '@/components/Sidebar'
//import Login from "../components/Login";
import Feed from "@/components/Feed";
import Widgets from "@/components/Widgets";
import SettingBar from "@/components/SettingBar";
import SettingAll from '@/components/SettingAll';


const inter = Inter({ subsets: ['latin'] })

export default function Setting({newsResults}) {


  return (

    <>
    <Head>
        <title>Setting</title>
        <meta name="description" content="CSCI3100 PROJECT" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/tertwit_T.ico" />
    </Head>
            
    <main className="flex min-h-screen max-w-7xl mx-auto ">
        <Sidebar setShowProfile={undefined} logout={undefined} />
        <SettingAll />
        {/* <SettingBar /> */}
        
        {/* <Feed /> */} 
        
        <div className="right-section">
          
        <div className="w-[200px] sm:block md:w-[400px] hidden space-y-5 lg:ml-8 ml-4 md:inline py-4"> 
        <Widgets newsResults={newsResults.articles}/>
        </div>
        {/* <Widgets newsResults={newsResults.articles}/> */}

          {/* <Trending />
          <Suggestions /> */}
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