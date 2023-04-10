import { ArrowCircleLeftIcon, ArrowCircleRightIcon } from "@heroicons/react/outline"
import { useEffect, useState } from "react"


const route = "image/"

export default function PostImage({ids}){
    const [index,setIndex] = useState(0)

    const n = ids.length
    return(
        <div className=" relative">
            <img
                src={`${route}${ids[index]}`}
                alt={`Image ${index}`}
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
            <ArrowCircleLeftIcon className="h-5"/>
            <ArrowCircleRightIcon className="h-5"/>
        </div>
        
    )
}