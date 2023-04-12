import { useState } from "react"
import { Icon } from '@iconify/react';

export default function CommentLikes(props){
    const [like,setLike] = useState(props.like)
    const [liked,setLiked] = useState(like.includes(props.current))

    const handleUnlike=(e)=>{
        setLiked(false)
        if(like.includes(props.current)){
          let filtered = like.filter(id=>id!==props.current)
          setLike([...filtered])
          //fetch
        }
        
    }

    const handleLike=(e)=>{
        setLiked(true);
        if(!like.includes(props.current)){
          setLike(prev=>{
            return [...prev,props.current]})
          //fetch
        }
    }

    return(
        <>
        <div className="flex my-2 items-center mr-3 text-m font-semibold">
            {
              liked?<div title= "unlike"><Icon icon="mdi:cards-heart" className="hoverEffect h-10" onClick={(e)=>handleUnlike(e)} color="red" height="36" hFlip={true} /></div>:
              <div title="like"><Icon icon="mdi:cards-heart-outline" className="hoverEffect h-10" onClick={(e)=>handleLike(e)} width="36"/></div>
            }
            <a className="text-gray-700 text-sm align-middle">{like.length}</a>
        </div>
        </>
    )
}