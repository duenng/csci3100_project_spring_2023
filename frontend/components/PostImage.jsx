import { useEffect, useState } from "react"


const route = "/image/"

export default function PostImage({ids}){
    const [index,setIndex] = useState(0)
    useEffect(()=>{
        console.log(ids)
    },[])

    const n = ids.length
    return(
        <div className=" relative z-0">
            <img
                src={`/image/${ids[index]}`}
                alt={`${ids[index]}`}
                className="rounded-lg"
                onClick={(event) => {
                const x = event.nativeEvent.offsetX;
                const width = event.target.clientWidth;
                if (x < width / 2) {
                setIndex((index+n-1)%n);
                } else {
                setIndex((index+1)%n);
                }
            }}/>
           
        </div>
        
    )
}