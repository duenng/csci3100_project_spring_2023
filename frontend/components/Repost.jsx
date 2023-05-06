import { useRouter } from "next/router"
import { format } from 'date-fns';


export default function Repost(props){
    let post = props.post
    let owner = post.user
    const router = useRouter()

    //goto the post if clicked
    const handleClick = (e)=>{
      let tag = e.target.tagName
      console.log(tag)
      if(tag==="IMG"||tag==="VIDEO"||tag==="A"||window.getSelection().toString().length){
        return
      }
      window.open(`/post/${post.postId}`,"_self")
    }

    
    return(
        <>
        <div className=" border-violet-500 border-2 p-2 rounded-lg" >
        <div className="flex item-center mx-2 text-base " onClick={(e)=>handleClick(e)}>
            {/* info */}
            <img className="h-8 round-full m-4" src ={`/avatar/${owner.avatar?owner.avatar:"user.png"}`}/>
                <div className="flex-grow">
                    <p className="m-2"><a>{owner.username} </a><a className=" text-gray-500">{owner.tag} </a></p>
                    <p className="m-2 text-gray-500 text-sm">{ post.date}</p>
                </div>
        </div>
            {/* text */}
        <div className="m-2 text-base " onClick={(e)=>handleClick(e)}>
            <p className="m-2">{post.text}</p>
            {/* media */}
            {post?.images?.length?<img className="" src={`/image/${post.images[0]}`}/>:null}
        </div>
        </div>
        
        </>
    )
}