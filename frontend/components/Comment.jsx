import { useEffect, useState } from "react"
import { Icon } from '@iconify/react';
import { format } from 'date-fns';
import PostImage from "./PostImage";
import VideoPlayer from "./VideoPlayer";


export default function Comment({com,user}){

    const [like,setLike] = useState(com.like)
    const [liked,setLiked] = useState(0)

    useEffect(()=>{
        return(()=>{
            if(user in like){
                setLiked(true)
            }
            
        })
    },[])

    const handleUnlike=(e)=>{
        setLiked(false)
        if(user in like){
          let filtered = like.filter(id=>id!==user)
          setLike([...filtered])
          //fetch
        }
        
    }

    const handleLike=(e)=>{
        setLiked(true);
        if(user in like){
          setLike(prev=>[...prev,user])
          //fetch
        }
    }

    const showCommentPanel = (e)=>{
        //todo
          console.log("show panal",e)
    }

    return(
        <>
        <div className="flex item-center mx-2 text-base ">
          {/* info */}
        <img className="h-8 round-full m-4" src ={`avatar/${com.avatar?com.avatar:"user.png"}`}/>
        <div className="flex-grow">
        <p className="m-2"><a>{com.name} </a><a className=" text-gray-500">{com.tag} { format(new Date(com.date), " · yyyy MMMM dd")}</a></p>
        <p className="m-2"> Replying<a className=" text-gray-500">{com.replying.reduce((prev,tag)=>prev+" "+tag,"")}</a></p>
        </div>
      </div>
      {/* text */}
      <div className="m-2 text-base ">
        <p className="m-2">{com.text}</p>
        {/* media */}
        {com?.image?<div className=" m-2"><PostImage ids={com.image}/></div>:null}
        {com?.video?<div className="my-4 mx-4"><VideoPlayer filename={com.video}/></div>:null}
        {/* likes and etc... */}
        <div className="flex my-2 items-center">
            <Icon icon="ic:outline-insert-comment" onClick={(e)=>showCommentPanel(e)} width="36" hFlip={true} />
            {
              liked?<Icon icon="mdi:cards-heart" onClick={(e)=>handleUnlike(e)} color="red" height="36" hFlip={true} />:
              <Icon icon="mdi:cards-heart-outline" onClick={(e)=>handleLike(e)} width="36"/>
            }
            <a className="text-gray-700 text-sm align-middle ml-1">{like.length}</a>
            </div>
        </div>
        <hr className=" mx-2"/>
        </>
        
    
    )
}