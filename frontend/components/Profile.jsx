import { useEffect, useRef, useState } from "react"
import PreviewPost from "./PostPreview"
import { Icon } from '@iconify/react';
import CreatePost from "./CreatePost";



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
  
  let testPost = {
    postId:1,
    user:testUser,
    text:"here is the testing content.",
    like:[1,3,12,4,9,17],
    reposting:null,
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
    const topRef = useRef()


    const handleTop = () =>{
        topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start'});
    }

    return(
        <>
            {/* home header */}
            <div ref={topRef}></div>
            <div  className= " rounded-sm sticky z-30 top-0 flex  h-12 items-center bg-opacity-75 backdrop-blur-sm bg-violet-500" onClick={()=>handleTop()}>
              <h1 className=" font-bold text-white text-2xl ml-6" >Profile</h1>
            </div>
            <div className="my-2">
                <h1 className=" text-black text-2xl ml-6" >Name:</h1>
                <h1 className=" text-black text-2xl ml-6" >Follower:</h1>
                <button className=" text-violet text-2xl ml-6" >Follow</button>
                <button className=" text-violet text-2xl ml-6" >Unfollow</button>
            </div>
            <hr className="mx-2 border-violet-500"></hr>

        </>
    )
}

