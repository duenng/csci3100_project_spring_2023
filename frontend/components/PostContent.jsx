import { format } from 'date-fns';
import PostImage from './PostImage';
import VideoPlayer from './VideoPlayer';
import { DotsHorizontalIcon } from '@heroicons/react/outline';


export default function PostContent({avatar,tag,username,images,video,date,text}){
    const formattedDate = format(date, "pp · yyyy MMMM dd");

    return(
        <>
        {/* info */}
            <div className="my-4 flex items-center justify-left text-black-700 justify-start-onlarge mx-2">
              {/* User Profile Picture, Need to import from database*/}
              <img className="h-12 round-full my-1" src ={`avatar/${avatar?avatar:"user.png"}`}/>
              <div className="mx-2 text-m flex-grow">
                {/* User Name, Need to import from database*/}
                <h4 style={{ padding: 0, margin: 0 }}>{username}</h4>
                <p style={{ padding: 0, margin: 0 }} className="text-gray-500">
                  {tag}
                </p>
              </div>
              <DotsHorizontalIcon className="h-5 ml-auto" />
            </div>
            {/* main content */}
            <div className="text-l my-4 mx-3">
              <p>{text}</p>
            </div>
            {/* medias */}
            {images?.length?<div className="my-4 mx-3"><PostImage ids={images}/></div>:null}
            {video?<div className="my-4 mx-4"><VideoPlayer filename={video}/></div>:null}
            <div className=" text-gray-500 text-sm my-4 mx-3">
              {formattedDate}
            </div>
        </>
    )
}