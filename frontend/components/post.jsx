import { DotsHorizontalIcon, ArrowLeftIcon} from "@heroicons/react/outline";
import { Content } from "next/font/google";
import PostImage from "./PostImage";
import { format } from 'date-fns';

// shd use post id to fetch
let username = "test"
let tag = "@test"
let text = "here is the testing content."
const date = new Date(2023, 3, 10, 13, 0, 20);
const testImages = ["corgi.jpeg","doll.jpeg","golden.png","munchkin.png","persian.png","samoyed.png","shiba.jpeg"]


export default function Post(){

      const hour = date.getHours() % 12;
      const minute = date.getMinutes();
      const year = date.getFullYear();
      const month = date.toLocaleString('default', { month: 'long' });
      const day = date.getDate();
      const period = date.getHours() < 12 ? 'am' : 'pm';
      const formattedDate = format(new Date(), "pp · yyyy MMMM dd");


    return(
       <>
            <div className="flex text-2xl h-16 align-middle  bg-opacity-25 sticky top-0 backdrop-blur-sm">
              <ArrowLeftIcon className="m-4"/>
              <a className="my-4 mx-1">Posts</a>
            </div>
            <div className="my-4 flex items-center justify-left text-black-700 justify-start-onlarge mx-3">
              {/* User Profile Picture, Need to import from database*/}
              <img src="/usericon.jpg" alt="Profile Picture" className="w-12 h-12 rounded-full px-1"/>
              <div className="px-1 text-m">
                {/* User Name, Need to import from database*/}
                <h4 style={{ padding: 0, margin: 0 }}>{username}</h4>
                <p style={{ padding: 0, margin: 0 }} className="text-gray-500">
                  {tag}
                </p>
              </div>
              <DotsHorizontalIcon className="h-5 ml-auto" />
            </div>
            <div className="text-l my-4 mx-3">
              <p>{text}</p>
            </div>
            <div className="my-4 mx-3">
              <PostImage ids={testImages}/>
            </div>
            <div className=" text-gray-500 text-sm my-4 mx-3">
              {formattedDate}
            </div>
            <hr className="mx-2"></hr>
            
         
      </> 
    )
}
