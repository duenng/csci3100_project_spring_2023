import { useEffect, useState } from "react";

export default function PopUp(props){
    const [message,setMessage] = useState(props.message)
    useEffect((e)=>{
        setMessage(props.message)
    },[props.message])
    return(
        <div className="h-1/6 m-2 bg-sky-500/75 absolute bottom-1 text-white">{message}</div>
    )
}