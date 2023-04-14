import { useEffect, useRef, useState } from "react"
import PreviewPost from "./PostPreview"
import { Icon } from '@iconify/react';
import CreatePost from "./CreatePost";
import { auth } from './firebase';
import { useRouter } from "next/router"; 
import axios from "axios";
import { useUser } from "../components/FirebaseContext";




let testUser ={
    userId:1,
    username:"test",
    tag:"@test",
    avatar:null,
    following:[],
    follower:[],
  }

let testComment = [
    {
        user:testUser,
        replying:"@test",
        text:"The intricacies of language and the human mind are fascinating, as our ability to communicate complex ideas through speech and writing has shaped the course of human history, allowing us to build civilizations, share knowledge and connect with one another across time and space.",
        images:["corgi.jpeg","doll.jpeg"],
        video:"catVideo.mp4",
        like:[1,2,3],
        date: new Date(1681145476102)
    }
  ]
    
  let testRepost = {
    postId:20,
    user:testUser,
    text:"here is the testing content.",
    like:[1,3,12,4,9,17],
    reposting:null,
    repost:[1,3,4],
    date: new Date(2023, 3, 10, 13, 0, 20),
    images:[],
    video: "catVideo.mp4",
    comment: testComment,
  }


  let testPost = {
    postId:1,
    user:testUser,
    text:"here is the testing content.",
    like:[1,3,12,4,9,17],
    reposting:testRepost,
    repost:[1,3,4],
    date: new Date(2023, 3, 10, 13, 0, 20),
    images:["corgi.jpeg","doll.jpeg","golden.png","munchkin.png","persian.png","samoyed.png","shiba.jpeg"],
    video: "catVideo.mp4",
    comment: testComment,
  }

  let testData = new Array(10)
  testData.fill(testPost)

export default function FrontPage(){
    const [posts,setPosts] = useState([])
    const [currentUser,setCurrentUser] = useState(null)
    const { user, loading, logout } = useUser(); // Destructure user, loading, and logout function
    const router = useRouter()
    const topRef = useRef()

    
    const handleUser = async (uid)=>{
        let {data} = await axios.get(`http://${window.location.hostname}:3001/user/token/${uid}`)
        return data
      }

    const handlePosts = async (id)=>{
        let {data} = await axios.get(`http://${window.location.hostname}:3001/followingPosts/${id}`)
        return data
    }
    
      useEffect(() => {
        if(user){
          console.log(user.uid)
          handleUser(user.uid).then((user)=>{
            if(user){
                setCurrentUser(user)
                return user.uerId
            }
                return null
          }).then((id)=>{
            if(!id){
                return 
            }
            console.log(id)
            handlePosts(id).then((posts)=>{
                setPosts(posts)
            })
          })
        }
      }, [user, loading, router]);
    

    const handleTop = () =>{
        topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start'});
    }

    return(
        <>
            {/* home header */}
            <div ref={topRef}></div>
            <div  className= " rounded-sm sticky z-30 top-0 flex  h-12 items-center bg-opacity-75 backdrop-blur-sm bg-violet-500" onClick={()=>handleTop()}>
              <h1 className=" font-bold dark:text-gray-800 text-white text-2xl ml-6" >Home</h1>
            </div>
            {currentUser?<><div className="my-2">
                <CreatePost user={currentUser} url={""} popUp={false}/>
            </div>
            <hr className="mx-2 border-violet-500"></hr>
            {posts.length?posts.map((post,index)=>{
                return <PreviewPost post={post} user={testUser} key={index}/>
            }):null}</>:null}


        </>
    )
}

