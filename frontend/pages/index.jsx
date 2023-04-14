import { Inter } from 'next/font/google'
import Sidebar from '@/components/Sidebar'
import FrontPage from '../components/FrontPage';
import Widgets from '../components/Widgets';
import { auth } from '../components/firebase';
import { useRouter } from "next/router"; 
import axios from "axios";
import { useEffect, useRef, useState } from "react"
import { useUser } from "../components/FirebaseContext";




const inter = Inter({ subsets: ['latin'] })

export default function Home({newsResults}) {
  const { user, loading, logout } = useUser(); // Destructure user, loading, and logout function

  const router = useRouter()

  const handleUser = async (uid)=>{
    let {data} = await axios.get(`http://${window.location.hostname}:3001/user/token/${uid}`)
    return data
  }
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading||!currentUser||!currentUser) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }


//   useEffect(()=>{
//     return()=>{
//       console.log(auth.currentUser)
//         if(!auth.currentUser){
//           return router.push("/login")
//         }
//         handleUser()
//     }
// },[])
  

  return (
   <div className='grid grid-cols-4  w-screen'>
      <div className=' overflow-y-scroll  h-screen'>
        <Sidebar />
      </div>

      <div className='col-span-2   h-screen overflow-y-scroll overflow-x-hidden break-words'>
       <FrontPage />
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