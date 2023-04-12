import { format } from 'date-fns';
import PostImage from "./PostImage";
import VideoPlayer from "./VideoPlayer";
import { useEffect } from 'react';

function Like({like,repost}){

}

export default function PreviewPost(props){
    let post = props.post
    let owner = post.user
    let currentUser = props.user
    useEffect(()=>{
        console.log(post)
    })
    
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
        <hr className=" mx-1 h-1"/>
        </div>
        </>
    )
}