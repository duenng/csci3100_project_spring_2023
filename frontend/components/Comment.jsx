import { format } from 'date-fns';
import PostImage from "./PostImage";
import VideoPlayer from "./VideoPlayer";
import CommentLikes from "./CommentLikes";


export default function Comment({com,current}){

    

    return(
        <>
        <div className="flex item-center mx-2 text-base ">
          {/* info */}
        <img className="h-8 round-full m-4" src ={`avatar/${com.avatar?com.avatar:"user.png"}`}/>
        <div className="flex-grow">
        <p className="m-2"><a>{com.name} </a><a className=" text-gray-500">{com.tag} { format(new Date(com.date), " · yyyy MMMM dd")}</a></p>
        <p className="m-2"> Replying<a className=" text-gray-500">{com.replying.reduce((prev,tag)=>prev+" "+tag,"")}</a></p>
        </div>
      </div>
      {/* text */}
      <div className="m-2 text-base ">
        <p className="m-2">{com.text}</p>
        {/* media */}
        {com?.image?<div className=" m-2"><PostImage ids={com.image}/></div>:null}
        {com?.video?<div className="my-4 mx-4"><VideoPlayer filename={com.video}/></div>:null}
        {/* likes and etc... */}
        <CommentLikes like={com.like} current={current}/>
      </div>
        <hr className=" mx-2"/>
        </>
        
    
    )
}