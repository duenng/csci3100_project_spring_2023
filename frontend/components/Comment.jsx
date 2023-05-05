import { format } from 'date-fns';
import PostImage from "./PostImage";
import VideoPlayer from "./VideoPlayer";
import CommentLikes from "./CommentLikes";
import { useEffect } from 'react';


export default function Comment({com,current}){

    // useEffect(()=>{
    //   console.log(com)
    // },[])

    

    return(
        <>
        <div className="flex item-center mx-2 text-base ">
          {/* info */}
        <img className="h-8 round-full m-4" src ={`/avatar/${com.avatar?com.avatar:"user.png"}`}/>
        <div className="flex-grow">
        <p className="m-2"><a>{com.user.username} </a><a className=" text-gray-500">{com.user.tag}   {com.date.split("T")[0]}</a></p>
        <p className="m-2"> Replying <a className=" text-gray-500">{com.replying}</a></p>
        </div>
        {/* <CommentLikes like={com.like} current={current} target={com.user.userId}/> */}
      </div>
      {/* text */}
      <div className="m-2 text-base ">
        <p className="m-2">{com.text}</p>
        {/* media */}
        {com.images.length?<div className=" m-2"><PostImage ids={com.images}/></div>:null}
        {com.video?<div className="my-4 mx-4"><VideoPlayer filename={com.video}/></div>:null}
        
        <hr className=" mx-2"/>
      </div>
        </>
        
    
    )
}