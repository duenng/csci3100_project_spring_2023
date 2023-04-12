import { useState} from "react";
import { Icon } from '@iconify/react';
import tickOutline from '@iconify/icons-mdi/tick-outline';
import cardsHeartOutline from '@iconify/icons-mdi/cards-heart-outline';
import cardsHeart from '@iconify/icons-mdi/cards-heart';
import repostIcon from '@iconify/icons-zondicons/repost';
import outlineComment from '@iconify/icons-ic/outline-comment';
import iosShareRounded from '@iconify/icons-material-symbols/ios-share-rounded';




export default function PostLike(props){
    const [repost,setRepost] = useState(props.repost)
    const [like,setLike] = useState(props.like)
    const [liked,setLiked] = useState(like.includes(props.current))
    const [copy,setCopy] = useState(false)
    


      const showCommentPanel = (e)=>{
       return props.handler()
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
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl)
        setCopy(true)
        setTimeout(()=>{
          setCopy(false)
        },2000)
        //console.log("share",e)
      }

    return (
        <>
             {/* likes and etc... */}
          <hr className="mx-2 "></hr>
            <div className=" my-4 mx-3 text-m">
            {repost.length?<span className="mx-2"><a className="font-semibold">{repost.length}</a><a className="text-gray-500"> reposts</a></span>:null}
            {like.length?<span className="mx-2"><a className="font-semibold">{like.length}</a><a className="text-gray-500"> likes</a></span>:null}
            </div>
            <hr className="mx-2"></hr>
            <div className="flex justify-evenly my-2">
            <div title="comment">
              <Icon icon={outlineComment} hFlip={true} />
            </div>
            <div title='repost'>
              <Icon icon={repostIcon} />
            </div>
            {
              liked?<div title="unlike"><Icon icon={cardsHeart} /></div>:
              <div title= "like"><Icon icon={cardsHeartOutline} /></div>
            }
            
            {copy?<div><Icon icon={tickOutline} /></div>
            :<div onClick={()=>handleShare()}><Icon icon={iosShareRounded} /></div>}
            
            </div>
        </>
    )
}