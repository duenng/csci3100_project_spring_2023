import Image from "next/image"
import SideBarMenuItem from "./SideBarMenuItem";
import { HomeIcon } from "@heroicons/react/solid";
import {
  BellIcon,
  InboxIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";

function Chatroom() {

return (
 
<div>
        <div className= " w-100 h-100">
        {/* User Profile Picture, Need to import from database*/}
            <img
            src="/usericon.jpg"  
            alt="Profile Picture"
            className="h-40 w-40 rounded-full xl:mr-2 p-100 "
            />
        </div>   


        <div className="flex  border-indigo-500/50 text-gray-700 items-center rounded-none w-100 h-10 p-30 ">
            
            <div className="leading-5">
            {/* User Name, Need to import from database*/}
            <h4 className="font-bold text-[25px]" >Username</h4>
            <p className="text-gray-500 text-[18px]">@username</p>
            <p className="text-[18px]">user self introduction</p>
            <p className="text-[18px]">xxx common followers</p>
            </div>
        </div>

        {/* Message Bar  */}
        <div class="bg-gray-200 items-center  text-gray-500 hover:brightness-10 rounded-full flex p-2 pl-10 "width={200}>

        <Image class="flex-initial w-10 h-10 p-2.5" src="/search.png" alt="search" width={15}height={15} ></Image>
        <input type="text" class="bg-gray-200" placeholder=" Start a new message " ></input>

        </div>


</div>
);

}

export default Chatroom;
