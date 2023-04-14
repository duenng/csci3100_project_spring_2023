import { ArrowLeftIcon} from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import PostContent from "./PostContent";
import PostCommentSection from "./PostCommentSection";
// import idToken from "./useUserToken"


// shd use post id to fetch

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

let testPost2 = {
  postId:10,
  user:testUser,
  text:"here is the testing repost content.",
  like:[1,3,12,4,9,17],
  repost:[1,3,4],
  reposting:null,
  date: new Date(2023, 3, 10, 13, 0, 20),
  images:["corgi.jpeg","doll.jpeg","golden.png","munchkin.png","persian.png","samoyed.png","shiba.jpeg"],
  video: "catVideo.mp4",
  comment: testComment,
}

let testPost = {
  postId:1,
  user:testUser,
  text:"here is the testing content.",
  like:[1,3,12,4,9,17],
  repost:[1,3,4],
  reposting:testPost2,
  date: new Date(2023, 3, 10, 13, 0, 20),
  images:["corgi.jpeg","doll.jpeg","golden.png","munchkin.png","persian.png","samoyed.png","shiba.jpeg"],
  video: "catVideo.mp4",
  comment: testComment,
}





export default function Post(){

    const [post,setPost] = useState(null)
    const router = useRouter();



    useEffect( ()=>{
      return()=>{
        useEffect(()=>{
          return()=>{
              let uid = null
              auth.onAuthStateChanged( async(user) => {
              if (user) {
                  uid= await user.uid
                  setTimeout(async ()=>{
                      try {
                          console.log(uid)
                          while(!uid){
  
                          }
                          let {data} = await axios.get(`http://${window.location.hostname}:3001/user/token/${uid}`)
                          console.log(data)
                          while(!data){
  
                          }
                          //setUser(data)
                          //console.log(currentUser)
                          let postData = await axios.get(`http://${window.location.hostname}:3001/followingPosts/${data.userId}`)
                          console.log(postData)
                          setUser(data)
                          setPosts(postData)
                      } catch (error) {
                          console.log(error)
                      }
                  },50)
              } else {
                router.push("/login")
              }
          })
      }},[])
      }
    },[])
      

    return(
       <>   
            {/* header */}
            <div className="flex rounded-sm text-2xl h-16 items-center bg-opacity-50 sticky top-0 backdrop-blur-sm z-10 bg-violet-500">
              <ArrowLeftIcon className="m-4 h-16 hoverEffect" color="white" onClick={() => router.back()}/>
              <a className="my-4 text-white font-semibold flex-grow">Posts</a>
            </div>
            {
              post? <>
              {/* info text media ... */}
              <PostContent owner={post.user} date={post.date} text={post.text} images={post.images} video= {post.video} reposting={post.reposting}/>
              
              {/* comment section */}
              <PostCommentSection user={testUser} tag={post.user.tag} like={post.like} repost={post.repost} comment={post.comment} postId={post.postId}/>
  
              
              {/* pop up message */}
              {/* <PopUp message={"test"}/> */}
              </>:null
            }
           
            

      </> 
    )
  }

