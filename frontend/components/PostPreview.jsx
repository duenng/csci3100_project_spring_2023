import { format } from 'date-fns';
import { useEffect, useState, useRef } from 'react';
import { Icon } from '@iconify/react';
import tickOutline from '@iconify/icons-mdi/tick-outline';
import cardsHeartOutline from '@iconify/icons-mdi/cards-heart-outline';
import cardsHeart from '@iconify/icons-mdi/cards-heart';
import repostIcon from '@iconify/icons-zondicons/repost';
import outlineComment from '@iconify/icons-ic/outline-comment';
import iosShareRounded from '@iconify/icons-material-symbols/ios-share-rounded';
import CommentPanel from './CommentPanel';
import PostImage from "./PostImage";
import VideoPlayer from "./VideoPlayer";

function LikePanel(props){
    let post = props.post
    const [repost,setRepost] = useState(post.repost)
    const [like,setLike] = useState(post.like)
    const [liked,setLiked] = useState(like.includes(props.currentUser.userId))
    const [comment,setComment] = useState(post.comment)
    const [showPanel,setShowPanel] = useState(false)
    const [copy,setCopy] = useState(false)
    const commentRef = useRef()
    
      const showCommentPanel = (e)=>{
       //return props.handler()
        if(showPanel){
                setShowPanel(false)
                return
        }
        setShowPanel(true)
        setTimeout(()=>{
            let area = commentRef.current.children[1].children[0].children[1].children[1]
            //console.log(area)
            commentRef.current.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
              area.focus()
            },490);

        },10)
      }

      const handleRepost = (e)=>{
        //todo
        console.log("reposted",e)
      }

      const handleUnlike=(e)=>{
        setLiked(false)
        if(like.includes(props.currentUser.userId)){
          let filtered = like.filter(id=>id!==props.currentUser.userId)
          setLike([...filtered])
          //fetch
        }
        
      }

      const handleLike=(e)=>{
        setLiked(true);
        //console.log(like,props.current)
        if(!like.includes(props.currentUser.userId)){
            //console.log("here")
          setLike(prev=>{
            return [...prev,props.currentUser.userId]})
          //fetch
        }
      }

      const handleShare=(e)=>{
        const Url = `${window.location.href}/post/${post.postId}`;
        navigator.clipboard.writeText(Url)
        setCopy(true)
        setTimeout(()=>{
          setCopy(false)
        },25000)
        //console.log("share",e)
      }

      const addHandler=(newComment)=>{
        console.log(2,newComment)
        setComment(prev=>{
              return [...prev,newComment]
        })
      }

      return (
        <>
             {/* likes and etc... */}
            
            <div className="flex justify-evenly my-2">
            <div>
                <div title="comment" className="flex rounded-lg hover:bg-gray-300 h-8 w-8 justify-center align-middle" onClick={()=>showCommentPanel()}>
                <Icon icon={outlineComment} hFlip={true} width="32" height="32" />
                </div>
                {comment.length?<a className=' text-gray-500'>{comment.length}</a>:null}
            </div>
            <div>
                <div title='repost' className="flex rounded-lg hover:bg-gray-300 h-8 w-8 justify-center align-middle" onClick={()=>handleRepost()}>
                <Icon icon={repostIcon} width="32" height="32"/>
                </div>
                {repost.length?<a className=' text-gray-500'>{repost.length}</a>:null}
            </div>
            <div>
                {
                liked?<div title="unlike" className="flex rounded-lg hover:bg-gray-300 h-8 w-8 justify-center align-middle" onClick={()=>handleUnlike()}><Icon icon={cardsHeart}  color="red" width="32" height="32"/></div>:
                <div title= "like" className="flex rounded-lg hover:bg-gray-300 h-8 w-8 justify-center align-middle" onClick={()=>handleLike()}><Icon icon={cardsHeartOutline} width="32" height="32"/></div>
                }
                {like.length?<a className=' text-gray-500'>{like.length}</a>:null}
            </div>
           
            
            {copy?<div title="copied" className="flex rounded-full h-8 w-8 align-middle justify-center" ><Icon icon={tickOutline} width="32" height="32" /></div>
            :<div title="share" className="flex rounded-lg hover:bg-gray-300 h-8 w-8 justify-center align-middle" onClick={()=>handleShare()}  >< Icon icon={iosShareRounded} width="32" height="32" /></div>}
            
            </div>
            <div ref={commentRef}>
                {showPanel?
                    <>
                    <hr className="mx-1"></hr>
                    <div className="mx-2">
                        <CommentPanel  tag={post.user.tag} user = {props.currentUser} handler={addHandler}/>
                    </div>
                    </>
                :null}
            </div>
            
            
        </>
    )
    

}

export default function PreviewPost(props){
    let post = props.post
    let owner = post.user
    let currentUser = props.user
    // useEffect(()=>{
    //     console.log(post)
    // })
    
    return(
        <>
        <div className="flex item-center mx-2 text-base ">
            {/* info */}
            <img className="h-8 round-full m-4" src ={`avatar/${owner.avatar?owner.avatar:"user.png"}`}/>
                <div className="flex-grow">
                    <p className="m-2"><a>{owner.username} </a><a className=" text-gray-500">{owner.tag} </a></p>
                    <p className="m-2"><a className=" text-gray-500 text-sm" >{ format(post.date, "pp · yyyy MMMM dd")}</a></p>
                </div>
        </div>
            {/* text */}
        <div className="m-2 text-base ">
            <p className="m-2">{post.text}</p>
            {/* media */}
            {post?.images?.length?<div className=" m-2"><PostImage ids={post.images}/></div>:null}
            {post.video?<div className="my-4 mx-4"><VideoPlayer filename={post.video}/></div>:null}
        </div>
        <hr className=" mx-1"/>
        <LikePanel post={post} currentUser={currentUser}/>
        <hr className=" mx-1"/>
        </>
    )
}