import { Icon } from '@iconify/react';
import {useState} from "react"
import Comment from "./Comment";
import CommentPanel from"./CommentPanel";

export default function PostCommentSection(props){

    const [repost,setRepost] = useState(props.repost)
    const [like,setLike] = useState(props.like)
    const [liked,setLiked] = useState(like.includes(props.current))
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
        if(like.includes(props.current)){
          let filtered = like.filter(id=>id!==props.current)
          setLike([...filtered])
          //fetch
        }
        
      }

      const handleLike=(e)=>{
        setLiked(true);
        //console.log(like,props.current)
        if(!like.includes(props.current)){
            //console.log("here")
          setLike(prev=>{
            return [...prev,props.current]})
          //fetch
        }
      }

      const handleShare=(e)=>{
        //todo
        console.log("share",e)
      }

      const addHandler=(newComment)=>{
        console.log(2,newComment)
        setComment(prev=>{
            return [...prev,newComment]
        })
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
            <Icon icon="ic:outline-insert-comment" className="hoverEffect h-10" onClick={(e)=>showCommentPanel(e)} width="36" hFlip={true} />
            <Icon icon="zondicons:repost" className="hoverEffect h-10" onClick={(e)=>handleRepost(e)} width="36"/>
            {
              liked?<Icon icon="mdi:cards-heart"  className="hoverEffect h-10" onClick={(e)=>handleUnlike(e)} color="red" height="36" hFlip={true} />:
              <Icon icon="mdi:cards-heart-outline" className="hoverEffect h-10" onClick={(e)=>handleLike(e)} width="36"/>
            }
            <Icon icon="material-symbols:ios-share" className="hoverEffect h-10" onClick={(e)=>handleShare(e)} height="36" hFlip={true} />
            </div>
            <hr className="mx-2"></hr>
            {/* comment section */}
            <div className="mx -2">
              <CommentPanel tag={props.tag} user = {{}} inPost={true} handler={addHandler}/>
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