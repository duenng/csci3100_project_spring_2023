import { DotsHorizontalIcon, ArrowLeftIcon} from "@heroicons/react/outline";
import PostImage from "./PostImage";
import { useEffect, useState } from "react";
import { format } from 'date-fns';
import { Icon } from '@iconify/react';
import Comment from "./Comment";

// shd use post id to fetch
let current = 1
let username = "test"
let tag = "@test"
let text = "here is the testing content."
const date = new Date(2023, 3, 10, 13, 0, 20);
const images = ["corgi.jpeg","doll.jpeg","golden.png","munchkin.png","persian.png","samoyed.png","shiba.jpeg"]
// const video = "catVideo.mp4"
const testlike = [1,3,12,4,9,17]
const testrepost = [1,3,4]

let testComment = [
  {
      userID:7,
      name: "hihi",
      tag:"@hihi",
      avatar:null,
      replying:["@test"],
      text:"u on jj",
      image:["corgi.jpeg","doll.jpeg"],
      like:[1,2,3],
      date:1681145476102
  }
]



export default function Post(){

      const [repost,setRepost] = useState([])
      const [like,setLike] = useState([])
      const [liked,setLiked] = useState(false)
      const [comment,setComment] = useState([])

      const formattedDate = format(date, "pp · yyyy MMMM dd");

      // todo fetch post info 
      useEffect(()=>{
        return()=>{
          //todo use fetch
          //change all test var to actual var
        setRepost(testrepost);
        setLike(testlike);
        setComment(testComment);
        if(current in testlike){
          setLiked(true)
        }
      }},[])

      const showCommentPanel = (e)=>{
        //todo
          console.log("show panal",e)
      }

      const handleRepost = (e)=>{
        //todo
        console.log("reposted",e)
      }

      const handleUnlike=(e)=>{
        setLiked(false)
        if(current in like){
          let filtered = like.filter(id=>id!==current)
          setLike([...filtered])
          //fetch
        }
        
      }

      const handleLike=(e)=>{
        setLiked(true);
        if(current in like){
          setLike(prev=>[...prev,current])
          //fetch
        }
      }

      const handleShare=(e)=>{
        //todo
        console.log("share",e)
      }

    return(
       <>
            <div className="flex text-2xl h-16 items-center bg-opacity-25 sticky top-0 backdrop-blur-sm z-10 ">
              <ArrowLeftIcon className="m-4 h-10 w-10"/>
              <a className="my-4 mx-1">Posts</a>
            </div>

            <div className="my-4 flex items-center justify-left text-black-700 justify-start-onlarge mx-3">
              {/* User Profile Picture, Need to import from database*/}
              <img src="/usericon.jpg" alt="Profile Picture" className="w-12 h-12 rounded-full px-1"/>
              <div className="px-1 text-m">
                {/* User Name, Need to import from database*/}
                <h4 style={{ padding: 0, margin: 0 }}>{username}</h4>
                <p style={{ padding: 0, margin: 0 }} className="text-gray-500">
                  {tag}
                </p>
              </div>
              <DotsHorizontalIcon className="h-5 ml-auto" />
            </div>
            <div className="text-l my-4 mx-3">
              <p>{text}</p>
            </div>
            {/* todo video handler */}
            {images?.length?<div className="my-4 mx-3">
              <PostImage ids={images}/>
            </div>:null}
            <div className=" text-gray-500 text-sm my-4 mx-3">
              {formattedDate}
            </div>
            <hr className="mx-2"></hr>
            <div className=" my-4 mx-3 text-m">
            {repost.length?<span className="mx-2"><a className="font-semibold">{repost.length}</a><a className="text-gray-500"> reposts</a></span>:null}
            {like.length?<span className="mx-2"><a className="font-semibold">{like.length}</a><a className="text-gray-500"> likes</a></span>:null}
            </div>
            <hr className="mx-2"></hr>
            <div className="flex justify-evenly my-2">
            <Icon icon="ic:outline-insert-comment" onClick={(e)=>showCommentPanel(e)} width="36" hFlip={true} />
            <Icon icon="zondicons:repost"  onClick={(e)=>handleRepost(e)} width="36"/>
            {
              liked?<Icon icon="mdi:cards-heart" onClick={(e)=>handleUnlike(e)} color="red" height="36" hFlip={true} />:
              <Icon icon="mdi:cards-heart" onClick={(e)=>handleLike(e)} width="36"/>
            }
            <Icon icon="material-symbols:ios-share" onClick={(e)=>handleShare(e)} height="36" hFlip={true} />
            </div>
            <hr className="mx-2"></hr>
            <h1> todo: comment panel</h1>
            <hr className=" mx-2"/>
            {
              comment.map((com,index)=>{
                return <Comment key={index} com={com} user={current}/>
              })
            }

      </> 
    )
  }