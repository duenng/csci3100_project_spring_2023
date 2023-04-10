import { DotsHorizontalIcon, ArrowLeftIcon,ChatIcon,HeartIcon} from "@heroicons/react/outline";
import { Content } from "next/font/google";
import PostImage from "./PostImage";
import { useEffect, useMemo, useState } from "react";

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

export default function Post(){

      const [repost,setRepost] = useState([])
      const [like,setLike] = useState([])
      const [comment,setComment] = useState([])

      const hour = date.getHours() % 12;
      const minute = date.getMinutes();
      const year = date.getFullYear();
      const month = date.toLocaleString('default', { month: 'long' });
      const day = date.getDate();
      const period = date.getHours() < 12 ? 'am' : 'pm';
      const formattedDate = `${period} ${hour}:${minute.toString().padStart(2, '0')} · ${year} ${month} ${day}`;

      // todo fetch post info 
      useEffect(()=>{
        //todo use fetch
        setRepost(testrepost);
        setLike(testlike);
      })

    return(
       <>
            <div className="flex text-2xl h-16 align-middle  bg-opacity-25 sticky top-0 backdrop-blur-sm">
              <ArrowLeftIcon className="m-4"/>
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
            <div className="grid grid-cols-4">
              <ChatIcon/>
              <HeartIcon/>
            </div>
      </> 
    )
}
