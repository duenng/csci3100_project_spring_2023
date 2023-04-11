import { useState } from "react";


export default function CommentPanel(props){
    const [text,setText] = useState("")
    const [image,setImage] = useState([])
    const [video,setVideo] = useState("")
    const [tags, setTag] = useState(props.tags)
    let user = props.user
    
    

    return(
        <>
        <div className="flex item-center mx-2 text-base ">
            <img className="h-8 round-full m-4 flex-none" src ={`avatar/${user?.avatar?user.avatar:"user.png"}`}/>
            <div className="flex-grow">
                <p className="m-1  text-gray-500">Reply {tags.reduce((prev,tag)=>prev+" "+tag,"")}</p>
                <textarea className=" w-full" placeholder="Comments here..." onChange={e=>setText(e.value)}/>
            </div>
                
        </div>
        </>
    )

}