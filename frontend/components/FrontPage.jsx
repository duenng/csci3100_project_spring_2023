import { useEffect, useState } from "react"
import PreviewPost from "./PostPreview"

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
        userID:7,
        name: "hihi",
        tag:"@hihi",
        avatar:null,
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
    repost:[1,3,4],
    date: new Date(2023, 3, 10, 13, 0, 20),
    images:["corgi.jpeg","doll.jpeg","golden.png","munchkin.png","persian.png","samoyed.png","shiba.jpeg"],
    video: "catVideo.mp4",
    comment: testComment,
  }

  let testData = new Array(1)
  testData.fill(testPost)

export default function FrontPage(){
    const [posts,setPosts] = useState([])

    useEffect(()=>{
        // shd get pots by userId
        setPosts(testData)
    },[])

    return(
        <>
            {/* todo: search bar */}
            <h1 className="bg-slate-500">search bar</h1>

            {posts.length?posts.map((post,index)=>{
                return <PreviewPost post={post} user={testUser} key={index}/>
            }):null}


        </>
    )
}