import { useState } from "react";


export default function CommentPanel(props){
    const [text,setText] = useState("")
    const [image,setImage] = useState([])
    const [video,setVideo] = useState("")
    let user = props.user

    const handleAdd =(e)=>{
        if(!text.length){
            return
        }
        // need change to current user info
        let newComment={
            userID: 123,
            name: "testnew",
            tag:"@new",
            avatar:null,
            replying:props.tag,
            text:text,
            image:[],
            video:"",
            like:[],
            date:Number(new Date())
        }
        if(props.inPost){
            props.handler(newComment)
            setText("")
            // console.log(1,newComment)
        }
        //todo: fetch
    }
    
    

    return(
        <>
        <div className="flex item-center mx-2 text-base ">
            <img className="h-8 round-full m-4 flex-none" src ={`avatar/${user?.avatar?user.avatar:"user.png"}`}/>
            <div className="flex-grow">
                <p className="m-1  text-gray-500">Reply {props.tag}</p>
                <textarea className=" w-full" placeholder="Comments here..." onChange={e=>setText(e.target.value)}/>
                <div className="flex m-2">
                    <div className="flex-grow">add files to do</div>
                    <button className="bg-violet-500 text-white rounded-full font-bold px-3 py-1" onClick={handleAdd}>Submit</button>
                </div>
            </div>
                
        </div>
        </>
    )

}