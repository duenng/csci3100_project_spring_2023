import { useState } from "react"
import { Icon } from '@iconify/react';

export default function CommentLikes(props){
    const [like,setLike] = useState(props.like)
    const [liked,setLiked] = useState(props.current in like)

    const handleUnlike=(e)=>{
        setLiked(false)
        if(props.current in like){
          let filtered = like.filter(id=>id!==props.current)
          setLike([...filtered])
          //fetch
        }
        
    }

    const handleLike=(e)=>{
        setLiked(true);
        if(props.current in like){
          setLike(prev=>[...prev,props.current])
          //fetch
        }
    }

    const showCommentPanel = (e)=>{
        //todo
          console.log("show panal",e)
    }

    return(
        <>
        <div className="flex my-2 items-center">
            <Icon icon="ic:outline-insert-comment" className="hoverEffect" onClick={(e)=>showCommentPanel(e)} width="36" hFlip={true} />
            {
              liked?<Icon icon="mdi:cards-heart" className="hoverEffect" onClick={(e)=>handleUnlike(e)} color="red" height="36" hFlip={true} />:
              <Icon icon="mdi:cards-heart-outline" className="hoverEffect" onClick={(e)=>handleLike(e)} width="36"/>
            }
            <a className="text-gray-700 text-sm align-middle ml-1">{like.length}</a>
        </div>
        </>
    )
}