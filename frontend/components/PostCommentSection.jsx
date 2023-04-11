import {  useRef, useState} from "react"
import Comment from "./Comment";
import CommentPanel from"./CommentPanel";
import PostLike from "./postLike";

export default function PostCommentSection(props){

    const [comment,setComment] = useState(props.comment)
    const commentRef = useRef()

    const handleShowAddComment = ()=>{
      if (commentRef.current) {
        let area = commentRef.current.children[0].children[1].children[1]
        //console.log(area)
        commentRef.current.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          area.focus()
        },500);
      }
    }

    const addHandler=(newComment)=>{
      console.log(2,newComment)
      setComment(prev=>{
            return [...prev,newComment]
      })
    }


    return(
        <>
            <PostLike current={props.current} repost={props.repost} like={props.like} handler={()=>handleShowAddComment()}/>
            <hr className="mx-2"></hr>
            {/* comment section */}
            <div className="mx-2" ref={commentRef}>
              <CommentPanel tag={props.tag} user = {{}} inPost={true} handler={addHandler}/>
            </div>
            <hr className=" mx-2"/>
            {
              comment.map((com,index)=>{
                return <Comment key={index} com={com} current={props.current}/>
              })
            }
            {/* <div className='fiexed w-screen h-screen z-9999 bg-slate-600 top-0 left-0'></div> */}
        </>
    )
}