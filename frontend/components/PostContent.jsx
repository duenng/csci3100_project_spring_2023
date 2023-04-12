import { format } from 'date-fns';
import PostImage from './PostImage';
import VideoPlayer from './VideoPlayer';
import { DotsHorizontalIcon } from '@heroicons/react/outline';


export default function PostContent(props){
    const formattedDate = format(props.date, "pp · yyyy MMMM dd");
    let owner = props.owner

    return(
        <>
        {/* info */}
            <div className="my-4 flex items-center justify-left text-black-700 justify-start-onlarge mx-2">
              {/* User Profile Picture, Need to import from database*/}
              <img className="h-12 round-full my-1" src ={`avatar/${owner.avatar?owner.avatar:"user.png"}`}/>
              <div className="mx-2 text-m flex-grow">
                {/* User Name, Need to import from database*/}
                <h4 style={{ padding: 0, margin: 0 }}>{owner.username}</h4>
                <p style={{ padding: 0, margin: 0 }} className="text-gray-500">
                  {owner.tag}
                </p>
              </div>
              <DotsHorizontalIcon className="h-5 ml-auto" />
            </div>
            {/* main content */}
            <div className="text-l my-4 mx-3">
              <p>{props.text}</p>
            </div>
            {/* medias */}
            {props.images?.length?<div className="my-4 mx-3"><PostImage ids={props.images}/></div>:null}
            {props.video?<div className="my-4 mx-4"><VideoPlayer filename={props.video}/></div>:null}
            <div className=" text-gray-500 text-sm my-4 mx-3">
              {formattedDate}
            </div>
        </>
    )
}