import { useState} from "react";
import { Icon } from '@iconify/react';
import tickOutline from '@iconify/icons-mdi/tick-outline';
import cardsHeartOutline from '@iconify/icons-mdi/cards-heart-outline';
import cardsHeart from '@iconify/icons-mdi/cards-heart';
import repostIcon from '@iconify/icons-zondicons/repost';
import outlineComment from '@iconify/icons-ic/outline-comment';
import iosShareRounded from '@iconify/icons-material-symbols/ios-share-rounded';
import PopUpCreate from "./PopUpCreatePost";



export default function PostLike(props){
    const [repost,setRepost] = useState(props.repost)
    const [like,setLike] = useState(props.like)
    const [liked,setLiked] = useState(like.includes(props.current.userId))
    const [copy,setCopy] = useState(false)
    const [showPop,setShowPop] = useState(false)
    


      const showCommentPanel = (e)=>{
       return props.handler()
      }

      const handleRepost = (e)=>{
        setShowPop(true)
      }

      const handleUnlike=(e)=>{
        setLiked(false)
        if(like.includes(props.current.userId)){
          let filtered = like.filter(id=>id!==props.current.userId)
          setLike([...filtered])
          //fetch
        }
        
      }

      const handleLike=(e)=>{
        setLiked(true);
        //console.log(like,props.current)
        if(!like.includes(props.current.userId)){
            //console.log("here")
          setLike(prev=>{
            return [...prev,props.current.userId]})
          //fetch
        }
      }

      const handleShare=(e)=>{
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl)
        setCopy(true)
        setTimeout(()=>{
          setCopy(false)
        },25000)
        //console.log("share",e)
      }

    return (
        <>
             {/* likes and etc... */}
             <hr className="mx-2 border-violet-500"></hr>
            <div className=" my-4 mx-3 text-m">
            {repost.length?<span className="mx-2"><a className="font-semibold">{repost.length}</a><a className="text-gray-500"> reposts</a></span>:null}
            {like.length?<span className="mx-2"><a className="font-semibold">{like.length}</a><a className="text-gray-500"> likes</a></span>:null}
            </div>
            <hr className="mx-2 border-violet-500"></hr>
            <div className="flex justify-evenly my-2">
            <div title="comment" className="flex rounded-lg hover:bg-gray-300 h-8 w-8 justify-center align-middle" onClick={()=>showCommentPanel()}>
              <Icon icon={outlineComment} hFlip={true} width="32" height="32" />
            </div>
            <div title='repost' className="flex rounded-lg hover:bg-gray-300 h-8 w-8 justify-center align-middle" onClick={()=>handleRepost()}>
              <Icon icon={repostIcon} width="32" height="32"/>
            </div>
            {
              liked?<div title="unlike" className="flex rounded-lg hover:bg-gray-300 h-8 w-8 justify-center align-middle" onClick={()=>handleUnlike()}><Icon icon={cardsHeart}  color="red" width="32" height="32"/></div>:
              <div title= "like" className="flex rounded-lg hover:bg-gray-300 h-8 w-8 justify-center align-middle" onClick={()=>handleLike()}><Icon icon={cardsHeartOutline} width="32" height="32"/></div>
            }
            
            {copy?<div title="copied" className="flex rounded-full h-8 w-8 align-middle justify-center" ><Icon icon={tickOutline} width="32" height="32" /></div>
            :<div title="share" className="flex rounded-lg hover:bg-gray-300 h-8 w-8 justify-center align-middle" onClick={()=>handleShare()}  >< Icon icon={iosShareRounded} width="32" height="32" /></div>}
            
            </div>
            {showPop?<PopUpCreate user={props.current} url={window.location.href} handler={()=>setShowPop(false)}/>:null}
        </>
    )
}