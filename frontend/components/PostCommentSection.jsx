import { Icon } from '@iconify/react';
import {useEffect,useState} from "react"
import Comment from "./Comment";
import CommentPanel from"./CommentPanel";

export default function PostCommentSection(props){

    const [repost,setRepost] = useState(props.repost)
    const [like,setLike] = useState(props.like)
    const [liked,setLiked] = useState(props.current in like)
    const [comment,setComment] = useState(props.comment)


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

      const handleShare=(e)=>{
        //todo
        console.log("share",e)
      }


    return(
        <>
          {/* likes and etc... */}
          <hr className="mx-2"></hr>
            <div className=" my-4 mx-3 text-m">
            {repost.length?<span className="mx-2"><a className="font-semibold">{repost.length}</a><a className="text-gray-500"> reposts</a></span>:null}
            {like.length?<span className="mx-2"><a className="font-semibold">{like.length}</a><a className="text-gray-500"> likes</a></span>:null}
            </div>
            <hr className="mx-2"></hr>
            <div className="flex justify-evenly my-2">
            <Icon icon="ic:outline-insert-comment" className="hoverEffect" onClick={(e)=>showCommentPanel(e)} width="36" hFlip={true} />
            <Icon icon="zondicons:repost" className="hoverEffect" onClick={(e)=>handleRepost(e)} width="36"/>
            {
              liked?<Icon icon="mdi:cards-heart"  className="hoverEffect" onClick={(e)=>handleUnlike(e)} color="red" height="36" hFlip={true} />:
              <Icon icon="mdi:cards-heart-outline" className="hoverEffect" onClick={(e)=>handleLike(e)} width="36"/>
            }
            <Icon icon="material-symbols:ios-share" className="hoverEffect" onClick={(e)=>handleShare(e)} height="36" hFlip={true} />
            </div>
            <hr className="mx-2"></hr>
            {/* comment section */}
            <div className="mx -2">
              <CommentPanel tags={[props.tag]} user = {{}}/>
            </div>
            <hr className=" mx-2"/>
            {
              comment.map((com,index)=>{
                return <Comment key={index} com={com} current={props.current}/>
              })
            }
        </>
    )
}