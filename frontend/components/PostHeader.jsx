import {ArrowLeftIcon} from "@heroicons/react/outline";

export default function PostHeader(){

    return(
        <div className="flex text-2xl h-8 align-middle m-4 bg-opacity-25 bg-white">
        <ArrowLeftIcon className=""/>
        <a className="mx-4">Posts</a>
      </div>
    )
}