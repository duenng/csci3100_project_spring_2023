import { useState } from "react"
import { Icon } from '@iconify/react';
import cardsHeartOutline from '@iconify/icons-mdi/cards-heart-outline';
import cardsHeart from '@iconify/icons-mdi/cards-heart';
import axios from "axios";

export default function CommentLikes(props){
    const [like,setLike] = useState(props.like)
    const [liked,setLiked] = useState(like.includes(props.current))

    const handleUnlike=(e)=>{
        setLiked(false)
        if(like.includes(props.current)){
          let filtered = like.filter(id=>id!==props.current)
          setLike([...filtered])
        }
        
    }

    const handleLike= async(e)=>{
        setLiked(true);
        if(!like.includes(props.current)){
          setLike(prev=>{
            return [...prev,props.current]})

        }
    }

    return(
        <>
        <div className="flex my-2 items-center mr-3 text-m font-semibold">
            {
              liked?<div title="unlike" className="flex rounded-lg hover:bg-gray-300 h-8 w-8 justify-center align-middle" onClick={()=>handleUnlike()}><Icon icon={cardsHeart}  color="red" width="32" height="32"/></div>:
              <div title= "like" className="flex rounded-lg hover:bg-gray-300 h-8 w-8 justify-center align-middle" onClick={()=>handleLike()}><Icon icon={cardsHeartOutline} width="32" height="32"/></div>
            }
            <a className="text-gray-700 text-sm align-middle">{like.length}</a>
        </div>
        </>
    )
}