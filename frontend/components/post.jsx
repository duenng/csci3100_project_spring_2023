import { ArrowLeftIcon} from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import PostContent from "./PostContent";
import PostCommentSection from "./PostCommentSection";


// shd use post id to fetch
let current = 1

let testUser ={
  userId:1,
  username:"test",
  tag:"@test",
  avatar:null,
  following:[],
  follower:[],
  token:"abc",
  isAdmin:false
}

let testComment = [
  {
      user:testUser,
      replying:"@test",
      text:"The intricacies of language and the human mind are fascinating, as our ability to communicate complex ideas through speech and writing has shaped the course of human history, allowing us to build civilizations, share knowledge and connect with one another across time and space.",
      images:["corgi.jpeg","doll.jpeg"],
      video:"catVideo.mp4",
      like:[1,2,3],
      date:new Date(1681145476102)
  }
]

let testPost = {
  user:testUser,
  text:"here is the testing content.",
  like:[1,3,12,4,9,17],
  repost:[1,3,4],
  reposting:null,
  date: new Date(2023, 3, 10, 13, 0, 20),
  images:["corgi.jpeg","doll.jpeg","golden.png","munchkin.png","persian.png","samoyed.png","shiba.jpeg"],
  video: "catVideo.mp4",
  comment: testComment,
}





export default function Post(){

    const [post,setPost] = useState(null)
    const router = useRouter();

    useEffect(()=>{
      return()=>{
        setPost(testPost)
      }
    },[])
      

    return(
       <>   
            {/* header */}
            <div className="flex text-2xl h-16 items-center bg-opacity-25 sticky top-0 backdrop-blur-sm z-10 bg-white">
              <ArrowLeftIcon className="m-4 h-10 w-10 hoverEffect" onClick={() => router.back()}/>
              <a className="my-4 mx-1 flex-grow">Posts</a>
            </div>
            {
              post? <>
              {/* info text media ... */}
              <PostContent owner={post.user} date={post.date} text={post.text} images={post.images} video= {post.video}/>
              
              {/* comment section */}
              <PostCommentSection user={testUser} like={post.like} repost={post.repost} comment={post.comment}/>
  
              
              {/* pop up message */}
              {/* <PopUp message={"test"}/> */}
              </>:null
            }
           
            

      </> 
    )
  }