import { Inter } from 'next/font/google'
import Sidebar from '@/components/Sidebar'
import Profile from '@/components/Profile';
import Widgets from '@/components/Widgets';
import Head from 'next/head';
import Input from '@/components/Input';
import PostPreview from '@/components/PostPreview';
import CreatePost from '@/components/CreatePost';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] })

export default function Home({newsResults}) {
  const [currentUser,setCurrentUser] = useState(null)
  const [target,setTarget] = useState(null)
  const router = useRouter()
  let { id } = router.query

  const init = () =>{
    if(target){
      return 
    }
    return new Promise(async(resolve,reject)=>{
      try {
        //get post from backend
        let {data} = await axios.get(`http://${process.env.NEXT_PUBLIC_DB }/user/id/${id}`)
        //console.log(data)
          if(data&&!data?.notfound){
            setTarget(data)
            resolve()
          }
          else{
            // redirect to front if unexist postId
            window.open(`/`,"_self")
          }
      } catch (error) {
        console.log(error)
        reject()
      }
    })
  }

  useEffect(()=>{
    init()
  },[])

  //get current user
  const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user&&!currentUser) {
         const uid = user.uid;
         try {
          let {data} = await axios.get(`http://${process.env.NEXT_PUBLIC_DB }/user/token/${uid}`)
          if(data){
            setCurrentUser(data)
          }
         } catch (error) {
          console.log(error)
         }
      } 
      });

      if(!currentUser||!target){
        return(
          <h2>Loading...</h2>
        )
      }


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

        <Sidebar setShowProfile={undefined}/>
      
      <div className="">
      
       <Profile users={target} current ={currentUser}/>
      
        {/* change to createpost afterwards */}
        <div className="flex pt-4 w-[600px] xl:ml-[370px] border-l border-r xl:min-w-[576px] sm:ml-[10%] max-w-xl ml-[px] flex-grow sm:pl-0 min-w-[15%]">
        <CreatePost popUp={false} user={currentUser} url={""}/>
       </div>
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