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

function Chat() {

return (

<div>
        <div class="flex flex-row">
        <div class="flex-none w-60 h-14 text-[20px] p-3  font-bold ">
              Messages 
        </div>
            
        {/* Setting Logo */}
        <div class="flex-initial w-14 h-14 p-3">
        <button class="rounded-full ...">
            <Image class=" hover:bg-purple-200 rounded-full" src="/setting.png" alt="Setting" width={25}height={25} ></Image>
        </button>
        </div>
        
        <div class="flex-initial w-14 h-14 p-3">
            <Image class=" hover:bg-purple-200 rounded-full" src="/add-chat.png" alt="addchat" width={30}height={30} ></Image>
        </div>
        </div>


        <button className="bg-gray-200 items-center text-gray-500 hover:brightness-10 rounded-full w-80 h-12 font-bold shadow-md text-lg xl:inline flex p-5">
        <div class="flex-initial w-5 h-10 p-2 text-[15px]  ">
        </div>
        <Image class="flex-initial w-10 h-10 p-2.5" src="/search.png" alt="search" width={20}height={20} ></Image>
        <div class="flex-initial w-30 h-10 p-2 text-[16px]  ">
            Search Direct Message 
        </div>
        </button>



        <div className="flex items-center justify-centerborder-4 border-indigo-500/50 text-gray-700 hoverEffect rounded-none w-80 h-20 ">
            {/* User Profile Picture, Need to import from database*/}
            <img
            src="/usericon.jpg"  
            alt="Profile Picture"
            className="h-12 w-12 rounded-full xl:mr-2 "
            />

            <div className="leading-5">
            {/* User Name, Need to import from database*/}
            <h4 className="font-bold">Username</h4>
            <p className="text-gray-500 text-[14px]">@username</p>
            </div>
        </div>

 
</div>
);

}

export default Chat;